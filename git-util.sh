#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <branch-name>"
    exit 1
fi

BRANCH_NAME=$1

COMMIT_MESSAGE=$(echo "$BRANCH_NAME" | sed 's/-/ /g')

git checkout -b "$BRANCH_NAME"

git add -A

git commit -m "$COMMIT_MESSAGE"

git push origin "$BRANCH_NAME"