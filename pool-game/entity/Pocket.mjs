import Circle from "./../model/Circle.mjs";
import Entity from "./Entity.mjs";

export default class Pocket extends Entity {
    constructor(x, y) {
        super(x, y);

        this.Model = new Circle(x, y, 10);
    }
    
    onTick(ts) {}
};