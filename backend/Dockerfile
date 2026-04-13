FROM ruby:3.3-slim

RUN apt-get update -qq && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock* ./
RUN bundle install --without test

COPY . .

RUN mkdir -p db && chmod +x entrypoint.sh

EXPOSE 4567

ENTRYPOINT ["./entrypoint.sh"]
