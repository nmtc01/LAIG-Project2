class MySecurityCamera extends CGFobject {
    constructor(scene, width, height) {
        super(scene); 

        this.x2 = width
        this.y2 = height;
        this.x1 = width - width / 4;
        this.y1 = height - height / 4;
        console.log(this.x1 + ' ' + this.y1 + ' ' +  this.x2 + ' ' + this.y2)
        //this.rectangle = new MyRectangle(scene,this.x1, this.x2, this.y1, this.y2); // ocupa 1/4 largura e altura do ecra, no canto inferior direito do ecra 
        this.rectangle = new MyRectangle(scene,0, 20, 0, 20); // ocupa 1/4 largura e altura do ecra, no canto inferior direito do ecra 
        this.vertex = 0;
        this.fragment_shader = 0;
    }

    display() {
        //aplicar textura RTT criada no retangulo
    }


}