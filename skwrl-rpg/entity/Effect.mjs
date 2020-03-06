import Entity from "./Entity.mjs";

export default class Effect extends Entity {
    constructor(x, y, { name = `Effect`, lifespan = 500, isCollidable = false } = {}) {
        super(x, y, { name });

        this.Birth = Date.now();
        this.Lifespan = lifespan;
        this.IsCollidable = isCollidable;
    }

    shouldDie() {
        return Date.now() - this.Birth >= this.Lifespan;
    }
};