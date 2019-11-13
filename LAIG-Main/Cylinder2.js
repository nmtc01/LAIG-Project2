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
        let degree1 = this.NPartsU - 1;
        let degree2 = this.NPartsV - 1;

        let d_theta = (Math.PI)/this.NPartsU;
		let d_stack = this.height/this.NPartsV;
		let d_radius = (this.base-this.top)/this.height;
		
		//angle starting values 
        let theta1 = 0;	
        let theta2 = Math.PI;
		let radius = this.base;
		
        //arrays to store primitives data
        this.controlPoints1 = [];
        this.controlPoints2 = [];

		for (let i = 0; i <= this.NPartsV; i++) {
            let auxV1 = [];
            let auxV2 = [];
			for (let j = 0; j <= this.NPartsU; j++) {

				//Normals
				let nx1 = Math.cos(theta1); 
                let ny1 = Math.sin(theta1);
                let nx2 = Math.cos(theta2); 
				let ny2 = Math.sin(theta2);

				//Coordinates
				let x1 = radius*nx1;
                let y1 = -radius*ny1;
                let x2 = radius*nx2;
				let y2 = -radius*ny2;
				let z = i*d_stack;

				//Storing values
                let auxU1 = [];
                let auxU2 = [];
                auxU1.push(x1, y1, z, 1);
                auxU2.push(x2, y2, z, 1);
                auxV1.push(auxU1);
                auxV2.push(auxU2);
				
				//Preparing next iteration
                theta1 += d_theta;
                theta2 += d_theta;
            }
            this.controlPoints1.push(auxV1);
            this.controlPoints2.push(auxV2);

			//Preparing next iteration
			radius -= d_radius*d_stack;
            theta1 = 0;
            theta2 = Math.PI;
		}

        this.surface1 = new CGFnurbsSurface(degree1, degree2, this.controlPoints1);
        this.surface2 = new CGFnurbsSurface(degree1, degree2, this.controlPoints2);
        this.cylinder2_part1 = new CGFnurbsObject(this.scene, this.NPartsU, this.NPartsV, this.surface1);
        this.cylinder2_part2 = new CGFnurbsObject(this.scene, this.NPartsU, this.NPartsV, this.surface2);
    }

    display(){
        this.cylinder2_part1.display();
        this.cylinder2_part2.display();
    }

    updateTexCoords(lg_s, lg_t) {
	}
}