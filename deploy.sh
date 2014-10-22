#!/bin/sh

grunt && git subtree push --prefix "build/" gh-pages origin
