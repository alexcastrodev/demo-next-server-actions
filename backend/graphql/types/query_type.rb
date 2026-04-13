module Types
  class QueryType < GraphQL::Schema::Object
    field :devices, [Types::DeviceType], null: false, description: "List all devices with their event counts"

    field :device_readings, Types::DeviceReadingsPageType, null: false,
          description: "Paginated sensor readings for a device" do
      argument :device_id, String,  required: true
      argument :page,      Integer, required: false, default_value: 1
      argument :per_page,  Integer, required: false, default_value: 10
    end

    def device_readings(device_id:, page:, per_page:)
      scope = IotEvent.by_device(device_id).recent
      total = scope.count
      rows  = scope.offset((page - 1) * per_page).limit(per_page)

      data = rows.map do |e|
        base = { id: e.id, device_id: e.device_id, recorded_at: e.created_at.to_s }
        if e.key_ph.present?
          base.merge(ph: e.key_ph, conductivity: e.key_cnd, turbidity: e.key_ntu, temperature: e.key_tmp)
        else
          base.merge(battery: e.key_vbat, satellites: e.key_nsat, signal_strength: e.key_rssi)
        end
      end

      {
        data:        data,
        total:       total,
        page:        page,
        per_page:    per_page,
        total_pages: (total.to_f / per_page).ceil,
      }
    end

    def devices
      IotEvent
        .group(:device_id)
        .select('device_id, COUNT(*) as event_count, MAX(created_at) as last_seen_at')
        .order('event_count DESC')
        .map do |row|
          {
            device_id:    row.device_id,
            event_count:  row.event_count.to_i,
            last_seen_at: row.last_seen_at.to_s,
          }
        end
    end
  end
end
