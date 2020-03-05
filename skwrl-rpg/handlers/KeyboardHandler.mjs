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
        };

        this.Directions = {
            Mask: 0,
            Flags: {
                UP: 2 << 0,
                DOWN: 2 << 1,
                LEFT: 2 << 2,
                RIGHT: 2 << 3,

                SHIFT: 2 << 4,
                ALT: 2 << 5,
                CTRL: 2 << 6,
            }
        };
    }

    hasUp() {
        return Bitwise.has(this.Directions.Mask, this.Directions.Flags.UP);
    }
    hasDown() {
        return Bitwise.has(this.Directions.Mask, this.Directions.Flags.DOWN);
    }
    hasLeft() {
        return Bitwise.has(this.Directions.Mask, this.Directions.Flags.LEFT);
    }
    hasRight() {
        return Bitwise.has(this.Directions.Mask, this.Directions.Flags.RIGHT);
    }

    hasShift() {
        return Bitwise.has(this.Directions.Mask, this.Directions.Flags.SHIFT);
    }
    hasAlt() {
        return Bitwise.has(this.Directions.Mask, this.Directions.Flags.ALT);
    }
    hasCtrl() {
        return Bitwise.has(this.Directions.Mask, this.Directions.Flags.CTRL);
    }

    updateDirectionMask(e) {
        Object.keys(this.KeyMapping).forEach(key => {
            if(this.KeyMapping[ key ].includes(e.which)) {
                if(e.type === "keyup") {
                    this.Directions.Mask = Bitwise.remove(this.Directions.Mask, this.Directions.Flags[ key ]);
                } else if(e.type === "keydown") {
                    this.Directions.Mask = Bitwise.add(this.Directions.Mask, this.Directions.Flags[ key ]);
                }
            }
        });

        return this;
    }

    onKeyDown(e) {
        e.preventDefault();

        this.updateDirectionMask(e);
        if(this.Handlers.onKeyDown) {
            this.Handlers.onKeyDown.call(this, e);
        }
    
        return this;
    }

    onKeyUp(e) {
        e.preventDefault();

        this.updateDirectionMask(e);
        if(this.Handlers.onKeyUp) {
            this.Handlers.onKeyUp.call(this, e);
        }
    
        return this;
    }

    onTick(ts) {
        //* Move the Main Player if there is Keyboard input
        if(this.Game.$.Handler.Keyboard.hasRight()) {
            this.Game.$.Manager.Entity.MainPlayer.X += 10;
        }
        if(this.Game.$.Handler.Keyboard.hasLeft()) {
            this.Game.$.Manager.Entity.MainPlayer.X -= 10;
        }
        if(this.Game.$.Handler.Keyboard.hasDown()) {
            this.Game.$.Manager.Entity.MainPlayer.Y += 10;
        }
        if(this.Game.$.Handler.Keyboard.hasUp()) {
            this.Game.$.Manager.Entity.MainPlayer.Y -= 10;
        }
    }
};