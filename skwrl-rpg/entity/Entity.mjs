import { GenerateUUID } from "./../lib/Helpers.mjs";
import Circle from "./../model/Circle.mjs";

export default class Entity {
    constructor(x, y, { name = `Entity`, model = null, isPlayer = false } = {}) {
        this.UUID = GenerateUUID();
        this._X = x;
        this._Y = y;
        this._Direction = -1;
        this._Vx = 0;
        this._Vy = 0;

        this.Model = model || new Circle(x, y, 50);

        this.Name = name;
        this.IsAPlayer = isPlayer;
    }

    //* Set traps to keep the Model's X,Y in sync with Entity
        get X() {
            return this._X;
        }
        get Y() {
            return this._Y;
        }
        get Direction() {
            return this._Direction;
        }
        get Vx() {
            return this._Vx;
        }
        get Vy() {
            return this._Vy;
        }

        set X(x) {
            this._X = x;
            this.Model.X = x;

            return this._X;
        }
        set Y(y) {
            this._Y = y;
            this.Model.Y = y;

            return this._Y;
        }
        set Direction(dir) {
            this._Direction = dir;

            return this._Direction;
        }
        set Vx(vx) {
            this._Vx = vx;

            return this._Vx;
        }
        set Vy(vy) {
            this._Vy = vy;

            return this._Vy;
        }

    isCollision(shape) {
        return this.Model.isCollision(shape);
    }

    onTick(ts) {}
};