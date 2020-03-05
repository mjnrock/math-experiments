import Entity from "./Entity.mjs";

export default class Squirrel extends Entity {
    constructor(x, y, { name = `Squirrel` } = {}) {
        super(x, y, { name });
    }
};