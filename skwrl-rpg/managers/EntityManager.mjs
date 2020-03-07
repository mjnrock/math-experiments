import Manager from "./Manager.mjs";

import Entity from "./../entity/package.mjs";
import Model from "./../model/package.mjs";
import Enum from "./../enum/package.mjs";

export default class EntityManager extends Manager {
    constructor(game, window) {
        super(game, window);

        this.Entities = {};
        this.MainPlayer = null;
        this.Players = {}


        game.prop("getPlayer", (index = 0) => Object.values(this.Players)[ index ]);
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

    onTick(dt) {
        const Entities = Object.values(this.Entities);

        let testNudge = -200;

        Entities.forEach(ent => {
            //? Lifecycle checks
            if(ent instanceof Entity.Projectile) {
                if(ent.X < 0 || ent.X > this.Game.Canvas.get().width || ent.Y < 0 || ent.Y > this.Game.Canvas.get().height) {
                    ent.kill();
                }
            }

            //? Physics checks
            //TODO Send to PhysicsManager
            // if(ent.Vx) {
            //     ent.X += ent.Vx * dt;
            // }

            // if(ent.Vy > 0 && ent.Y > this.Game.Canvas.get().height + testNudge - ent.Model.Radius / 2) {
            //     ent.Vy = 0;

            //     if(ent.Model instanceof Model.Circle) {
            //         ent.Y = this.Game.Canvas.get().height + testNudge - ent.Model.Radius / 2;
            //     }
            // } else {
            //     ent.Y += ent.Vy * dt;

            //     if(ent.Vy !== 0) {
            //         ent.Vy += dt * this.Game.$.Manager.Physics.Constants.GRAVITY;
            //     }
            // }
            this.Game.$.Manager.Physics.applyGravity(dt, ent);
            this.Game.$.Manager.Physics.updatePosition(dt, ent);


            //? Collision checks
            Entities.forEach(tar => {
                this.Game.$.Manager.Collision.checkCollision(ent, tar);
            });


            //? Live or Die checks
            if(ent.shouldDie()) {
                this.unregister(ent);
            } else {
                ent.onTick(dt);
            }
        });
    }

    onRender(ts) {
        const tileSize = 64;
        
        // DEBUG
        let playerHasCollision = false;

        Object.values(this.Entities).forEach(ent => {            
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

                this.Game.Canvas.tile("skwrl-01", tileSize, tileCol * tileSize, tileRow * tileSize, ...ent.Model.getPos({
                    offX: -tileSize / 2,
                    offY: -tileSize / 2,
                }));
            } else {
                if(ent instanceof Entity.Projectile) {
                    this.Game.Canvas.tile("akorn-01", tileSize, 0, 0, ...ent.Model.getPos({
                        offX: -tileSize / 2,
                        offY: -tileSize / 2,
                    }));
                } else if(ent instanceof Entity.Ninja) {
                    let tileRow = 0,
                        tileCol = 0;
                
                    if(ent.Direction === 1) {
                        tileCol = 1;
                    } else {
                        tileCol = 0;
                    }

                    this.Game.Canvas.tile("ninja-01", tileSize, tileCol * tileSize, tileRow * tileSize, ...ent.Model.getPos({
                        offX: -tileSize / 2,
                        offY: -tileSize / 2,
                    }));
                } else if(ent instanceof Entity.Effect) {
                    let type = ent.Type === Enum.Effect.POOF ? "poof-01" : "";

                    this.Game.Canvas.tile(type, tileSize, 0, 0, ...ent.Model.getPos({
                        offX: -tileSize / 2,
                        offY: -tileSize / 2,
                    }));
                } else if(ent instanceof Entity.Terrain) {
                    this.Game.Canvas.prop({
                        strokeStyle: "#000"
                    });
                    this.Game.Canvas.rect(ent.X, ent.Y, ent.Model.getRelativeWidth(false), ent.Model.getRelativeHeight(false));
                }
            }

            //! DEBUGGING ONLY
            if(this.Game.$.Handler.Keyboard.isDebugMode()) {
                const player = this.Game.$.Manager.Entity.MainPlayer;
                
                if(ent.IsCollidable && player.Model.isCollision(ent.Model)) {
                    playerHasCollision = true;

                    this.Game.Canvas.prop({
                        strokeStyle: "#f00"
                    });
                } else {
                    this.Game.Canvas.prop({
                        strokeStyle: "#0f0"
                    });
                }

                if(ent.Model instanceof Model.Circle) {
                    this.Game.Canvas.circle(ent.X, ent.Y, ent.Model.Radius);
                } else if(ent.Model instanceof Model.Rectangle) {
                    this.Game.Canvas.rect(ent.X, ent.Y, ent.Model.Width, ent.Model.Height);
                }
            }
        });
        
        //! DEBUGGING ONLY
        if(this.Game.$.Handler.Keyboard.isDebugMode()) {
            const player = this.Game.$.Manager.Entity.MainPlayer;
            if(playerHasCollision) {
                this.Game.Canvas.prop({
                    strokeStyle: "#f00"
                });
            } else {
                this.Game.Canvas.prop({
                    strokeStyle: "#0f0"
                });
            }                  
                
            if(player.Model instanceof Model.Circle) {
                this.Game.Canvas.circle(player.X, player.Y, player.Model.Radius);
            } else if(player.Model instanceof Model.Rectangle) {
                this.Game.Canvas.rect(player.X, player.Y, player.Model.Width, player.Model.Height);
            }
        }
    }
}