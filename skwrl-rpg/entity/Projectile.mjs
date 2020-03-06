import Entity from "./Entity.mjs";

export default class Projectile extends Entity {
    constructor(source, x, y, opts) {
        super(x, y, opts);

        this.Source = source;
    }
};