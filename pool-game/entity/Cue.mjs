import Rectangle from "./../model/Rectangle.mjs";
import Entity from "./Entity.mjs";

export default class Cue extends Entity {
    constructor(x, y) {
        super(x, y);

        this.Model = new Rectangle(x, y, 10, 350);
        this.Model.Mass = 10;
    }
    
    onTick(ts) {}
};