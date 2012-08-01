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
 
function Character(startNode, isSelling, isBuying) {
	this.x = startNode.x;
	this.y = startNode.y;

	// we use these to approximate our approach to a node
	this.targetX = this.x;
	this.targetY = this.y;

	this.sprite = undefined;
	this.speed = 1;

	this.targetNode = startNode;
	this.previousNode = startNode;

	this.isSelling = isSelling || false;
	this.isBuying = isBuying || false;

	this.hasLeftGame = false;
	this.waitCounter = 0;
	this.waitUntil = 0;

	this.prevDirection = 1;
	this.currDirection = 3;

	this.sortingY = undefined;
	
	this.draw = function(ctx) {
		if (this.sprite) {
			this.sprite.draw(ctx);
			this.sprite.nextFrame();
		}
	};
	
	this.hasChangedDirection = function() {
		if (this.prevDirection != this.currDirection) {
			return true;
		}
		return false;
	}

	this.update = function() {

		// console.log("My location: " + this.x + "," + this.y + " heading for:
		// " + this.targetNode.x + "," + this.targetNode.y );

		// this customer is busy
		if (this.waitCounter < this.waitUntil) {
			this.waitCounter++;
			this.targetNode.isBlocked = true;
			return;
		}
		this.waitUntil = 0;

		// here is where we do all the hard work...

		// we've reached our target?
		if (this.x == this.targetX && this.y == this.targetY) {
			if (this.targetNode.isClearQueue) {
				this.previousNode.isBlocked = false;
			}
			if (this.targetNode.isBuyPOS && this.isBuying) {
				// this.targetNode.isBlocked = false;
				this.isBuying = false;
				this.waitUntil = Math.floor(Math.random() * 200) + 100;
				this.waitCounter = 0;
				this.currDirection = -1;
				if (this.hasChangedDirection()) {
					this.sprite.setAnim(this.sprite.IDLE_NORTH);
					this.prevDirection = -1;
				}
				return;
			}
			if (this.targetNode.isSellPOS && this.isSelling) {
				// this.targetNode.isBlocked = false;
				this.isSelling = false;
				this.waitUntil = 200;
				this.waitCounter = 0;
				this.currDirection = -1;
				if (this.hasChangedDirection()) {
					this.sprite.setAnim(this.sprite.IDLE_NORTH);
					this.prevDirection = -1;
				}
				return;
			}
			// pick another node at random
			if (!this.isSelling && !this.isBuying) {
				if (this.targetNode.hasChildren) {
					// console.log("I'm wandering...");
					this.setTarget(this.targetNode.getRandomChild());
					// this.previousNode = this.targetNode;
					// this.targetNode = this.targetNode.getRandomChild();
				} else {
					// console.log("I can't go any further...");
					this.hasLeftGame = true;
				}
			} else {
				// we've got a target in mind, and there are multiple options
				if (this.targetNode.children.length > 1) {
					/*
					 * console.log("Ok, time to make a choice: "); console.log("
					 * isSelling: " + this.isSelling ); console.log(" isBuying: " +
					 * this.isBuying );
					 */
					// we always sell our stuff first
					if (this.isSelling && this.targetNode.hasSellingChild) {
						var temp = this.targetNode.getSellingChild();
						if (!temp.isBlocked) {
							// console.log("I'm going to sell something");
							// this.previousNode = this.targetNode;
							// this.targetNode =
							// this.targetNode.getSellingChild();
							this.setTarget(this.targetNode.getSellingChild());
							if (this.targetNode.isQueue) {
								this.targetNode.isBlocked = true;
							}
						} else {
							this.isSelling = false;
							// console.log("I'm not selling in this shop!");
						}
					}
					// then we buy some more
					else if (this.isBuying && this.targetNode.hasBuyingChild) {
						// console.log("I'm going to buy something");
						var temp = this.targetNode.getBuyingChild();
						if (!temp.isBlocked) {
							this.setTarget(this.targetNode.getBuyingChild());
							// this.previousNode = this.targetNode;
							// this.targetNode =
							// this.targetNode.getBuyingChild();
							if (this.targetNode.isQueue) {
								this.targetNode.isBlocked = true;
							}
						} else {
							this.isBuying = false;
							// console.log("I'm not buying from this shop!");
						}
					} else {
						// or we're still heading to the shop
						// console.log("I'm heading to the shop...");
						this.setTarget(this.targetNode
								.getHighestShopEmitChild());
						// this.previousNode = this.targetNode;
						// this.targetNode =
						// this.targetNode.getHighestShopEmitChild();
					}
				} else {
					// only one choice, pick that one then
					if (!this.targetNode.children[0].isBlocked) {
						if (this.targetNode.isQueue) {
							this.targetNode.isBlocked = false;
						}
						this.setTarget(this.targetNode.children[0]);
						// this.previousNode = this.targetNode;
						// this.targetNode = this.targetNode.children[0];
						if (this.targetNode.isQueue) {
							this.targetNode.isBlocked = true;
						}
					} else {
						// blocked node
						// console.log("Blocked");
						this.sprite.setAnim(this.sprite.IDLE_NORTH);
						// now what do we do?
					}
				}
			}
		} else {
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
					this.sprite.setLocation( this.x - 32, this.y - 64 );
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
		if (newNode.isPrecise) {
			this.targetX = newNode.x;
			this.targetY = newNode.y;
		} else {
			this.targetX = newNode.x + (Math.floor(Math.random() * 8) - 4);
			this.targetY = newNode.y + (Math.floor(Math.random() * 8) - 4);
			// console.log( "orig: " + newNode.x + "," + newNode.y + " new: " +
			// this.targetX + "," + this.targetY );
		}
		this.targetNode = newNode;
	};
}
