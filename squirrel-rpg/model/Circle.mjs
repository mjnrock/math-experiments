import Shape from "./Shape.mjs";

export default class Circle extends Shape {
    constructor(x, y, r) {
        super(x, y);

        this.Radius = r;
    }

    getPos(asObj = false) {
        if(asObj) {
            return {
                x: this.X,
                y: this.Y
            };
        }

        return [
            this.X,
            this.Y
        ];
    }

    isCollision(shape) {
        if(shape instanceof Circle) {
            return Math.sqrt(Math.pow(shape.X - this.X, 2) + Math.pow(shape.Y - this.Y, 2)) <= this.Radius + shape.Radius;
        }

        return false;
    }
}