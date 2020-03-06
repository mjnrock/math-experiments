import Entity from "./Entity.mjs";

export default class Attack extends Entity {
    constructor(x, y, { name = `Attack` } = {}) {
        super(x, y, { name });
    }
};