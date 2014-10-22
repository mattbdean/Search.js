#Search.js

This project is split into two parts: A [library](https://github.com/thatJavaNerd/Search.js/blob/master/wordsearch.js) and a website.

##Library
####Sample Usage:
```javascript
var puzzle = [...] // List of strings, each string representing one row
var words = [...]   // List of words to find

var solutions = new Puzzle(puzzle).solve(words)
```
