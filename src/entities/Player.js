import Phaser from "phaser";
import playerAnims from "./playerAnims";
import collidable from "../mixins/collidable";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        Object.assign(this, collidable);
        this.init();
        this.initEvents();
    }
    init = () => {
        this.gravity = 500;
        this.playerSpeed = 200;
        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.spaceBar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.jumpCount = 0;
        this.consecutiveJumps = 1;
        playerAnims(this.scene.anims);
    }
    initEvents = () => {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE,this.update, this);
    }
    update(){        
      this.movePlayer();
      this.jumpPlayer();          
    }
    movePlayer = () => {
        const { left, right } = this.cursors;
        if(left.isDown){
            this.setVelocityX(-this.playerSpeed);
            this.setFlipX(true);
        }
        else if(right.isDown){
            this.setVelocityX(this.playerSpeed);
            this.setFlipX(false);
        }
        else{
            this.setVelocityX(0)
        }
        this.body.onFloor() ? this.body.velocity.x === 0 ? this.playIdle() : this.playRun() : this.playJump();
    }
    jumpPlayer = () => {
        const onFloor = this.body.onFloor();
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(this.spaceBar);
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.up);
        if((isSpaceJustDown|| isUpJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps) ){
            this.setVelocityY(-this.playerSpeed*1.3);
            this.jumpCount++;
        }
        if(onFloor){
            this.jumpCount=0;
        }
    }
    playRun = () => {
        this.play('run',true);
    }
    playIdle = () => {
        this.play('idle', true);
    }
    playJump = () => {
        this.play('jump', true);
    }
}