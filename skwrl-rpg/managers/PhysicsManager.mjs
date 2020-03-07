import Manager from "./Manager.mjs";

export default class PhysicsManager extends Manager {
    constructor(game, window) {
        super(game, window);
        
        this.Constants = {
            PROJECTILE: 1000,
            JUMP: -800,
            GRAVITY: 2000
        };
    }

    updatePosition(dt, entity) {
        entity.X += entity.Vx * dt;
        entity.Y += entity.Vy * dt;

        return this;
    }

    applyGravity(dt, entity) {
        if(entity.HasGravity) {
            entity.Vy += this.Constants.GRAVITY * dt;
        }
    }

    onTick(ts) {}
    onRender(ts) {}
}