#Search.kt [![Travis-CI build status](https://travis-ci.org/thatJavaNerd/Search.kt.svg?branch=master)](https://travis-ci.org/thatJavaNerd/Search.kt)

This project is split into two parts: A library and a website.

##Library
####Sample Usage:
```kotlin
val puzzle = listOf(...) // List of strings, each string representing one row
val words = listOf(...)  // List of words to find

val solutions = Puzzle(puzzle).solve(words)

solutions.forEach { println(it) }
```

#####Output:
```
Solution(word=PENNY, dir=NORTH, x=1, y=15)
Solution(word=NICKEL, dir=SOUTHWEST, x=22, y=4)
Solution(word=DIME, dir=NORTHEAST, x=7, y=6)
...
```

##Website

The website is split into two parts: The API and the client.

The API is relatively simple, consisting of only one endpoint.

| Method | URI | Explanation |
| :----: | --- | ----------- |
| `POST` | `/solve` | Solves a puzzle. Takes a comma-separated list of the lines of the puzzle and a comma separated list of words to find in the post data. Note: Case does not matter, the lines of the puzzle and the words to find are converted to upper case before solving. Example with cURL: `curl --data "lines=FOCLWOFKSLADK,VOAKFJDIWOSL,DLSEIZLFKOWLX{,...}&words=penny,nickel,dime{,...}" http://localhost:8080/solve` |

The website (found [here](https://github.com/thatJavaNerd/Search.kt/tree/master/src/main/webapp)) uses the API to graphically represent the solutions to the puzzle.

##Running

For unit tests, run `./gradlew test`. To start the website, run `./gradlew bootRun` and then navigate to [http://localhost:8080](http://localhost:8080).
