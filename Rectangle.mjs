export default class Rectangle {
    constructor(x, y, w, h, vx = 0, vy = 0) {
        this.X = x;
        this.Y = y;
        this.Width = w;
        this.Height = h;

        this.Vx = vx;
        this.Vy = vy;

        this.NoOfCollisions = 0;
        this.Collisions = [];
    }

    GetEndpoints() {
        return [
            [ this.X, this.Y ],
            [ this.X + this.Width, this.Y ],
            [ this.X, this.Y + this.Height ],
            [ this.X + this.Width, this.Y + this.Height ],
        ]
    };
    GetSides(nudge = 0) {
        return [
            [ this.X - nudge, this.Y - nudge, this.X + this.Width + nudge, this.Y - nudge ],
            [ this.X + this.Width + nudge, this.Y - nudge, this.X + this.Width + nudge, this.Y + this.Height + nudge ],
            [ this.X + this.Width + nudge, this.Y + this.Height + nudge, this.X - nudge, this.Y + this.Height + nudge ],
            [ this.X - nudge, this.Y + this.Height + nudge, this.X - nudge, this.Y - nudge],
        ];
    };

    GetBoundingBox() {
        return {
            x0: this.X,
            y0: this.Y,
            x1: this.X + this.Width,
            y1: this.Y + this.Height,
        };
    }
    GetOrigin() {
        return {
            x: this.X + this.Width / 2,
            y: this.Y + this.Height / 2,
            rw: this.Width / 2,
            rh: this.Height / 2,
        };
    }

    IsCollision(rect) {
        let Origin0 = this.GetOrigin();
        let Origin1 = rect.GetOrigin();

        let result = (
            Math.abs(Origin0.x - Origin1.x) <= (Origin0.rw + Origin1.rw)
        ) && (
            Math.abs(Origin0.y - Origin1.y) <= (Origin0.rh + Origin1.rh)
        );

        if(result === true) {
            this.NoOfCollisions += 1;
            this.Collisions.push(rect);

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