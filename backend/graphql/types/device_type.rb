module Types
  class DeviceType < GraphQL::Schema::Object
    field :device_id,    String,  null: false
    field :event_count,  Integer, null: false
    field :last_seen_at, String,  null: false
  end
end
