export interface LoggerEvent {
  id: number;
  key_tag: string;
  device_id: string;
  key_ncy: number | null;
  key_ph: number | null;
  key_mtu: number | null;
  key_tur: number | null;
  key_cnd: number | null;
  key_tmp: number | null;
  key_ntu: number | null;
  key_vbat: number | null;
  key_nsat: number | null;
  key_rssi: number | null;
  sensor_data: string | null;
  created_at: string;
  updated_at: string;
}
