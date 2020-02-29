import Model from "./../model/package.mjs";

export default class Render {
    constructor(shape) {
        this.Shape = shape;
    }

    GetShape() {
        return this.Shape;
    }

    Draw(time) {}
}