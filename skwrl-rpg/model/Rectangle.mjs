import Shape from "./Shape.mjs";

export default class Rectangle extends Shape {
    constructor(x, y, w, h) {
        super(x, y);

        this.Width = w;
        this.Height = h;
    }

    getPos(asObj = false) {
        if(asObj) {
            return {
                xc: this.X + this.Width / 2,
                yc: this.Y + this.Height / 2,
                x0: this.X,
                y0: this.Y,
                x1: this.X + this.Width,
                y1: this.Y + this.Height
            };
        }

        return [
            this.X + this.Width / 2,
            this.Y + this.Height / 2,
            this.X,
            this.Y,
            this.X + this.Width,
            this.Y + this.Height
        ];
    }

    isCollision(shape) {
        if(shape instanceof Rectangle) {
            //TODO
        }

        return false;
    }
}