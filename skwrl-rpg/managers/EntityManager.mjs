import Circle from "./../model/Circle.mjs";
import Entity from "./../entity/Entity.mjs";

export default class EntityManager {
    constructor(game) {
        this.Game = game;
        this.Entities = {};

        this.MainPlayer = null;
        this.Players = {}
    }

    setMainPlayer(player) {
        player.IsAPlayer = true;
        this.MainPlayer = player;

        this.register(player);

        return this;
    }

    register(entity) {
        if(entity instanceof Entity) {
            this.Entities[ entity.UUID ] = entity;

            if(entity.IsAPlayer) {
                this.Players[ entity.UUID ] = entity;
            }
        }

        return this;
    }
    unregister(entity) {
        if(entity instanceof Entity) {
            delete this.Entities[ entity.UUID ];

            if(entity.IsAPlayer) {
                delete this.Players[ entity.UUID ];
            }
        }

        return this;
    }

    onTick(ts) {
        Object.values(this.Entities).forEach(ent => ent.onTick(ts));
    }

    onRender(ts) {
        Object.values(this.Entities).forEach(ent => {
            if(ent.Model instanceof Circle) {
                //? This state management here is just for testing
                let state = this.Game.$.Handler.Mouse.hasLeft() ? "ATTACKING" : "NORMAL",
                    tileSize = 64,
                    tileRow = 0,
                    tileCol = 0;

                if(state === "ATTACKING") {
                    tileRow = 1;
                } else {
                    tileRow = 0;
                }
                
                if(this.Game.$.Manager.Entity.MainPlayer.Direction === 1) {
                    tileCol = 1;
                } else {
                    tileCol = 0;
                }

                this.Game.Canvas.tile("skwrl", tileSize, tileCol * tileSize, tileRow * tileSize, ...ent.Model.getPos());
            }
        });
    }
}