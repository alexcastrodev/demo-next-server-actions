require 'securerandom'

def random_float(min, max, decimals = 2)
  rand(min..max).round(decimals)
end

puts '== Limpando dados antigos =='
IotEvent.delete_all
User.delete_all

puts '== Criando usuários =='

admin = User.create!(
  name:     'Admin',
  email:    'admin@example.com',
  password: 'password123'
)
puts "  -> #{admin.email}"

4.times do
  user = User.create!(
    name: "User #{SecureRandom.hex(2)}",
    email: "user_#{SecureRandom.hex(4)}@example.com",
    password: 'password123'
  )
  puts "  -> #{user.email}"
end

puts '== Criando IoT Events =='

device_ids = %w[DEV001 DEV002 DEV003 DEV004 DEV005]

device_ids.each do |device_id|
  200.times do
    IotEvent.create!(
      key_tag: "TAG#{SecureRandom.random_number(10_000).to_s.rjust(4, '0')}",
      device_id: device_id,
      key_ncy: random_float(100.0, 999.99),
      key_ph: random_float(6.0, 8.5),
      key_mtu: random_float(0.0, 100.0),
      key_tur: random_float(0.0, 50.0),
      key_cnd: random_float(100.0, 2000.0, 1),
      key_tmp: random_float(15.0, 35.0, 1),
      key_ntu: random_float(0.0, 10.0, 3),
      key_vbat: random_float(3.3, 4.2),
      key_nsat: rand(4..16),
      key_rssi: rand(-120..-40),
      sensor_data: SecureRandom.hex(32),
      created_at: Time.now - rand(0..(30 * 24 * 60 * 60))
    )
  end
  puts "  -> #{device_id}: 200 eventos criados"
end

puts "\n== Seeds concluídos =="
puts "   Usuários : #{User.count}"
puts "   IoT Events: #{IotEvent.count}"
