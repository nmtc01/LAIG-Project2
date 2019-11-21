class MySecurityCamera extends CGFobject {
    constructor(scene,textureRTT) { //passar um shader por causa da cor e gradientes 
        super(scene); 

        this.textureRTT = textureRTT;

        this.rectangle = new MyRectangle(scene,1,-0.5,0.5,-0.5,0.5); // ocupa 1/4 largura e altura do ecra, no canto inferior direito do ecra 
        
        //shader
        this.shader = new CGFshader(scene.gl,"shaders/securitycamera.vert","shaders/securitycamera.frag"); 
       
        this.shader.setUniformsValues({ uSampler: 1 });
    }

    display() {
        //update texture
        this.material =new CGFappearance(this.scene);
        this.material.setAmbient(1,1,1,1); 
        this.material.setTexture(this.textureRTT);
        this.material.apply();

        this.scene.setActiveShader(this.shader);      
        this.scene.pushMatrix();  
        this.rectangle.display();         
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

}