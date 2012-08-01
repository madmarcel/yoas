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

// The World object
function World(gs) {

	this.objects = new Array();

	this.nodeMap = undefined;
	this.drawNodeMap = false;
	this.updateCounter = 0;
	this.updateBoatCounter = 0;
	this.haveBoat = false;
	this.nextBoat = 100;

	this.init = function() {
		this.nodeMap = new NodeMap();
		this.nodeMap.setupNodes();

		this.setupBackground();

		this.generateCustomer();
	};

	this.addObject = function(thing) {
		this.objects.push(thing);
	};

	// objects are sorted by y value, or by the 'sortingY' if it is defined
	this.compare = function(a, b) {

		var sa = a.y;
		var sb = b.y;

		if (a.sortingY) {
			sa = a.sortingY;
		}
		if (b.sortingY) {
			sb = b.sortingY;
		}

		if (sa < sb)
			return -1;
		if (sa > sb)
			return 1;
		return 0;
	};

	this.update = function() {
		for ( var s = 0; s < this.objects.length; s++) {
			this.objects[s].update();
		}

		// remove the dead ones, have to do this in reverse order
		for ( var j = this.objects.length - 1; j >= 0; j--) {
			if (this.objects[j].hasLeftGame) {
				this.objects[j].destroy();
				this.objects.splice(j, 1);
			}
		}

		if (this.updateCounter > 100) {
			this.updateCounter = 0;
			this.generateCustomer();
		}
		if (this.updateBoatCounter > this.nextBoat && !this.haveBoat ) {
			this.updateBoatCounter = 0;
			this.generateBoat();
			this.haveBoat = true;
			this.nextBoat = Math.floor(Math.random() * 800) + 100;
		}
		this.updateCounter++;
		this.updateBoatCounter++;
	};

	this.draw = function() {

		// sort the objects by y value
		this.objects.sort(this.compare);

		// and draw them
		for ( var s = 0; s < this.objects.length; s++) {
			this.objects[s].draw(gs.ctx);
		}

		if (this.drawNodeMap && this.nodeMap) {
			for ( var i in this.nodeMap.nodes) {
				this.nodeMap.nodes[i].render(gs.ctx);
			}
		}
	};

	this.generateCustomer = function() {

		var randomSpawnNode = this.nodeMap.spawnNodes[Math.floor(Math.random()
				* this.nodeMap.spawnNodes.length)];

		var goingToSell = Math.floor(Math.random() * 2);
		var goingToBuy = Math.floor(Math.random() * 2);

		var b = false;
		var s = false;

		if (goingToSell > 0) {
			s = true;
		}
		if (goingToBuy > 0) {
			b = true;
		}

		var newCustomer = new Character(randomSpawnNode, s, b);

		// give him or her some clothes

		var maleOrFemale = Math.floor(Math.random() * 2);

		if (maleOrFemale > 0) {
			// female
			newCustomer.sprite = this.generateFemale(newCustomer);
		} else {
			// male
			newCustomer.sprite = this.generateMale(newCustomer);
		}

		newCustomer.sprite.animation = new newAnimation();
		newCustomer.sprite.setAnim(newCustomer.sprite.IDLE_EAST);

		this.addObject(newCustomer);
	}

	this.generateFemale = function(parent) {

		var bases = [ 'res/img/sprites/full-characters/shura.png',
				'res/img/sprites/full-characters/lidia.png',
				'res/img/sprites/full-characters/princess.png',
				'res/img/sprites/full-characters/femaleelf.png',
				'res/img/sprites/full-characters/green_woman.png',
				'res/img/sprites/full-characters/student_a.png',
				'res/img/sprites/full-characters/student_b.png',
				'res/img/sprites/full-characters/female_mage_white.png',
				'res/img/sprites/full-characters/female_mage_red.png',];

		var pickABase = Math.floor(Math.random() * bases.length);

		var shadow = 'res/img/sprites/shadow.png';
		var femaleBase = bases[pickABase]; /* 'res/img/sprites/BODY_FEMALE_tanned2.png'; */// 'res/img/sprites/full-characters/shura.png';

		var femaleHair = undefined; // 'res/img/sprites/clothes/HEAD_FEMALE_hair_brown_princess.png';
		var femaleEyes = undefined; // 'res/img/sprites/clothes/HEAD_FEMALE_brown_eyes.png';
		var femaleTorsoUnder = undefined; // 'res/img/sprites/clothes/TORSO_FEMALE_plain_underdress.png';
		var femaleTorsoOver = undefined; // 'res/img/sprites/clothes/TORSO_FEMALE_green_vest.png';
		var femaleLegs = undefined; // 'res/img/sprites/clothes/LEGS_FEMALE_orange_overskirt.png';

		var fw = new newSprite();
		
		fw.shadow(gs, shadow);
		fw.base(gs, femaleBase);
		fw.hair(gs, femaleHair);
		fw.eyes(gs, femaleEyes);
		fw.torsoUnder(gs, femaleTorsoUnder);
		fw.torsoOver(gs, femaleTorsoOver);
		fw.legs(gs, femaleLegs);

		fw.setLocation(parent.x, parent.y);
		fw.setFrame(0, 2);

		return fw;
	};

	this.generateMale = function(parent) {

		var bases = [ 'res/img/sprites/full-characters/baldric.png',
		              'res/img/sprites/full-characters/bob.png',
		              'res/img/sprites/full-characters/gunner.png',
		              'res/img/sprites/full-characters/malesoldier.png',
		              'res/img/sprites/full-characters/rogue.png',
		              'res/img/sprites/full-characters/rogue2.png',
		              'res/img/sprites/full-characters/student_c.png',
		              'res/img/sprites/full-characters/dark_mage.png',
		              'res/img/sprites/full-characters/steampunk.png',
		              'res/img/sprites/full-characters/soldier.png',
		              'res/img/sprites/full-characters/soldier2.png',
		              'res/img/sprites/full-characters/soldier3.png',
		              'res/img/sprites/full-characters/soldier4.png',
		              'res/img/sprites/full-characters/knight.png',
		              'res/img/sprites/full-characters/knight2.png',
		              'res/img/sprites/full-characters/knight3.png',
		              'res/img/sprites/full-characters/knight4.png',
		              'res/img/sprites/full-characters/monk.png',
		              'res/img/sprites/full-characters/monk2.png',
		              'res/img/sprites/full-characters/monk3.png',
		              'res/img/sprites/full-characters/robinhood.png',
		              'res/img/sprites/full-characters/plainguy.png',
		              
				];

		var pickABase = Math.floor(Math.random() * bases.length);
		
		var shadow = 'res/img/sprites/shadow.png';
		var maleBase = bases[pickABase]; /* 'res/img/sprites/BODY_FEMALE_tanned2.png'; */// 'res/img/sprites/full-characters/shura.png';

		var maleHair = undefined; // 'res/img/sprites/clothes/HEAD_FEMALE_hair_brown_princess.png';
		var maleEyes = undefined; // 'res/img/sprites/clothes/HEAD_FEMALE_brown_eyes.png';
		var maleTorsoUnder = undefined; // 'res/img/sprites/clothes/TORSO_FEMALE_plain_underdress.png';
		var maleTorsoOver = undefined; // 'res/img/sprites/clothes/TORSO_FEMALE_green_vest.png';
		var maleLegs = undefined; // 'res/img/sprites/clothes/LEGS_FEMALE_orange_overskirt.png';

		var mw = new newSprite();
		
		mw.shadow(gs, shadow );
		mw.base(gs, maleBase);
		mw.hair(gs, maleHair);
		mw.eyes(gs, maleEyes);
		mw.torsoUnder(gs, maleTorsoUnder);
		mw.torsoOver(gs, maleTorsoOver);
		mw.legs(gs, maleLegs);

		mw.setLocation(parent.x, parent.y);
		mw.setFrame(0, 2);

		return mw;
	};

	this.setupBackground = function() {

		var shop = [
				[ 'res/img/static/shop/frontwall-transparent.png', 320, 320,
						288, 104, 400 ],
				[ 'res/img/static/shop/backwall.png', 224, 32, 384, 96, 128 ],
				[ 'res/img/static/shop/sidewalls.png', 224, 32, 384, 288, 320 ],
				[ 'res/img/static/shop/annex.png', 224, 160, 96, 96, 256 ], ];

		var scenery = [
				[ 'res/img/static/background.png', 0, 0, 800, 640, -10 ],
				[ 'res/img/static/scenery/talltree.png', 356, 512, 94, 128, 640 ],
				[ 'res/img/static/scenery/fir.png', 742, 308, 85, 115, 400 ],
				[ 'res/img/static/scenery/fir.png', 776, 245, 85, 115, 360 ],
				[ 'res/img/static/scenery/fir.png', 294, 341, 85, 115, 456 ],
				[ 'res/img/static/scenery/fir.png', 116, 373, 85, 115, 488 ],
				[ 'res/img/static/scenery/fir.png', 38, 309, 85, 115, 424 ],
				[ 'res/img/static/scenery/bush.png', 557, 390, 66, 37, 427 ],
				[ 'res/img/static/scenery/bush.png', 205, 230, 66, 37, 267 ],
				[ 'res/img/static/scenery/reeds.png', 0, 83, 800, 103, 186 ],
				[ 'res/img/static/scenery/fullpufftree.png', 589, 351, 144,
						196, 547 ],
				[ 'res/img/static/scenery/fence.png', 0, 611, 115, 29, 640 ],
				[ 'res/img/static/scenery/jetty.png', 685, 74, 70, 80, 74 ], ];

		for ( var z = 0; z < shop.length; z++) {
			var s = shop[z];
			var dud = new newSprite();
			dud.alone(gs, s[0]);
			dud.setLocation(s[1], s[2]);
			dud.width = s[3];
			dud.height = s[4];
			dud.sortingY = s[5];
			dud.setFrame(0, 0);
			this.addObject(dud);
		}

		for ( var z = 0; z < scenery.length; z++) {
			var s = scenery[z];
			var dud = new newSprite();
			dud.alone(gs, s[0]);
			dud.setLocation(s[1], s[2]);
			dud.width = s[3];
			dud.height = s[4];
			dud.sortingY = s[5];
			dud.setFrame(0, 0);
			this.addObject(dud);
		}

		/*
		 * var frontwall = new newSprite(); frontwall.setLocation(320, 320);
		 * frontwall.width = 288; frontwall.height = 104; frontwall.sortingY =
		 * 400; frontwall.setFrame(0, 0); frontwall.alone(gs,
		 * 'res/img/static/shop/frontwall-transparent.png');
		 * 
		 * this.addObject( frontwall );
		 */
	};

	this.generateBoat = function() {
		var randomSpawnNode = this.nodeMap.boatNodes[Math.floor(Math.random()
				* this.nodeMap.boatNodes.length)];
		
		var boat = new Boat(randomSpawnNode, this)
		
		boat.sprite = new newSprite();
		boat.sprite.alone(gs, 'res/img/static/scenery/boat.png');
		boat.sprite.setLocation(randomSpawnNode.x, randomSpawnNode.y);
		boat.sprite.width = 127;
		boat.sprite.height = 61;
		boat.sortingY = 60;
		boat.sprite.sortingY = 60;
		boat.sprite.setFrame(0, 0);
		
		var goingToSell = Math.floor(Math.random() * 2);
		var goingToBuy = Math.floor(Math.random() * 2);

		var b = false;
		var s = false;

		if (goingToSell > 0) {
			s = true;
		}
		if (goingToBuy > 0) {
			b = true;
		}
		
		var newCustomer = new Character(randomSpawnNode, s, b);
		
		var maleOrFemale = Math.floor(Math.random() * 2);
		
		if (maleOrFemale > 0) {
			// female
			newCustomer.sprite = this.generateFemale(newCustomer);
		} else {
			// male
			newCustomer.sprite = this.generateMale(newCustomer);
		}
		
		newCustomer.sprite.animation = new newAnimation();
		newCustomer.sprite.setAnim(newCustomer.sprite.IDLE_SOUTH);				
		
		boat.setLoad( newCustomer );
		
		this.addObject(boat);
	};
}
