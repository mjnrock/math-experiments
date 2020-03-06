import Manager from "./Manager.mjs";

export default class RenderManager extends Manager {
    constructor(game, window) {
        super(game, window);
    }

    onTick(ts) {}
    onRender(ts) {}
}