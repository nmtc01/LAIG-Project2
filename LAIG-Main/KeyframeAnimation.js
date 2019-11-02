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

        //parent values
        this.parent = this;

        this.sent = 0;
        this.segment = 0;
        this.progress_percentage = 0;
        this.second_instant = 0;

        //trans matrixes 
        this.ma = mat4.create();
        this.mn = mat4.create();
        this.m = mat4.create();
        //translate -> rotate -> scale 
        this.keyframes = keyframes;

        this.instant = this.keyframes[0][3]; //first keyframe passed with instant stored in 3rd index

        this.segment = 0; //keyframe using numeration

        //make segment time array 
        this.t = [this.instant];
        for (let i = 1; i < this.keyframes.length; i++) {
            this.t.push(this.keyframes[i][1] - this.keyframes[i-1][1]);
        }

        //NOTE first keyfram is set with sample values 
    }

    set_mn(mn){
        this.mn = mat4.multiply(this.mn,this.mn, mn); 
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
            return;
        }
        
        this.sent += 0.1; //chamado de 100 em 100 ms, comfimar mais tarde 
        //check if should change to anotern keyframe    
        if (this.sent > this.t[this.segment]) { //this.keyframes[this.segment][1] == t[segment]  
            this.sent -= this.t[this.segment]; // reset sent 
            if (this.segment + 1 > this.keyframes.length - 1) {
                console.log('nao da mais');
                return;
            }
        }
        
        //this.progress_percentage = this.sent / this.t[this.segment]; //percentage

        //calculate matriz SRT 
        //translate 
        //this.ma = mat4.multiply(this.ma,this.keyframes[this.segment][0],1);//this.progress_percentage);
        //hardcoded 
        /*for( let i =0; i< 16; i++){
            if(this.mn[i] != 0 && this.mn[i] != 1 && this.mn[i] != -1)
               this.ma[i] = this.keyframes[this.segment][0][i] * this.progress_percentage; 
            else this.ma[i] = this.mn[i]; 
        }
        
        this.m = mat4.multiply(this.m,this.ma,this.mn);*/

        return this.m;
    }

}
//TODO primeiro keyframe sempre igual a zero