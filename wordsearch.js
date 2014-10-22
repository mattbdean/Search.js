
function Puzzle(lines) {
    this.lines = lines;
    this.limitX = lines[0].length - 1;
    this.limitY = lines.length - 1;

    this.get = function(x, y) {
        return lines[y].charAt(x);
    };

    this.has = function(x, y) {
        return 0 <= x && x <= this.limitX && 0 <= y && y <= this.limitY;
    };

    this.solve = function(words) {
        var solutions = new Array(words.length);

        // Solve the wordsearch
        for (var i = 0; i < solutions.length; i++) {
            var word = words[i];
            for (var y = 0; y < this.limitY; y++) {
                for (var x = 0; x < this.limitX; x++) {
                    for (var dir in DIRECTION) {
                        var newX = x, newY = y, counter = 0, findStr = "";

                        while (this.has(newX, newY) && !(findStr == word) && this.get(newX, newY) == word.charAt(counter)) {
                            var c = this.get(newX, newY);
                            newX += DIRECTION[dir].incrementX;
                            newY += DIRECTION[dir].incrementY;
                            counter++;
                            findStr += c;
                        }

                        if (findStr == word) {
                            solutions[i] = new Solution(word)
                            solutions[i].find(x, y, dir);
                        }
                    }
                }
            }
        }
        
        // Find the words that haven't been found
        for (var i = 0; i < solutions.length; i++) {
            var solution = solutions[i];
            if (solution === undefined) {
            	// Not found
                solutions[i] = new Solution(words[i]); // We can do this because the order of the solutions and words are the same
            }
        }

        return solutions;
    }
}

function Solution(word) {
    this.word = word;
    this.found = false;
    
    this.find = function(x, y, dir) {
        this.found = true;
        this.dir = dir;
        this.x = x;
        this.y = y;
    }
}

function Direction(incrementX, incrementY) {
    this.incrementX = incrementX;
    this.incrementY = incrementY;
}

var DIRECTION = {
    NORTH: new Direction(0, -1),
    NORTHEAST: new Direction(1, -1),
    EAST: new Direction(1, 0),
    SOUTHEAST: new Direction(1, 1),
    SOUTH: new Direction(0, 1),
    SOUTHWEST: new Direction(-1, 1),
    WEST: new Direction(-1, 0),
    NORTHWEST: new Direction(-1, -1)
};
