var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main()',
'{',
'  fragColor = vertColor;',
'  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'  gl_FragColor = vec4(fragColor, 1.0);',
'}'
].join('\n');

var vertexShaderText1 = 
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
'attribute vec2 vertTexCoord;',
'varying vec2 fragTexCoord;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main()',
'{',
'  fragTexCoord = vertTexCoord;',
'  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText1 =
[
'precision mediump float;',
'',
'varying vec2 fragTexCoord;',
'uniform sampler2D sampler;',
'',
'void main()',
'{',
'  gl_FragColor = texture2D(sampler, fragTexCoord);',
'}'
].join('\n');

var gl;
var program;
var program1;
var vertexShader;
var fragmentShader;
var vertexShader1;
var fragmentShader1;
var positionAttribLocation;
var colorAttribLocation;
var texCoordAttribLocation;

var matWorldUniformLocation;
var matViewUniformLocation;
var matProjUniformLocation;

var identityMatrix = new Float32Array(16);

var worldMatrix = new Float32Array(16);
var viewMatrix = new Float32Array(16);
var projMatrix = new Float32Array(16);

var mouseflag = 0;

var myt = 0;
var myp = 0;
var myx = 0;
var myy = 0;

document.addEventListener("mousedown", function(event){

if(gamestarted)
{
	  var mx = event.clientX;
	  var my = event.clientY;
	  var canvas = document.getElementById('game-surface');
	  var rect = canvas.getBoundingClientRect();// check if your browser supports this
	  mx = mx - rect.left;
	  my = my - rect.top;

	if(selectedfish == -1 && mx <= 800 && mx >=0 && my <= 600 && my >= 0)
	{
		if(event.which == 1)
		{
	    	var posx = randomIntFromInterval(-5,5);
	    	var posz = randomIntFromInterval(-5,5);

	    	var posy = 9;

	    	for(var k=0 ; k<=5 ; k++)
	    		// foods.push({x : posx, y : 9, z : posz});    	
	    		foods.push({x : posx, y : posy, z : posz, seen : 0});
		}
		else
		{
    		var testnum = randomFromInterval(1,1);
    		if(testnum == 1)
    		{
				var snd = new Audio("bubbling.mp3");
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
	}
	else
	{
	  if(mx <= 800 && mx >=0 && my <= 600 && my >= 0 && view != 1)
	  {
	  	mouseflag = 1;
	    // console.log("Hello World " + mx + " " + my );

	    myt = fishes[selectedfish].mytheta;
	    myp = fishes[selectedfish].myphi;
	    myx = mx;
	    myy = my;
	  }
	}
}

});


document.addEventListener("mousemove", function(){
	// console.log(mouseflag);
if(gamestarted)
{
	  var mx = event.clientX;
	  var my = event.clientY;
	  var canvas = document.getElementById('game-surface');
	  var rect = canvas.getBoundingClientRect();// check if your browser supports this
	  mx = mx - rect.left;
	  my = my - rect.top;

	if(selectedfish != -1 && mx <= 800 && mx >=0 && my <= 600 && my >= 0)
	{
		if(mouseflag == 1)
		{
		    if(mx <= 800 && mx >=0 && my <= 600 && my >= 0 && view != 1)
	  		{
		 	 // console.log("Hello World " + mx + " " + my );

		 	 fishes[selectedfish].mytheta = myt + (mx - myx)*0.5;
		 	 fishes[selectedfish].myphi = myp + (my - myy)* 0.5;

			}
		}
	}
}
});

document.addEventListener("mouseup", function(){
  var mx = event.clientX;
  var my = event.clientY;
  var canvas = document.getElementById('game-surface');
  var rect = canvas.getBoundingClientRect();// check if your browser supports this
  mx = mx - rect.left;
  my = my - rect.top;
	    if(mx <= 800 && mx >=0 && my <= 600 && my >= 0)
  		{  
  			mouseflag = 0;
    		// console.log("Hello World " + mx + " " + my );
    	}
});

function Abs(num)
{
	return Math.abs(num);
}

function randomIntFromInterval(min,max)
{
    return (Math.random()*(max-min+1)+min);
}

function randomFromInterval(min,max)
{
    return Math.round((Math.random()*(max-min+1)+min));
}

function Cos(a)
{
	return (Math.cos(a * Math.PI/180));
}

function Sin(a)
{
	return (Math.sin(a * Math.PI/180));
}

function matrixProduct()
{
	var outMatrix = new Float32Array(16);
	mat4.identity(outMatrix);
    for (i = arguments.length - 1; i >=0 ; i--) {
			mat4.mul(outMatrix, arguments[i], outMatrix);
    }
    return outMatrix;	

};

function translateMatrix(a,b,c)
{
	var outMatrix = new Float32Array(16);
	mat4.translate(outMatrix, identityMatrix,  [a, b, c])
	return outMatrix;
};

function rotateMatrix(angle,b,c,d)
{
	var outMatrix = new Float32Array(16);
	angle = angle * Math.PI/180;
	mat4.rotate(outMatrix, identityMatrix, angle, [b, c, d]);
	return outMatrix;
};

function scaleMatrix1(a,b,c)
{
	var outMatrix = new Float32Array(16);
	mat4.scale(outMatrix, identityMatrix,  [a, b, c])
	return outMatrix;
};

function initShaders()
{
	vertexShader = gl.createShader(gl.VERTEX_SHADER);
	fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
	}

	program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
	}

	vertexShader1 = gl.createShader(gl.VERTEX_SHADER);
	fragmentShader1 = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader1, vertexShaderText1);
	gl.shaderSource(fragmentShader1, fragmentShaderText1);

	gl.compileShader(vertexShader1);
	if (!gl.getShaderParameter(vertexShader1, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader1));
		return;
	}

	gl.compileShader(fragmentShader1);
	if (!gl.getShaderParameter(fragmentShader1, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader1));
		return;
	}

	program1 = gl.createProgram();
	gl.attachShader(program1, vertexShader1);
	gl.attachShader(program1, fragmentShader1);
	gl.linkProgram(program1);
	if (!gl.getProgramParameter(program1, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program1));
		return;
	}
	gl.validateProgram(program1);
	if (!gl.getProgramParameter(program1, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program1));
		return;
	}	
};

function initAttribPointer(num)
{
	if(num == 1)
	{
	 positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	 colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		positionAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);
	gl.vertexAttribPointer(
		colorAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
	);

	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);
	}
	else
	{
	 	positionAttribLocation = gl.getAttribLocation(program1, 'vertPosition');
		texCoordAttribLocation = gl.getAttribLocation(program1, 'vertTexCoord');
		gl.vertexAttribPointer(
			positionAttribLocation, // Attribute location
			3, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			0 // Offset from the beginning of a single vertex to this attribute
		);
		gl.vertexAttribPointer(
			texCoordAttribLocation, // Attribute location
			2, // Number of elements per attribute
			gl.FLOAT, // Type of elements
			gl.FALSE,
			5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
			3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
		);

		gl.enableVertexAttribArray(positionAttribLocation);
		gl.enableVertexAttribArray(texCoordAttribLocation);		
	}
};


function setfish(type1 = 1 ,x1=0,y1=0 ,z1=0, t1=0, p1=0, vel1 = 0.02, size1 = 0.4)
{
	if(type1 == 3)
	{
		fishes.push({
			 		 types : type1, myx: x1, myy: y1, myz: z1, mytheta: t1, myphi: p1 , myvel: vel1,
					 inipoint0: 0.5, lookpoint0: -8, followpoint0: 0,
					 inipoint1: 0, lookpoint1: 0, followpoint1: 0,
					 inipoint2: 0, lookpoint2: 0, followpoint1: 0,
					 eyepoint0: -0.28823, eyepoint1: -1.48955, eyepoint2: 0.27789,	
					 eyelpoint0: -0.69979, eyelpoint1: -1.5397, eyelpoint2: 0.33775,					 			 
					 angle : 0 , ishitwall: 0, count: 0, size: size1, sawfood: -1 ,  alt : -1
					});
	}
	else if(type1 == 1)
	{
		fishes.push({
			 		 types : type1, myx: x1, myy: y1, myz: z1, mytheta: t1, myphi: p1 , myvel: vel1,
					 inipoint0: 0.5, lookpoint0: -8, followpoint0: 0,
					 inipoint1: 0, lookpoint1: 0, followpoint1: 0,
					 inipoint2: 0, lookpoint2: 0, followpoint1: 0,
					 eyepoint0: -0.1035, eyepoint1: -1.94606, eyepoint2: 0.30687,	
					 eyelpoint0: -0.64772, eyelpoint1: -1.77485, eyelpoint2: 0.1959,					 			 
					 angle : 0 , ishitwall: 0, count: 0, size: size1, sawfood: -1 ,  alt : -1
					});
	}
	else if(type1 == 2)
	{
		fishes.push({
			 		 types : type1, myx: x1, myy: y1, myz: z1, mytheta: t1, myphi: p1 , myvel: vel1,
					 inipoint0: 0.5, lookpoint0: -8, followpoint0: 0,
					 inipoint1: 0, lookpoint1: 0, followpoint1: 0,
					 inipoint2: 0, lookpoint2: 0, followpoint1: 0,
					 eyepoint0: -0.18573, eyepoint1: -1.19022, eyepoint2: 0.61383,	
					 eyelpoint0: -0.63622, eyelpoint1: -0.95691, eyelpoint2: 0.11028,					 			 
					 angle : 0 , ishitwall: 0, count: 0, size: size1, sawfood: -1 ,  alt : -1
					});
	}
	else
	{
				fishes.push({
			 		 types : type1, myx: x1, myy: y1, myz: z1, mytheta: t1, myphi: p1 , myvel: vel1,
					 inipoint0: 0.5, lookpoint0: -8, followpoint0: 0,
					 inipoint1: 0, lookpoint1: 0, followpoint1: 0,
					 inipoint2: 0, lookpoint2: 0, followpoint1: 0,
					 eyepoint0: -0.28823, eyepoint1: -1.48955, eyepoint2: 0.27789,	
					 eyelpoint0: -0.69979, eyelpoint1: -1.5397, eyelpoint2: 0.33775,					 			 
					 angle : 0 , ishitwall: 0, count: 0, size: size1, sawfood: -1 ,  alt : -1
					});
	}

}

function changeangles(now)
{
	    if(fishes[now].mytheta >= -160 && fishes[now].mytheta <= 160)
    		fishes[now].mytheta = randomIntFromInterval(fishes[now].mytheta - 20,fishes[now].mytheta + 20);
    	else if(fishes[now].mytheta >= -180 && fishes[now].mytheta <= -160)
    	{
    		fishes[now].mytheta = randomIntFromInterval(fishes[now].mytheta - 20,fishes[now].mytheta + 20);
    		if(fishes[now].mytheta < -180)
    			fishes[now].mytheta = 360 + fishes[now].mytheta;
    	}
    	else if(fishes[now].mytheta >= 160 && fishes[now].mytheta <= 180)
    	{
    		fishes[now].mytheta = randomIntFromInterval(fishes[now].mytheta - 20,fishes[now].mytheta + 20);
    		if(fishes[now].mytheta > 180)
    			fishes[now].mytheta = -360 + fishes[now].mytheta;
    	}
    	else
    	{
    		// console.log('error theta '  + fishes[now].mytheta);
    	}

    	if(fishes[now].myphi >= -160 && fishes[now].myphi <= 160)
    		fishes[now].myphi = randomIntFromInterval(fishes[now].myphi - 20,fishes[now].myphi + 20);
    	else if(fishes[now].myphi >= -180 && fishes[now].myphi <= -160)
    	{
    		fishes[now].myphi = randomIntFromInterval(fishes[now].myphi - 20,fishes[now].myphi + 20);
    		if(fishes[now].myphi < -180)
    			fishes[now].myphi = 360 + fishes[now].myphi;
    	}
    	else if(fishes[now].myphi >= 160 && fishes[now].mytheta <= 180)
    	{
    		fishes[now].myphi = randomIntFromInterval(fishes[now].myphi - 20,fishes[now].myphi + 20);
    		if(fishes[now].myphi > 180)
    			fishes[now].myphi = -360 + fishes[now].myphi;
    	}
    	else
    	{
    		// console.log('error phi '  + fishes[now].myphi);
    	}
};

function hitwall(now)
{
	var x = fishes[now].myy >= dimy - 4 || fishes[now].myy <= -1 * dimy + 4 || fishes[now].myx >= dimx - 4 || fishes[now].myx <= -1 * dimx + 4 || fishes[now].myz >= dimz - 4 || fishes[now].myz <= -1 * dimz + 4;
	var y = fishes[now].myy >= dimy - 10 || fishes[now].myy <= -1 * dimy + 5  || fishes[now].myx <= -8 || fishes[now].myx >= 20 || fishes[now].myz >= dimz || fishes[now].myz <= -1 * dimz;
	// var y = fishes[now].myy >= dimy - 10 || fishes[now].myy <= -1 * dimy + 10 || fishes[now].myx >= dimx  || fishes[now].myx <= -1 * dimx - 10 || fishes[now].myz >= dimz - 10 || fishes[now].myz <= -1 * dimz + 10;
	if((fishes[now].types != 4 && x ) ||  (fishes[now].types == 4 && y ) )
	{
		fishes[now].myvel *= 1;

		if(fishes[now].myphi >= 0 && fishes[now].myphi <= 180)
			fishes[now].myphi = -180 + fishes[now].myphi;
		else
			fishes[now].myphi = 180 + fishes[now].myphi;    			
		fishes[now].ishitwall  = 1;
		fishes[now].alt = (fishes[now].alt == 0)? -1 : 0;
	}	
}

function move(now)
{
	if(fishes[now].sawfood == -1)
	{
		if(fishes[now].myvel != 0.07)
			fishes[now].myvel = 0.02;
		fishes[now].count += 1;
		if(fishes[now].count == 150)
		{
			if(fishes[now].types  ==  2)
			{
				if(Abs(fishes[now].size - 0.45) >= 0.1)
				{
					// console.log('Here');
					fishes[now].size += 0.05;
				}
			}
			else
			{
				if(Abs(fishes[now].size - 0.45) >= 0.1 )
				{
					// console.log('Here');
					fishes[now].size += 0.05;
				}
			}

		}
		if(fishes[now].count == 200)
		{
			if(selectedfish != now)
				changeangles(now);
			fishes[now].count = 0;
		}
	}
	else
	{
			fishes[now].myvel = 0.05;
	}

	if(fishes[now].types != 4)
	{
			fishes[now].myx -= fishes[now].myvel * Cos(fishes[now].myphi) * Cos(fishes[now].mytheta);
			fishes[now].myy -= fishes[now].myvel * Sin(fishes[now].myphi);
			fishes[now].myz += fishes[now].myvel * Cos(fishes[now].myphi) * Sin(fishes[now].mytheta);	
			
			fishes[now].inipoint0 = fishes[now].myx - 75*(fishes[now].myvel * Cos(fishes[now].myphi) * Cos(fishes[now].mytheta));
			fishes[now].inipoint1 =  fishes[now].myy - 75*(fishes[now].myvel * Sin(fishes[now].myphi));
			fishes[now].inipoint2 = fishes[now].myz + 75*(fishes[now].myvel * Cos(fishes[now].myphi) * Sin(fishes[now].mytheta));

			fishes[now].lookpoint0 = fishes[now].myx - 200*(fishes[now].myvel * Cos(fishes[now].myphi) * Cos(fishes[now].mytheta));
			fishes[now].lookpoint1 =  fishes[now].myy - 200*(fishes[now].myvel * Sin(fishes[now].myphi));
			fishes[now].lookpoint2 = fishes[now].myz + 200*(fishes[now].myvel * Cos(fishes[now].myphi) * Sin(fishes[now].mytheta));	

			fishes[now].followpoint0 = fishes[now].myx + 200*(fishes[now].myvel * Cos(fishes[now].myphi) * Cos(fishes[now].mytheta));
			fishes[now].followpoint1 = fishes[now].myy + 200*(fishes[now].myvel * Sin(fishes[now].myphi));
			fishes[now].followpoint2 = fishes[now].myz - 200*(fishes[now].myvel * Cos(fishes[now].myphi) * Sin(fishes[now].mytheta));

			fishes[now].eyepoint0 -= fishes[now].myvel * Cos(fishes[now].myphi) * Cos(fishes[now].mytheta);
			fishes[now].eyepoint1 -= fishes[now].myvel * Sin(fishes[now].myphi);
			fishes[now].eyepoint2 += fishes[now].myvel * Cos(fishes[now].myphi) * Sin(fishes[now].mytheta);	

			fishes[now].eyelpoint0 -= fishes[now].myvel * Cos(fishes[now].myphi) * Cos(fishes[now].mytheta);
			fishes[now].eyelpoint1 -= fishes[now].myvel * Sin(fishes[now].myphi);
			fishes[now].eyelpoint2 += fishes[now].myvel * Cos(fishes[now].myphi) * Sin(fishes[now].mytheta);	


	}
	else
	{
			fishes[now].myx -= fishes[now].myvel * Cos(fishes[now].myphi) * Cos(fishes[now].mytheta);
			fishes[now].myy -= fishes[now].myvel * Sin(fishes[now].myphi);
			fishes[now].myz += fishes[now].myvel * Cos(fishes[now].myphi) * Sin(fishes[now].mytheta);	
			
			fishes[now].inipoint0 = 2.5 * dimx + fishes[now].myx - 800*(fishes[now].myvel * Cos(fishes[now].myphi) * Cos(fishes[now].mytheta));
			fishes[now].inipoint1 =  fishes[now].myy - 800*(fishes[now].myvel * Sin(fishes[now].myphi));
			fishes[now].inipoint2 = fishes[now].myz + 800*(fishes[now].myvel * Cos(fishes[now].myphi) * Sin(fishes[now].mytheta));

			fishes[now].lookpoint0 = 2.5 * dimx + fishes[now].myx - 2000*(fishes[now].myvel * Cos(fishes[now].myphi) * Cos(fishes[now].mytheta));
			fishes[now].lookpoint1 =  fishes[now].myy - 2000*(fishes[now].myvel * Sin(fishes[now].myphi));
			fishes[now].lookpoint2 = fishes[now].myz + 2000*(fishes[now].myvel * Cos(fishes[now].myphi) * Sin(fishes[now].mytheta));	

			fishes[now].followpoint0 =  2.5 * dimx + fishes[now].myx + 1300*(fishes[now].myvel * Cos(fishes[now].myphi) * Cos(fishes[now].mytheta));
			fishes[now].followpoint1 = fishes[now].myy + 1300*(fishes[now].myvel * Sin(fishes[now].myphi));
			fishes[now].followpoint2 = fishes[now].myz - 1300*(fishes[now].myvel * Cos(fishes[now].myphi) * Sin(fishes[now].mytheta));	
	}

	hitwall(now);
}

function myObject (type) {
    this.setInfo = function(verticesinfo, indicesinfo) {

    	this.verticesinfo = verticesinfo;
    	this.indicesinfo = indicesinfo;

		this.boxVertexBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.boxVertexBufferObject);

		this.boxIndexBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.boxIndexBufferObject);
		
		this.triangleinfo = indicesinfo.length;
    };

    this.drawObjectfish = function(now, tmatrix){

		if(fishes[now].ishitwall == 1)
		{
			fishes[now].ishitwall = 0
		}
		else
		{
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesinfo), gl.STATIC_DRAW);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesinfo), gl.STATIC_DRAW);
		worldMatrix = tmatrix;
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		gl.drawElements(gl.TRIANGLES, this.triangleinfo, gl.UNSIGNED_SHORT, 0);
		}
    };

    this.drawObject = function(tmatrix){
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesinfo), gl.STATIC_DRAW);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesinfo), gl.STATIC_DRAW);
		worldMatrix = tmatrix;
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
		gl.drawElements(gl.TRIANGLES, this.triangleinfo, gl.UNSIGNED_SHORT, 0);
    };
};


function distancefishfood(now1, now2)
{
	try
	{
		var x = fishes[now1].inipoint0 - foods[now2].x;
		var y = fishes[now1].inipoint1 - foods[now2].y;
		var z = fishes[now1].inipoint2 - foods[now2].z;
		var dist = Math.sqrt(x*x + y*y + z*z);
		if(dist <= 0.2)
			return 1;
		else 
			return 0;
	}
	catch(err)
	{
		return 0;
	}
}

function distancebubfish(now1, now2)
{
	try
	{
		var x = bubbles[now1].x - fishes[now2].inipoint0;
		var y = bubbles[now1].y - fishes[now2].inipoint1;
		var z = bubbles[now1].z - fishes[now2].inipoint2;
		var dist = Math.sqrt(x*x + y*y + z*z);
		if(dist <= 10)
			return 1;
		else 
			return 0;
	}
	catch(err)
	{
		return 0;
	}
}

function distancebubpeb(now1, now2)
{
	try
	{
		var x = bubbles[now1].x - pebbles[now2].x;
		var y = bubbles[now1].y - pebbles[now2].y;
		var z = bubbles[now1].z - pebbles[now2].z;
		var dist = Math.sqrt(x*x + y*y + z*z);
		if(dist <= 0.5)
			return 1;
		else 
			return 0;
	}
	catch(err)
	{
		return 0;
	}
}

