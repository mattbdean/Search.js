/*jslint browser: true, devel: true, plusplus: true, indent: 4, maxlen: 120 */

var testing = {
    puzzle: ["APDSPSXTLGKMOCLOHOCLAZLT",
          "KLMXSOENZLNGASWSQJVFVEDE",
          "INOSLWOBPOLNJAQPFCK1KFHP",
          "NEICTNALIPAFTSSIGEEOILEQ",
          "BGKRHZYTCLQEYVXRYBERDDFR",
          "YAQWDOAECFRGQLNIGERQWLUW",
          "BWIENBNLMOHQUBTTHICTUTBB",
          "BEDIIQMEQUUTELNIGQFIAWHF",
          "WSALRFOMYNFOHMTAEYDLCEOR",
          "HRWSIAIOETDRCBTLVGTHOLWF",
          "SCLZVISNHAEBEEHRGMILDWES",
          "XHNVEHTAFIKAAPKMBNERVTYJ",
          "DNOERFUDENATFCYBOCBVKX0I",
          "LBEWRLREKHOHOXBGIVNAOTVM",
          "AOCSEDETSKSTGZCUGOPJOCFB",
          "KZOKERSXRESYEGJXYOZTRMCY"],
    words: ("ALCOHOL,FLUID,LEMONADE,SEWAGE,BATH,FOUNTAIN,LIBATION,SHOWER,BROOK,GEYSER,MILD,SOAKED,BROTH,GLOP,MIST,SOGGY,CANAL,GULT," +
           "MOISTURE,SOUP,COLA,HONEY,PERFUME,SPIRIT,CREEK,INLET,POOL,STOCK,DRENCH,IRRIGATE,RAIN,SWEAT,DRINK,JUICE,RIVER,WATER,FLOW," +
           "LAKE,SEAS,WET").split(','),
    init: function() {
        this.width = this.puzzle[0].length;
        this.height = this.puzzle.length;
        return this;
    },
    enabled: true
}.init();

// Same as net.dean.wordsearch.Direction
var directions = {
    NORTH: {incrementX: 0, incrementY: -1},
    NORTHEAST: {incrementX: 1, incrementY: -1},
    EAST: {incrementX: 1, incrementY: 0},
    SOUTHEAST: {incrementX: 1, incrementY: 1},
    SOUTH: {incrementX: 0, incrementY: 1},
    SOUTHWEST: {incrementX: -1, incrementY: 1},
    WEST: {incrementX: -1, incrementY: 0},
    NORTHWEST: {incrementX: -1, incrementY: -1}
};

function getCoordinate(x, y) {
    return $('.coordinate[data-x="{0}"][data-y="{1}"]'.format(x, y))
}

function showSolutions(solutions) {
    "use strict";
    var i, j, x, y, element, solution, direction;

    for (i = 0; i < solutions.length; i++) {
        solution = solutions[i];
        x = solution.x;
        y = solution.y;

        var wordArray = solution.word.split('');
        for (j = 0; j < wordArray.length; j++) {
            element = getCoordinate(x, y);

            if (!element.hasClass('solution')) {
                element.addClass('solution');
            }
            direction = directions[solution.dir];

            if (j != wordArray.length - 1) {
                x += direction.incrementX;
                y += direction.incrementY;
            }
        }

    }
}

$(function() {
    "use strict";
    var table = $('#puzzle-table'),
        width = testing.width,
        height = testing.height,
        tableHtml = '',
        i, j;

    // Generate the HTML table
    for (i = 0; i < height; i++) {
        tableHtml += '<tr>';
        for (j = 0; j < width; j++) {
            tableHtml += '<td>' +
                '<input class="coordinate" maxlength="1" type="text" data-x="{0}" data-y="{1}" />'.format(j, i) +
                '</td>'
        }
        tableHtml += '</tr>';
    }

    table.append(tableHtml);

    // Bind pressing a key on the inputs
    $('.coordinate').keypress(function(e) {
        
        console.log(e.keyCode);
        if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
            // Allowed characters (letters and numbers only)
            $.emulateTab();
            return true;
        } else {
            return false;
        }
    });
    
    $('#solve').click(function(e) {
        var inputs = $('.coordinate'), lines = new Array(height), words, x, y;
        
        // Collect all the data from the input grid and arrange it into an array of strings
        inputs.each(function(index, element) {
            e = $(element);
            x = e.data('x');
            y = e.data('y');
            
            if (lines[y] === undefined) {
                lines[y] = ""
            }
            lines[y] += $(element).val();
        });
        lines = lines.join(',');
        
        words = $('#words').val().replace(/ /g, ',');
        
        $.ajax('http://localhost:8080/solve', {
            data: {
                lines: lines.toUpperCase(),
                words: words.toUpperCase()
            }, dataType: 'json',
            type: 'POST',
            success: function(data, textStatus, jqXHR) {
                console.log(data);
                showSolutions(data.solutions);
            },
            error: function(jqXHR, textStatus, error) {
                console.log(textStatus);
            }
        });
    });
    
    // Fill in testing data
    if (testing.enabled) {
        // Insert the puzzle at the specific indicies
        for (var y = 0; y < testing.height; y++) {
            var line = testing.puzzle[y].split('');
            for (var x = 0; x < testing.width; x++) {
                // Look up the .coordinate input and assign the value
                getCoordinate(x, y).val(line[x]);
            }
        }
        // Insert the words
        $('#words').val(testing.words.join(' '));
    }
});


// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}
