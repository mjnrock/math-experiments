import Bitwise from "./../lib/Bitwise.mjs";
import Model from "./../model/package.mjs";
import Enum from "./../enum/package.mjs";
import Manager from "./Manager.mjs";

export default class PhysicsManager extends Manager {
    constructor(game, window) {
        super(game, window);
    }

    onTick(ts) {}
    onRender(ts) {}
}