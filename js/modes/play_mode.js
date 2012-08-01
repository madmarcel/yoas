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

function PlayMode(gs) {
	
	var world = new World(gs);
	
	this.init = function() {
		gs.unloadMode('load');
		gs.setScreen(playScreen);
		gs.clearCollisionMap();
		
		
		world.init();
	};
	
	function playScreen() {
		// console.log("playscreen");
		if( world )
		{
			world.update();

			world.draw();
		}
	}
	
	function pauseScreen() {
		if( world )
		{
			world.draw();
		}
	}

	function loseScreen() {
	}
}
