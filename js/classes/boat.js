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

function Boat(startNode, world) {
	this.x = startNode.x;
	this.y = startNode.y;

	// we use these to approximate our approach to a node
	this.targetX = this.x;
	this.targetY = this.y;

	this.sprite = undefined;
	this.speed = 1;

	this.targetNode = startNode;
	this.previousNode = startNode;

	this.hasLeftGame = false;
	this.waitCounter = 0;
	this.waitUntil = 0;

	this.prevDirection = 1;
	this.currDirection = 3;
	
	this.load = undefined;
	this.anchored = false;
	this.anchoredCounter = 0;
	
	this.sortingY = undefined;
	
	this.draw = function(ctx) {
		if (this.sprite) {
			this.sprite.draw(ctx);
			this.sprite.nextFrame();
		}
		if( this.load )
		{
			this.load.draw(ctx);
		}
	};
	
	this.hasChangedDirection = function() {
		if (this.prevDirection != this.currDirection) {
			return true;
		}
		return false;
	}

	this.update = function() {
		
		if( this.anchored )
		{
			this.anchoredCounter++;
			if( this.anchoredCounter > 1000 )
			{
				this.anchored = false;
			}
			return;
		}				
		
		// here is where we do all the hard work...

		// we've reached our target?
		
		if (this.x == this.targetX && this.y == this.targetY) {
			
			if( !this.anchored )
			{
				if( this.targetNode.isOffload )
				{
					if( this.load )
					{
						this.load.setTarget(this.targetNode.offLoadChild);
						world.addObject( this.load );
						this.load = undefined;
						this.anchored = true;
						this.anchoredCounter = 0;
					}					
				}
				
				if (this.targetNode.hasChildren) {				
					this.setTarget(this.targetNode.children[0]);
				}
				else
				{
					this.hasLeftGame = true;
					world.haveBoat = false;
					world.updateBoatCounter = 0;
				}			
			}			
		} 
		else
		{
			// we're still moving towards our target
			var h = 0;
			var v = 0;

			if (this.x > this.targetX) {
				h = -1;
			}
			if (this.x < this.targetX) {
				h = 1;
			}
			if (this.y > this.targetY) {
				v = -1;
			}
			if (this.y < this.targetY) {
				v = 1;
			}
			// if we have to walk diagonal, best that we show animation for the
			// longest distance
			var deltax = Math.abs(this.x - this.targetX);
			var deltay = Math.abs(this.y - this.targetY);

			if (deltax > deltay) {
				if (h < 0) {
					this.currDirection = 6;
					if (this.hasChangedDirection()) {
						this.sprite.setAnim(this.sprite.WALK_WEST);
						this.prevDirection = 6;
						this.flip = true;
					}
				} else {
					this.currDirection = 2;
					if (this.hasChangedDirection()) {
						this.sprite.setAnim(this.sprite.WALK_EAST);
						this.prevDirection = 2;
						this.flip = false;
					}
				}
			} else {
				if (v < 0) {
					this.currDirection = 0;
					if (this.hasChangedDirection()) {
						this.sprite.setAnim(this.sprite.WALK_NORTH);
						this.prevDirection = 0;
					}
				} else {
					this.currDirection = 4;
					if (this.hasChangedDirection()) {
						this.sprite.setAnim(this.sprite.WALK_SOUTH);
						this.prevDirection = 4;
					}
				}
			}

			this.x += h * this.speed;
			this.y += v * this.speed;
			if( this.sprite )
			{
				this.sprite.setLocation( this.x - 63, this.y - 61 );
			}
			if( this.load )
			{
				this.load.x = this.x;
				this.load.y = this.y - 24;
				this.load.sprite.setLocation( this.x - 32, this.y - 64 - 24 );
			}
		}		
	};

	this.destroy = function() {
		if (this.sprite) {
			this.sprite.destroy();
		}
	};
	
	this.setTarget = function(newNode) {

		this.previousNode = this.targetNode;		
		this.targetX = newNode.x;
		this.targetY = newNode.y;
		this.targetNode = newNode;
	};
	
	this.setLoad = function( character ) {
		this.load = character;		
	};
}
