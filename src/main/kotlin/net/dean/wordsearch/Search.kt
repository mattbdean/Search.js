package net.dean.wordsearch

import java.util.ArrayList
import org.apache.log4j.LogManager
import org.apache.log4j.Level
import java.util.NoSuchElementException

private val logger = LogManager.getLogger(javaClass<Puzzle>())

public class Puzzle(val lines: List<String>) {
    {
        lines.map { it.toUpperCase() }
        val lineLength = lines.get(0).length
        try {
            val wrongLength = lines.first { it.length != lineLength }
            val index = lines.indexOf(wrongLength)
            throw IllegalArgumentException("Length of all lines not equal: Line $index: \"$wrongLength\"" +
                    " (expected $lineLength, got ${wrongLength.size})")
        } catch (e: NoSuchElementException) {
            // all good
        }
    }

    private val limitX: Int = lines.get(0).length - 1
    private val limitY: Int = lines.size - 1

    fun get(x: Int, y: Int): Char {
        return lines.get(y).charAt(x)
    }

    fun has(x: Int, y: Int): Boolean {
        return x in 0..limitX && y in 0..limitY
    }

    fun solve(words: List<String>) : List<Solution> {
        val solutions = ArrayList<Solution>(words.size)
        words.map { it.toUpperCase() }

        for (word in words) {
            // Scan left to right starting at the top left (0,0)
            for (y in 0..limitY) {
                for (x in 0..limitX) {
//                    logger.debug("Searching for \"$word\" at ($x,$y): '${get(x, y)}'")
                    for (dir in Direction.values()) {
                        var newX = x
                        var newY = y
                        var counter = 0
                        var findStr = ""
                        while (has(newX, newY) && !findStr.contentEquals(word) && get(newX, newY) == word.charAt(counter)) {
                            val c = get(newX, newY)
//                            logger.debug("Looking $dir: ($newX,$newY): '$c'")

                            newX += dir.incrementX
                            newY += dir.incrementY
                            counter++
                            findStr += c
                        }

                        if (findStr.contentEquals(word)) {
                            val s = Solution(word, dir, x, y)
                            logger.info("Found solution: $s")
                            solutions.add(s)
                        }
                    }
                }
            }
        }
        return solutions
    }
}

public data class Solution(val word: String, val dir: Direction, val x: Int, val y: Int)

public enum class Direction(val incrementX: Int, val incrementY: Int) {
    NORTH: Direction(0, -1)
    NORTHEAST: Direction(1, -1)
    EAST: Direction(1, 0)
    SOUTHEAST: Direction(1, 1)
    SOUTH: Direction(0, 1)
    SOUTHWEST: Direction(-1, 1)
    WEST: Direction(-1, 0)
    NORTHWEST: Direction(-1, -1)
}
