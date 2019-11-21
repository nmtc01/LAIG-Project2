class MySecurityCamera extends CGFobject {
    constructor(scene,textureRTT) {
        super(scene); 

        this.textureRTT = textureRTT;

        this.rectangle = new MyRectangle(scene,1,-0.5,0.5,-0.5,0.5);
    
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

    update(t){
        this.shader.setUniformsValues({ timeFactor: t });
    }
}