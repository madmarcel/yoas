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

function TitleMode(gs) {
	// CONSTRUCTOR
	// this is the image of the game logo
	var title = {
		"x" : gs.getWidth() / 2,
		"y" : 20,
		"img" : gs.getImage('title.png')
	};

	// these are the buttons which will be displayed on the main title screen
	var titleButtons = {
		"play" : {
			"x" : gs.getWidth() / 2,
			"y" : gs.getHeight() / 2 + 20
		}
	};

	for (img in titleButtons)
		titleButtons[img].img = gs.getImage(img + '_button.png');

	// END CONSTRUCTOR

	// INIT FUNCTION
	this.init = function() {
		gs.unloadMode('load');
		setButtons(titleButtons);
		gs.setScreen(titleScreen);
	};

	// SCREENS
	function titleScreen() {
		if (gs.mousePressed) {
			var button = gs
					.getCollision(gs.mousePressed[0], gs.mousePressed[1]);
			switch (button) {
			case 'play':
				gs.loadMode(new LoadingMode([ [ function() {
					gs.loadMode(new PlayMode(gs), 'play');
				}, 'Loading Resources...' ], [ function() {
					gs.setMode('play');
					gs.unloadMode('title');
				}, 'Starting Game...' ] ], gs), 'load');
				gs.setMode('load');
				break;
			}
		}
		// title.img.draw(title.x-title.img.width/2,title.y);
		for (img in titleButtons)
			titleButtons[img].img.draw(titleButtons[img].x
					- titleButtons[img].img.width / 2, titleButtons[img].y
					- titleButtons[img].img.height / 2);

	}
	// END SCREENS

	// sets the collision map to the name of the buttons where they are drawn
	function setButtons(buttons) {
		for (img in buttons) {
			for ( var i = buttons[img].x - buttons[img].img.width / 2; i < buttons[img].x
					+ buttons[img].img.width / 2; i++) {
				for ( var j = buttons[img].y - buttons[img].img.height / 2; j < buttons[img].y
						+ buttons[img].img.height / 2; j++) {
					gs.setCollision(i, j, img);
				}
			}
		}
	}

	// DESTRUCTOR
	this.destroy = function() {
		title.img.destroy();
		for (img in titleButtons)
			titleButtons[img].img.destroy();
		delete title;
		delete titleButtons;
		delete this;
	};
}
