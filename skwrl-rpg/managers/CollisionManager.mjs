import Manager from "./Manager.mjs";


import Terrain from "./../entity/Terrain.mjs";

export default class CollisionManager extends Manager {
    constructor(game, window) {
        super(game, window);
        
        this.Handlers = [];
    }

    add(entityFromClasses, entityToClasses, handler) {
        if(arguments.length === 1 && typeof entityFromClasses === "function") {        
            this.Handlers.push({
                from: [],
                to: [],
                handler: entityFromClasses
            });
        } else {
            this.Handlers.push({
                from: entityFromClasses,
                to: entityToClasses,
                handler: handler
            });
        }

        return this;
    }

    onCollision(entFrom, entTo) {
        this.Handlers.forEach(({ from, to, handler }) => {
            let cfrom = false,
                cto = false;

            for(let f of from) {
                if(entFrom instanceof f) {
                    cfrom = true;
                    break;
                }
            }
            for(let t of to) {
                if(entTo instanceof t) {
                    cto = true;
                    break;
                }
            }

            if((from.length === 0 || cfrom) && (to.length === 0 || cto)) {
                handler(entFrom, entTo, this.Game, this.Window);
            }
        });

        return this;
    }

    checkCollision(entFrom, entTo) {
        if(entFrom !== entTo && entTo.IsCollidable && entFrom.Model.isCollision(entTo.Model)) {
            this.onCollision(entFrom, entTo);

            return true;
        }

        return false;
    }

    isCollision(entFrom, entTo) {
        if(entFrom !== entTo && entTo.IsCollidable && entFrom.Model.isCollision(entTo.Model)) {
            return true;
        }

        return false;
    }

    onTick(ts) {}
    onRender(ts) {}
}