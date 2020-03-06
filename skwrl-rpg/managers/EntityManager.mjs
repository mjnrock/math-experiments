import Circle from "./../model/Circle.mjs";
import Entity from "./../entity/package.mjs";
import Enum from "./../enum/package.mjs";

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

    onTick(ts) {
        const Entities = Object.values(this.Entities);

        let testNudge = -200;

        Entities.forEach(ent => {
            if(ent instanceof Entity.Projectile) {
                if(ent.X < 0 || ent.X > this.Game.Canvas.get().width || ent.Y < 0 || ent.Y > this.Game.Canvas.get().height) {
                    this.unregister(ent);
                }

                for(let i = 0; i < Entities.length; i++) {
                    let tar = Entities[ i ];
                    if(ent !== tar && tar.IsCollidable && ent.Model.isCollision(tar.Model)) {
                        this.register(new Entity.Effect(Enum.Effect.POOF, tar.X, tar.Y));
                        this.unregister(ent);
                        this.unregister(tar);
                    }
                };
            } else if(ent instanceof Entity.Effect) {
                if(ent.shouldDie()) {
                    this.unregister(ent);
                }
            }

            if(ent.Vx) {
                ent.X += ent.Vx * ts;
            }

            if(ent.Y > this.Game.Canvas.get().height + testNudge - ent.Model.Radius / 2) {   // - 100 is testing nudge
                ent.Vy = 0;

                if(ent.Model instanceof Circle) {
                    ent.Y = this.Game.Canvas.get().height + testNudge - ent.Model.Radius / 2;
                }
            } else {
                ent.Y += ent.Vy * ts;

                if(ent.Vy !== 0) {
                    ent.Vy += ts * this.Game.Physics.GRAVITY;
                }
            }

            ent.onTick(ts);
        });
    }

    onRender(ts) {
        Object.values(this.Entities).forEach(ent => {
            let tileSize = 64;
            
            if(ent === this.Game.$.Manager.Entity.MainPlayer) {                
                //? This state management here is just for testing
                let state = this.Game.$.Handler.Mouse.hasLeft() ? "ATTACKING" : "NORMAL",
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

                this.Game.Canvas.tile("skwrl-01", tileSize, tileCol * tileSize, tileRow * tileSize, ...ent.Model.getPos());
            } else {
                if(ent instanceof Entity.Projectile) {
                    this.Game.Canvas.tile("akorn-01", tileSize, 0, 0, ...ent.Model.getPos());
                } else if(ent instanceof Entity.Ninja) {
                    let tileRow = 0,
                        tileCol = 0;
                
                    if(ent.Direction === 1) {
                        tileCol = 1;
                    } else {
                        tileCol = 0;
                    }

                    this.Game.Canvas.tile("ninja-01", tileSize, tileCol * tileSize, tileRow * tileSize, ...ent.Model.getPos());
                } else if(ent instanceof Entity.Effect) {
                    let type = ent.Type === Enum.Effect.POOF ? "poof-01" : "";

                    this.Game.Canvas.tile(type, tileSize, 0, 0, ...ent.Model.getPos());
                }
            }

            if(this.Game.$.Handler.Keyboard.isDebugMode()) {
                this.Game.Canvas.prop({
                    strokeStyle: "#f00"
                })
                this.Game.Canvas.circle(ent.X, ent.Y, ent.Model.Radius);
            }a
        });
    }
}