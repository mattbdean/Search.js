package net.dean.wordsearch.server

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RequestParam
import net.dean.wordsearch.Solution
import net.dean.wordsearch.Puzzle
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.http.HttpStatus

Controller
public class ApiController {

    RequestMapping(value = array("/solve"), method=array(RequestMethod.POST))
    ResponseBody
    public fun index([RequestParam(value = "lines", required = true)] lineStr: String,
                     [RequestParam(value = "words", required = true)] wordStr: String): SolutionResponse {
        val lines = lineStr.split(',').toList()
        val words = wordStr.split(',').toList()
        val solutions: List<Solution>
        try {
            solutions = Puzzle(lines).solve(words)
        } catch (e: IllegalArgumentException) {
            throw InvalidLineLength(e.getMessage())
        }

        return SolutionResponse(solutions)
    }

    internal data class SolutionResponse(val solutions: List<Solution>)

    [ResponseStatus(value=HttpStatus.BAD_REQUEST, reason="Invalid line length")]
    internal class InvalidLineLength(msg: String?) : Exception(msg)
}
