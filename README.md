# github-inviter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/takkyuuplayer/github-inviter.svg?branch=master)](https://travis-ci.org/takkyuuplayer/github-inviter)

Invite users to your organizations/teams.

## Demo

Join [tp-organization/github-inviter](https://github-inviter.herokuapp.com/auth/token?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOjI0OTMxNjYsImlhdCI6MTUxNjE2MzY0NX0.-W46qeVdfo2WQYZFpbQZDFKBRdce1tJ0Jv3y8-Pwypc)

## How to deploy

1. Generate [Personal Access Tokens](https://github.com/settings/tokens) with `admin:org` and `user:email` scope.

1. Create a new [OAuth App](https://github.com/settings/developers)

    |  Configuration | Value |
    |  ------ | ------ |
    |  Homepage URL | https://${HEROKU_APP_NAME}.herokuapp.com/ |
    |  Authorization callback URL | https://${HEROKU_APP_NAME}.herokuapp.com/auth/github/callback |

1. [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

1. Login to the deployed app with your github account.

1. Generate an invitation link.

1. Share the link to users

## FAQ

### Q. How to expire the already issued invitation links?

Deploy again.

## Author

@takkyuuplayer
