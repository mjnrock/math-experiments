export default class Circle {
    constructor(x, y, r, vx = 0, vy = 0) {
        this.X = x;
        this.Y = y;
        this.Radius = r;

        this.Vx = vx;
        this.Vy = vy;

        this.NoOfCollisions = 0;
        this.Collisions = [];


        this.Color = `#44AA44`;
        // this.Color = `#${ ((1 << 24) * Math.random() | 0).toString(16) }`;
    }

    GetBoundingBox() {
        return {
            x0: this.X - this.Radius,
            y0: this.Y - this.Radius,
            x1: this.X + this.Radius,
            y1: this.Y + this.Radius,
        };
    }
    GetOrigin() {
        return {
            x: this.X,
            y: this.Y,
            r: this.Radius
        };
    }

    IsCollision(circle) {
        let result = Math.hypot(circle.X - this.X, circle.Y - this.Y) <= (this.Radius + circle.Radius);

        if(result === true) {
            this.NoOfCollisions += 1;
            this.Collisions.push(circle);

            return true;
        }

        return false;
    }

    HasCollided(rect) {
        return this.Collisions.filter(r => r === rect).length > 0;
    }
    OnTick() {
        this.Collisions = [];
    }
};