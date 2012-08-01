/*
 * Ye Olde Adventure Shoppe (http://github.com/madmarcel/yoas)
 * Copyright (C) 2012 Marcel van de Steeg 
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *  
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


var titles = ["[important person] calls for [called item]", 
	      "[vampire] confesses: [confession]", 
	      "[person] finds true love, marries [married somebody]",
	      "[unpleasant group] spotted near [someplace]",
	      "[unpleasant group] [unpleasant verb] [someplace2]",
	      "[person] wins [winning event]",
	      "[person] claims: I [verb1] [sighting]",
	      "[person] swallows [odd thing]",
	      "[person] banned from [someplace3]",
	      "[entity] inundated with [unwanted things]",
	      "[lazy title]",
	      "[event] [location]",
	      "[stuff] thrown from [location2]",
	      "[person] caught in row over [row thing]",
	      "[discovered thing] found [discovered place] by [person]",
	      "[important fashion person] creates stir with striking [colour] [outfit]",
	      "Giant [giant thing] wins prize",
	      "[eating thing] eats [person2] [outfit]",
	      "[season] festival cancelled"
	     ];

var titlesmap = new Map;

 titlesmap
    .put("[important person]", [ "King", "Prince", "Baron", "Major", "Queen", "Duchess", "Count", "Countess", "Baroness", "Dame", "Archduchess" ] )
    .put("[called item]", [ "change", "action", "new underpants", "law review", "calm", "sacking", "patience" ] )
    .put("[vampire]", [ "Dracula", "Count von Blutwald", "Vampire", "Herr von Drak" ] )
    .put("[confession]", [ "I ate zem all", "Ve do not sparkle", "I vould rather vear ze pink clothes", "I'm on ze vegan diet", "Ze teeth are fake", "I vear ze sunscreen", "I like ze garlic" ] )
    .put("[person]", [ "Farmer", "Guard", "Bard", "Knight", "Mage", "Thief", "Sorceress", "Wizard", "Maiden", "Constable", "Plucky youth", "Drunk", "Jester", "Hero", "Sage", "Barmaid", "Farmhand", "Bawdy bard", "Cleric", "Governess", "Nanny", "Granny", "Druid", "Dwarf", "Elf" ] )
    .put("[married somebody]", [ "childhood sweetheart", "horse", "chicken", "neighbour", "frog" ] )
    .put("[unpleasant group]", [ "Thugs", "Goblins", "Orcs", "Faeries", "Bandits", "Jarreks gang", "Giants", "Flying pigs" ] )
    .put("[unpleasant verb]", [ "vandalize", "rob", "plunder", "destroy", "burn down", "pillage" ] ) 
    .put("[someplace]", [ "famed spring", "graveyard", "local farm", "ruined church", "abandoned mine", "ancient statue", "river", "mountain pass" ] )
    .put("[someplace2]", [ "bank", "local farm", "church", "art gallery", "sacred shrine", "farming village" ] )
    .put("[someplace3]", [ "tavern", "bank", "church", "competition", "shops", "village", "farm" ] )
    .put("[someplace4]", [ "in wine barrel", "in pond", "in pig sty", "under table", "picking flowers", "in castle moat" ] )
    .put("[someplace5]", [ "palace", "castle", "village", "estate", "farm", "church", "city" ] )
    .put("[winning event]", [ "prize", "competition", "local raffle", "bingo", "dance contest", "pickle eating contest", "camel race", "enormous crocodile", "beer drinking contest" ] )
    .put("[sighting]", [ "a flying pig", "a shadow person", "an enormous black bat", "his underpants", "a purple weasel", "a dragon", "a striped horse", "a pink elephant", "a giant fish", "a time traveler", "a purple people eater" ] )
    .put("[odd thing]", [ "rare frog", "expensive ring", "elbows", "left shoe", "magic gem", "coin", "vital evidence" ] )
    .put("[overwhelmed]", [ "help", "donations", "support" ] )
    .put("[unwanted things]", [ "carrots", "bunnies", "kittens", "sausages", "hay", "letters", "ponies" ] )
    .put("[entity]", [ "Church", "Village", "Town hall", "Council" ] )
    .put("[lazy title]", [ "Mysterious dissappearance", "Lost item recovered", "Catch of the day", "Local play dissappoints", "Road closed", "Pass blocked" ] )
    .put("[event]", [ "Magical mishap", "Violent brawl", "Drunken orgy", "Accident", "Scandal" ] )
    .put("[location]", [ "in church", "in marketplace", "on quay", "on fishing boat", "at council meeting", "behind tavern", "at palace", "in royal stables", "disrupts courtcase" ] )
    .put("[stuff]", [ "Wine barrels", "Bodies", "Pumpkins", "Cats", "Old boot", "Chamber pot" ] )
    .put("[location2]", [ "roof", "cart", "turret", "bridge", "tower", "window" ] )
    .put("[row thing]", [ "council purchase", "dragon", "chamberpot", "orgy", "ox", "fowl", "dumplings", "'love letter'", "tavern meeting", "leaked plans", "local girl", "graveyard" ] ) 
    .put("[scandalous event]", [ "scandal", "upset", "love tryst", "brawl" ] )
    .put("[important place]", [ "the royal castle", "royal gala", "royal wedding", "castle", "gala", "wedding" ] )
    .put("[kissed thing]", [ "frog", "serving girl", "horse", "gnome", "visiting dignitary", "chicken", "monkey" ] )
    .put("[lost thing]", [ "relic", "sheep", "treasure", "ring", "costumes" ] )
    .put("[bad event]", [ "in barn fire", "in church fire", "in house fire", "after tavern brawl", "in autumn storm" ] )
    .put("[monster]", [ "dragon", "giant", "giant bunny", "purple oyster" ] )
    .put("[verb1]", [ "saw", "was", "am" ] )
    .put("[discovered thing]", [ "Strange item", "Glowing stone", "Deep hole", "Missing cat", "Missing pig" ] )
    .put("[discovered place]", [ "", "behind tavern", "in graveyard", "in ditch", "beside river", "under bridge" ] )
    .put("[colour]", [ "red", "green", "black", "blue", "rainbow", "purple", "polka-dot", "striped" ] )
    .put("[outfit]", [ "pettycoat", "outfit", "pants", "apron", "dress", "jacket", "hat", "socks", "skirt", "gloves", "belt", "underpants" ] )
    .put("[important fashion person]", [ "Queen", "Princess", "Lady Stormwater", "Priestess", "Duchess", "Countess", "Baroness", "Dame", "Archduchess" ] )
    .put("[giant thing]", [ "chicken", "potato", "carrot", "pig", "cabbage", "pumpkin", "oyster", "badger", "mushroom", "leek", "rabbit", "turnip", "parsnip" ] )
    .put("[eating thing]", [ "Pig", "Giant", "Goat", "Pony", "Giant Oyster", "Troll", "Horse", "Bull" ] )
    .put("[person2]", [ "kings", "princes", "barons", "majors", "queens", "duchess'", "counts", "countess'", "baroness'", "dames", "archduchess'", "farmers", "knights", "maids" ] )
    .put("[season]", [ "Autumn", "Winter", "Summer", "Spring", "Carrot", "Cabbage", "Beetroot", "Potato" ] )    
;

/* ugh, arrays in arrays in arrays */
var headlines = [ [ "[person] overwhelmed with [overwhelmed]", [ "Begs supporters: \"No more [unwanted things]\"", "Flees district", "Thanks community" ] ],
		  [ "[scandalous event] at [important place]", [ "[person] kisses [kissed thing]", "[important person] found drunk [someplace4]" ] ],
		  [ "[lost thing] lost [bad event]", [ "Community rallies", "[person] implicated", "[person] is prime suspect" ] ],
		  [ "[monster] attacks [someplace5]", [ "[person] wounded", "Locals flee", "Area deserted" ] ],
		  [ "[person] accuses [important person]", [ "\"You are corrupt!\"", "\"You lied!\"", "\"You are an imposter!\"", "\"I will see you in court!\"" ] ],
		  [ "[important person] reveals all", [ "\"I did it!\"", "\"It wasn't me!\"", "\"They lied!\"", "\"He was my lover!\"", "\"She betrayed me!\"", "\"I would do it again!\"", "\"I took the bribes!\"" ] ],
		];


