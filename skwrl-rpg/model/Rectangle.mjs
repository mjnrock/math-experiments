import Shape from "./Shape.mjs";
import Circle from "./Circle.mjs";

export default class Rectangle extends Shape {
    constructor(x, y, w, h) {
        super(x, y);

        this.Width = w;
        this.Height = h;
    }
    
    getAABB(asObj = false) {
        if(asObj) {
            return {                
                x0: this.X,
                y0: this.Y,
                x1: this.X + this.Width,
                x1: this.Y + this.Height,
                w: this.Width,
                h: this.Height
            };
        }

        return [
            this.X,
            this.Y,
            this.X + this.Width,
            this.Y + this.Height,
            this.Width,
            this.Height
        ];
    }

    getPos({ asObj = false, offX = 0, offY = 0 } = {}) {
        let x = this.X + offX,
            y = this.Y + offY;

        if(asObj) {
            return {
                xc: x + this.Width / 2,
                yc: y + this.Height / 2,
                x0: x,
                y0: y,
                x1: x + this.Width,
                y1: y + this.Height,
                w: this.Width,
                h: this.Height
            };
        }

        return [
            x + this.Width / 2,
            y + this.Height / 2,
            x,
            y,
            x + this.Width,
            y + this.Height,
            this.Width,
            this.Height
        ];
    }

    isPointInside(x, y) {
        return x >= this.X && x <= this.X + this.Width
            && y >= this.Y && y <= this.Y + this.Height;
    }

    isCollision(shape) {
        if(this === shape) {
            return false;
        }
        
        if(shape instanceof Rectangle) {
            let t = this.getPos({ asObj: true }),
                s = shape.getPos({ asObj: true });

            return (Math.abs(t.xc - s.xc) <= (this.Width / 2 + shape.Width / 2))
                && (Math.abs(t.yc - s.yc) <= (this.Height / 2 + shape.Height / 2));
        } else if(shape instanceof Circle) {
            
        }

        return false;
    }
}