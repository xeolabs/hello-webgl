/**

 A simple utility that calls just enough WebGL functions to draw a triangle.

 Useful for sanity checking your WebGL renderer.

 Usage:

 var hello = new HelloWebGL(canvas, gl);
 hello.draw();

 */
var HelloWebGL = function (canvas, gl) {

    // init shaders

    var vertShaderSource = [
        "attribute vec3 aVertexPosition;",
        "uniform mat4 uMVMatrix;",
        "uniform mat4 uPMatrix;",
        "void main(void) {",
        "   gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);",
        "}"
    ].join("\n");

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertShaderSource);
    gl.compileShader(vertShader);
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(vertShader));
        return;
    }

    var fragShaderSource = [
        "precision highp float;",
        "void main(void) {",
        "   gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);",
        "}"
    ].join("\n");

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragShaderSource);
    gl.compileShader(fragShader);
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(fragShader));
        return;
    }

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);

    // Init geometry

    var triangleVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
    var vertices = [
        0.0, 0.9, 0.0,
        -0.9, -0.9, 0.0,
        0.9, -0.9, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    triangleVertexPositionBuffer.itemSize = 3;
    triangleVertexPositionBuffer.numItems = 3;

    /**
     * Draws the triangle
     */
    this.draw = function () {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
        gl.vertexAttribPointer(vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);
    };
};