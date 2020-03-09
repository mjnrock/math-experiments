import Bitwise from "./../lib/Bitwise.mjs";
import Model from "./../model/package.mjs";
import Enum from "./../enum/package.mjs";
import Manager from "./Manager.mjs";

export default class PhysicsManager extends Manager {
    constructor(game, window) {
        super(game, window);
        
        this.Constants = {
            PROJECTILE: 1000,
            JUMP: -800,
            GRAVITY: 2000
        };
    }

    updatePosition(dt, entity) {
        entity.X += entity.Vx * dt;
        entity.Y += entity.Vy * dt;

        return this;
    }

    applyGravity(dt, entity) {
        if(entity.HasGravity) {
            entity.Vy += this.Constants.GRAVITY * dt;
        }
    }

    // 0-2π from the X axis, with respect to @from
    calcDirection(from, to) {
        let f = from.Model.getAABB(true),
            t = to.Model.getAABB(true),
            PIfourth = Math.PI / 4,
            PIeighth = Math.PI / 8;
        
        let theta = Math.atan2(
            (t.y0 + t.h / 2) - (f.y0 + f.h / 2),
            -((t.x0 + t.w / 2) - (f.x0 + f.w / 2))
            ) + Math.PI;

        let dirMajor = 0;
        let dirMinor = 0;

        if(theta >= 7 * PIfourth || theta < PIfourth) {
            dirMajor = Bitwise.add(dirMajor, Enum.Direction.EAST);
        } else if(theta >= PIfourth && theta < 3 * PIfourth) {
            dirMajor = Bitwise.add(dirMajor, Enum.Direction.NORTH);
        } else if(theta >= 3 * PIfourth && theta < 5 * PIfourth) {
            dirMajor = Bitwise.add(dirMajor, Enum.Direction.WEST);
        } else if(theta >= 5 * PIfourth && theta < 7 * PIfourth) {
            dirMajor = Bitwise.add(dirMajor, Enum.Direction.SOUTH);
        }


        if(theta >= PIeighth && theta < 3 * PIeighth) {               // NE
            dirMinor = Bitwise.add(dirMinor, Enum.Direction.NORTH, Enum.Direction.EAST);
        } else if(theta >= 3 * PIeighth && theta < 5 * PIeighth) {    // N
            dirMinor = Bitwise.add(dirMinor, Enum.Direction.NORTH);
        } else if(theta >= 5 * PIeighth && theta < 7 * PIeighth) {    // NW
            dirMinor = Bitwise.add(dirMinor, Enum.Direction.NORTH, Enum.Direction.WEST);
        } else if(theta >= 7 * PIeighth && theta < 9 * PIeighth) {    // W
            dirMinor = Bitwise.add(dirMinor, Enum.Direction.WEST);
        } else if(theta >= 9 * PIeighth && theta < 11 * PIeighth) {   // SW
            dirMinor = Bitwise.add(dirMinor, Enum.Direction.SOUTH, Enum.Direction.WEST);
        } else if(theta >= 11 * PIeighth && theta < 13 * PIeighth) {  // S
            dirMinor = Bitwise.add(dirMinor, Enum.Direction.SOUTH);
        } else if(theta >= 13 * PIeighth && theta < 15 * PIeighth) {  // SE
            dirMinor = Bitwise.add(dirMinor, Enum.Direction.SOUTH, Enum.Direction.EAST);
        } else if(theta >= 15 * PIeighth || theta < PIeighth) {       // E
            dirMinor = Bitwise.add(dirMinor, Enum.Direction.EAST);
        }
        
        return {
            radians: theta,
            degrees: theta * 180 / Math.PI,
            major: dirMajor,
            minor: dirMinor,
            
            input: {
                from: from,
                to: to,
                aabb: {
                    from: f,
                    to: t
                }
            }
        };
    }


    collisionBump(direction, from, to) {
        let f = from.Model.getAABB(true),
            t = to.Model.getAABB(true);
            
        if(Bitwise.has(direction, Enum.Direction.NORTH)) {
            if(from.Model instanceof Model.Rectangle) {
                from.Y = t.y1;
            } else if(from.Model instanceof Model.Circle) {
                from.Y = t.y1 + from.Model.Radius;
            }
            from.Vy = -1;
        }
        if(Bitwise.has(direction, Enum.Direction.SOUTH)) {
            if(from.Model instanceof Model.Rectangle) {
                from.Y = t.y0 - f.h;
            } else if(from.Model instanceof Model.Circle) {
                from.Y = t.y0 - from.Model.Radius;
            }
            from.Vy = 0;
        }
        if(Bitwise.has(direction, Enum.Direction.EAST)) {
            let xn;
            if(from.Model instanceof Model.Rectangle) {
                xn = t.x0 - f.w;
            } else if(from.Model instanceof Model.Circle) {
                xn = t.x0 - from.Model.Radius;
            }
            from.X = Math.min(from.X, xn);
            from.Vx = 0;
        }
        if(Bitwise.has(direction, Enum.Direction.WEST)) {
            let xn;
            if(from.Model instanceof Model.Rectangle) {
                xn = t.x1;
            } else if(from.Model instanceof Model.Circle) {
                xn = t.x1 + from.Model.Radius;
            }
            from.X = Math.max(from.X, xn);
            from.Vx = 0;
        }
    }

    onTick(ts) {}
    onRender(ts) {}
}