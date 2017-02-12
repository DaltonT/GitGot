var gl = null;
var cone = null;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    gl.clearColor( 0.0, 1.0, 0.0, 1.0 );
    
    cone = new Cone();

    render();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    cone.render();
}

function Cone() {
    this.count = 3,
    this.positions = {
        values : new Float32Array([ 
         0.0, 0.0,  // Vertex 0
         1.0, 0.0,  // Vertex 1
         1.0, 1.0,  // Vertex 2
         ]), numComponents : 2
     };
     this.colors = {
      values : new Float32Array([ ... ]),       numComponets : 3   };
                                 
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW);
    this.positions.attributeLoc = gl.getAttribLocation(this.program, “vPosition”);  gl.enableVertexAttribArray(this.positions.attributeLoc);
                                
    this.render = function () {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
        gl.vertexAttribPointer(this.positions.attributeLoc,  this.positions.numComponents, gl.FLOAT, 0, 0);
                                 
        var start = 0;
        var count = this.count;
        gl.drawArrays(gl.TRIANGLE_STRIP, start, count);
    };
};


window.onload = init;
