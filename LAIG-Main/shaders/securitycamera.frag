#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vCoords;
uniform sampler2D uSampler;


void main() {
    vec2 vActualTextureCoord = vec2(vTextureCoord.x,1.0-vTextureCoord.y);
    gl_FragColor = texture2D(uSampler, vActualTextureCoord);
		
}