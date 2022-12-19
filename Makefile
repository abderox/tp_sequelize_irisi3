build-dev:
	cd service && ${MAKE} build
	cd ui && ${MAKE} build

run-dev:
	docker-compose up -d 

build-local:
	cd ui && ${MAKE} build-local
	cd service && ${MAKE} build

run-local:
	docker-compose up -d