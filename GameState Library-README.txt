Last updated: July 3, 2012
	
GameState Javascript HTML5 video game development library documentation	
	
				Copyright (C)  2012  Timofey Kondrashov
    Permission is granted to copy, distribute and/or modify this document
    under the terms of the GNU Free Documentation License, Version 1.3
    or any later version published by the Free Software Foundation;
    with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
    A copy of the license is included in the section entitled "GNU
    Free Documentation License".


About the GameState library:
	This library is written completely in virgin Javascript, with no jQuery or other libraries required. It can be
	used as-is, without downloading anything else.
	The GameState library has its name because I can't think of a more clever name for it right now. I may
	rerelease it under another name at some point in the future.
	This library is intended for use ONLY for HTML5 video games for the Google Chrome and Chromium browsers, as
	some of its aspects are unsupported by other popular browsers, such as Mozilla Firefox. If it does work in
	other browsers, that is completely by accident, as I have not tested it anywhere else. This will be fixed in
	the future, but until this notice is removed, do not bother sending me bug reports for other browsers.
	DO, however, email me at any time at timaster@gmail.com if you have any questions, comments, hate mail,
	praise, corrections, or bug reports for this library as you use it to write games on the most recent
	versions of Chrome or Chromium (as of this writing, 20.0.1132.47 is the latest version of Chrome).

	To use the library, you must include all of the components that ship with it inside of an html file, and
	then create a GameState object that serves as the container for all of the library's objects and functions.
	The details of the GameState object and its creation are given below, in the body of the read-me.
	Here is a list of components of the library:
		request_animation_frame.js
		game_state.js
		resources.js
		sprite.js
		animation.js
		sprite_info.js
	Each of these components must be included IN THE ABOVE ORDER for the library to function correctly.


This readme covers the public functions and objects that the library provides. It is intended for use as a guide
while developing games using the GameState library. It does not, therefore, cover the inner workings of each
class and function, except where such information may be useful to a game developer.
In addition, the information here only pertains to the use of the library as proscribed - any use of the library
in ways that are not explicitly recommended should be considered undefined.
It is highly recommended that you, as a developer, look at the sample code provided with this document as you
read through it, to help you understand the intended method of use of the library. This document should help
clarify the specifics of each aspect of the library, but reading the sample code is the best way to understand
the way that all of the parts work together.

* MAIN
	The recommended way to begin the game logic of a game written with the GameState library is to add
	onload="main()" to the body tag of the html file the game is to be run in. This main function needs to be
	written by the developer, and should contain the following.
		1) A declaration of a GameState object, as described in the 'GAMESTATE' section of this document, with
		<width>, <height>, and <FRAME_RATE> passed to the constructor.
		2) A call to the GameState object's <init>.
		3) A call to the GameState object's <loadMode>, passing a LoadingMode object containing of the initial
		loading of the game passed into it as a function.
		4) A call to the GameState object's <setMode>, specifying the name of the LoadingMode just loaded into
		memory.
		5) A call to the GameState object's <start>, signifying the transfer of control to the screens and modes
		of the game logic.
	Finally, you may output an error message stating that if the GameState object's <init> failed, the player
	may need to upgrade to a more modern browser.
	The 5 core steps are, ideally, the only ones that should be run outside of any mode, so that a screen may
	take control as quickly as possible, and the canvas is not left blank for any significant amount of time.

* GAMESTATE
	The GameState constructor takes 3 arguments:

		- width
			An integer specifying the width of the draw data of the canvas, in pixels. This number will adjust
			if and only if a call to <setResolution()> changes the aspect ratio of the displayed canvas. See
			<setResolution()> for details.

		- height
			An integer constant specifying the height of the drawing canvas. This number cannot change, even
			upon calls to <setResolution()>. See <setResolution()> for details.

		- FRAME_RATE
			A positive real number constant specifying the average number of frames per second that the game
			should run at. Some frames may run slightly faster than others, but the engine will ensure that, in
			the long run, the average is maintained.

	The GameState class/namespace contains the following public variables and objects:

		- mouseDown
			If a mouse button is being held down, this is a 2-element Array, where the elements are the x and y
			value, respectively, of the draw data of the canvas that the mouse is hovering over. Otherwise, the
			value is false.
				Use: If the game requires mouse input, then use this with <getCollision> to allow the user to
				interact with the game. In addition, if this is not set to false, that means that the user is
				continually holding the left mouse button down.

		- mousePressed
			If a mouse buttons was up during the previous frame, but is down during this frame, this is a
			2-element Array, where the elements are the x and y value of the draw data of the canvas that the
			mouse is hovering over, respectively. Otherwise, the value is false.
				Use: If the game requires mouse input, then use this with <getCollision> to allow the user to
				interact with the game.

		- keysDown
			An array that stores a value of true at the index of any keys that are being held down. For example,
			keysDown[32] has a value of true if the spacebar is being held down. If a key is not being held
			down, the value at the keyCode index is either undefined or false.
				Use: If the game requires keyboard input, then use this to allow the user to interact with the
				game.

		- keysPressed
			An array that stores a value of true at the index of any keys that were up in the previous frame,
			but are down during this frame. For example, keysDown[32] has a value of true if the spacebar has
			just been pressed. If a key has not been pressed, the value at the keyCode index is undefined.
				Use: If the game requires keyboard input, then use this to allow the user to interact with the
				game.

		- ctx
			This is the canvas context that the game is displayed on. It contains many functions and attributes,
			all of which are described in detail at http://www.w3schools.com/html5/html5_ref_canvas.asp
				Use: The most common use of this object that I foresee is to draw text with ctx.fillText, but a
				developer may choose to use any of the context methods or attributes. Note that ctx.canvas.width
				and ctx.canvas.height may not be equivalent to <width> and <height>, if <setResolution> has been
				called.

		- style
			This is a handle for the style attribute of the DOM element containing the canvas, as defined by the
			<init> function.
				Use: Use this to provide the game with a border, or remove the mouse, or anything you may come
				up with to aesthetically modify the display of the game.

	The GameState class/namespace contains the following public functions:

		- init ( containerID ) : returns boolean
			Takes a single string, which is the id of a DOM element in the document.
			This function removes the contents of the DOM element, and places a canvas of the width and height
			specified in the contructor inside of it. The element is then centered inside its container.
			In addition, this function sets <collisionMap> to a cleared state, and creates event handlers for
			mouse and keyboard input.
			If the browser does not support the HTML5 canvas, this function returns false. Otherwise, it returns
			true.
				Use: Call <init> once a GameState object has been created. If <init> returns false, you must not
				run any more GameState functions, and you may assume that the user's browser does not support
				HTML5, and output an error informing them of that.

		- start ( ) : 
			Begins the game loop. Once <start> has been called, the game will run the current screen as set by
			<setScreen>, <FRAME_RATE> times per second.
				Use: After init() has been called, call start after any game options have been set, and a mode
				has been loaded and set with <loadMode> and <setMode>.

		- getWidth ( ) : returns integer
			Returns the width of the draw data of the canvas.
				Use: The primary envisioned use is to detect the edges of the draw data, but there are sure to
				be many other uses. Use as you desire.

		- getHeight ( ) : returns integer
			Returns the height of the draw data of the canvas.
				Use: The primary envisioned use is to detect the edges of the draw data, but there are sure to
				be many other uses. Use as you desire.

		- setResolution ( x, y, fullscreen, fill ) : 
			Sets the display resolution of the canvas based on the arguments. Calls to this function can change
			the <width> of the draw data, but never the height.
			The width will automatically adjust according to the aspect ratio passed into this resolution.
			If fullscreen is set, then the game will expand until either the x dimension or y dimension of the
			screen is filled.
			If fill is also set, then the game will adjust the <width> of the draw data and the canvas
			automatically to fill the screen completely.
				Use: For changes in resolution only, it is sufficient to set only the first two arguments, e.g.
				setResolution(800,600).
				If you want to make the game fullscreen, then set fill if the aspect ratio of your game is not
				important.
				This function is intuitive. Simply attempt to use it, and what it does should make sense.

		The following functions deal with switching between game modes and screens. For details on how to
		construct modes, see the section titled 'MODES'.

			- loadMode ( mode, modeName ) : 
				Takes an object structured as a mode (see the 'MODE' section), and a string containing a single
				word that may be used later to retreive the object from memory using <setMode>.
					Use: <loadMode> is intended to be called from loading screens, or from <main>. Because
					creating modes is the most time and memory-intensive thing your game is likely to do,
					<loadMode> should be called when making the player wait will be the least obtrusive. When
					you want to load a mode, create it, and pass it to <loadMode> along with a unique handle
					that describes the mode's function. Loading a second mode with the same name will safely
					clear the old mode from memory and replace it with the new one.

			- unloadMode ( modeName ) : 
				Removes a mode from memory that has previously been loaded with <loadMode> with the same value
				of modeName.
					Use: When memory usage is a concern, or you know that a mode will never be used again, you
					may use <unloadMode> to free memory.

			- setMode ( modeName ) : 
				Runs the <init> function of a mode that has previously been loaded with <loadMode> with the same
				value of modeName.
					Use: To gain access to a mode's screens and other variables, use <setMode>, and then
					<setScreen> inside of the mode's <init>. See <init> for details.

			- setScreen ( screen ) :
				Takes a function that will be run <FRAME_RATE> times per second by the engine.
					Use: A mode should call this function whenever it wants to change screenss. For details on how
					to form screens, see the 'MODE' section.

		The following functions deal with the collision map of the GameState engine, which is an array of
		dimensions <width>x<height>, designed to be used in a flexible way to create collision detection in the
		game engine. The collision map may contain any value (or object) for any element, and the developer must
		decide what values best suit their needs.
		The default value of every element of the collision map is null.
		One use of the collision map would be to assign objects in the game individual ID numbers, and to use
		<setCollision> to fill areas of the collision map corresponding to each object with those numbers. Then,
		when the user clicks on an area of the canvas, the developer can use the coordinates from <mousePressed>
		in <getCollision> to figure out what object was clicked, and to perform any desired action upon it.
		It is important to be careful about the order in which the collision map functions are called. Calling 
		<setCollision>, then <clearCollisionMap>, then <getCollision> will always result in <getCollision>
		returning false. Note that there is no requirement for <clearCollisionMap> to be called at all. For
		example, screens with buttons may fill the maps with the locations of the buttons, and then assume that
		the buttons do not move.

			- setCollision ( x, y, value ) : 
				Sets the element of the collision map at the given coordinates to the given value.
					Use: The collision map has a 1-to-1 correspondence with the draw data of the canvas. Use
					<setCollision> to mark particular areas of the canvas as belonging to an object or having a
					particular quality.

			- getCollision ( x , y ) : returns value
				Returns the value of the element of the collision map at the given coordinates.
					Use: Use this function to determine the object present of a particular area of the canvas.

			- clearCollisionMap ( ) : 
				Sets every element of the collision map to its default value of null.
					Use: Use this function to quickly reset the values of every element of the collision map to
					the	default value of null.

		The following functions deal with loading resources into the game. These are the functions located in
		resources.js. Each of these functions has a filepath that you may want to modify to suit the needs of your
		game. See the section titled 'FOLDER STRUCTURE' for details.

			-getImage ( imageName ) : returns Image object
				This function loads an image with the given name from the path for static images. It returns the
				image as an Image object, with the extra functions described in the 'IMAGE' section.
				The default path for static images is 'res/img/static/'.
					Use: Load static images into memory, to draw with draw()

			-getSound ( soundName ) : returns Audio object
				This function returns an Audio object, with the extra functions described in the 'AUDIO' section.
				The default path for sound effects is 'res/audio/sfx/'.
					Use: Load sound effects into memory, to play with play()

			-getSong ( songName ) : returns Audio object
				This function returns an Audio object that is set to loop by default, and with the extra functions
				described in the 'AUDIO' section.
				The default path for music is 'res/audio/music/'.
					Use: Load music into memory, to play with play()

			-getSprite ( spriteName ) : returns Sprite object
				This function reads the rules for a sprite with the given name from the <spriteInfo> object
				described in the 'SPRITE INFO' section, and loads them into a Sprite object as described in the
				'SPRITE' section.
				The default path for sprites is 'res/img/sprites/'.
					Use: Load images with animations into memory, to draw with draw()

* MODE
	A mode is an object, the specific construction of which is up to the developer. The engine comes with a
	single provided mode, the <LoadingMode>, but there is no requirement that other modes resemble it. The only
	requirements for a mode are that it must contain an <init> and <destroy> function.

	- LoadingMode
		LoadingMode is a special mode that comes with the library, and it is provided to make loading screens
		easier for the developer to code, as well as to be an example of a simple mode and a simple way of
		structuring modes.
		The constructor for LoadingMode takes 2 arguments - an array of arrays called <loadingFunctions> and a
		GameState object called <gs>.

			-loadingFunctions
				This is a 2-dimensional array - an array of arrays. Each array in loadingFunctions has 2 elements.
					1) A function, which will run after all of the functions in the previous arrays have
					completed.
					2) A string that will be displayed on the screen while the function is running.
				<loadingFunctions> allows a developer to provide as much or as little information about what the
				game is loading while the player waits for the game to load. Because the library does not yet
				support networking, loading times should be extremely fast, and it may not be necessary to use
				more than one function with the string 'Loading...'.

			-gs
				This is provided as a way for the mode to access the GameState object that the game is using, so
				that <LoadingMode> has access to the canvas context of the game, the <setScreen> function, and
				the <getWidth> and <getHeight> functions.

	Below are the specifications for writing your own modes.

		1) Every mode must have access to the GameState object that the game is using. The easiest way to give
		modes access is to pass the GameState object as an argument to the constructor.

		2) All modes must have <init> and <destroy> functions.

			- init ( ) : 
				Must contain a call to <setScreen>, to ensure that the game logic changes to this mode. In
				addition, any loading that was not done in the constructor of the mode may be done here. It is
				recommended that loading done in the <init> function rather than the constructor account for
				multiple calls to <init> after only a single call to the constructor. For example, a Pac-Man
				game may load the images to draw the walls of a level in the constructor, but place the dots on
				the level in <init>. Then, calls to <init> will place the dots where they should be without
				having to reload the walls. Putting either the dot placement in the constructor or the wall
				image loading in <init> would force unnecessary loading time.

			- destroy ( ) : 
				A destructor for the mode. This function should call the <destroy> method of every object it
				contains that has a <destroy> method, especially for those resources that are loaded using the
				resource loading functions of a GameState object. If an object does not have a <destroy> method,
				then it must be deleted using the delete keyword. If this destructor is not complete, then
				<unloadMode> may leak unnecessary memory.

		3) All modes must have access to functions called screens, which are the essential blocks of code that
		run game logic. A screen function, once passed to a GameState object through the GameState object's
		<setScreen> function, will be run up to <FRAME_RATE> times per second. Therefore, screens should
		generally contain only such operations that can consistently run in only a few milliseconds. A screen's
		duties include:
			- Processing user input (if any).
			- Calculating the values of game variables, such as the positions of game objects.
			- Registering sprites and images to draw with their <draw> functions.
			- Deciding if the screen should end on a particular frame, and then making a call either to the 
				GameState object's <setScreen> or <setMode>.
		In a game written with the GameState library, every game logic task is performed inside of a screen
		function.

* IMAGE
	Any Image objects created after a GameState object has been created, in particular those returned by the
	<getImage> function, have additional methods in addition to those that they have by default.

	- draw ( x, y, horizontalFlip, rotation, scaling ) : 
		Registers the image with the GameState object to be drawn at the end of the current frame.
			Use: Whenever you want to display an Image, use this function to draw it with the desired properties.

	- destroy ( ) : 
		Removes the Image from memory. This is identical to using delete, but allows the developer to consistently
		use destroy for all objects.
			Use: Call this in the <destroy> methods of modes that load the image in their constructors, or when
			you otherwise needs to free an image from memory.

* SPRITE
	<getSprite> returns a Sprite object, which contains a a full set of images and animations, which are loaded
	according to rules in the <spriteInfo> object. Each Sprite object has the following functions:

	-draw ( x, y, horizontalFlip, rotation, scaling ) : 
		Registers the current image of the current animation of the sprite with the GameState object to be drawn
		at the end of the current frame, and then sets the next image as the current image.
	-setAnim ( animName ) : 
		Takes a name of an animation that the sprite has, as defined in the <spriteInfo> object. The next call
		to <draw> will draw the first frame of this animation, and subsequent calls will cycle through the
		animation.
	-destroy ( ) : 
		Removes the sprite from memory, including every image and data structure contained inside it.
			Use: Call this in the <destroy> methods of modes that load the sprite in their constructors, or when
			you otherwise need to free a sprite from memory.

* AUDIO
	Any Audio objects created after a GameState object has been created, in particular those returned by the
	<getSound> and <getSong> functions, have additional methods in addition to those that they have by default.

	-stop ( ) : 
		Stops the Audio object if it is playing.
			Use: Sounds cannot play simulteneously in HTML5 without some workarounds. If you want to play a
			sound that is already playing, first call <stop> and then play the sound. Also, you can simply stop
			sounds if you need to with <stop>.

	-destroy ( ) : 
		Removes the Audio object from memory. This is identical to using delete, but allows the developer to
		consistently use destroy for all objects.
			Use: Call this in the <destroy> methods of modes that load the sound in their constructors, or when
			you otherwise needs to free a sound from memory.
				
* FOLDER STRUCTURE
	The library is designed to be compact and not to require any modification, but there are some hardcoded
	filepaths that a developer may wish to modify. These filepaths are in the resource loading functions of
	the library, located in resources.js.

		- getImage, getSound, getSong
			These functions get resources from a path which is hardcoded into their body. If you want to change
			the folder structure of your game, it will be necessary to modify these functions so that they can
			find the files you need for you. In addition, you may add your own similar functions (ex:
			getBgImage) to help you achieve the folder structure your project needs.

		- getSprite
			Like the functions above, this function gets images from a hardcoded path, which you may change to
			adapt to your folder structure. However, this function must also read the included <spriteInfo> object
			and must load multiple files at once, from a relatively complex folder structure, and load them into
			GameState objects in a proper order. If you understand the function, and the way the Sprite and
			Animation classes work, then you should feel free to completely rewrite this function to fit your
			needs. However, it is recommended that you only change the root file path unless you are confident
			that you know what you are doing. For details on how the function reads the path of each frame of
			each animation of each sprite, and how you should structure the paths of your own sprite objects,
			see the section titled 'SPRITE INFO'.

	For the default filepaths used by each function, see the part of the 'GAMESTATE' section devoted to resource
	loading functions, or look at the source code in resources.js.

* SPRITE INFO
	One of the core components of the library that must be modified for almost any game is the <spriteInfo> object
	contained in sprite_info.js. This is a JSON object which is designed to be easy, albeit with some learning
	curve, for a developer to modify, and to make both simple and complex animations easy to create.
	If you have no prior knowledge of JSON, you should look at http://json.org/ for reference. It is not as
	complicated as it may appear.
	The object dictates a precise folder structure which must be used past the root folder of all of the
	sprites, as described in the 'FOLDER STRUCTURE' section.
	- The spriteInfo object may contain any number of values inside of it.
		- The name of each value must be a string which represents the name of the sprite, and also of the first
		folder in the sprite folder hierarchy past the root folder. eg 'res/img/sprite/spriteName/'
		- Each value must be an object, which represents animation data for the sprite with the given name. This
		object must contain at least one value.
			- The name of each value must be a string which represents the name of the animation, and also of
			the second folder in the sprite folder hierarchy past the root folder. eg
			'res/img/sprite/spriteName/animationName'.
			- Each value must be an object which contains four values, named "next", "images", "durations", and
			"offsets".
				- The value of "next" in each animation must be a string, which represents the name of the
				animation that the sprite should display if the current animation should end. If the value of
				the string is "", then the animation will repeat when it ends. For every value of "next" in
				every object in the "sprite" array, there must be an object with a matching value of "name".
				- The value of "images" in each animation must be a positive integer, which represents the
				number of images that each animation consists of. Each image must be a png named by its number
				in the animation and must be in the folder of its animation name. eg
				'res/img/sprite/spriteName/animationName/0.png'
				- The value of "durations" in each animation must be an array, the length of which is equal to
				the value of "images".
					- Each element of the "durations" array must be a positive integer, which represents the
					number of calls to the <draw> function of the sprite that must be made before the next image
					of the animation is displayed. For example, if the 3rd element of the "durations" array is
					6, then the image 3.png belonging to the current animation will be displayed for 6 frames,
					assuming that a call to this Sprite's <draw> function is made once per frame.
				- The value of "offsets" in each animation must be an array, the length of which is equal to the
				value of "images".
					- Each element of the "offsets" array must be an array of 2 elements, which represent the x
					and y offset at which each image must be displayed. For example, if the 3rd element of the
					"offsets" array is [-5,-5], then the image 3.png belonging to the current animation will be
					displayed 5 pixels higher and 5 pixels farther to the left than any images for which the
					offset is [0,0].

	These rules are long not because they are complicated, but because the explanation is exhaustive. By reading
	the sample code and playing with the values of the spriteInfo object included with it, you should be able to
	understand how to create your own animations of varying complexity. However, keep in mind that JSON syntax is
	unforgiving, and make sure to avoid common mistakes, such as ending arrays or objects with a comma. eg
	'[element, element,]' instead of '[element,element]', or using single quotes instead of double quotes to write
	value names.

That's it! If there are any questions that you have which are not immediately answered by the sample code or by
this README, make sure to IMMEDIATELY and WITHOUT HESITATION e-mail me at timaster@gmail.com . My goal is to
make using my library easy for anybody who may want to do so, and if something is unclear for any reason, that
is my fault and not yours.
This is doubly true if something simply does not work, as I almost undoubtedly have bugs in my code that need
fixing.
Finally, if you are satisfied with the library and have found it useful, please feel free to tell me so as well!
I would love to know that the work I've put into this has paid off for somebody.

*GNU FREE DOCUMENTATION LICENSE

Version 1.3, 3 November 2008

Copyright © 2000, 2001, 2002, 2007, 2008 Free Software Foundation, Inc. <http://fsf.org/>

Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not
allowed.

0. PREAMBLE
The purpose of this License is to make a manual, textbook, or other functional and useful document "free" in the
sense of freedom: to assure everyone the effective freedom to copy and redistribute it, with or without
modifying it, either commercially or noncommercially. Secondarily, this License preserves for the author and
publisher a way to get credit for their work, while not being considered responsible for modifications made by
others.

This License is a kind of "copyleft", which means that derivative works of the document must themselves be free
in the same sense. It complements the GNU General Public License, which is a copyleft license designed for free
software.

We have designed this License in order to use it for manuals for free software, because free software needs free
documentation: a free program should come with manuals providing the same freedoms that the software does. But
this License is not limited to software manuals; it can be used for any textual work, regardless of subject
matter or whether it is published as a printed book. We recommend this License principally for works whose
purpose is instruction or reference.

1. APPLICABILITY AND DEFINITIONS
This License applies to any manual or other work, in any medium, that contains a notice placed by the copyright
holder saying it can be distributed under the terms of this License. Such a notice grants a world-wide,
royalty-free license, unlimited in duration, to use that work under the conditions stated herein. The
"Document", below, refers to any such manual or work. Any member of the public is a licensee, and is addressed
as "you". You accept the license if you copy, modify or distribute the work in a way requiring permission under
copyright law.

A "Modified Version" of the Document means any work containing the Document or a portion of it, either copied
verbatim, or with modifications and/or translated into another language.

A "Secondary Section" is a named appendix or a front-matter section of the Document that deals exclusively with
the relationship of the publishers or authors of the Document to the Document's overall subject (or to related
matters) and contains nothing that could fall directly within that overall subject. (Thus, if the Document is in
part a textbook of mathematics, a Secondary Section may not explain any mathematics.) The relationship could be
a matter of historical connection with the subject or with related matters, or of legal, commercial,
philosophical, ethical or political position regarding them.

The "Invariant Sections" are certain Secondary Sections whose titles are designated, as being those of Invariant
Sections, in the notice that says that the Document is released under this License. If a section does not fit
the above definition of Secondary then it is not allowed to be designated as Invariant. The Document may contain
zero Invariant Sections. If the Document does not identify any Invariant Sections then there are none.

The "Cover Texts" are certain short passages of text that are listed, as Front-Cover Texts or Back-Cover Texts,
in the notice that says that the Document is released under this License. A Front-Cover Text may be at most 5
words, and a Back-Cover Text may be at most 25 words.

A "Transparent" copy of the Document means a machine-readable copy, represented in a format whose specification
is available to the general public, that is suitable for revising the document straightforwardly with generic
text editors or (for images composed of pixels) generic paint programs or (for drawings) some widely available
drawing editor, and that is suitable for input to text formatters or for automatic translation to a variety of
formats suitable for input to text formatters. A copy made in an otherwise Transparent file format whose markup,
or absence of markup, has been arranged to thwart or discourage subsequent modification by readers is not
Transparent. An image format is not Transparent if used for any substantial amount of text. A copy that is not
"Transparent" is called "Opaque".

Examples of suitable formats for Transparent copies include plain ASCII without markup, Texinfo input format,
LaTeX input format, SGML or XML using a publicly available DTD, and standard-conforming simple HTML, PostScript
or PDF designed for human modification. Examples of transparent image formats include PNG, XCF and JPG. Opaque
formats include proprietary formats that can be read and edited only by proprietary word processors, SGML or XML
for which the DTD and/or processing tools are not generally available, and the machine-generated HTML,
PostScript or PDF produced by some word processors for output purposes only.

The "Title Page" means, for a printed book, the title page itself, plus such following pages as are needed to
hold, legibly, the material this License requires to appear in the title page. For works in formats which do not
have any title page as such, "Title Page" means the text near the most prominent appearance of the work's title,
preceding the beginning of the body of the text.

The "publisher" means any person or entity that distributes copies of the Document to the public.

A section "Entitled XYZ" means a named subunit of the Document whose title either is precisely XYZ or contains
XYZ in parentheses following text that translates XYZ in another language. (Here XYZ stands for a specific
section name mentioned below, such as "Acknowledgements", "Dedications", "Endorsements", or "History".) To
"Preserve the Title" of such a section when you modify the Document means that it remains a section "Entitled
XYZ" according to this definition.

The Document may include Warranty Disclaimers next to the notice which states that this License applies to the
Document. These Warranty Disclaimers are considered to be included by reference in this License, but only as
regards disclaiming warranties: any other implication that these Warranty Disclaimers may have is void and has
no effect on the meaning of this License.

2. VERBATIM COPYING
You may copy and distribute the Document in any medium, either commercially or noncommercially, provided that
this License, the copyright notices, and the license notice saying this License applies to the Document are
reproduced in all copies, and that you add no other conditions whatsoever to those of this License. You may not
use technical measures to obstruct or control the reading or further copying of the copies you make or
distribute. However, you may accept compensation in exchange for copies. If you distribute a large enough number
of copies you must also follow the conditions in section 3.

You may also lend copies, under the same conditions stated above, and you may publicly display copies.

3. COPYING IN QUANTITY
If you publish printed copies (or copies in media that commonly have printed covers) of the Document, numbering
more than 100, and the Document's license notice requires Cover Texts, you must enclose the copies in covers
that carry, clearly and legibly, all these Cover Texts: Front-Cover Texts on the front cover, and Back-Cover
Texts on the back cover. Both covers must also clearly and legibly identify you as the publisher of these
copies. The front cover must present the full title with all words of the title equally prominent and visible.
You may add other material on the covers in addition. Copying with changes limited to the covers, as long as
they preserve the title of the Document and satisfy these conditions, can be treated as verbatim copying in
other respects.

If the required texts for either cover are too voluminous to fit legibly, you should put the first ones listed
(as many as fit reasonably) on the actual cover, and continue the rest onto adjacent pages.

If you publish or distribute Opaque copies of the Document numbering more than 100, you must either include a
machine-readable Transparent copy along with each Opaque copy, or state in or with each Opaque copy a
computer-network location from which the general network-using public has access to download using
public-standard network protocols a complete Transparent copy of the Document, free of added material. If you
use the latter option, you must take reasonably prudent steps, when you begin distribution of Opaque copies in
quantity, to ensure that this Transparent copy will remain thus accessible at the stated location until at least
one year after the last time you distribute an Opaque copy (directly or through your agents or retailers) of
that edition to the public.

It is requested, but not required, that you contact the authors of the Document well before redistributing any
large number of copies, to give them a chance to provide you with an updated version of the Document.

4. MODIFICATIONS
You may copy and distribute a Modified Version of the Document under the conditions of sections 2 and 3 above,
provided that you release the Modified Version under precisely this License, with the Modified Version filling
the role of the Document, thus licensing distribution and modification of the Modified Version to whoever
possesses a copy of it. In addition, you must do these things in the Modified Version:

A. Use in the Title Page (and on the covers, if any) a title distinct from that of the Document, and from those
of previous versions (which should, if there were any, be listed in the History section of the Document). You
may use the same title as a previous version if the original publisher of that version gives permission.
B. List on the Title Page, as authors, one or more persons or entities responsible for authorship of the
modifications in the Modified Version, together with at least five of the principal authors of the Document (all
of its principal authors, if it has fewer than five), unless they release you from this requirement.
C. State on the Title page the name of the publisher of the Modified Version, as the publisher.
D. Preserve all the copyright notices of the Document.
E. Add an appropriate copyright notice for your modifications adjacent to the other copyright notices.
F. Include, immediately after the copyright notices, a license notice giving the public permission to use the
Modified Version under the terms of this License, in the form shown in the Addendum below.
G. Preserve in that license notice the full lists of Invariant Sections and required Cover Texts given in the
Document's license notice.
H. Include an unaltered copy of this License.
I. Preserve the section Entitled "History", Preserve its Title, and add to it an item stating at least the
title, year, new authors, and publisher of the Modified Version as given on the Title Page. If there is no
section Entitled "History" in the Document, create one stating the title, year, authors, and publisher of the
Document as given on its Title Page, then add an item describing the Modified Version as stated in the previous
sentence.
J. Preserve the network location, if any, given in the Document for public access to a Transparent copy of the
Document, and likewise the network locations given in the Document for previous versions it was based on. These
may be placed in the "History" section. You may omit a network location for a work that was published at least
four years before the Document itself, or if the original publisher of the version it refers to gives permission.
K. For any section Entitled "Acknowledgements" or "Dedications", Preserve the Title of the section, and preserve
in the section all the substance and tone of each of the contributor acknowledgements and/or dedications given
therein.
L. Preserve all the Invariant Sections of the Document, unaltered in their text and in their titles. Section
numbers or the equivalent are not considered part of the section titles.
M. Delete any section Entitled "Endorsements". Such a section may not be included in the Modified Version.
N. Do not retitle any existing section to be Entitled "Endorsements" or to conflict in title with any Invariant
Section.
O. Preserve any Warranty Disclaimers.
If the Modified Version includes new front-matter sections or appendices that qualify as Secondary Sections and
contain no material copied from the Document, you may at your option designate some or all of these sections as
invariant. To do this, add their titles to the list of Invariant Sections in the Modified Version's license
notice. These titles must be distinct from any other section titles.

You may add a section Entitled "Endorsements", provided it contains nothing but endorsements of your Modified
Version by various parties—for example, statements of peer review or that the text has been approved by an
organization as the authoritative definition of a standard.

You may add a passage of up to five words as a Front-Cover Text, and a passage of up to 25 words as a Back-Cover
Text, to the end of the list of Cover Texts in the Modified Version. Only one passage of Front-Cover Text and
one of Back-Cover Text may be added by (or through arrangements made by) any one entity. If the Document already
includes a cover text for the same cover, previously added by you or by arrangement made by the same entity you
are acting on behalf of, you may not add another; but you may replace the old one, on explicit permission from
the previous publisher that added the old one.

The author(s) and publisher(s) of the Document do not by this License give permission to use their names for
publicity for or to assert or imply endorsement of any Modified Version.

5. COMBINING DOCUMENTS
You may combine the Document with other documents released under this License, under the terms defined in
section 4 above for modified versions, provided that you include in the combination all of the Invariant
Sections of all of the original documents, unmodified, and list them all as Invariant Sections of your combined
work in its license notice, and that you preserve all their Warranty Disclaimers.

The combined work need only contain one copy of this License, and multiple identical Invariant Sections may be
replaced with a single copy. If there are multiple Invariant Sections with the same name but different contents,
make the title of each such section unique by adding at the end of it, in parentheses, the name of the original
author or publisher of that section if known, or else a unique number. Make the same adjustment to the section
titles in the list of Invariant Sections in the license notice of the combined work.

In the combination, you must combine any sections Entitled "History" in the various original documents, forming
one section Entitled "History"; likewise combine any sections Entitled "Acknowledgements", and any sections
Entitled "Dedications". You must delete all sections Entitled "Endorsements".

6. COLLECTIONS OF DOCUMENTS
You may make a collection consisting of the Document and other documents released under this License, and
replace the individual copies of this License in the various documents with a single copy that is included in
the collection, provided that you follow the rules of this License for verbatim copying of each of the documents
in all other respects.

You may extract a single document from such a collection, and distribute it individually under this License,
provided you insert a copy of this License into the extracted document, and follow this License in all other
respects regarding verbatim copying of that document.

7. AGGREGATION WITH INDEPENDENT WORKS
A compilation of the Document or its derivatives with other separate and independent documents or works, in or
on a volume of a storage or distribution medium, is called an "aggregate" if the copyright resulting from the
compilation is not used to limit the legal rights of the compilation's users beyond what the individual works
permit. When the Document is included in an aggregate, this License does not apply to the other works in the
aggregate which are not themselves derivative works of the Document.

If the Cover Text requirement of section 3 is applicable to these copies of the Document, then if the Document
is less than one half of the entire aggregate, the Document's Cover Texts may be placed on covers that bracket
the Document within the aggregate, or the electronic equivalent of covers if the Document is in electronic form.
Otherwise they must appear on printed covers that bracket the whole aggregate.

8. TRANSLATION
Translation is considered a kind of modification, so you may distribute translations of the Document under the
terms of section 4. Replacing Invariant Sections with translations requires special permission from their
copyright holders, but you may include translations of some or all Invariant Sections in addition to the
original versions of these Invariant Sections. You may include a translation of this License, and all the
license notices in the Document, and any Warranty Disclaimers, provided that you also include the original
English version of this License and the original versions of those notices and disclaimers. In case of a
disagreement between the translation and the original version of this License or a notice or disclaimer, the
original version will prevail.

If a section in the Document is Entitled "Acknowledgements", "Dedications", or "History", the requirement
(section 4) to Preserve its Title (section 1) will typically require changing the actual title.

9. TERMINATION
You may not copy, modify, sublicense, or distribute the Document except as expressly provided under this
License. Any attempt otherwise to copy, modify, sublicense, or distribute it is void, and will automatically
terminate your rights under this License.

However, if you cease all violation of this License, then your license from a particular copyright holder is
reinstated (a) provisionally, unless and until the copyright holder explicitly and finally terminates your
license, and (b) permanently, if the copyright holder fails to notify you of the violation by some reasonable
means prior to 60 days after the cessation.

Moreover, your license from a particular copyright holder is reinstated permanently if the copyright holder
notifies you of the violation by some reasonable means, this is the first time you have received notice of
violation of this License (for any work) from that copyright holder, and you cure the violation prior to 30 days
after your receipt of the notice.

Termination of your rights under this section does not terminate the licenses of parties who have received
copies or rights from you under this License. If your rights have been terminated and not permanently
reinstated, receipt of a copy of some or all of the same material does not give you any rights to use it.

10. FUTURE REVISIONS OF THIS LICENSE
The Free Software Foundation may publish new, revised versions of the GNU Free Documentation License from time
to time. Such new versions will be similar in spirit to the present version, but may differ in detail to address
new problems or concerns. See http://www.gnu.org/copyleft/.

Each version of the License is given a distinguishing version number. If the Document specifies that a
particular numbered version of this License "or any later version" applies to it, you have the option of
following the terms and conditions either of that specified version or of any later version that has been
published (not as a draft) by the Free Software Foundation. If the Document does not specify a version number of
this License, you may choose any version ever published (not as a draft) by the Free Software Foundation. If the
Document specifies that a proxy can decide which future versions of this License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you to choose that version for the Document.

11. RELICENSING
"Massive Multiauthor Collaboration Site" (or "MMC Site") means any World Wide Web server that publishes
copyrightable works and also provides prominent facilities for anybody to edit those works. A public wiki that
anybody can edit is an example of such a server. A "Massive Multiauthor Collaboration" (or "MMC") contained in
the site means any set of copyrightable works thus published on the MMC site.

"CC-BY-SA" means the Creative Commons Attribution-Share Alike 3.0 license published by Creative Commons
Corporation, a not-for-profit corporation with a principal place of business in San Francisco, California, as
well as future copyleft versions of that license published by that same organization.

"Incorporate" means to publish or republish a Document, in whole or in part, as part of another Document.

An MMC is "eligible for relicensing" if it is licensed under this License, and if all works that were first
published under this License somewhere other than this MMC, and subsequently incorporated in whole or in part
into the MMC, (1) had no cover texts or invariant sections, and (2) were thus incorporated prior to November 1,
2008.

The operator of an MMC Site may republish an MMC contained in the site under CC-BY-SA on the same site at any
time before August 1, 2009, provided the MMC is eligible for relicensing.

ADDENDUM: How to use this License for your documents

To use this License in a document you have written, include a copy of the License in the document and put the
following copyright and license notices just after the title page:

    Copyright (C)  YEAR  YOUR NAME.
    Permission is granted to copy, distribute and/or modify this document
    under the terms of the GNU Free Documentation License, Version 1.3
    or any later version published by the Free Software Foundation;
    with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
    A copy of the license is included in the section entitled "GNU
    Free Documentation License".
If you have Invariant Sections, Front-Cover Texts and Back-Cover Texts, replace the "with … Texts." line with
this:

    with the Invariant Sections being LIST THEIR TITLES, with the
    Front-Cover Texts being LIST, and with the Back-Cover Texts being LIST.
If you have Invariant Sections without Cover Texts, or some other combination of the three, merge those two
alternatives to suit the situation.

If your document contains nontrivial examples of program code, we recommend releasing these examples in parallel
under your choice of free software license, such as the GNU General Public License, to permit their use in free
software.