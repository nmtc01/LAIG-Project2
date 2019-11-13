/** 
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - Scale of rectangle in X
 * @param y - Scale of rectangle in Y
 */
class Patch extends CGFobject{
    constructor(scene, NPointsU,NPointsV,NPartsU,NPartsV,controlPoints){
        super(scene);
        this.NPointsU = NPointsU; 
        this.NPointsV = NPointsV;
        this.NPartsU = NPartsU;
        this.NPartsV = NPartsV; 

        this.controlPoints= controlPoints; 

        this.initBuffers();
    }

    initBuffers(){

    }

    updateTexCoords(lg_s, lg_t) {
	}
}