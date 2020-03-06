import Entity from "./Entity.mjs";

export default class Effect extends Entity {
    constructor(x, y, { name = `Effect` } = {}) {
        super(x, y, { name });

        this.Birth = Date.now();
        this.Lifespan = 500;
        this.IsCollidable = false;
    }

    shouldDie() {
        return Date.now() - this.Birth >= this.Lifespan;
    }
};