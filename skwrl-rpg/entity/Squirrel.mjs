import Circle from "./../model/Circle.mjs";
import Creature from "./Creature.mjs";

export default class Squirrel extends Creature {
    constructor(x, y, { name = `Squirrel` } = {}) {
        super(x, y, { name });
        
        this.Model = new Circle(x, y, 24);
    }
};