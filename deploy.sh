#!/bin/bash

set -e
shopt -s extglob

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

grunt # Build the website
cp "build/" -r .. # Move the build dir to safety
git checkout gh-pages
rm !(.git*|.|..) -rf # Remove all but .git, the current and parent dirs
mv ../build/* ./ # Move the contents of the build dir here
rm -r ../build/ # ... and then remove it
git add . 
git commit -m "Update gh-pages"
git push
git checkout master

