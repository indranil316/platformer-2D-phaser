import Phaser from "phaser";
import collidable from "../mixins/collidable";

export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'enemy');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        Object.assign(this, collidable);
        this.init();
    }
    init = () => {
        this.gravity = 500;
        this.playerSpeed = 200;
        this.body.setGravityY(this.gravity);
        this.body.setVelocityX(20)
    }
}