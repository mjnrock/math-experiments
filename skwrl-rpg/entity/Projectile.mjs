import Entity from "./Entity.mjs";

export default class Projectile extends Entity {
    constructor(x, y, { name = `Projectile` } = {}) {
        super(x, y, { name });
    }
};