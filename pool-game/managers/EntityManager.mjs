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
        game.prop("addPlayer", (player) => this.Players[ player.UUID ] = player);
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
            Entities.forEach(tar => {
                this.Game.$.Manager.Collision.checkCollision(ent, tar);
            });
            
            this.Game.$.Manager.Physics.updatePosition(ent, dt);

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

        Entities.forEach(ent => {
            if(ent instanceof Entity.Pocket) {
                this.Game.Canvas.prop({
                    fillStyle: "#000"
                });
            } else if(ent instanceof Entity.Bumper) {
                this.Game.Canvas.prop({
                    fillStyle: "#666"
                });
            } else if(ent instanceof Entity.Table) {
                this.Game.Canvas.prop({
                    fillStyle: "#1b7c3f"
                });
            } else if(ent instanceof Entity.Ball) {
                this.Game.Canvas.prop({
                    strokeStyle: "#000",
                    fillStyle: "#00f"
                });
            } else if(ent instanceof Entity.Cue) {
                this.Game.Canvas.prop({
                    fillStyle: "#bca662"
                });

                let player = this.Game._.getPlayer();
                let vtxt = `V: ${ player.Vx },${ player.Vy }`;
                this.Game.Canvas.text(vtxt, player.X + this.Game.Canvas.ctx.measureText(vtxt).width, player.Y + player.Model.Height / 2);
            }

            if(ent.Model instanceof Model.Circle) {
                this.Game.Canvas.circle(ent.X, ent.Y, ent.Model.Radius, { isFilled: true })
            } else if(ent.Model instanceof Model.Rectangle) {
                this.Game.Canvas.rect(ent.X, ent.Y, ent.Model.Width, ent.Model.Height, { isFilled: true })
            }
        });
    }
}