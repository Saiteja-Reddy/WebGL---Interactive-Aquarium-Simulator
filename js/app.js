var canvas;
var mybox;
var mypond;
var egg;
var bubble;
var texbox;
var rock1;
var rock2;
var rock3;
var tower;
var foodparticle;

var boxTexture;
var rock1Texture;
var rock2Texture;
var rock3Texture;
var fishtexture;
var fish2texture;
var fish3texture;
var fish22texture;
var fish32texture;
var shipTexture;
var baseTexture;
var grassTexture;
var sharkTexture;
var oxyTexture;
var planeTexture;

var myshark;
var myfish;
var myfish2;
var myfish3;
var myship;
var base;
var grass;
var oxy;
var plane;

var rotation = -5;
var rflag = -1;

var camx = -1, camy = 10, camz = -21;
// var camx = 38, camy = 30, camz = 129;

var currentx = 0.1;
var currentz = 0.1;

var fishcolors = 1;

var view = 1;
var selectedfish = -1;

var dimx = 25, dimy = 25, dimz = 25;	

var l1=0,l2=0,l3=0,u1=0,u2=1,u3=0;

var fishes = [];
var eggs = [];
var bubbles = [];
var foods =[];
var pebbles =[];
var grasses =[];

document.addEventListener('keydown', function(event) {
	if(gamestarted)
	{
		    if(event.keyCode == 37) {
		        // alert('Left was pressed');
		        camx += 1;        
		    }
		    else if(event.keyCode == 38) {
		        // alert('Up was pressed');
		        camy += 1;        
		    }
		    else if(event.keyCode == 39) {
		        // alert('Right was pressed');
		        camx -= 1;        
		    }
		    else if(event.keyCode == 40) {
		        // alert('Down was pressed');
		        camy -= 1;        
		    }
		    else if(event.keyCode == 80) {
		        // alert('Down was pressed');
		        console.log("cam: " + camx + " " + camy + " " + camz);
		    }    
		    else if(event.keyCode == 88) {
		        // alert('x was pressed');
		        camz += 1;        
		    }   
		    else if(event.keyCode == 90) {
		        // alert('z was pressed');
		        camz -= 1;        
		    }        
		    else if(event.keyCode == 67) {
		        // alert('z was pressed');
				 selectedfish = -1;
				 camx = 44; camy = 10; camz = 109;
				 l1=44 ; l2=0; l3=0; u1=0; u2=1; u3=0;
				 var myimg = document.getElementById('selected-fish');
				 myimg.src = imagesrc[0];
				 var mytext = document.getElementById('matext');
			     mytext.innerHTML = textsrc[0];	 		             
		    }        		     
		    else if(event.keyCode == 65 && selectedfish != -1) {
		        // alert('A was pressed');
		        // mytheta += 0.1 * 2/(myr+2);        
		        fishes[selectedfish].mytheta += 5;        
		        // console.log(fishes[selectedfish].mytheta);        
		    }   
		    else if(event.keyCode == 83 && selectedfish != -1) {
		        // alert('S was pressed');
		        // myphi += 0.1 * 2/(myr+2);        
		        fishes[selectedfish].myphi += 5;        
		    }       
		    else if(event.keyCode == 68 && selectedfish != -1) {
		        // alert('D was pressed');
		        // mytheta -= 0.1 * 2/(myr+2);        
		        fishes[selectedfish].mytheta -= 5;        
		    } 
		    else if(event.keyCode == 87 && selectedfish != -1) {
		        // alert('W was pressed');
		        // myphi -= 0.1 * 2/(myr+2);        
		        fishes[selectedfish].myphi -= 5 ;        
		    }
		    else if(event.keyCode == 16 && selectedfish != -1) {
		        // alert('E was pressed');
		        fishes[selectedfish].myvel += 0.01;                
		    } 
		    else if(event.keyCode == 81 && selectedfish != -1) {
		        // alert('E was pressed');
		        fishes.splice(selectedfish,1);
		        selectedfish = -1;
		    }  
		    else if(event.keyCode == 82) {
		    	fishcolors = (fishcolors == 1)? 2 : 1;
		    }
		    else if(event.keyCode == 17 && selectedfish == -1) {
				 camx = -1; camy = 10; camz = -21;
				 l1=0 ; l2=0; l3=0; u1=0; u2=1; u3=0;
		    }		     
		    else if(event.keyCode == 70)   
		    {
		    	// selectedfish = (selectedfish == -1)?0:-1;
		    	selectedfish += 1;
		    	// console.log('Here');
		    	if(selectedfish >= fishes.length)
		    	{
		    		selectedfish = -1;
		    	}


		    	if(selectedfish != -1)
		    	{
		    		var mytype = fishes[selectedfish].types;
		    		var myimg = document.getElementById('selected-fish');
		    		myimg.src = imagesrc[mytype];
		    		var mytext = document.getElementById('matext');
		    		mytext.innerHTML = textsrc[mytype];

		    	}
		    	else
		    	{
		    		var myimg = document.getElementById('selected-fish');
		    		myimg.src = imagesrc[0];
		    		var mytext = document.getElementById('matext');
		    		mytext.innerHTML = textsrc[0];		    		
		    	}

		    	console.log("Selected Fish: " + selectedfish);
		    }
		    else if(event.keyCode == 32 && selectedfish != -1)
		    {
		    	if(fishes[selectedfish].types != 4)
		    		eggs.push({types: fishes[selectedfish].types ,x : fishes[selectedfish].myx , y : fishes[selectedfish].myy, z : fishes[selectedfish].myz, time: 0});
		    }
		    else if(event.keyCode == 66) 
		    {
		    	if(selectedfish == -1)
		    	{
		    		var testnum = randomFromInterval(1,1);
		    		if(testnum == 1)
		    		{
						var snd = new Audio("media/bubbling.mp3");
						snd.play();       			
		    			bubbles.push({x : -16.7 , y : -10, z : 19.5, size : 0.4});
		    			// bubbles.push({x : -16.7 , y : -11, z : 19.5, size : 0.4});
		    			bubbles.push({x : -16.7 , y : -12, z : 19.5, size : 0.4});
		    			bubbles.push({x : -16.7 , y : -12.5, z : 19.5, size : 0.4});
		    		}
		    		else
		    		{
		    			var testnum = randomFromInterval(0,pebbles.length - 2);
		    			bubbles.push({x : pebbles[testnum].x , y : pebbles[testnum].y - 1, z : pebbles[testnum].z, size : 0.4});
		    		}
		    	}
		    	else

		    		bubbles.push({x : fishes[selectedfish].inipoint0 , y : fishes[selectedfish].inipoint1, z : fishes[selectedfish].inipoint2, size : 0.1});

		    }
		    else if(event.keyCode == 71) 
		    {
		    	var posx = randomIntFromInterval(-5,5);
		    	var posz = randomIntFromInterval(-5,5);

		    	var posy = 9;

		    	for(var k=0 ; k<=5 ; k++)
		    		// foods.push({x : posx, y : 9, z : posz});    	
		    		foods.push({x : posx, y : posy, z : posz, seen : 0});
		    }
		    else if(event.keyCode == 86) 
		    {
		    	switch(view)
		    	{
		    		case 1:
		    			view = 2;
		    			break;

		    		case 2:
		    			view = 3;
		    			break; 
		    		
		    		case 3:
		    			view = 4;
		    			break;     			   			

		    		case 4:
		    			view = 1;
		    			break;		    			
		    	}

		    	var myview = document.getElementById('viewnum');
		    	myview.innerHTML = viewsrc[view -1];
		    }  
    }              

});

var InitDemo = function () {
	console.log('This is working');

	canvas = document.getElementById('game-surface');
	gl = canvas.getContext('webgl' , {preserveDrawingBuffer: true});

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	// gl.enable(gl.CULL_FACE);
	// gl.frontFace(gl.CCW);
	// gl.cullFace(gl.BACK);
    gl.clearDepth(1.0);                 // Clear everything

	//
	// Create shaders
	// 
	initShaders();

	//
	// Create buffer
	//
	initObjects();

	initTextures();

	// gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);

	initAttribPointer(1);

	// Tell OpenGL state machine which program should be active.
	gl.useProgram(program);
	//
	// Main render loop
	//
	mat4.identity(identityMatrix);

    // pebbles.push({x : 0 , y : 0, z : 0, onbubble: -1, rotate: 0, origy: 0, pebblefall: -1});
    pebbles.push({type: 1 , x : -5 , y : -22, z : -6, onbubble: -1, rotate: 0, origy: -22, pebblefall: -1});
    pebbles.push({type: 2 , x : 10 , y : -24, z : 15, onbubble: -1, rotate: 0, origy: -24, pebblefall: -1});
    pebbles.push({type: 3 , x : -10 , y : -25, z : 12, onbubble: -1, rotate: 0, origy: -25, pebblefall: -1});
    pebbles.push({type: 3 , x : 10 , y : -25, z : -12, onbubble: -1, rotate: 0, origy: -25, pebblefall: -1});
    pebbles.push({type: 1 , x : 15 , y : -24, z : 5, onbubble: -1, rotate: 0, origy: -24, pebblefall: -1});
    pebbles.push({type: 2 , x : -15 , y : -24, z : 20, onbubble: -1, rotate: 0, origy: -24, pebblefall: -1});
    // pebbles.push({type: 2 , x : 0 , y : 5, z : 0, onbubble: -1, rotate: 0, origy: 5, pebblefall: -1});
    // pebbles.push({type: 3 , x : 0 , y : 0, z : 0, onbubble: -1, rotate: 0, origy: -0, pebblefall: -1});


    grasses.push({x : 0, y: -24 , z:0});
    grasses.push({x : -3, y: -24 , z:0});
    grasses.push({x : -3, y: -24 , z:3});
    grasses.push({x : 3, y: -24 , z:4});
    grasses.push({x : -10, y: -19 , z:-8});
    grasses.push({x : 15, y: -24 , z:18});
    grasses.push({x : 13, y: -24 , z:18});
    grasses.push({x : 13, y: -24 , z:16});
    grasses.push({x : 13, y: -24 , z:14});
    grasses.push({x : 10, y: -24 , z:14});
    grasses.push({x : 14, y: -24 , z: -14});
    grasses.push({x : -14, y: -24 , z: 14});
    grasses.push({x : -12, y: -24 , z: 14});
    grasses.push({x : -13, y: -24 , z: 13});
    grasses.push({x : -11, y: -24 , z: 11});

    var falltime = 0;

	var loop = function () {

		var mynumber = document.getElementById('fishesnum');
		mynumber.innerHTML = fishes.length;

		initEye(1);
		gl.clearColor(0.75, 0.85, 0.8, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

	initAttribPointer(1);
	gl.useProgram(program);

		if(view == 2 && selectedfish != -1)
		{
			camx = fishes[selectedfish].inipoint0 - 25*(fishes[selectedfish].myvel * Cos(fishes[selectedfish].myphi) * Cos(fishes[selectedfish].mytheta));
			camy = fishes[selectedfish].inipoint1 - 25*(fishes[selectedfish].myvel * Sin(fishes[selectedfish].myphi));
			camz = fishes[selectedfish].inipoint2 + 25*(fishes[selectedfish].myvel * Cos(fishes[selectedfish].myphi) * Sin(fishes[selectedfish].mytheta));

			l1 = fishes[selectedfish].lookpoint0;
			l2 = fishes[selectedfish].lookpoint1;
			l3 = fishes[selectedfish].lookpoint2;
		}

		if(view == 3 && selectedfish != -1)
		{
			// console.log("Here");
			camx = fishes[selectedfish].followpoint0;
			camy = fishes[selectedfish].followpoint1;
			camz = fishes[selectedfish].followpoint2;

			l1 = fishes[selectedfish].lookpoint0;
			l2 = fishes[selectedfish].lookpoint1;
			l3 = fishes[selectedfish].lookpoint2;
		}

		if(view == 4 && selectedfish != -1)
		{
			// console.log("Here");
			camx = fishes[selectedfish].eyepoint0;
			camy = fishes[selectedfish].eyepoint1;
			camz = fishes[selectedfish].eyepoint2;

			l1 = fishes[selectedfish].eyelpoint0;
			l2 = fishes[selectedfish].eyelpoint1;
			l3 = fishes[selectedfish].eyelpoint2;

		}		

		for(var k = 0; k < eggs.length ; k++)
		{
			egg.drawObject(matrixProduct(translateMatrix(eggs[k].x, eggs[k].y , eggs[k].z) , scaleMatrix1(.4,.4,.4)));
			if(eggs[k].y >= -24)
			{
				eggs[k].y -= 0.25;
			}

			else
			{
				if(eggs[k].time >= 300)
				{
					if(eggs[k].types == 2)
						setfish(eggs[k].types, eggs[k].x, eggs[k].y, eggs[k].z, 0, 0, 0.02, 0.1);
					else
						setfish(eggs[k].types, eggs[k].x, eggs[k].y, eggs[k].z, 0, 0, 0.02, 0.1);
					
					var snd = new Audio("media/tap1.mp3");
					snd.play();     		

				    eggs.splice(k, 1);
				}
				else
					eggs[k].time += 1;
			}
		}		

		if(foods.length != 0)
		{
			for(var f = 0; f < fishes.length; f++)
			{
				if(fishes[f].types != 4)
				{
					var posx = foods[0].x - fishes[f].myx;
					var posy = foods[0].y - fishes[f].myy;
					var posz = foods[0].z - fishes[f].myz;
					var t1 = Math.atan(posz/posx) * 180/Math.PI;
					var p1 = Math.atan(posy/Math.sqrt(posx*posx + posz*posz)) * 180/Math.PI;

					fishes[f].mytheta = 180 - t1;
					if(posx >= 0)
						fishes[f].myphi = -1 * p1;
					else
						fishes[f].myphi = 180 + p1;
					fishes[f].sawfood = 0;
				}
			}	

		}

		for(var k = 0; k < bubbles.length ; k++)
		{
			bubble.drawObject(matrixProduct(translateMatrix(bubbles[k].x, bubbles[k].y , bubbles[k].z) , scaleMatrix1(bubbles[k].size,bubbles[k].size,bubbles[k].size)));
			if(bubbles[k].y <= dimy)
				bubbles[k].y += 0.01;
			else
			{
				    for(var k2 = 0; k2 <pebbles.length ; k2++)
				    	if(pebbles[k2].onbubble == k)
				    	{
				    		pebbles[k2].onbubble = -1;
				    		pebbles[k2].pebblefall = -1;
							falltime++;
				    	}
					var snd = new Audio("media/blop.mp3");
					snd.play();  				    	
				    bubbles.splice(k, 1);

			}
		}			

		for(var k = 0; k < foods.length ; k++)
		{

			var movement = randomFromInterval(1,6);
			if( movement == 2)
				foods[k].x += currentx/10;
			if( movement == 3)
				foods[k].x -= currentx/10;			
			if( movement == 6)
				foods[k].z += currentz/10;	
			if( movement == 7)
				foods[k].z -= currentz/10;							

			foodparticle.drawObject(matrixProduct(translateMatrix(foods[k].x, foods[k].y , foods[k].z) , scaleMatrix1(0.1,0.1,0.1)));
			if(foods[k].y >= -1 * dimy)
				foods[k].y -= 0.01;
			else
			{
				    foods.splice(k, 1);
					for(var k2 = 0; k2 < fishes.length; k2++)
						if(fishes[k2].sawfood == k)
				    		fishes[k2].sawfood = -1;				    
				    k--;
				    continue;
			}
		}

		for(var k = 0; k < foods.length ; k++)
		{
		for(var k1 = 0; k1 < fishes.length; k1++)
			{
				if(distancefishfood(k1,k))
				{
				    foods.splice(k, 1);
					for(var k2 = 0; k2 < fishes.length; k2++)
						if(fishes[k2].sawfood == k)
				    		fishes[k2].sawfood = -1;
				    k--;
				    continue;
				}
			}
		}

		for(var k1=0; k1 < bubbles.length; k1++)
		{
			for(var k2=0; k2 < pebbles.length; k2++)
			{
				if(distancebubpeb(k1,k2) && pebbles[k2].pebblefall != 0)
				{
					if(falltime == 2)
					{
						pebbles[k2].onbubble = -1;
						pebbles[k2].pebblefall = 0;
						falltime = 0;
					}
					pebbles[k2].onbubble = k1;
					pebbles[k2].y += 0.01;
				}				
			}
		}

		for(var k1=0; k1 < bubbles.length; k1++)
		{
			var flag = 0;
			for(var k2=0; k2 < fishes.length; k2++)
			{
				if(bubbles[k1].size == 0.4)
				if(distancebubfish(k1,k2) && fishes[k2].myvel == 0.02)
				{
					flag = 1;
					fishes[k2].myvel = 0.07;
				}
				if(flag == 0)
					fishes[k2].myvel = 0.02;
			}
		}


		for(var k1=0; k1 < pebbles.length; k1++)
		{
			if(pebbles[k1].onbubble == -1 || pebbles[k1].pebblefall == 0 )
			{
				if(pebbles[k1].y > pebbles[k1].origy)
				{
					pebbles[k1].rotate += 1;
					pebbles[k1].y -= 0.04;
					if (pebbles[k1].y <= pebbles[k1].origy) {
							var snd = new Audio("media/tap1.mp3");
							snd.play();       	
					}
				}
			}			
		}

		// mybox.drawObject(matrixProduct(translateMatrix(-1.5,0,10) ,rotateMatrix(100,0,0,1), scaleMatrix1(1,1,1)));
		// mypond.drawObject(matrixProduct(translateMatrix(2.5 * dimx,0,0) , scaleMatrix1(dimx,dimy,dimz)));
		tower.drawObject(matrixProduct(translateMatrix(20,-25,-10) , rotateMatrix(90,1,0,0) ,  scaleMatrix1(5,5,5)));

	// Draw textured objects Here

	if(reloadtextures == 1)
	{
		initTextures();
		reloadtextures = 0;
	}
	initAttribPointer(2);
	gl.useProgram(program1);
		initEye(2);

		gl.bindTexture(gl.TEXTURE_2D, fishtexture);
		gl.activeTexture(gl.TEXTURE0);

		for(var k = 0; k < fishes.length ; k++)
		{
			move(k);
			if(fishes[k].types == 1)
			{
				if(fishes[k].alt == -1)
					myfish.drawObjectfish(k ,matrixProduct(translateMatrix(fishes[k].myx, fishes[k].myy , fishes[k].myz) , rotateMatrix(fishes[k].mytheta , 0,1,0) , rotateMatrix(fishes[k].myphi, 0,0,1), rotateMatrix(-90, 0,0,1) , rotateMatrix(-90, 0,1,0) , scaleMatrix1(fishes[k].size * 2, fishes[k].size * 2, fishes[k].size * 2)));
				else
					myfish.drawObjectfish(k ,matrixProduct(translateMatrix(fishes[k].myx, fishes[k].myy , fishes[k].myz) , rotateMatrix(fishes[k].mytheta , 0,1,0) , rotateMatrix(fishes[k].myphi, 0,0,1), rotateMatrix(180, 1,0,0) ,rotateMatrix(-90, 0,0,1) , rotateMatrix(-90, 0,1,0) , scaleMatrix1(fishes[k].size * 2, fishes[k].size * 2, fishes[k].size * 2)));

			}
		}

		if(fishcolors == 1)
			gl.bindTexture(gl.TEXTURE_2D, fish2texture);
		else
			gl.bindTexture(gl.TEXTURE_2D, fish22texture);

		gl.activeTexture(gl.TEXTURE0);

		for(var k = 0; k < fishes.length ; k++)
		{
			move(k);
			if(fishes[k].types == 2)
			{
				if(fishes[k].alt == -1)
					myfish2.drawObjectfish(k ,matrixProduct(translateMatrix(fishes[k].myx, fishes[k].myy , fishes[k].myz) , rotateMatrix(fishes[k].mytheta , 0,1,0) , rotateMatrix(fishes[k].myphi, 0,0,1), rotateMatrix(180, 1,0,0) , rotateMatrix(0, 1,0,0) , rotateMatrix(90, 0,1,0) , rotateMatrix(-90, 1,0,0) , rotateMatrix(180, 0,0,1)  , scaleMatrix1(fishes[k].size , fishes[k].size , fishes[k].size )));
				else
					myfish2.drawObjectfish(k ,matrixProduct(translateMatrix(fishes[k].myx, fishes[k].myy , fishes[k].myz) , rotateMatrix(fishes[k].mytheta , 0,1,0) , rotateMatrix(fishes[k].myphi, 0,0,1), rotateMatrix(180, 1,0,0) ,rotateMatrix(180, 1,0,0) , rotateMatrix(90, 0,1,0) , rotateMatrix(-90, 1,0,0) , rotateMatrix(180, 0,0,1)  , scaleMatrix1(fishes[k].size , fishes[k].size , fishes[k].size )));

			}
		}

		if(fishcolors == 1)
			gl.bindTexture(gl.TEXTURE_2D, fish3texture);
		else
			gl.bindTexture(gl.TEXTURE_2D, fish32texture);
		gl.activeTexture(gl.TEXTURE0);

		for(var k = 0; k < fishes.length ; k++)
		{
			move(k);
			if(fishes[k].types == 3)
			{
				if(fishes[k].alt == -1)
					myfish3.drawObjectfish(k ,matrixProduct(translateMatrix(fishes[k].myx, fishes[k].myy , fishes[k].myz) , rotateMatrix(fishes[k].mytheta , 0,1,0) , rotateMatrix(fishes[k].myphi, 0,0,1) , rotateMatrix(90, 0,1,0) , rotateMatrix(-90, 1,0,0) , rotateMatrix(180, 0,0,1)  , scaleMatrix1(fishes[k].size * 2 , fishes[k].size * 2 , fishes[k].size * 2 )));
				else
					myfish3.drawObjectfish(k ,matrixProduct(translateMatrix(fishes[k].myx, fishes[k].myy , fishes[k].myz) , rotateMatrix(fishes[k].mytheta , 0,1,0) , rotateMatrix(fishes[k].myphi, 0,0,1) ,rotateMatrix(180, 1,0,0) , rotateMatrix(90, 0,1,0) , rotateMatrix(-90, 1,0,0) , rotateMatrix(180, 0,0,1)  , scaleMatrix1(fishes[k].size * 2 , fishes[k].size * 2 , fishes[k].size * 2 )));
			}	
		}

		gl.bindTexture(gl.TEXTURE_2D, shipTexture);
		gl.activeTexture(gl.TEXTURE0);

		ship.drawObject(matrixProduct(translateMatrix(10,-24,0) , rotateMatrix(-90,1,0,0) , scaleMatrix1(3,3,3)));

		gl.bindTexture(gl.TEXTURE_2D, grassTexture);
		gl.activeTexture(gl.TEXTURE0);


		if(rotation >= 5)
			rflag = 1;

		if(rotation <= -5)
			rflag = -1;

		if(rflag == -1)
			rotation += 0.1;
		else
			rotation -= 0.1;


		for(var k1 = 0; k1 < grasses.length ; k1++)
			grass.drawObject(matrixProduct(translateMatrix(grasses[k1].x,grasses[k1].y,grasses[k1].z) ,rotateMatrix(rotation, 1,0,0) , rotateMatrix(-90,1,0,0) ,  scaleMatrix1(2.5,2.5,2.5)));


		gl.bindTexture(gl.TEXTURE_2D, baseTexture);
		gl.activeTexture(gl.TEXTURE0);

		base.drawObject(matrixProduct(translateMatrix(0,-24.5,0) , rotateMatrix(90,0,1,0) ,  rotateMatrix(-90,1,0,0), scaleMatrix1(1.27,1.27,1.27)));
		base.drawObject(matrixProduct(translateMatrix(3 * dimx,-30,0) , rotateMatrix(90,0,1,0) ,  rotateMatrix(-90,1,0,0), scaleMatrix1(1.53,1.53,1.53)));


		gl.bindTexture(gl.TEXTURE_2D, sharkTexture);
		gl.activeTexture(gl.TEXTURE0);

		for(var k = 0; k < fishes.length ; k++)
		{
			move(k);
			if(fishes[k].types == 4)
			{
				if(fishes[k].alt == -1)
					shark.drawObject(matrixProduct(translateMatrix(2.5 * dimx + fishes[k].myx, fishes[k].myy , fishes[k].myz) ,  rotateMatrix(fishes[k].mytheta , 0,1,0) , rotateMatrix(fishes[k].myphi, 0,0,1) ,   rotateMatrix(-90,0,1,0) , rotateMatrix(270,1,0,0), scaleMatrix1(1.27,1.27,1.27)));
				else
				{
					// console.log('Here');
					shark.drawObject(matrixProduct(translateMatrix(2.5 * dimx + fishes[k].myx, fishes[k].myy , fishes[k].myz) ,  rotateMatrix(fishes[k].mytheta , 0,1,0) , rotateMatrix(fishes[k].myphi, 0,0,1) , rotateMatrix(180,1,0,0) ,  rotateMatrix(-90,0,1,0) , rotateMatrix(270,1,0,0), scaleMatrix1(1.27,1.27,1.27)));
				}
			}	
		}

		// shark.drawObject(matrixProduct(translateMatrix(2.5 * dimx  , 0, 0) ,  rotateMatrix(-90,0,1,0) , rotateMatrix(270,1,0,0), scaleMatrix1(1.27,1.27,1.27)));

		gl.bindTexture(gl.TEXTURE_2D, oxyTexture);
		gl.activeTexture(gl.TEXTURE0);

		oxy.drawObject(matrixProduct(translateMatrix(-20,-20,20) , rotateMatrix(0,0,0,1) , rotateMatrix(270,1,0,0), scaleMatrix1(5,5,5)));

		gl.bindTexture(gl.TEXTURE_2D, planeTexture);
		gl.activeTexture(gl.TEXTURE0);

		plane.drawObject(matrixProduct(translateMatrix(0,0,-dimz) , rotateMatrix(180,1,0,0) , scaleMatrix1(25,25,25)));
		plane.drawObject(matrixProduct(translateMatrix(-dimx,0,0) , rotateMatrix(180,1,0,0) ,  rotateMatrix(90,0,1,0) , scaleMatrix1(25,25,25)));
		plane.drawObject(matrixProduct(translateMatrix(dimx,0,0) , rotateMatrix(180,1,0,0) ,  rotateMatrix(90,0,1,0) , scaleMatrix1(25,25,25)));
		plane.drawObject(matrixProduct(translateMatrix(0,dimy,0) , rotateMatrix(90,1,0,0) , scaleMatrix1(25,25,25)));


		plane.drawObject(matrixProduct(translateMatrix(3 * dimx ,0,-dimz - 5) , rotateMatrix(180,1,0,0) , scaleMatrix1(30,30,30)));
		plane.drawObject(matrixProduct(translateMatrix(3 * dimx - dimx -5,0,0) , rotateMatrix(180,1,0,0) ,  rotateMatrix(90,0,1,0) , scaleMatrix1(30,30,30)));
		plane.drawObject(matrixProduct(translateMatrix(3 * dimx + dimx + 5,0,0) , rotateMatrix(180,1,0,0) ,  rotateMatrix(90,0,1,0) , scaleMatrix1(30,30,30)));
		plane.drawObject(matrixProduct(translateMatrix(3 * dimx,dimy + 5,0) , rotateMatrix(90,1,0,0) , scaleMatrix1(30,30,30)));



		gl.bindTexture(gl.TEXTURE_2D, boxTexture);
		gl.activeTexture(gl.TEXTURE0);

		// texbox.drawObject(matrixProduct(translateMatrix(0,0,0) , scaleMatrix1(dimx,dimy,dimz)));
		// texbox.drawObject(matrixProduct(translateMatrix(0,0,50)));

		gl.bindTexture(gl.TEXTURE_2D, rock1Texture);
		gl.activeTexture(gl.TEXTURE0);

		rock1.drawObject(matrixProduct(translateMatrix(5,-24,0) , scaleMatrix1(1,1,1)));

		for(var k=0; k < pebbles.length ; k++)
			if(pebbles[k].type == 1)
				rock1.drawObject(matrixProduct(translateMatrix(pebbles[k].x,pebbles[k].y,pebbles[k].z) , rotateMatrix(pebbles[0].rotate, 1,0,0) , scaleMatrix1(0.5,0.5,0.5)));

		gl.bindTexture(gl.TEXTURE_2D, rock2Texture);
		gl.activeTexture(gl.TEXTURE0);

		for(var k=0; k < pebbles.length ; k++)
			if(pebbles[k].type == 2)
				rock2.drawObject(matrixProduct(translateMatrix(pebbles[k].x,pebbles[k].y,pebbles[k].z) , rotateMatrix(pebbles[0].rotate, 1,0,0) , scaleMatrix1(0.5,0.5,0.5)));

		gl.bindTexture(gl.TEXTURE_2D, rock3Texture);
		gl.activeTexture(gl.TEXTURE0);

		for(var k=0; k < pebbles.length ; k++)
			if(pebbles[k].type == 3)
				rock3.drawObject(matrixProduct(translateMatrix(pebbles[k].x,pebbles[k].y,pebbles[k].z) , rotateMatrix(pebbles[0].rotate, 1,0,0) , scaleMatrix1(0.5,0.5,0.5)));


		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};


function initEye(num)
{
	if(num == 1)
	{
		matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
		matViewUniformLocation = gl.getUniformLocation(program, 'mView');
		matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

		worldMatrix = new Float32Array(16);
		viewMatrix = new Float32Array(16);
		projMatrix = new Float32Array(16);
		mat4.identity(worldMatrix);
		// mat4.lookAt(viewMatrix, [camx, camy, camz], [l1, l2, l3], [u1, u2, u3]);
		mat4.lookAt(viewMatrix, [camx, camy, camz], [l1, l2, l3], [u1, u2, u3]);
		mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);
		
		gl.useProgram(program);

		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);	
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
	}
	else
	{
		matWorldUniformLocation = gl.getUniformLocation(program1, 'mWorld');
		matViewUniformLocation = gl.getUniformLocation(program1, 'mView');
		matProjUniformLocation = gl.getUniformLocation(program1, 'mProj');

		worldMatrix = new Float32Array(16);
		viewMatrix = new Float32Array(16);
		projMatrix = new Float32Array(16);
		mat4.identity(worldMatrix);
		// mat4.lookAt(viewMatrix, [camx, camy, camz], [l1, l2, l3], [u1, u2, u3]);
		mat4.lookAt(viewMatrix, [camx, camy, camz], [l1, l2, l3], [u1, u2, u3]);
		mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);
	gl.useProgram(program1);

		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);		
	}
};

function initObjects()
{
	myfish = new myObject();

	myfish.setInfo(fishVertices, fishIndices);

	myfish2 = new myObject();

	myfish2.setInfo(fish2Vertices, fish2Indices);	

	myfish3 = new myObject();

	myfish3.setInfo(fish3Vertices, fish3Indices);		

	setfish(1 , 5, -2, 3);
	setfish(1 , -5, 0, 0);
	setfish(2 , -5, -5, 0);
	setfish(3 , 5, 5, 0);
	setfish(4 , 5, 5, 0);
	// setfish(2 , -5, 0, 0);
	// setfish(3, 0, 0 , 80, -30);

	mybox = new myObject();
	mybox.setInfo(boxVertices, boxIndices);

	shark = new myObject();
	shark.setInfo(sharkVertices, sharkIndices);

	oxy = new myObject();
	oxy.setInfo(oxyVertices, oxyIndices);	

	mypond = new myObject();
	mypond.setInfo(pondVertices, pondIndices);

	plane = new myObject();
	plane.setInfo(planeVertices, planeIndices);

	egg = new myObject();
	egg.setInfo(eggVertices, eggIndices);

	bubble = new myObject();
	bubble.setInfo(bubbleVertices, bubbleIndices);

	base = new myObject();
	base.setInfo(baseVertices, baseIndices);

	foodparticle = new myObject();
	foodparticle.setInfo(foodVertices, foodIndices);

	tower = new myObject();
	tower.setInfo(towerVertices, towerIndices);

	grass = new myObject();
	grass.setInfo(grassVertices, grassIndices);

	ship = new myObject();
	ship.setInfo(shipVertices, shipIndices);	

	texbox = new myObject();
	texbox.setInfo(texboxVertices, texboxIndices);	

	rock1 = new myObject();
	rock1.setInfo(rock1Vertices, rock1Indices);	

	rock2 = new myObject();
	rock2.setInfo(rock2Vertices, rock2Indices);	

	rock3 = new myObject();
	rock3.setInfo(rock3Vertices, rock3Indices);		

};

function initTextures()
{
	boxTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, boxTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('crate-image')
	);

	rock1Texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, rock1Texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('rock1-image')
	);	

	rock2Texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, rock2Texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('rock2-image')
	);

	rock3Texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, rock3Texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('rock3-image')
	);				

	fishtexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, fishtexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('fish-image')
	);		

	fish2texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, fish2texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('fish2-image')
	);	

	fish3texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, fish3texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('fish3-image')
	);	

	fish22texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, fish22texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('fish21-image')
	);	

	fish32texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, fish32texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('fish31-image')
	);		

	shipTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, shipTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('ship-image')
	);

	baseTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, baseTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('base-image')
	);

	grassTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, grassTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('grass-image')
	);

	sharkTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, sharkTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('shark-image')
	);	

	oxyTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, oxyTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('oxy-image')
	);	

	planeTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, planeTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texImage2D(
		gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
		gl.UNSIGNED_BYTE,
		document.getElementById('crate-image')
	);		
};


function dropfood()
{
	    	var posx = randomIntFromInterval(-5,5);
	    	var posz = randomIntFromInterval(-5,5);

	    	var posy = 9;

	    	for(var k=0 ; k<=5 ; k++)
	    		// foods.push({x : posx, y : 9, z : posz});    	
	    		foods.push({x : posx, y : posy, z : posz, seen : 0});
}

function spawnbubble()
{
	if(selectedfish == -1)
	{
		var testnum = randomFromInterval(1,1);
		if(testnum == 1)
		{
			var snd = new Audio("media/bubbling.mp3");
			snd.play();       			
			bubbles.push({x : -16.7 , y : -10, z : 19.5, size : 0.4});
			// bubbles.push({x : -16.7 , y : -11, z : 19.5, size : 0.4});
			bubbles.push({x : -16.7 , y : -12, z : 19.5, size : 0.4});
			bubbles.push({x : -16.7 , y : -12.5, z : 19.5, size : 0.4});
		}
		else
		{
			var testnum = randomFromInterval(0,pebbles.length - 2);
			bubbles.push({x : pebbles[testnum].x , y : pebbles[testnum].y - 1, z : pebbles[testnum].z, size : 0.4});
		}
	}
	else
	{
		// var snd = new Audio("media/fishbubble.mp3");
		// snd.play();     		
		bubbles.push({x : fishes[selectedfish].inipoint0 , y : fishes[selectedfish].inipoint1, z : fishes[selectedfish].inipoint2, size : 0.1});
	}

}

function resetcam()
{
	 selectedfish = -1;
	 camx = 4; camy = 19; camz = 61;
	 l1=0 ; l2=0; l3=0; u1=0; u2=1; u3=0;
	 var myimg = document.getElementById('selected-fish');
	 myimg.src = imagesrc[0];
	 var mytext = document.getElementById('matext');
     mytext.innerHTML = textsrc[0];	 
}

function changeColor()
{
	fishcolors = (fishcolors == 1)? 2 : 1;
}

function changeView()
{
		    	switch(view)
		    	{
		    		case 1:
		    			view = 2;
		    			break;

		    		case 2:
		    			view = 3;
		    			break; 
		    		
		    		case 3:
		    			view = 4;
		    			break;     			   			

		    		case 4:
		    			view = 1;
		    			break;		    			
		    	}
}