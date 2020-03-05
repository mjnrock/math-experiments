import { GenerateUUID } from "./../lib/Helpers.mjs";
import Circle from "./../model/Circle.mjs";

export default class Entity {
    constructor(x, y, { name = `Entity`, model = null, isPlayer = false } = {}) {
        this.UUID = GenerateUUID();
        this._X = x;
        this._Y = y;
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

    isCollision(shape) {
        return this.Model.isCollision(shape);
    }

    onTick(ts) {}
};