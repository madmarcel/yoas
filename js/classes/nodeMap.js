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

function NodeMap() {
	this.nodes = [];
	this.spawnNodes = [];

	this.boatNodes = [];

	this.setupNodes = function() {
		var westEntry = new Node(-60, 569);
		westEntry.isSpawn = true;

		// west upper main path
		var main_up_path1 = new Node(63, 571);
		var main_up_path2 = new Node(182, 578);
		var main_up_path3 = new Node(249, 575);
		var main_up_path4 = new Node(348, 573);

		// left hand side going up to shop
		var main_up_path5 = new Node(446, 557);
		var main_up_path6 = new Node(444, 435);

		var shopDoor = new Node(464, 413);
		shopDoor.isDoor = true;

		var shopDoor2 = new Node(469, 412);
		shopDoor.isDoor = true;

		var belowShop = new Node(465, 590);
		var belowShop2 = new Node(480, 593);

		var westExit = new Node(-60, 603);
		westExit.isExit = true;

		// west lower main path
		var main_dn_path1 = new Node(70, 604);
		var main_dn_path2 = new Node(140, 602);
		var main_dn_path3 = new Node(205, 607);
		var main_dn_path4 = new Node(361, 605);

		// right hand side going down from shop
		var main_dn_path5 = new Node(489, 561);
		var main_dn_path6 = new Node(480, 450);

		// east upper main path
		var main_up_path7 = new Node(538, 571);
		var main_up_path8 = new Node(592, 575);
		var main_up_path9 = new Node(677, 569);

		// east lower main path
		var main_dn_path7 = new Node(520, 600);
		var main_dn_path8 = new Node(615, 597);
		var main_dn_path9 = new Node(694, 606);

		// path leading north - left side
		var north_up_path1 = new Node(705, 554);
		var north_up_path2 = new Node(701, 491);
		var north_up_path3 = new Node(703, 392);
		var north_up_path4 = new Node(698, 300);
		var north_up_path5 = new Node(706, 229);
		var north_up_path6 = new Node(697, 105);

		// path leading north - right side
		var north_dn_path1 = new Node(745, 551);
		var north_dn_path2 = new Node(741, 471);
		var north_dn_path3 = new Node(743, 405);
		var north_dn_path4 = new Node(738, 269);
		var north_dn_path5 = new Node(746, 215);
		var north_dn_path6 = new Node(737, 105);

		// path leading east - lower
		var east_dn_path1 = new Node(757, 604);

		// path leading east - upper
		var east_up_path1 = new Node(763, 570);

		var crossWay = new Node(723, 587);
		var southEntry = new Node(720, 700);
		southEntry.isSpawn = true;
		var southExit = new Node(720, 700);
		southExit.isExit = true;

		var southEntry2 = new Node(160, 700);
		southEntry2.isSpawn = true;
		var southExit2 = new Node(160, 700);
		southExit2.isExit = true;

		var eastEntry = new Node(830, 606);
		eastEntry.isSpawn = true;
		var eastExit = new Node(830, 572);
		eastExit.isExit = true;

		var eastEntry2 = new Node(830, 257);
		eastEntry2.isSpawn = true;
		var eastExit2 = new Node(830, 224);
		eastExit2.isExit = true;

		var boatRamp = new Node(720, 92);

		/* inside the shop */
		var rightBottomCorner = new Node(463, 357);
		rightBottomCorner.isPrecise = true;

		var buyQueue1 = new Node(483, 312);
		var buyQueue2 = new Node(492, 290);
		var buyQueue3 = new Node(494, 270);
		var buyQueue4 = new Node(491, 250);
		var buyQueue5 = new Node(492, 220);

		buyQueue1.isQueue = true;
		buyQueue2.isQueue = true;
		buyQueue3.isQueue = true;
		buyQueue4.isQueue = true;
		buyQueue5.isQueue = true;

		buyQueue1.isBuying = true;
		buyQueue5.isBuyPOS = true;

		var sellQueue1 = new Node(576, 311);
		var sellQueue2 = new Node(575, 291);
		var sellQueue3 = new Node(582, 272);
		var sellQueue4 = new Node(575, 246);
		var sellQueue5 = new Node(581, 220);
		var sellQueue6 = new Node(575, 333);
		var sellQueue7 = new Node(568, 350);
		var sellQueue8 = new Node(552, 366);

		sellQueue1.isQueue = true;
		sellQueue2.isQueue = true;
		sellQueue3.isQueue = true;
		sellQueue4.isQueue = true;
		sellQueue5.isQueue = true;
		sellQueue6.isQueue = true;
		sellQueue7.isQueue = true;
		sellQueue8.isQueue = true;

		sellQueue8.isSelling = true;
		sellQueue5.isSellPOS = true;

		var middlePath1 = new Node(533, 227);
		middlePath1.isClearQueue = true;
		var middlePath2 = new Node(522, 329);

		/* link all the nodes together ... whew */

		/* shop queues */
		buyQueue1.addChild(buyQueue2);
		buyQueue2.addChild(buyQueue3);
		buyQueue3.addChild(buyQueue4);
		buyQueue4.addChild(buyQueue5);

		sellQueue8.addChild(sellQueue7);
		sellQueue7.addChild(sellQueue6);
		sellQueue6.addChild(sellQueue1);
		sellQueue1.addChild(sellQueue2);
		sellQueue2.addChild(sellQueue3);
		sellQueue3.addChild(sellQueue4);
		sellQueue4.addChild(sellQueue5);

		/* middle shop path */
		buyQueue5.addChild(middlePath1);
		sellQueue5.addChild(middlePath1);
		middlePath1.addChild(middlePath2);

		/* paths outside */
		westEntry.addChild(main_up_path1);
		main_up_path1.addChild(main_up_path2);
		main_up_path2.addChild(main_up_path3);
		main_up_path3.addChild(main_up_path4);
		main_up_path4.addChild(main_up_path5);
		main_up_path5.addChild(main_up_path6);
		main_up_path5.addChild(belowShop);
		main_up_path6.addChild(shopDoor);

		main_up_path5.addChild(main_dn_path5);

		main_dn_path1.addChild(westExit);
		main_dn_path2.addChild(main_dn_path1);
		main_dn_path3.addChild(main_dn_path2);
		main_dn_path4.addChild(main_dn_path3);
		belowShop.addChild(main_dn_path4);
		belowShop2.addChild(main_up_path5);

		main_dn_path5.addChild(belowShop);
		main_dn_path6.addChild(main_dn_path5);
		shopDoor2.addChild(main_dn_path6);

		main_dn_path5.addChild(main_up_path7);

		main_up_path7.addChild(main_up_path8);
		main_up_path8.addChild(main_up_path9);

		main_dn_path7.addChild(belowShop2);
		belowShop2.addChild(belowShop);
		main_dn_path8.addChild(main_dn_path7);
		main_dn_path9.addChild(main_dn_path8);

		crossWay.addChild(main_dn_path9);
		crossWay.addChild(southExit);
		crossWay.addChild(east_up_path1);
		southEntry.addChild(crossWay);
		main_up_path9.addChild(crossWay);

		southEntry.addChild(main_dn_path9);

		// path going up - left side
		southEntry.addChild(north_up_path1);
		main_up_path9.addChild(north_up_path1);

		// path going up - right side
		north_dn_path1.addChild(southExit);
		north_dn_path1.addChild(east_up_path1);
		north_dn_path1.addChild(crossWay);

		// path going east - upper
		east_up_path1.addChild(eastExit);
		main_up_path9.addChild(east_up_path1);

		// path going east - lower
		eastEntry.addChild(east_dn_path1);
		east_dn_path1.addChild(southExit);
		east_dn_path1.addChild(main_dn_path9);

		east_dn_path1.addChild(crossWay);
		crossWay.addChild(north_up_path1);

		// shop nodes
		shopDoor.addChild(rightBottomCorner);
		rightBottomCorner.addChild(shopDoor2);
		middlePath2.addChild(rightBottomCorner);

		rightBottomCorner.addChild(buyQueue1);
		rightBottomCorner.addChild(sellQueue8);

		// path to boat ramp
		north_up_path1.addChild(north_up_path2);
		north_up_path2.addChild(north_up_path3);
		north_up_path3.addChild(north_up_path4);
		north_up_path4.addChild(north_up_path5);
		north_up_path5.addChild(north_up_path6);
		north_up_path6.addChild(boatRamp);

		boatRamp.addChild(north_dn_path6);
		north_dn_path6.addChild(north_dn_path5);
		north_dn_path5.addChild(north_dn_path4);
		north_dn_path4.addChild(north_dn_path3);
		north_dn_path3.addChild(north_dn_path2);
		north_dn_path2.addChild(north_dn_path1);

		southEntry2.addChild(main_up_path2);
		southEntry2.addChild(main_dn_path2);
		main_dn_path3.addChild(southExit2);

		eastEntry2.addChild(north_up_path5);
		eastEntry2.addChild(north_dn_path4);

		north_dn_path5.addChild(eastExit2);
		north_up_path5.addChild(north_dn_path5);

		// setup the shop emmitter nodes
		main_up_path5.shopEmit = 5;
		main_up_path6.shopEmit = 6;
		shopDoor.shopEmit = 7;
		rightBottomCorner.shopEmit = 8;

		east_dn_path1.shopEmit = 5;
		main_dn_path9.shopEmit = 6;
		main_dn_path8.shopEmit = 7;
		crossWay.shopEmit = 4;
		north_dn_path1.shopEmit = 3;

		north_dn_path4.shopEmit = 3;
		main_up_path2.shopEmit = 3;

		// add them all to our list of nodes
		this.nodes.push(westEntry);

		this.nodes.push(main_up_path1);
		this.nodes.push(main_up_path2);
		this.nodes.push(main_up_path3);
		this.nodes.push(main_up_path4);
		this.nodes.push(main_up_path5);
		this.nodes.push(main_up_path6);
		this.nodes.push(main_up_path7);
		this.nodes.push(main_up_path8);
		this.nodes.push(main_up_path9);

		this.nodes.push(westExit);

		this.nodes.push(main_dn_path1);
		this.nodes.push(main_dn_path2);
		this.nodes.push(main_dn_path3);
		this.nodes.push(main_dn_path4);
		this.nodes.push(main_dn_path5);
		this.nodes.push(main_dn_path6);
		this.nodes.push(main_dn_path7);
		this.nodes.push(main_dn_path8);
		this.nodes.push(main_dn_path9);

		this.nodes.push(north_up_path1);
		this.nodes.push(north_up_path2);
		this.nodes.push(north_up_path3);
		this.nodes.push(north_up_path4);
		this.nodes.push(north_up_path5);
		this.nodes.push(north_up_path6);

		this.nodes.push(north_dn_path1);
		this.nodes.push(north_dn_path2);
		this.nodes.push(north_dn_path3);
		this.nodes.push(north_dn_path4);
		this.nodes.push(north_dn_path5);
		this.nodes.push(north_dn_path6);

		this.nodes.push(east_dn_path1);
		this.nodes.push(east_up_path1);

		this.nodes.push(belowShop);
		this.nodes.push(belowShop2);
		this.nodes.push(crossWay);
		this.nodes.push(southEntry);
		this.nodes.push(southExit);
		this.nodes.push(southEntry2);
		this.nodes.push(southExit2);
		this.nodes.push(eastEntry);
		this.nodes.push(eastExit);
		this.nodes.push(eastEntry2);
		this.nodes.push(eastExit2);
		this.nodes.push(boatRamp);
		this.nodes.push(shopDoor);
		this.nodes.push(shopDoor2);
		this.nodes.push(rightBottomCorner);

		this.nodes.push(buyQueue1);
		this.nodes.push(buyQueue2);
		this.nodes.push(buyQueue3);
		this.nodes.push(buyQueue4);
		this.nodes.push(buyQueue5);

		this.nodes.push(sellQueue1);
		this.nodes.push(sellQueue2);
		this.nodes.push(sellQueue3);
		this.nodes.push(sellQueue4);
		this.nodes.push(sellQueue5);
		this.nodes.push(sellQueue6);
		this.nodes.push(sellQueue7);
		this.nodes.push(sellQueue8);

		this.nodes.push(middlePath1);
		this.nodes.push(middlePath2);

		this.spawnNodes.push(westEntry);
		this.spawnNodes.push(southEntry);
		this.spawnNodes.push(southEntry2);
		this.spawnNodes.push(eastEntry);
		this.spawnNodes.push(eastEntry2);
		
		// setup the boatnodes
		
		var boatEntry = new Node(-130,88);
		boatEntry.isSpawn = true;
		
		var boatOffload = new Node(722,92);
		boatOffload.isOffload = true;
		boatOffload.offLoadChild = boatRamp;
		
		var boatExit = new Node(930,91);
		boatExit.isExit = true;
		
		boatEntry.addChild( boatOffload );
		boatOffload.addChild( boatExit );
		
		this.nodes.push( boatEntry );
		this.nodes.push( boatOffload );
		this.nodes.push( boatExit );
		
		this.boatNodes.push( boatEntry );
	};
}
