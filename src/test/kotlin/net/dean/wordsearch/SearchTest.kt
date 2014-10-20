package net.dean.wordsearch

import org.junit.Test as test
import java.io.File
import java.nio.charset.StandardCharsets
import java.util.ArrayList
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import org.apache.log4j.LogManager

public class SearchTest {
    private val logger = LogManager.getLogger(javaClass<SearchTest>())

    public test fun testPuzzle1() {
        test(1)
    }

    public test fun testPuzzle2() {
        test(2);
    }

    private fun test(id: Int) {
        val puzzle = load("/puzzle$id.txt")

        val expected = puzzle.solutions
        val startTime = System.currentTimeMillis()
        val actual = Puzzle(puzzle.lines).solve(puzzle.words)
        val stopTime = System.currentTimeMillis() - startTime

        assertEquals(expected.size, actual.size)
        for (sol in actual) {
            assertTrue(sol in expected)
        }

        logger.info("Completed puzzle$id.txt in $stopTime milliseconds")
    }

    private fun load(file: String): TestPuzzle {
        val puzzleFile = File(javaClass.getResource(file).toURI())

        val fileLines = puzzleFile.readLines(StandardCharsets.UTF_8)
        val lines = ArrayList<String>()
        val words = ArrayList<String>()
        val solutions = ArrayList<Solution>()

        var mode = "lines"

        for (l in fileLines) {
            var line = l
            line = line.trim()
            if (line.startsWith("#")) continue

            if (line.isEmpty()) {
                if (mode == "lines") {
                    mode = "words"
                    continue
                } else if (mode == "words") {
                    mode = "solutions"
                    continue
                } else if (mode == "solutions") {
                    break
                }
            }

            if (mode == "lines") {
                lines.add(line)
            } else if (mode == "words") {
                words.addAll(line.split(' '))
            } else if (mode == "solutions") {
                val parts = line.split(',')
                solutions.add(Solution(parts[0], Direction.valueOf(parts[1].toUpperCase()), parts[2].toInt(), parts[3].toInt()))
            } else if (mode == "done") {
                break
            }

        }

        return TestPuzzle(lines, words, solutions)
    }
}

internal data class TestPuzzle(val lines: List<String>, val words: List<String>, val solutions: List<Solution>)

