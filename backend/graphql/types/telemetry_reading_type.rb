module Types
  class TelemetryReadingType < GraphQL::Schema::Object
    graphql_name "TelemetryReading"
    field :id,              Integer, null: false
    field :device_id,       String,  null: false
    field :recorded_at,     String,  null: false
    field :battery,         Float,   null: true
    field :satellites,      Integer, null: true
    field :signal_strength, Integer, null: true
  end
end
