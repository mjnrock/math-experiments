import Entity from "./Entity.mjs";
import Circle from "./../model/Circle.mjs";

export default class Ninja extends Entity {
    constructor(x, y, { name = `Ninja` } = {}) {
        super(x, y, { name, model: new Circle(x, y, 16) });
    }
};