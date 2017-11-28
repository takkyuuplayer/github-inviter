.PHONY: test node_modules node_modules/upgrade

setup: node_modules node_modules/upgrade

test:
	yarn run test

node_modules:
	yarn install

node_modules/upgrade:
	yarn upgrade --latest
