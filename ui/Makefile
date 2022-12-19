build:
	docker build -t abderoxdocker/bookery-front --no-cache . 
build-local:
	docker build  \
	  -t abderoxdocker/bookery-front-prod:local \
	  --build-arg BASE_URL=http://localhost:8085 \ 
	  -f Dockerfile.production .

build-prod:
	docker build -t abderoxdocker/bookery-front-prod:prod -f Dockerfile.prod .
