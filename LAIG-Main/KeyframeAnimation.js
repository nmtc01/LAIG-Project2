/**
 * KeyFrameAnimation
 * @constructor
 * @param scene - Reference to MyScene object
 */
class KeyFrameAnimaton extends Animation {
    /**
     * @constructor 
     * @param {int} id
     * @param {array} keyframe - array of arrays storing animaton keyframe + start instant 
     */
    constructor(id, keyframes) {
        super();

        this.sent = 0;
        this.segment = 0;
        this.progress_percentage = 0;
        this.second_instant = 0;

        //trans matrixes 
        this.mn = mat4.create();
        //this.ma = mat4.create();
        this.m = mat4.create();

        //translate -> rotate -> scale 
        this.keyframes = keyframes;

        this.instant = this.keyframes[0][3]; //first keyframe passed with instant stored in 3rd index

        this.segment = 0; //keyframe using numeration

        //make segment time array 
        this.t = [this.instant];
        for (let i = 1; i < this.keyframes.length; i++) {
            this.t.push(this.keyframes[i][3] - this.keyframes[i-1][3]);
        }
        //NOTE first keyfram is set with sample values 
    }

    set_mn(mn){
       this.mn = mn;
    }

    /**
    * create ma
    * @param {flat} progress_percentage - progress percentage
    * @param {int} keyframe_num keyframe number operating
    */
    process_animation() {
       
        //stop excecution 
        if (this.segment > this.keyframes.length - 1) {
            console.log('nao da mais');
            return this.m;
        }

        this.sent += 0.01; //chamado de 100 em 100 ms, comfimar mais tarde 

        //check if should change to another keyframe    
        if (this.sent > this.t[this.segment]) { //this.keyframes[this.segment][1] == t[segment]  
            this.sent -= this.t[this.segment]; // reset sent 
            this.segment++;
            if (this.segment  > this.keyframes.length - 1) {
                console.log('nao da mais');
                return this.m;
            }
        }
        
        this.progress_percentage = this.sent / this.t[this.segment]; //percentage
    
        //TRANSLATE
        let T = [
            this.keyframes[this.segment][0][0]*this.progress_percentage,
            this.keyframes[this.segment][0][1]*this.progress_percentage,
            this.keyframes[this.segment][0][2]*this.progress_percentage
        ];
        let translate_matrix = mat4.create();
        translate_matrix = mat4.translate(translate_matrix, translate_matrix, T);
       
        //ROTATE 
        let R = [
            this.keyframes[this.segment][1][0]*this.progress_percentage,
            this.keyframes[this.segment][1][1]*this.progress_percentage,
            this.keyframes[this.segment][1][2]*this.progress_percentage
        ];
        let rotation_matrix = mat4.create();
        rotation_matrix = mat4.rotate(rotation_matrix , rotation_matrix , R[0],  [1, 0, 0]);
        rotation_matrix = mat4.rotate(rotation_matrix , rotation_matrix , R[1],  [0, 1, 0]);
        rotation_matrix = mat4.rotate(rotation_matrix , rotation_matrix , R[2],  [0, 0, 1]);

        //SCALE 
        let S = [];

        if (this.segment < this.keyframes.length - 1) {
            let initialKeyframeCoords = [3];
            initialKeyframeCoords[0] = this.keyframes[this.segment][2][0];
            initialKeyframeCoords[1] = this.keyframes[this.segment][2][1];
            initialKeyframeCoords[2] = this.keyframes[this.segment][2][2];
            let finalKeyframeCoords = [3];
            finalKeyframeCoords[0] = this.keyframes[this.segment+1][2][0];
            finalKeyframeCoords[1] = this.keyframes[this.segment+1][2][1];
            finalKeyframeCoords[2] = this.keyframes[this.segment+1][2][2];

            let rx = Math.pow(finalKeyframeCoords[0]/initialKeyframeCoords[0], 1/this.t[this.segment]);
            let ry = Math.pow(finalKeyframeCoords[1]/initialKeyframeCoords[1], 1/this.t[this.segment]);
            let rz = Math.pow(finalKeyframeCoords[2]/initialKeyframeCoords[2], 1/this.t[this.segment]);

            S = [
                this.keyframes[this.segment][2][0]*rx,
                this.keyframes[this.segment][2][1]*ry,
                this.keyframes[this.segment][2][2]*rz
            ];
        }
        else {
            let keyframeCoords = [3];
            keyframeCoords[0] = this.keyframes[this.segment][2][0];
            keyframeCoords[1] = this.keyframes[this.segment][2][1];
            keyframeCoords[2] = this.keyframes[this.segment][2][2];

            S = [
                this.keyframes[this.segment][2][0]*keyframeCoords[0],
                this.keyframes[this.segment][2][1]*keyframeCoords[1],
                this.keyframes[this.segment][2][2]*keyframeCoords[2]
            ];
        }

        let scale_matrix = mat4.create();
        scale_matrix = mat4.scale(scale_matrix, scale_matrix, S);

        //multiply all matrixes
        let aux_mat = mat4.create(); 
        aux_mat = mat4.multiply(aux_mat,aux_mat,scale_matrix);
        aux_mat = mat4.multiply(aux_mat,aux_mat,rotation_matrix);
        aux_mat = mat4.multiply(aux_mat,aux_mat,translate_matrix);
        //calculate matriz SRT 
        let ma = mat4.create();
        ma = mat4.multiply(ma,ma,aux_mat);

        this.m = mat4.multiply(this.m,ma,this.mn);
      
        return this.m;
        
    }

}
//TODO primeiro keyframe sempre igual a zero