import Rectangle from "./../model/Rectangle.mjs";
import Entity from "./Entity.mjs";

export default class Bumper extends Entity {
    constructor(x, y, w, h) {
        super(x, y);

        this.Model = new Rectangle(x, y, w, h);
        this.Model.Mass = Infinity;
    }
    
    onTick(ts) {}
};