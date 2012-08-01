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

function LoadingMode(loadingFunctions,gs) {
	halt = 0;
	var frameCount = 0;

	gs.ctx.textAlign="center";
	gs.ctx.font="30px sans-serif";
	gs.ctx.fillStyle="rgb(255,255,255)";

	this.init = function() {
		gs.setScreen(loadScreen);
	};

	function loadScreen() {
		if (!halt)
		{
			if (frameCount && frameCount<=loadingFunctions.length) {
				gs.ctx.fillText(loadingFunctions[frameCount-1][1],gs.getWidth()/2,gs.getHeight()/2+20);
				loadingFunctions[frameCount-1][0]();
			}
			frameCount++;
		}
	}

	LoadingMode.waitFor = function(img) {
		halt++;
		if (img.complete)
			halt--;
		else {
			img.onload = function() {
				halt--;
			};
		}
	}

	this.destroy = function() {
		
	};
}

