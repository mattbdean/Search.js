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
          "DNOERFUDENATFCYBOCBVKXOI",
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

function Color(red, green, blue) {
    this.red = parseInt(red);
    this.green = parseInt(green);
    this.blue = parseInt(blue);

    this.asCssRgb = function() {
        return 'rgb({0},{1},{2})'.format(red, green, blue);
    };
    this.asDataRgb = function() {
        return '{0}|{1}|{2}'.format(red, green, blue);
    };
}

/**
 * The maximum number in an RGB value (255)
 * @type {number}
 */
var rgbMax = 255;

/**
 * Overlays one channel on top of the other. Algorithm taken from https://en.wikipedia.org/wiki/Blend_modes#Overlay.
 * @param base The RGB value (0-255) of a single channel the base layer
 * @param top The RGB value (0-255) of the same channel on the top layer
 * @returns {number} The new value of the channel after the two have been blended.
 */
function overlay(base, top) {
    var decimal,
        a = base / rgbMax,
        b = top / rgbMax;

    if (a < 0.5) {
        decimal = 2 * a * b;
    } else {
        decimal = 1 - (2 * (1 - a) * (1 - b));
    }
    var rgb = decimal * 255;

    return Math.floor(rgb); // Convert the denominator 255 for RGB channel
}

/**
 * Overlays two colors
 * @param colorA The base layer
 * @param colorB The top layer
 * @returns {Color} A new color blended using the "overlay" method (https://en.wikipedia.org/wiki/Blend_modes#Overlay)
 */
function blendOverlay(colorA, colorB) {
    var r = overlay(colorA.red, colorB.red),
        g = overlay(colorA.green, colorB.green),
        b = overlay(colorA.blue, colorB.blue);
    return new Color(r, g, b);
}

/**
 * Generates a number in the range [0,x)
 * @param max The upper bound, exclusive
 * @returns {number} An integer between 0 (inclusive) and x (exclusive)
 */
function random(max) {
    return Math.floor(Math.random() * max);
}

/**
 * The color that will be used to generate random colors in getRandomColor()
 * @type {Color}
 */
var seed = new Color(255, 255, 255);

function getRandomColor() {
    "use strict";
    var red, green, blue;
    red = Math.floor((random(256) + seed.red) / 2);
    green = Math.floor((random(256) + seed.green) / 2);
    blue = Math.floor((random(256) + seed.blue) / 2);

    return new Color(red, green, blue);
}

/**
 * Gets an input on the grid whose 'data-x' attribute is x and 'data-y' attribute is y.
 * @param x The x coordinate
 * @param y The y coordinate
 * @returns {*|jQuery|HTMLElement}
 */
function getCoordinate(x, y) {
    return $('.coordinate[data-x="{0}"][data-y="{1}"]'.format(x, y))
}

/**
 * Highlights the solutions on the grid
 * @param solutions An array of solutions
 */
function showSolutions(solutions) {
    "use strict";
    var i, j, x, y, element, solution, direction, color, wordArray, colors;

    $('#puzzle-table').find('td > input').each(function() {
        $(this).prop('disabled', true);
        $(this).addClass('done');
    });

    for (i = 0; i < solutions.length; i++) {
        color = getRandomColor();
        solution = solutions[i];
        if (!solution.found) {
            continue;
        }
        x = solution.x;
        y = solution.y;

        wordArray = solution.word.split('');
        for (j = 0; j < wordArray.length; j++) {
            element = getCoordinate(x, y);

            if (element.data('colors')) {
                colors = element.data('colors') + ',';
            } else {
                colors = "";
            }

            colors += color.asDataRgb();

            element.addClass('used');
            element.attr('data-colors', colors);
            direction = DIRECTION[solution.dir];

            if (j != wordArray.length - 1) {
                x += direction.incrementX;
                y += direction.incrementY;
            }
        }
    }

    $('input[data-colors]').each(function() {
        var dataColors = $(this).attr('data-colors').split(',');
        var color = undefined;
        for (var i = 0; i < dataColors.length; i++) {
            var rgb = dataColors[i].split('|');
            var newColor = new Color(rgb[0], rgb[1], rgb[2]);
            if (color === undefined) {
                color = newColor;
            } else {
                color = blendOverlay(color, newColor);
            }
        }
        $(this).css('background-color', color.asCssRgb());
    });
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
            lines[y] += $(element).val().toUpperCase();
        });

        words = $('#words').val().replace(/ /g, ',').toUpperCase().split(',');
        
        showSolutions(new Puzzle(lines).solve(words));
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


// String.format from http://stackoverflow.com/a/4673436
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}
