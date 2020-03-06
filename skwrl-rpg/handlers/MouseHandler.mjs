import Bitwise from "./../lib/Bitwise.mjs";
import DOMHandler from "./DOMHandler.mjs";

import Entity from "./../entity/package.mjs";
import Model from "./../model/package.mjs";

export default class MouseHandler extends DOMHandler {
    constructor(game, window, { move = null, down = null, up = null, click = null, dblclick = null, contextmenu = null } = {}) {
        super(game, window);

        window.onmousedown = this.onMouseDown.bind(this);
        window.onmouseup = this.onMouseUp.bind(this);
        window.onmousemove = this.onMouseMove.bind(this);
        // window.onclick = this.onClick.bind(this);
        // window.ondblclick = this.onDblClick.bind(this);
        window.oncontextmenu = this.onContextMenu.bind(this);

        this.Handlers = {
            onMouseMove: move,
            onMouseDown: down,
            onMouseUp: up,
            onClick: click,
            onDblClick: dblclick,
            onContextMenu: contextmenu
        };

        this.State = {
            Mask: 0,
            Flags: {
                LEFT_BUTTON: 2 << 0,
                RIGHT_BUTTON: 2 << 1,
                MIDDLE_BUTTON: 2 << 2
            }
        };
    }

    hasLeft() {
        return Bitwise.has(this.State.Mask, this.State.Flags.LEFT_BUTTON);
    }
    hasRight() {
        return Bitwise.has(this.State.Mask, this.State.Flags.RIGHT_BUTTON);
    }
    hasMiddle() {
        return Bitwise.has(this.State.Mask, this.State.Flags.MIDDLE_BUTTON);
    }

    updateStateMask(e) {
        let flag = 0;
        if(e.button === 0) {
            flag = this.State.Flags.LEFT_BUTTON;
        } else if(e.button === 2) {
            flag = this.State.Flags.RIGHT_BUTTON;
        } else if(e.button === 1) {
            flag = this.State.Flags.MIDDLE_BUTTON;
            
        }

        if(e.type === "mousedown") {
            this.State.Mask = Bitwise.add(this.State.Mask, flag);
        } else if(e.type === "mouseup") {
            this.State.Mask = Bitwise.remove(this.State.Mask, flag);
        }

        return this;
    }

    getMousePosition(e) {
        return [
            e.x - this.Game.Canvas.canvas.offsetLeft,
            e.y - this.Game.Canvas.canvas.offsetTop
        ];
    }

    onMouseDown(e) {
        e.preventDefault();

        this.updateStateMask(e);
        if(this.Handlers.onMouseDown) {
            this.Handlers.onMouseDown.call(this, e);
        }
    
        return this;
    }
    onMouseUp(e) {
        e.preventDefault();

        if(this.hasRight()) {
            let projectile = new Entity.Projectile(
                this.Game.$.Manager.Entity.MainPlayer.X + (this.Game.$.Manager.Entity.MainPlayer.Direction === -1 ? -65 : 65),
                this.Game.$.Manager.Entity.MainPlayer.Y
            );

            projectile.Direction = this.Game.$.Manager.Entity.MainPlayer.Direction;
            projectile.Vx = projectile.Direction * this.Game.$.Manager.Physics.Constants.PROJECTILE;
            projectile.Model.Radius = 16;

            this.Game.$.Manager.Entity.register(projectile);
        }

        this.updateStateMask(e);

        if(this.Handlers.onMouseUp) {
            this.Handlers.onMouseUp.call(this, e);
        }
    
        return this;
    }

    onMouseMove(e) {
        e.preventDefault();

        let [ mx, my ] = this.getMousePosition(e);

        if(mx > this.Game.$.Manager.Entity.MainPlayer.X) {
            this.Game.$.Manager.Entity.MainPlayer.Direction = 1;
        } else {
            this.Game.$.Manager.Entity.MainPlayer.Direction = -1;
        }

        if(this.Handlers.onMouseMove) {
            this.Handlers.onMouseMove.call(this, e);
        }
    
        return this;
    }

    onContextMenu(e) {
        e.preventDefault();

        this.updateStateMask(e);
        if(this.Handlers.onContextMenu) {
            this.Handlers.onContextMenu.call(this, e);
        }
    
        return this;
    }

    onTick(ts) {}
};