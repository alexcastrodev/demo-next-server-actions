class IotEvent < ActiveRecord::Base
  validates :key_tag,   presence: true
  validates :device_id, presence: true

  scope :recent, -> { order(created_at: :desc) }
  scope :by_device, ->(id) { where(device_id: id) }
end
