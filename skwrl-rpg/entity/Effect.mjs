import Entity from "./Entity.mjs";

export default class Effect extends Entity {
    constructor(type, x, y, { name = `Effect`, lifespan = 350, isCollidable = false } = {}, opts = null) {
        super(x, y, { name, type, ...opts });

        this.Birth = Date.now();
        this.Lifespan = lifespan;
        this.IsCollidable = isCollidable;
    }

    shouldDie() {
        return Date.now() - this.Birth >= this.Lifespan;
    }
};