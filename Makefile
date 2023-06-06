.PHONY: docker-build-all
docker-build-all:
	docker build -t api-auth:v1 ./authentication

.PHONY: docker-run-all
docker-run-all:
	docker run -d \
		--name db \
		--network my-network \
		-e POSTGRES_PASSWORD=foobarbaz \
		-v pgdata:/var/lib/postgresql/data \
		-p 5432:5432 \
		--restart unless-stopped \
		postgres:15.1-alpine

	docker run -d \
		--name auth \
		--network my-network \
		-e POSTGRES_PASSWORD=foobarbaz \
		-e DB_HOST=db \
		-e DB_PORT=5432 \
		-e DB_USER=postgres \
		-e DB_PASSWORD=foobarbaz \
		-e DB_NAME=blogx \
		-e PORT=8080 \
		-e JWT_SECRET_KEY=foobarbaz \
		-e BCRYPT_SALT_VALUE=12 \
		-e DB_URL="postgres://postgres:foobarbaz@db:5432/blogx?sslmode=disable" \
		-p 8080:8080 \
		--restart unless-stopped \
		--link db \
		api-auth:v1

	docker run -d \
	--name blog \
	--network my-network \
	-e POSTGRES_PASSWORD=foobarbaz \
	-e DB_HOST=db \
	-e DB_PORT=5432 \
	-e DB_USER=postgres \
	-e DB_PASSWORD=foobarbaz \
	-e DB_NAME=blogx \
	-e PORT=8081 \
	-e JWT_SECRET_KEY=foobarbaz \
	-e BCRYPT_SALT_VALUE=12 \
	-e DB_URL="postgres://postgres:foobarbaz@db:5432/blogx?sslmode=disable" \
	-p 8081:8081 \
	--restart unless-stopped \
	--link db \
	api-blog:v1

.PHONY: docker-stop-all
docker-stop-all:
	docker stop db 
	docker stop auth
	docker stop blog

.PHONY: docker-rm-all
docker-rm-all:
	docker rm auth
	docker rm db 
	docker rm blog