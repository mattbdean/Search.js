#!/bin/bash

set -e
shopt -s extglob

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

OUT="build"

rm -rf $OUT/
grunt # Build the website
cp -r lib/* $OUT/ # Move the libs to the output dir
cp "$OUT/" -r .. # Move the out dir to safety
git checkout gh-pages
rm !(.git*|.|..) -rf # Remove all but .git, the current and parent dirs
mv ../$OUT/* ./ # Move the contents of the output dir here
rm -r ../$OUT/ # ... and then remove it
git add . 
git commit -m "Update gh-pages"
git push
git checkout master

