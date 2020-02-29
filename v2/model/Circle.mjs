import Shape from "./Shape.mjs";

export default class Circle extends Shape {
    constructor(x, y, r = 1, meta = {}) {
        super(x, y, meta);

        this.Radius = r;
    }

    IsPointInside(x, y) {
        return Math.sqrt(
            Math.pow(this.X - x, 2)
            + Math.pow(this.Y - y, 2)
        ) <= this.Radius;
    }

    IsIntersection(shape) {
        if(shape instanceof Circle) {
            return Math.sqrt(
                Math.pow(this.X - shape.X, 2)
                + Math.pow(this.Y - shape.Y, 2)
            ) <= this.Radius + shape.Radius;
        }
    }

    Tick(time) {
        super.Tick(time);
    }


    static Make(x, y, r) {
        return new Circle(x, y, r);
    }
}