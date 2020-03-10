import Rectangle from "./../model/Rectangle.mjs";
import Entity from "./Entity.mjs";

export default class Table extends Entity {
    constructor(x, y, w, h) {
        super(x, y);

        this.Model = new Rectangle(x, y, w, h);
    }
    
    onTick(ts) {}
};