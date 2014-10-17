package net.dean.wordsearch

import org.junit.Test as test
import net.dean.wordsearch.Direction.*
import java.util.NoSuchElementException
import kotlin.test.fail
import kotlin.test.assertTrue

public class SearchTest {

    public test fun testSolutionsCorrect() {
        val expected = arrayListOf(
                Solution(word="ALCOHOL", dir=WEST, x=20, y=0),
                Solution(word="BATH", dir=SOUTH, x=11, y=10),
                Solution(word="BROOK", dir=NORTH, x=20, y=16),
                Solution(word="BROTH", dir=WEST, x=16, y=17),
                Solution(word="CANAL", dir=SOUTHWEST, x=13, y=0),
                Solution(word="COLA", dir=NORTHWEST, x=3, y=3),
                Solution(word="CREEK", dir=NORTH, x=18, y=6),
                Solution(word="DRENCH", dir=NORTHWEST, x=5, y=14),
                Solution(word="DRINK", dir=NORTHWEST, x=4, y=5),
                Solution(word="FLUID", dir=SOUTHWEST, x=22, y=4),
                Solution(word="FLOW", dir=SOUTHEAST, x=18, y=7),
                Solution(word="FOUNTAIN", dir=SOUTH, x=9, y=5),
                Solution(word="GEYSER", dir=WEST, x=13, y=15),
                Solution(word="GLOP", dir=SOUTH, x=9, y=0),
                Solution(word="GULT", dir=SOUTHEAST, x=11, y=5),
                Solution(word="HONEY", dir=SOUTHEAST, x=4, y=4),
                Solution(word="INLET", dir=WEST, x=15, y=7),
                Solution(word="IRRIGATE", dir=SOUTHWEST, x=20, y=3),
                Solution(word="JUICE", dir=NORTHEAST, x=14, y=15),
                Solution(word="LAKE", dir=SOUTH, x=0, y=13),
                Solution(word="LEMONADE", dir=SOUTH, x=7, y=6),
                Solution(word="LIBATION", dir=NORTHEAST, x=3, y=8),
                Solution(word="MILD", dir=EAST, x=17, y=10),
                Solution(word="MIST", dir=NORTHEAST, x=4, y=17),
                Solution(word="MOISTURE", dir=SOUTH, x=6, y=7),
                Solution(word="PERFUME", dir=NORTHWEST, x=13, y=11),
                Solution(word="POOL", dir=SOUTHEAST, x=4, y=0),
                Solution(word="RAIN", dir=NORTHEAST, x=1, y=9),
                Solution(word="RIVER", dir=SOUTH, x=4, y=8),
                Solution(word="SEAS", dir=SOUTHEAST, x=8, y=14),
                Solution(word="SEWAGE", dir=NORTH, x=1, y=8),
                Solution(word="SHOWER", dir=SOUTHEAST, x=0, y=10),
                Solution(word="SOAKED", dir=NORTH, x=10, y=14),
                Solution(word="SOGGY", dir=NORTHWEST, x=18, y=16),
                Solution(word="SOUP", dir=SOUTHWEST, x=3, y=14),
                Solution(word="SPIRIT", dir=SOUTH, x=15, y=1),
                Solution(word="STOCK", dir=NORTHEAST, x=10, y=15),
                Solution(word="SWEAT", dir=NORTHWEST, x=23, y=10),
                Solution(word="WATER", dir=SOUTHWEST, x=14, y=1),
                Solution(word="WET", dir=NORTHEAST, x=5, y=2)
        )

        val puzzle = """APDSPSXTLGKMOCLOHOCLAZLT
KLMXSOENZLNGASWSQJVFVEDE
INOSLWOBPOLNJAQPFCK1KFHP
NEICTNALIPAFTSSIGEEOILEQ
BGKRHZYTCLQEYVXRYBERDDFR
YAQWDOAECFRGQLNIGERQWLUW
BWIENBNLMOHQUBTTHICTUTBB
BEDIIQMEQUUTELNIGQFIAWHF
WSALRFOMYNFOHMTAEYDLCEOR
HRWSIAIOETDRCBTLVGTHOLWF
SCLZVISNHAEBEEHRGMILDWES
XHNVEHTAFIKAAPKMBNERVTYJ
DNOERFUDENATFCYBOCBVKX0I
LBEWRLREKHOHOXBGIVNAOTVM
AOCSEDETSKSTGZCUGOPJOCFB
KZOKERSXRESYEGJXYOZTRMCY
EUYAMIAPWBAYHHNKNKSIBAJA
PRSFMCXPGSDSHTORBHXXQAMO
""".split('\n').toList()

        val words = """ALCOHOL FLUID LEMONADE SEWAGE BATH FOUNTAIN LIBATION SHOWER BROOK GEYSER MILD SOAKED BROTH GLOP MIST
SOGGY CANAL GULT MOISTURE SOUP COLA HONEY PERFUME SPIRIT CREEK INLET POOL STOCK DRENCH IRRIGATE RAIN SWEAT DRINK JUICE
RIVER WATER FLOW LAKE SEAS WET""".replace('\n', ' ').split(' ').toArrayList()

        val actual = Puzzle(puzzle).solve(words)

        for (sol in actual) {
            assertTrue(sol in expected)
        }
    }
}

