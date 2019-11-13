/** 
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - Scale of rectangle in X
 * @param y - Scale of rectangle in Y
 */
class Cylinder2 extends CGFobject{
    constructor(scene, base, top, height, slices, stacks){
        super(scene);
        this.base= base;
        this.top= top; 
        this.height= height; 
        this.slices= slices; 
        this.stacks= stacks;

        this.initBuffers();
    }

    initBuffers(){

    }

    updateTexCoords(lg_s, lg_t) {
	}
}