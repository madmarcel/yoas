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
 
function Node(x, y)
{
    this.x = x;
    this.y = y;
    this.isDirectional = true;
    this.isSpawn = false;
    this.isExit = false;
    this.isShopping = false;
    this.isQueue = false;
    this.isBlocked = false;
    this.isSelling = false;
    this.isBuying = false;
    this.isGuarding = false;
    this.isBoat = false;
    this.isOffload = false;
    this.offLoadChild = undefined;
    this.isDoor = false;
    this.isPrecise = false;
    this.shopEmit = 0;
    
    this.hasChildren = false;
    this.hasSellingChild = false;
    this.hasBuyingChild = false;
    this.isBuyPOS = false;
    this.isSellPOS = false;
    
    this.children = [];
    
    this.addChild = function(child) {
	this.children.push(child);
	if( child.isSelling )
	{
	    this.hasSellingChild = true;
	}
	if( child.isBuying )
	{
	    this.hasBuyingChild = true;
	}
	this.hasChildren = true;
    };
    
    this.getRandomChild = function() {
	var done = false;
	var r = Math.floor(Math.random() * this.children.length);
	while( ! done )
	{
	    if( !this.children[r].isSelling && !this.children[r].isBuying )
	    {
		done = true;
	    }
	    else
	    {
		r = Math.floor(Math.random() * this.children.length);
	    }
	}
	return this.children[r];
    };
    
    this.getExcludedRandomChild = function(butNotThisOne) {
	var done = false;
	var r = Math.floor(Math.random() * this.children.length);
	while( ! done )
	{
	    if( ! this.children[r].equals( butNotThisOne ) 
		&& !this.children[r].isSelling && !this.children[r].isBuying )
	    {
		done = true;
	    }
	    else
	    {
		r = Math.floor(Math.random() * this.children.length);
	    }
	}
	return this.children[r];
    };
    
    this.equals = function(other)
    {
	if( this.x == other.x && this.y == other.y )
	{
	    return true;
	}
	return false;
    };

    this.render = function(ctx) {
	// yellow: FFFF00
	/* draw a circle centered on the x and y */
	if( this.isSpawn )
	{
	    ctx.fillStyle="#00FF00";
	}
	else if ( this.isExit )
	{
	    ctx.fillStyle="#FF0000";
	}
	/*
	else if ( this.isSelling )
	{
	    ctx.fillStyle="#00CCFF";
	}
	else if ( this.isBuying )
	{
	    ctx.fillStyle="#FF6600";
	} */
	else if ( this.isQueue )
	{
	    if ( this.isBlocked )
	    {
		ctx.fillStyle="#FFFFFF";
	    }
	    else if ( this.isSelling )
	    {
		ctx.fillStyle="#00CCFF";
	    }
	    else if ( this.isBuying )
	    {
		ctx.fillStyle="#FF6600";
	    }
	    else
	    {
		ctx.fillStyle="#990099";
	    }
	}
	else
	{
	    ctx.fillStyle="#0000FF";
	}
	ctx.beginPath();
	ctx.arc(this.x,this.y,5,0,Math.PI*2,true);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle="#000000";

	var headlen = 10;
	
	for( z in this.children)
	{
	    var tox = this.children[z].x;
	    var toy = this.children[z].y;
	    var fromx = this.x;
	    var fromy = this.y;

	    ctx.beginPath();
	    ctx.moveTo( fromx, fromy );
	    
	    var headlen = 10;   // length of head in pixels
	    var angle = Math.atan2(toy-fromy,tox-fromx);
	    
	    ctx.lineTo(tox, toy);
	    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
	    ctx.moveTo(tox, toy);
	    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
	    
	    ctx.stroke();
	    
	    if( this.shopEmit > 0 )
	    {
		ctx.fillStyle="#FFFFFF";
		ctx.font = "bold 12px sans-serif";
		ctx.fillText( this.shopEmit, x, y - 10 );
	    }
	}
    };

    this.getHighestShopEmitChild = function() {
	var high = -1;
	var result = this.children[0];
	for( var z in this.children  )
	{
	    if( this.children[z].shopEmit > high )
	    {
		high = this.children[z].shopEmit;
		result = this.children[z];
	    }
	}
	return result;
    };

    this.getSellingChild = function() {
	for( var z in this.children )
	{
	    if( this.children[z].isSelling  )
	    {
		return this.children[z];
	    }
	}
	return this.children[0];
    }
    
    this.getBuyingChild = function() {
	for( var z in this.children  )
	{
	    if( this.children[z].isBuying )
	    {
		return this.children[z];
	    }
	}
	return this.children[0];
    }
}

