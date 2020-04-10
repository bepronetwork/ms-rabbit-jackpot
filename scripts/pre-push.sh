#!/bin/bash

set -e

if [ $(git rev-parse --abbrev-ref HEAD) = master ];
then
	sudo npm i docsify-cli@4.4.0 -g
    npm run run-doc
    date > docs/time.tm
    git add .
    git commit -am 'update document'
fi
