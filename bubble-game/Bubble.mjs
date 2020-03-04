export default class Bubble {
    constructor(x, y, mass = 1, { vx = 50, vy = 50 } = {}) {
        this.X = x;
        this.Y = y;
        this.Mass = mass;

        this.Vx = vx;
        this.Vy = vy;

        this.Collisions = 0;
    }

    GetRadius() {
        return Math.sqrt(this.Mass / Math.PI);
    }

    CheckCollision(bubble) {
        if(bubble instanceof Bubble) {
            let result = Math.sqrt(Math.pow(bubble.X - this.X, 2) + Math.pow(bubble.Y - this.Y, 2)) <= this.GetRadius() + bubble.GetRadius();

            if(result) {
                this.Collisions += 1;
            }

            return result;
        }

        return false;
    }

    OnTick(delta, game) {
        this.X += this.Vx * delta;
        this.Y += this.Vy * delta;
    }
};