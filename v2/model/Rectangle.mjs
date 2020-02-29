import Shape from "./Shape.mjs";

export default class Rectangle extends Shape {
    constructor(x, y, w, h, meta = {}) {
        super(x, y, meta);

        this.Width = w;
        this.Height = h;
    }

    IsPointInside(x, y) {
        return x >= this.X && x <= this.X + this.Width
            && y >= this.Y && y <= this.Y + this.Height;
    }

    GetSidePoints() {
        return [
            [ this.X, this.Y ],
            [ this.X + this.Width, this.Y ],
            [ this.X + this.Width, this.Y + this.Height ],
            [ this.X, this.Y + this.Height ]
        ];
    }

    Tick(time) {
        super.Tick(time);
    }


    static Make(x, y, w, h) {
        return new Rectangle(x, y, w, h);
    }
    static MakeFromPoints(x0, y0, x1, y1) {
        return new Rectangle(x0, y0,
            x1 - x0,
            y1 - y0    
        );
    }
}