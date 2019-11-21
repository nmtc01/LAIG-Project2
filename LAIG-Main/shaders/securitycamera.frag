#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 vCoords;
uniform sampler2D uSampler;


void main() {

    gl_FragColor = texture2D(uSampler, vTextureCoord);
		
}