module Types
  class WaterQualityReadingType < GraphQL::Schema::Object
    graphql_name "WaterQualityReading"
    field :id,           Integer, null: false
    field :device_id,    String,  null: false
    field :recorded_at,  String,  null: false
    field :ph,           Float,   null: true
    field :conductivity, Float,   null: true
    field :turbidity,    Float,   null: true
    field :temperature,  Float,   null: true
  end
end
