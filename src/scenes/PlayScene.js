import Phaser from "phaser";
import Player from "../entities/Player";
import Enemy from "../entities/Enemy";
import { mapSize, size } from "../constants";

export default class PlayScene extends Phaser.Scene{
    constructor(){
        super('playScene');
        this.map=null;
        this.layers=null;
        this.player = null;
        this.gravity = 300;
        this.cursors=null;
        this.playerSpeed = 200;
        this.enemies=[];
    }
    create(){
        this.createMap();
        this.createLayers();
        this.createPlayer();
        this.createEnemy();
        this.createPlayerColliders(this.player, {colliders:{
            platformColliders: this.layers.platforms_collider
        }});
        this.enemies.forEach(enemy=>{
            this.createPlayerColliders(enemy, {colliders:{
                platformColliders: this.layers.platforms_collider
            }});
        })
        this.setupFollowupCameraOn();
    }
    createMap = () => {
        this.map=this.make.tilemap({
            key:'map',            
        })
        this.map.addTilesetImage('main_lev_build_1','tiles-1');        
    }
    createLayers = () => {
        const tileset = this.map.getTileset('main_lev_build_1');
        const platforms_collider = this.map.createLayer('platforms_collider',tileset); 
        const environment =this.map.createLayer('environment',tileset);
        const platforms = this.map.createLayer('platforms',tileset); 
        platforms_collider.setCollisionByExclusion(-1,true);
        const playerZones = this.map.getObjectLayer('player_zones');
        const enemySpawns = this.map.getObjectLayer('enemy_spawns');
        this.layers = {environment, platforms, platforms_collider, playerZones, enemySpawns};
    }
    createPlayer = () => {
        let {x,y} = this.layers.playerZones.objects.find(obj=> obj.name === 'start')
        this.player = new Player(this,x,y);
    }
    createEnemy = () => {
        this.layers.enemySpawns.objects.forEach(enemy_spawn => {
            let {x,y} = enemy_spawn;
            this.enemies.push(new Enemy(this,x,y))
        })
    }
    createPlayerColliders = (player, {colliders}) =>{
        player.addCollider(colliders.platformColliders);
    }
    setupFollowupCameraOn = () => {
        this.physics.world.setBounds(0,0, size.width+mapSize.offSet, size.height+200);
        this.cameras.main.setBounds(0,0,size.width+mapSize.offSet, size.height);
        this.cameras.main.startFollow(this.player).setZoom(1.5);
    }
}