class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        //loads images
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png');
        this.load.image('starfield','./assets/starfield.png');
        this.load.spritesheet('explosion','./assets/explosion.png',{frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        //place tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);
        //white rectangle
        this.add.rectangle(5,5,630,32,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5,443,630,32,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5,5,32,455,0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(603,5,32,455,0xFFFFFF).setOrigin(0,0);
        //green ui
        this.add.rectangle(37,42,566,64,0x00FF00).setOrigin(0,0);
        //add rocket
        this.p1Rocket = new Rocket(this,game.config.width/2,431,'rocket').setScale(0.5,0.5).setOrigin(0,0);
        //add spaceship
        this.ship01 = new Spaceship(this,game.config.width + 192, 132, `spaceship`,0,30).setOrigin(0,0);
        this.ship02 = new Spaceship(this,game.config.width + 96, 196, `spaceship`,0,30).setOrigin(0,0);
        this.ship03 = new Spaceship(this,game.config.width, 260, `spaceship`,0,30).setOrigin(0,0);
        //define keyboard
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //animation
        this.anims.create({
            key: `explode`,
            frames: this.anims.generateFrameNumbers('explosion',{start: 0, end: 9, first: 0}),
            frameRate: 30,
        });
        //score
        this.p1Score = 0;
        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100,
        }
        this.scoreLeft = this.add.text(69,54,this.p1Score,scoreConfig);
    }

    update(){
        //scroll
        this.starfield.tilePositionX -= 4
        //update rocket
        this.p1Rocket.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        //check collision
        if(this.checkCollision(this.p1Rocket,this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket,this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket,this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
    }

    checkCollision(rocket,ship){
        //collision
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x 
                && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true;
        }
        else{
            return false;
        }
    }

    shipExplode(ship){
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x,ship.y,'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })
        //score increase
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }
}