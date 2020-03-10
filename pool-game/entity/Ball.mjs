import Circle from "./../model/Circle.mjs";
import Entity from "./Entity.mjs";

export default class Ball extends Entity {
    constructor(x, y) {
        super(x, y);

        this.Model = new Circle(x, y, 8);
        this.Model.Mass = 1;
    }
    
    onTick(ts) {}
};