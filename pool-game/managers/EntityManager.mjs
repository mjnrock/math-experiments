import Manager from "./Manager.mjs";

import Entity from "./../entity/package.mjs";
import Model from "./../model/package.mjs";
import Enum from "./../enum/package.mjs";

export default class EntityManager extends Manager {
    constructor(game, window) {
        super(game, window);

        this.Entities = {};
        this.Players = {}


        game.prop("getPlayer", (index = 0) => Object.values(this.Players)[ index ]);
    }

    register(entity) {
        if(entity instanceof Entity.Entity) {
            this.Entities[ entity.UUID ] = entity;

            if(entity.IsAPlayer) {
                this.Players[ entity.UUID ] = entity;
            }
        }

        return this;
    }
    unregister(entity) {
        if(entity instanceof Entity.Entity) {
            delete this.Entities[ entity.UUID ];

            if(entity.IsAPlayer) {
                delete this.Players[ entity.UUID ];
            }
        }

        return this;
    }

    onTick(dt) {
        const Entities = Object.values(this.Entities);

        Entities.forEach(ent => {
            //? Live or Die checks
            if(ent.shouldDie()) {
                this.unregister(ent);
            } else {
                ent.onTick(dt);
            }
        });
    }

    onRender(ts) {
        const Entities = Object.values(this.Entities);
        

        Entities.forEach(ent => {});
    }
}