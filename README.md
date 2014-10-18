#Search.kt [![travis-ci build status](https://travis-ci.org/thatJavaNerd/Search.kt.svg?branch=master)](https://travis-ci.org/thatJavaNerd/Search.kt)

Word search solver in Kotlin

####Sample Usage:

```kotlin
val puzzle = listOf(...) // List of strings, each string representing one row
val words = listOf(...) // List of words to find

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
