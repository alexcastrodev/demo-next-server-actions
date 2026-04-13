#!/bin/sh
set -e

bundle exec rake db:migrate
bundle exec rake db:seed

exec bundle exec ruby app.rb -o 0.0.0.0 -p 4567
