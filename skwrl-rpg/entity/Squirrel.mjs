import Creature from "./Creature.mjs";

export default class Squirrel extends Creature {
    constructor(x, y, { name = `Squirrel` } = {}) {
        super(x, y, { name });
    }
};