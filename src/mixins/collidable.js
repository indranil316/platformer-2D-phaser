export default {
    addCollider (obj, callback){
        this.scene.physics.add.collider(this, obj, callback, null, this);
    }
}