/** 
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - Scale of rectangle in X
 * @param y - Scale of rectangle in Y
 */
class Plane extends CGFobject{
    constructor(scene, NPartsU,NPartsV){
        super(scene);
        this.NPartsU= NPartsU; 
        this.NPartsV= NPartsV;

        //this.initBuffers();
    }

    initBuffers(){

    }

    updateTexCoords(lg_s, lg_t) {
	}
}