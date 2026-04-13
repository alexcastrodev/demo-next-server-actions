require 'active_record'
require 'yaml'
require 'erb'

env = ENV.fetch('RACK_ENV', 'development')

db_config = YAML.safe_load(
  ERB.new(File.read(File.join(__dir__, 'database.yml'))).result,
  permitted_classes: [],
  aliases: true
)

ActiveRecord::Base.establish_connection(db_config[env])

require_relative '../models/user'
require_relative '../models/iot_event'
