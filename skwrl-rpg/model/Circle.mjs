import Shape from "./Shape.mjs";

export default class Circle extends Shape {
    constructor(x, y, r) {
        super(x, y);

        this.Radius = r;
    }
    
    getAABB(asObj = false) {
        if(asObj) {
            return {                
                x0: this.X - this.Radius,
                y0: this.Y - this.Radius,
                x1: this.X + this.Radius,
                x1: this.Y + this.Radius,
                w: this.Radius * 2,
                h: this.Radius * 2
            };
        }

        return [
            this.X - this.Radius,
            this.Y - this.Radius,
            this.X + this.Radius,
            this.Y + this.Radius,
            this.Radius * 2,
            this.Radius * 2
        ];
    }

    getPos({ asObj = false, offX = 0, offY = 0 } = {}) {
        let x = this.X + offX,
            y = this.Y + offY;

        if(asObj) {
            return {
                x: x,
                y: y,
                r: this.Radius
            };
        }

        return [
            x,
            y,
            this.Radius
        ];
    }

    isPointInside(x, y) {
        return Math.sqrt(Math.pow(x - this.X, 2) + Math.pow(y - this.Y, 2)) <= this.Radius;
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