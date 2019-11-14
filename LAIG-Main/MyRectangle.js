/**
 * MyRectangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - Scale of rectangle in X
 * @param y - Scale of rectangle in Y
 */
class MyRectangle extends CGFobject {
	constructor(scene, id, x1, x2, y1, y2) {
		super(scene);
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;

		this.initBuffers();
	}
	
	initBuffers() {
		//store vertices
		this.vertices = [
			this.x1, this.y1, 0,	//0
			this.x2, this.y1, 0,	//1
			this.x1, this.y2, 0,	//2
			this.x2, this.y2, 0		//3
		];

		//Counter-clockwise reference of vertices
		//store indices
		this.indices = [
			0, 1, 2,
			1, 3, 2
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
	
	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 * @param {int} lg_s- Sacling factor length
	 * @param {int} lg_s- Scaling factor length
	 */
	//applying scale factors, dividing rectangle sides lengths by length_s and length_t 
	updateTexCoords(lg_s, lg_t) {
        this.texCoords = [
            0, Math.sqrt(Math.pow(this.y2-this.y1,2))/lg_t,
			Math.sqrt(Math.pow(this.x2-this.x1,2))/lg_s, Math.sqrt(Math.pow(this.y2-this.y1,2))/lg_t,
			0, 0,
			Math.sqrt(Math.pow(this.x2-this.x1,2))/lg_s, 0
        ];
		this.updateTexCoordsGLBuffers();
	}
}

