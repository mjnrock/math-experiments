import Circle from "./../model/Circle.mjs";
import Entity from "./../entity/Entity.mjs";

export default class EntityManager {
    constructor(game, canvas) {
        this.Game = game;
        this.Canvas = canvas;
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
        if(this.Game.$.Handler.Keyboard.hasRight()) {
            this.MainPlayer.X += 10;
        }
        if(this.Game.$.Handler.Keyboard.hasLeft()) {
            this.MainPlayer.X -= 10;
        }
        if(this.Game.$.Handler.Keyboard.hasDown()) {
            this.MainPlayer.Y += 10;
        }
        if(this.Game.$.Handler.Keyboard.hasUp()) {
            this.MainPlayer.Y -= 10;
        }

        Object.values(this.Entities).forEach(ent => ent.onTick(ts));
    }

    onRender(ts) {
        Object.values(this.Entities).forEach(ent => {
            if(ent.Model instanceof Circle) {
                this.Canvas.circle(...ent.Model.getPos(), ent.Model.Radius);
            }
        });
    }
}