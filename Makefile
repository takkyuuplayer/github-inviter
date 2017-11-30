.PHONY: test node_modules node_modules/upgrade cache

setup: node_modules node_modules/upgrade cache

cache:
	mkdir -p cache/
	curl https://api.github.com/ > ./cache/github.json
	curl -H "Authorization: token ${GH_PERSONAL_TOKEN}" https://api.github.com/user > ./cache/admin.json
	$$(npm bin)/babel-node ./bin/fetchTeamInfo.js > ./cache/teams.json

test:
	yarn run test

node_modules:
	yarn install

node_modules/upgrade:
	yarn upgrade --latest
