# hello-webgl

 A super-simple utility that calls just enough WebGL functions to draw a triangle.

 Useful for sanity checking your WebGL renderer.

## Usage

Initialize the utility:
 ````javascript
 var hello = new HelloWebGL(canvas, gl);
 ````
 
 then call this from within your render loop, to insert some GL calls to draw the triangle:
 ````javascript
 hello.draw();
 ````


