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
        this.NPartsU= slices; 
        this.NPartsV= stacks;

        this.init();
    }

    init(){
        //this.surface = new CGFnurbsSurface(1, 1, this.controlPoints);
        //this.cylinder2 = new CGFnurbsObject(this.scene, this.NPartsU, this.NPartsV, this.surface);
    }

    display(){
        this.cylinder2.display();
    }

    updateTexCoords(lg_s, lg_t) {
	}
}