module Types
  class DeviceReadingsPageType < GraphQL::Schema::Object
    field :data,        [Types::SensorReadingType], null: false
    field :total,       Integer, null: false
    field :page,        Integer, null: false
    field :per_page,    Integer, null: false
    field :total_pages, Integer, null: false
  end
end
