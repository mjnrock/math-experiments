import Entity from "./Entity.mjs";
import Rectangle from "./../model/Rectangle.mjs";

export default class Terrain extends Entity {
    constructor(x, y, opts) {
        super(x, y, {
            model: new Rectangle(x, y, 250, 50),
            ...opts
        });

        this.Model.Mass = Infinity;

        this.HasGravity = false;
    }
};