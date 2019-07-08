build:
	@docker-compose up -d
# start all container
start:
	@docker start app_db app_storage app_api

clean:
	@docker rm app_storage app_db app_api -f

up: build
	@docker logs -f app_api
