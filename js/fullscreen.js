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

/* not used - was going to use this to run web app full screen on tablets, but this doesn't work */

function enterFullscreen() {
    var elem = document.querySelector("#fs");
    if (elem.requestFullScreen) {
	elem.requestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
	elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if(elem.mozRequestFullScreen) {
	elem.mozRequestFullScreen();
    }
    document.getElementById('enter-exit-fs').onclick = exitFullscreen;
}

function exitFullscreen() {
    if( document.cancelFullScreen )
    {
	document.cancelFullScreen();
    } else if ( document.webkitCancelFullScreen )
    {
	document.webkitCancelFullScreen();
    } else if ( document.mozCancelFullScreen )
    {
	document.mozCancelFullScreen();
    }     
    document.getElementById('enter-exit-fs').onclick = enterFullscreen;
}
