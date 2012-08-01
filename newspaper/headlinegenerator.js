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


function generateContent()
{
    var index = 0;
    var unique_list = [];
    
    generateHeadline();
    
    var j = (Math.floor(Math.random() * 3) + 5);
    
    for(z=0; z<j; z++ )
    {
	index = Math.floor(Math.random() * titles.length);
	while( (unique_list.indexOf(index) > -1) )
	{
	    index = Math.floor(Math.random() * titles.length);
	}
	unique_list.push(index);
	generateArticle(false, index);
    }
}

function generateHeadline()
{
    var articleklass = "article mainarticle";
    var headerklass="articletitle maintitle";
    
    var title = "headline goes here";
    var subheader = "subheader goes here";

    var title_array = headlines[ Math.floor(Math.random() * headlines.length) ];

    title = title_array[0];    
    subheader = title_array[1][ Math.floor(Math.random() * title_array[1].length) ];
    
    var header = "<div id=\"headline\">" + convertRawTitle(title) + "</div>";
    var article = "<div class=\"" + articleklass + "\"><div class=\"" + headerklass + "\">" + convertRawTitle(subheader) + "</div>" + loremIpsumParagraph((Math.floor(Math.random() * 30) + 20)) + "</div>";
    
    document.write( header );
    document.write( article );    
}

function generateArticle(mainArticle, titleindex)
{
    var articleklass = "article";
    var headerklass="articletitle";
    var title = "Blah blah blah";
    var subheader = "Blah blah blah";
    
    if( mainArticle )
    {
	articleklass += " mainarticle";
	headerklass += " maintitle";
    }
    else
    {
	headerklass += " title" + (Math.floor(Math.random() * 4) + 1);
    }
    
    title = "Upset at castle";
    subheader = generateTitle(titleindex);
    
    var header = "<div id=\"headline\">" + title + "</div>";
    var article = "<div class=\"" + articleklass + "\"><div class=\"" + headerklass + "\">" + subheader + "</div>" + loremIpsumParagraph((Math.floor(Math.random() * 50) + 20)) + "</div>";
    
    if( mainArticle )
    {
	document.write( header );
    }
    document.write( article );
}

function generateTitle(titleindex)
{
    /* pick a random title */
    var index = titleindex; /* Math.floor(Math.random() * titles.length); */

    var rawtitle = titles[index];
    
    var result = rawtitle;
    
    /* return the finished result */
    return convertRawTitle(result);
}

function convertRawTitle(text)
{
    var result = text;
    
    /* find all the variable elements in the title */
    var keys = findVariableElements(text);
    
    /* loop over the variable elements */
    for(i=0; i<keys.length; i++)
    {
	/* this returns a list of possible values from the hashmap */
	var values = titlesmap.get(keys[i]);
	
	/* pick one at random */
	var value = values[ Math.floor(Math.random() * values.length)  ];
	
	/* replace each variable element of the title with a random value */
	result = result.replace(keys[i], value);
    }
    /* return the finished result */
    return result;
}

function findVariableElements(value)
{
    var result = [];
    
    var findStart = true;
    var start = 0;
    var end = 0;

    for(i=0; i<value.length; i++)
    {	
	if( findStart )
	{
	    if( value.charAt(i) == "[" )
	    {
		start = i;
		findStart = false;
	    }
	}
	if( !findStart )
	{
	    if( value.charAt(i) == "]" )
	    {
		end = i;		
		findStart = true;
		result.push( value.substr(start,end-start+1) );
	    }
	}
    } 

    return result;
}