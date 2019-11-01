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
    constructor(id,keyframes) {
        super();

        this.sent = 0;
        this.segment=0; 
        this.progress_percentage = 0;
        this.second_instant = 0;

        //trans matrixes 
        this.ma = mat4.create();
        this.mn = mat4.create();
        //translate -> rotate -> scale 
        this.keyframes = keyframes;

        this.instant = this.keyframes[0][1]; //first keyframe passed with instant sotred in 1st index

        this.keyframe_num = 0; //keyframe using numeration

        //NOTE first keyfram is set with sample values 
    }
    set_mn(mn){
        this.mn *= mn; 
    }
    /**
    * create ma
    * @param {flat} progress_percentage - progress percentage
    * @param {int} keyframe_num keyframe number operating
    */
    process_animation(){

        //check if should change to anotern keyframe    
        if(super.second == this.keyframes[this.keyframe_num][1]){
            this.keyframe_num++; 
            this.sent=0; //reset sent 
        }

        //aplicar a transformação sobre a matriz de transformações da cena quando adequado 
        if (this.sent > this.keyframes[this.keyframe_num][3]) {
           // this.sent -= super.second;
           // this.segundo += this.segundo;
           this.sent++; 
        }
        this.progress_percentage = this.sent / this.second_instant; //percentage 
        
        //calculate matriz SRT 

        //translate 
        this.ma = this.progress_percentage*this.keyframes[this.keyframe_num][0];

        super.m = this.mm * this.ma;
    }

}
//TODO primeiro keyframe sempre igual a zero