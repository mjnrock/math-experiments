import Circle from "./../model/Circle.mjs";

export default class Squirrel {
    constructor(x, y, { name = `Squirrel` } = {}) {
        this.X = x;
        this.Y = y;
        this.Model = new Circle(x, y, 50);

        this.Name = name;
    }

    isCollision(shape) {
        return this.Model.isCollision(shape);
    }
};