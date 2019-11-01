/**
 * KeyFrameAnimation
 * @constructor
 * @param scene - Reference to MyScene object
 */
class KeyFrameAnimaton extends Animation {
    /**
     * @constructor 
     * @param {int} id
     * @param {mat4} mn - current tranformation object matrix
     * @param {array} keyframe - array of arrays storing animaton keyframe + start instant 
     */
    constructor(id, mn, keyframes) {
        super();

        this.sent = 0;
        this.executeSecond = 0;
        this.second_instant = 0;

        //trans matrixes 
        this.ma = mat4.create();
        this.mn = mn;
        //translate -> rotate -> scale 
        this.keyframes = keyframes;

        this.instant = this.keyframes[0][3]; //first keyframe passed with instant stored in 3rd index

        this.keyframe_num = 0; //keyframe using numeration

        //NOTE first keyfram is set with sample values 
    }
    update(t) {
    }
    apply() {
        //aplicar a transformação sobre a matriz de transformações da cena quando adequado 
        if (this.sent > super.second) {
            this.sent -= super.second;
            this.segment += this.segundo;
        }
        this.executeSecond = this.sent / this.second_instant; //percentage 
        this.process_ma(this.executeSecond, i);
        //calcula matriz SRT 
        super.m = this.mm * this.ma;
    }
    /**
    * create ma
    * @param {flat} progress_percentage - progress percentage
    * @param {int} keyframe_num keyframe number operating
    */
    process_ma(progress_percentage, keyframe_num) {
        //tranlate 
        this.translate = progress_percentage*this.keyframe[keyframe_num][0];
        //rotation
        this.rotation = progress_percentage*this.keyframe[keyframe_num][1];
        //scale
        this.scale = progress_percentage*this.keyframe[keyframe_num][2];
        this.ma = this.translate * this.rotation*this.scale;
    }

}
//TODO primeiro keyframe sempre igual a zero