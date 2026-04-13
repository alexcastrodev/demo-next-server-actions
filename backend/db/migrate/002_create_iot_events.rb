class CreateIotEvents < ActiveRecord::Migration[8.0]
  def change
    create_table :iot_events do |t|
      t.string  :key_tag,     null: false
      t.string  :device_id,   null: false
      t.float   :key_ncy                   # frequency (Hz)
      t.float   :key_ph                    # pH
      t.float   :key_mtu                   # turbidity (MTU)
      t.float   :key_tur                   # turbidity alt unit
      t.float   :key_cnd                   # conductivity (µS/cm)
      t.float   :key_tmp                   # temperature (°C)
      t.float   :key_ntu                   # NTU
      t.float   :key_vbat                  # battery voltage (V)
      t.integer :key_nsat                  # satellites
      t.integer :key_rssi                  # signal strength (dBm)
      t.text    :sensor_data               # raw hex payload
      t.timestamps
    end

    add_index :iot_events, :device_id
    add_index :iot_events, :key_tag
    add_index :iot_events, :created_at
  end
end
