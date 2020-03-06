import Bitwise from "./../lib/Bitwise.mjs";
import DOMHandler from "./DOMHandler.mjs";

export default class KeyboardHandler extends DOMHandler {
    constructor(game, window, { down = null, up = null } = {}) {
        super(game, window);

        window.onkeydown = this.onKeyDown.bind(this);
        window.onkeyup = this.onKeyUp.bind(this);

        this.Handlers = {
            onKeyDown: down,
            onKeyUp: up
        };

        // 65: "KeyA"
        // 83: "KeyS"
        // 68: "KeyD"
        // 87: "KeyW"        
        // 37: "ArrowLeft"
        // 40: "ArrowDown"
        // 39: "ArrowRight"
        // 38: "ArrowUp"        
        // 13: "Enter"
        this.KeyMapping = {
            UP: [ 87, 38 ],
            DOWN: [ 83, 40 ],
            LEFT: [ 65, 37 ],
            RIGHT: [ 68, 39 ],

            SHIFT: [ 16 ],
            ALT: [ 18 ],
            CTRL: [ 17 ],

            JUMP: [ 32 ],
        };

        this.State = {
            Mask: 0,
            Flags: {
                UP: 2 << 0,
                DOWN: 2 << 1,
                LEFT: 2 << 2,
                RIGHT: 2 << 3,

                SHIFT: 2 << 4,
                ALT: 2 << 5,
                CTRL: 2 << 6,

                JUMP: 2 << 7,
            }
        };

        this._isDebugMode = false;
    }

    isDebugMode() {
        return this._isDebugMode;
    }

    keyHasMap(name, key) {
        return this.KeyMapping[ name ].includes(key);
    }

    hasUp() {
        return Bitwise.has(this.State.Mask, this.State.Flags.UP);
    }
    hasDown() {
        return Bitwise.has(this.State.Mask, this.State.Flags.DOWN);
    }
    hasLeft() {
        return Bitwise.has(this.State.Mask, this.State.Flags.LEFT);
    }
    hasRight() {
        return Bitwise.has(this.State.Mask, this.State.Flags.RIGHT);
    }

    hasShift() {
        return Bitwise.has(this.State.Mask, this.State.Flags.SHIFT);
    }
    hasAlt() {
        return Bitwise.has(this.State.Mask, this.State.Flags.ALT);
    }
    hasCtrl() {
        return Bitwise.has(this.State.Mask, this.State.Flags.CTRL);
    }

    hasJump() {
        return Bitwise.has(this.State.Mask, this.State.Flags.JUMP);
    }

    updateStateMask(e) {
        Object.keys(this.KeyMapping).forEach(key => {
            if(this.KeyMapping[ key ].includes(e.which)) {
                if(e.type === "keyup") {
                    this.State.Mask = Bitwise.remove(this.State.Mask, this.State.Flags[ key ]);
                } else if(e.type === "keydown") {
                    this.State.Mask = Bitwise.add(this.State.Mask, this.State.Flags[ key ]);
                }
            }
        });

        return this;
    }

    onKeyDown(e) {
        e.preventDefault();

        this.updateStateMask(e);

        if(this.Game.$.Manager.Entity.MainPlayer.Vy === 0 && this.hasJump()) {
            this.Game.$.Manager.Entity.MainPlayer.Vy += this.Game.Physics.JUMP;
        }

        if(this.Handlers.onKeyDown) {
            this.Handlers.onKeyDown.call(this, e);
        }
    
        return this;
    }

    onKeyUp(e) {
        e.preventDefault();

        if(e.which === 114) {
            this._isDebugMode = !this._isDebugMode;
        }

        this.updateStateMask(e);

        if(this.Handlers.onKeyUp) {
            this.Handlers.onKeyUp.call(this, e);
        }
    
        return this;
    }

    onTick(ts) {
        //* Move the Main Player if there is Keyboard input
        if(this.Game.$.Handler.Keyboard.hasRight()) {
            this.Game.$.Manager.Entity.MainPlayer.X += 10;
            // this.Game.$.Manager.Entity.MainPlayer.Direction = 1;
        }
        if(this.Game.$.Handler.Keyboard.hasLeft()) {
            this.Game.$.Manager.Entity.MainPlayer.X -= 10;
            // this.Game.$.Manager.Entity.MainPlayer.Direction = -1;
        }
        // if(this.Game.$.Handler.Keyboard.hasDown()) {
        //     this.Game.$.Manager.Entity.MainPlayer.Y += 10;
        // }
        // if(this.Game.$.Handler.Keyboard.hasUp()) {
        //     this.Game.$.Manager.Entity.MainPlayer.Y -= 10;
        // }
    }
};