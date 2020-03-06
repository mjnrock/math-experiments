import Manager from "./Manager.mjs";

export default class PhysicsManager extends Manager {
    constructor(game, window) {
        super(game, window);
        
        this.Constants = {
            PROJECTILE: 1000,
            JUMP: -800,
            GRAVITY: 2000
        }
    }

    onTick(ts) {}
    onRender(ts) {}
}