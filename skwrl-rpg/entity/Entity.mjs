import { GenerateUUID } from "./../lib/Helpers.mjs";
import Circle from "./../model/Circle.mjs";
import EnumEntityState from "./../enum/EntityState.mjs";

export default class Entity {
    constructor(x, y, { name = `Entity`, type = null, model = null, isPlayer = false, vx = 0, vy = 0, dir = -1 } = {}) {
        this.UUID = GenerateUUID();
        this._X = x;
        this._Y = y;
        this._Direction = dir;
        this._Vx = vx;
        this._Vy = vy;

        this.Model = model || new Circle(x, y, 32);

        this.Type = type;
        this.Name = name;

        this.IsAPlayer = isPlayer;
        this.IsCollidable = true;
        this.HasGravity = true;

        this.State = 0;
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

    shouldDie() {
        return false;
    }
    kill() {
        this.shouldDie = () => true;
    }
    
    onTick(ts) {}
};