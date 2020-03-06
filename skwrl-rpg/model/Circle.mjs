import Shape from "./Shape.mjs";

export default class Circle extends Shape {
    constructor(x, y, r) {
        super(x, y);

        this.Radius = r;
    }

    getPos({ asObj = false, offX = 0, offY = 0 } = {}) {
        let x = this.X + offX,
            y = this.Y + offY;

        if(asObj) {
            return {
                x: x,
                y: y
            };
        }

        return [
            x,
            y
        ];
    }

    isPointInside(x, y) {
        return Math.sqrt(Math.pow(c - this.X, 2) + Math.pow(y - this.Y, 2)) <= this.Radius;
    }

    isCollision(shape) {
        if(this === shape) {
            return false;
        }
        
        if(shape instanceof Circle) {
            return Math.sqrt(Math.pow(shape.X - this.X, 2) + Math.pow(shape.Y - this.Y, 2)) <= this.Radius + shape.Radius;
        }

        return false;
    }
}