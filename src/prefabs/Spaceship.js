//Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame,pointValue){
        super(scene,x,y,texture,frame);
        //Add objects
        scene.add.existing(this);
        this.points = pointValue;
    }

    update(){
        //Move Left
        this.x -= game.settings.spaceshipSpeed;
        //Wraparound
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    reset(){
        this.x = game.config.width;
    }
}