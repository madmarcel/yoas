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

function main() {

    // this function is one of the loading blocks I am going to pass into the LoadingMode constructor.
    // I have written the other blocks in-line
    var loadTitle = function() {
	// gs.loadMode(new TitleMode(gs),'title');
	gs.loadMode(new PlayMode(gs), 'play');
    };
    
    var gs = new GameState(800,640,60);		// creates a game at 800x600 pixels running at 60 fps
    
    if (gs.init('game_container')) {		// places the game inside of a DOM element with id='game_container' (in index.html)
	gs.loadMode(new LoadingMode([
	    [
		function() {
		    // FILL THIS IN
		},'Loading...'
	    ],
	    [
		loadTitle,'Loading Title Screen...'
	    ],	    
	    [		
		function() {
		    // gs.setMode('title');
		    gs.setMode('play');
		},'Starting Game...'
	    ]
	],gs),'load');
	gs.setMode('load');
	gs.start();
    }
    else {
	//this line contains the error message for HTML5 incompatibility, and also removes the tag from the main page which contains the javascript incompatibility error.
	container.innerHTML='It looks like your browser doesn\'t support HTML5. Please upgrade to a modern browser, such as the latest versions of <a href="https://www.google.com/chrome">Google Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Mozilla Firefox</a>.';
    }
}
