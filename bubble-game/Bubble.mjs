export default class Bubble {
    constructor(x, y, mass = 1) {
        this.X = x;
        this.Y = y;
        this.Mass = mass;

        this.Vx = 500;
        this.Vy = 500;

        this.Collisions = 0;
    }

    GetRadius() {
        return this.Mass;
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