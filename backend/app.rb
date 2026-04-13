require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/json'
require 'rack/cors'
require 'jwt'
require 'json'

require_relative 'config/boot'
require 'graphql'
require_relative 'graphql/app_schema'

JWT_SECRET = ENV.fetch('JWT_SECRET', 'dev_secret_change_in_production')
JWT_ALGO   = 'HS256'.freeze
IOT_EVENT_ATTRIBUTES = %i[
  key_tag
  device_id
  key_ncy
  key_ph
  key_mtu
  key_tur
  key_cnd
  key_tmp
  key_ntu
  key_vbat
  key_nsat
  key_rssi
  sensor_data
].freeze

# CORS
use Rack::Cors do
  allow do
    origins ENV.fetch('ALLOWED_ORIGINS', 'http://localhost:3000')
    resource '*', headers: :any, methods: %i[get post put patch delete options]
  end
end

set :database_file, 'config/database.yml'

# ── Helpers ────────────────────────────────────────────────────────────────────

helpers do
  def json_body_params
    request.body.rewind
    raw_body = request.body.read
    return {} if raw_body.strip.empty?

    JSON.parse(raw_body, symbolize_names: true)
  rescue JSON::ParserError
    halt 400, json(error: 'JSON inválido.')
  end

  def encode_token(payload)
    JWT.encode(payload.merge(exp: (Time.now + 24 * 3600).to_i), JWT_SECRET, JWT_ALGO)
  end

  def decode_token(token)
    JWT.decode(token, JWT_SECRET, true, algorithm: JWT_ALGO).first
  rescue JWT::DecodeError
    nil
  end

  def current_user
    auth_header = request.env['HTTP_AUTHORIZATION']
    return nil unless auth_header&.start_with?('Bearer ')

    token   = auth_header.split(' ', 2).last
    payload = decode_token(token)
    return nil unless payload

    User.find_by(id: payload['user_id'])
  end

  def authenticate!
    halt 401, json(error: 'Não autenticado.') unless current_user
  end

  def paginate(scope)
    page     = [params[:page].to_i, 1].max
    per_page = [[params[:per_page].to_i, 10].max, 100].min
    total    = scope.count

    {
      data:       scope.offset((page - 1) * per_page).limit(per_page),
      total:      total,
      page:       page,
      per_page:   per_page,
      total_pages: (total.to_f / per_page).ceil,
    }
  end
end

# ── Auth ───────────────────────────────────────────────────────────────────────

post '/auth/login' do
  body_params = json_body_params
  user = User.find_by(email: body_params[:email]&.downcase)

  unless user&.authenticate(body_params[:password])
    halt 401, json(error: 'E-mail ou senha inválidos.')
  end

  token = encode_token(user_id: user.id, email: user.email)
  json token: token, user: { id: user.id, name: user.name, email: user.email }
end

get '/auth/me' do
  authenticate!
  u = current_user
  json id: u.id, name: u.name, email: u.email
end

# ── Stats ──────────────────────────────────────────────────────────────────────

get '/stats' do
  authenticate!

  total_events   = IotEvent.count
  total_devices  = IotEvent.distinct.count(:device_id)
  events_today   = IotEvent.where('created_at >= ?', Time.now.beginning_of_day).count
  events_7d      = IotEvent.where('created_at >= ?', 7.days.ago).count

  averages = IotEvent.pick(
    Arel.sql('AVG(key_ph)'),
    Arel.sql('AVG(key_tmp)'),
    Arel.sql('AVG(key_cnd)'),
    Arel.sql('AVG(key_ntu)'),
    Arel.sql('AVG(key_vbat)'),
    Arel.sql('AVG(key_rssi)')
  )

  events_per_device = IotEvent
    .group(:device_id)
    .order(Arel.sql('COUNT(*) DESC'))
    .count
    .map { |device_id, count| { device_id: device_id, count: count } }

  json(
    total_events:      total_events,
    total_devices:     total_devices,
    events_today:      events_today,
    events_last_7d:    events_7d,
    averages: {
      ph:   averages[0]&.round(2),
      tmp:  averages[1]&.round(2),
      cnd:  averages[2]&.round(2),
      ntu:  averages[3]&.round(3),
      vbat: averages[4]&.round(2),
      rssi: averages[5]&.round(1),
    },
    events_per_device: events_per_device,
  )
end

# ── IoT Events ─────────────────────────────────────────────────────────────────

get '/iot-events' do
  authenticate!

  allowed_columns = %w[id device_id key_tag key_ph key_tmp key_cnd key_ntu key_vbat key_rssi created_at]
  sort_by  = allowed_columns.include?(params[:sort_by]) ? params[:sort_by] : 'created_at'
  sort_dir = params[:sort_dir] == 'asc' ? 'ASC' : 'DESC'

  scope = IotEvent.order(Arel.sql("#{sort_by} #{sort_dir}"))
  scope = scope.by_device(params[:device_id]) if params[:device_id].present?

  result = paginate(scope)
  json(
    data:        result[:data].map(&:attributes),
    total:       result[:total],
    page:        result[:page],
    per_page:    result[:per_page],
    total_pages: result[:total_pages],
  )
end

get '/iot-events/:id' do
  authenticate!
  event = IotEvent.find_by(id: params[:id])
  halt 404, json(error: 'Evento não encontrado.') unless event
  json event.attributes
end

patch '/iot-events/:id' do
  authenticate!

  event = IotEvent.find_by(id: params[:id])
  halt 404, json(error: 'Evento não encontrado.') unless event

  body_params = json_body_params.slice(*IOT_EVENT_ATTRIBUTES)

  if body_params.empty?
    halt 400, json(error: 'Nenhum atributo informado para atualização.')
  end

  unless event.update(body_params)
    halt 422, json(error: event.errors.full_messages.join(', '))
  end

  json event.attributes
end

# ── GraphQL ────────────────────────────────────────────────────────────────────

post '/graphql' do
  authenticate!

  body_params = json_body_params
  result = AppSchema.execute(
    body_params[:query],
    variables: body_params[:variables] || {},
    context: { current_user: current_user },
  )

  json result.to_h
end

delete '/iot-events/:id' do
  authenticate!

  event = IotEvent.find_by(id: params[:id])
  halt 404, json(error: 'Evento não encontrado.') unless event

  event.destroy!

  json id: event.id, deleted: true
end
