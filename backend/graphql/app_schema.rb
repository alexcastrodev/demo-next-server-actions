require_relative 'types/device_type'
require_relative 'types/water_quality_reading_type'
require_relative 'types/telemetry_reading_type'
require_relative 'types/sensor_reading_type'
require_relative 'types/device_readings_page_type'
require_relative 'types/query_type'

class AppSchema < GraphQL::Schema
  query Types::QueryType
end
