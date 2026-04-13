module Types
  class SensorReadingType < GraphQL::Schema::Union
    graphql_name "SensorReading"
    possible_types Types::WaterQualityReadingType, Types::TelemetryReadingType

    def self.resolve_type(object, _ctx)
      object[:ph] ? Types::WaterQualityReadingType : Types::TelemetryReadingType
    end
  end
end
