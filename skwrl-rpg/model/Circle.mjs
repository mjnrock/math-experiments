import Shape from "./Shape.mjs";
import Rectangle from "./Rectangle.mjs";

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
                y1: this.Y + this.Radius,
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
        
        let d = Math.sqrt(Math.pow(shape.X - this.X, 2) + Math.pow(shape.Y - this.Y, 2));
        if(shape instanceof Circle) {
            return d <= this.Radius + shape.Radius;
        } else if(shape instanceof Rectangle) {
            let clamp = (value, min, max) => Math.min(Math.max(value, min), max);

            let xn = clamp(this.X, shape.X, shape.X + shape.Width);
            let yn = clamp(this.Y, shape.Y, shape.Y + shape.Height);

            let dx = this.X - xn;
            let dy = this.Y - yn;

            let d2 = (dx * dx) + (dy * dy);
            
            return d2 < (this.Radius * this.Radius);
        }

        return false;
    }
}