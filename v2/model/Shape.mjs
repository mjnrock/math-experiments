export default class Shape {
    constructor(x, y, meta = {}) {
        this.X = x;
        this.Y = y;
        this.Physics = {};

        this.Meta = meta;
    }

    set(key, value) {
        this.Meta[ key ] = value;

        return this;
    }
    get(key) {
        return this.Meta[ key ];
    }
    remove(key) {
        delete this.Meta[ key ];

        return this;
    }

    AddPhysics(physics) {
        this.Physics[ physics.Name ] = physics;

        return this;
    }

    GetOrigin(asObj = false) {
        if(asObj) {
            return {
                X: this.X,
                Y: this.Y
            };
        }

        return [ this.X, this.Y ];
    }

    Tick(time) {}
}