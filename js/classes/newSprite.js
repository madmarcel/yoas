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

function newSprite() {
	// a list of spritesheet images
	this.images = [ , , , , , , , , , , , , , , , , , , , , , , , , , , , , ];

	// draw at this position
	this.x = 0;
	this.y = 0;

	// if this is set, then use this to sort the images
	this.sortingY = undefined;

	this.tileX = 0;
	this.tileY = 0;
	this.width = 64;
	this.height = 64;
	this.offsetX = this.tileX * this.width;
	this.offsetY = this.tileY * this.height;

	this.animation = undefined;

	// CONSTANTS

	this.IDLE_NORTH = 0;
	this.IDLE_EAST = 1;
	this.IDLE_SOUTH = 2;
	this.IDLE_WEST = 3;

	this.WALK_NORTH = 4;
	this.WALK_EAST = 5;
	this.WALK_SOUTH = 6;
	this.WALK_WEST = 7;

	this.setAnim = function(name)
	{
		if (this.animation) {
			switch (name) {
			case this.WALK_NORTH:
				this.animation.initWalkNorthAnimation();
				break;
			case this.WALK_SOUTH:
				this.animation.initWalkSouthAnimation();
				break;
			case this.WALK_EAST:
				this.animation.initWalkEastAnimation();
				break;
			case this.WALK_WEST:
				this.animation.initWalkWestAnimation();
				break;
			case this.IDLE_NORTH:
				this.animation.initFaceNorthAnimation();
				break;
			case this.IDLE_SOUTH:
				this.animation.initFaceSouthAnimation();
				break;
			case this.IDLE_EAST:
				this.animation.initFaceEastAnimation();
				break;
			case this.IDLE_WEST:
				this.animation.initFaceWestAnimation();
				break;
			}
		}
	};
	
	// variables for animation
	this.nextFrame = function() {
		if (this.animation) {
			if (this.animation.nextFrame()) {
				this.setFrame(this.animation.getTile()[0], this.animation
						.getTile()[1]);
			}
		}
	};
	
	this.resetAnimation = function() {
		if (this.animation) {
			this.animation.reset();
			this.setFrame(this.animation.getTile());
		}
	};

	this.setLocation = function(nX, nY) {
		this.x = nX;
		this.y = nY;
	};

	this.setFrame = function(tX, tY) {
		this.tileX = tX;
		this.tileY = tY;
		this.offsetX = this.tileX * this.width;
		this.offsetY = this.tileY * this.height;
	};
	
	this.draw = function(ctx) {

		// draw everthing in the correct order
		for ( var l in this.images) {
			if (this.images[l]) {
				ctx.drawImage(this.images[l], this.offsetX, this.offsetY,
						this.width, this.height, this.x, this.y, this.width,
						this.height);
			}
		}
	};

	// SHADOW
	this.shadow = function(gs, imgName) {
		this.images[0] = gs.getImage(imgName);
	};
	
	// FOREVER_ALONE - only has one non-animated image
	this.alone = function(gs, imgName) {
		this.images[1] = gs.getImage(imgName);
	};

	// BEHIND - carrying stuff, like a quiver
	this.behind = function(gs, imgName) {
		this.images[2] = gs.getImage(imgName);
	};

	// BASE / BODY - the base body, male female skeleton
	this.base = function(gs, imgName) {
		this.images[3] = gs.getImage(imgName);
	};

	// EYES
	this.eyes = function(gs, imgName) {
		this.images[4] = gs.getImage(imgName);
	};

	// FACE - five o' clock shadow
	this.face = function(gs, imgName) {
		this.images[5] = gs.getImage(imgName);
	};

	// FACIAL - moustache, beard
	this.facial1 = function(gs, imgName) {
		this.images[6] = gs.getImage(imgName);
	};
	this.facial2 = function(gs, imgName) {
		this.images[7] = gs.getImage(imgName);
	};

	// GLASSES - or a monocle or an eyepatch
	this.glasses = function(gs, imgName) {
		this.images[8] = gs.getImage(imgName);
	};

	// SHOES_UNDER - shoes that go under a dress or pants
	this.feetUnder = function(gs, imgName) {
		this.images[9] = gs.getImage(imgName);
	};

	// TORSO_UNDER - and underdress or a shirt that tucks into pants
	this.torsoUnder = function(gs, imgName) {
		this.images[10] = gs.getImage(imgName);
	};

	// LEGS - pants or a skirt
	this.legs = function(gs, imgName) {
		this.images[11] = gs.getImage(imgName);
	};

	// SHOES_OVER - boots that go over pants
	this.feetOver = function(gs, imgName) {
		this.images[12] = gs.getImage(imgName);
	};

	// BELT_UNDER - belt that goes with pants
	this.beltUnder = function(gs, imgName) {
		this.images[13] = gs.getImage(imgName);
	};

	// TORSO_OVER - a vest, a coat, a cloak, untucked shirt
	this.torsoOver = function(gs, imgName) {
		this.images[14] = gs.getImage(imgName);
	};

	// BELT_OVER - belt that goes with cloak or coat
	this.beltOver = function(gs, imgName) {
		this.images[15] = gs.getImage(imgName);
	};

	// HANDS - gloves
	this.hands = function(gs, imgName) {
		this.images[16] = gs.getImage(imgName);
	};

	// HAIR - hair goes over all the clothes
	this.hair = function(gs, imgName) {
		this.images[17] = gs.getImage(imgName);
	};

	// EARS OVER HAIR - elf ears
	this.earsOverHair = function(gs, imgName) {
		this.images[18] = gs.getImage(imgName);
	};

	// HAT
	this.hat = function(gs, imgName) {
		this.images[19] = gs.getImage(imgName);
	};
	
	this.update = function() {};
	
	this.destroy = function() {};
}

/*******************************
 * 
 * Animation class
 * 
 * *****************************
 */

function newAnimation() {
	this.frameCount = 0;
	this.frameID = 0;
	this.frameDurations = new Array();
	this.frames = new Array();

	this.resetArrays = function() {
		this.reset();
		this.frameDurations = new Array();
		this.frames = new Array();
	};

	// probably the only animations we'll ever use...
	this.initWalkEastAnimation = function() {
		this.resetArrays();
		for ( var z = 0; z < 8; z++) {
			this.frameDurations.push(6);
			this.frames.push(new Array(2));
			this.frames[z][0] = z + 1;
			this.frames[z][1] = 3;
		}
	};

	this.initFaceEastAnimation = function() {
		this.resetArrays();
		this.frameDurations.push(100);
		this.frames.push(new Array(2));
		this.frames[0][0] = 0;
		this.frames[0][1] = 3;
	};

	this.initWalkWestAnimation = function() {
		this.resetArrays();
		for ( var z = 0; z < 8; z++) {
			this.frameDurations.push(6);
			this.frames.push(new Array(2));
			this.frames[z][0] = z + 1;
			this.frames[z][1] = 1;
		}
	};

	this.initFaceWestAnimation = function() {
		this.resetArrays();
		this.frameDurations.push(100);
		this.frames.push(new Array(2));
		this.frames[0][0] = 0;
		this.frames[0][1] = 1;
	};

	this.initWalkSouthAnimation = function() {
		this.resetArrays();
		for ( var z = 0; z < 8; z++) {
			this.frameDurations.push(6);
			this.frames.push(new Array(2));
			this.frames[z][0] = z + 1;
			this.frames[z][1] = 2;
		}
	};

	this.initFaceSouthAnimation = function() {
		this.resetArrays();
		this.frameDurations.push(100);
		this.frames.push(new Array(2));
		this.frames[0][0] = 0;
		this.frames[0][1] = 2;
	};

	this.initWalkNorthAnimation = function() {
		this.resetArrays();
		for ( var z = 0; z < 8; z++) {
			this.frameDurations.push(6);
			this.frames.push(new Array(2));
			this.frames[z][0] = z + 1;
			this.frames[z][1] = 0;
		}
	};

	this.initFaceNorthAnimation = function() {
		this.resetArrays();
		this.frameDurations.push(100);
		this.frames.push(new Array(2));
		this.frames[0][0] = 0;
		this.frames[0][1] = 0;
	};

	this.reset = function() {
		this.frameID = 0;
		this.frameCount = 0;
	};

	this.nextFrame = function() {
		this.frameCount++;
		if (this.frameCount >= this.frameDurations[this.frameID]) {
			this.frameCount = 0;
			this.frameID++;
			if (this.frameID == this.frames.length) {
				this.frameID = 0;
				return true;
			}
			return true;
		}
		return false;
	};

	this.getTile = function() {
		return this.frames[this.frameID];
	};
}
