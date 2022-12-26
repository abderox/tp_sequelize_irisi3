build-dev:
	cd service && ${MAKE} build
	cd ui && ${MAKE} build

run-dev:
	docker-compose up -d 

build-local:
	cd service && ${MAKE} build
	cd ui && ${MAKE} build-local

run-local:
	docker-compose -f docker-compose-production.yml up -d

