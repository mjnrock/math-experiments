import Bitwise from "./../lib/Bitwise.mjs";
import Model from "./../model/package.mjs";
import Enum from "./../enum/package.mjs";
import Manager from "./Manager.mjs";

export default class PhysicsManager extends Manager {
    constructor(game, window) {
        super(game, window);
    }

    updatePosition(entity, dt) {
        entity.X += entity.Vx * dt;
        entity.Y += entity.Vy * dt;

        return this;
    }

    calcTheta(from, to) {
        return Math.atan2(from.Y - to.Y, from.X - to.X) + Math.PI;
    }

    updateMomentum(from, to, dt) {
        if(to.Model.Mass === Infinity) {
            let theta = Math.atan2(from.Vy, -from.Vx) + Math.PI;
                
            
            if(theta % Math.PI === 0) {
                from.Vx = -from.Vx;
            } else if(theta % (Math.PI / 2) === 0) {
                from.Vy = -from.Vy;
            }

            // if((theta > 3 * Math.PI / 2 && theta < 2 * Math.PI) || (theta > Math.PI / 2 && theta < Math.PI)) {
            //     from.Vx = from.Vx * Math.cos(theta - Math.PI);
            //     from.Vy = from.Vy * Math.sin(theta - Math.PI);
            // } else if((theta  > 0 && theta < Math.PI / 2) || (theta > Math.PI && theta < 3 * Math.PI / 2)) {
            //     from.Vx = from.Vx * Math.cos(theta + Math.PI);
            //     from.Vy = from.Vy * Math.sin(theta + Math.PI);
            // }

            // if((theta > 0 && theta < Math.PI / 2) || (theta > -Math.PI && theta < -Math.PI / 2)) {
            //     // from.Vx = from.Vx * Math.cos(Math.PI / 2 + theta);
            //     from.Vy = -from.Vy * Math.sin(Math.PI / 2 + theta);
            // } else if((theta > Math.PI / 2 && theta < Math.PI) || (theta < 0 && theta > -Math.PI / 2)) {
            //     // from.Vx = from.Vx * Math.cos(Math.PI / 2 + theta);
            //     from.Vx = -from.Vx * Math.cos(Math.PI / 2 + theta);
            // }


            console.log("=====================");
            console.log("Theta", theta * 180 / Math.PI);
            // console.log("Magnitude", mag);
            console.log("Vi", from.Vx, from.Vy);
            console.log("C|S", Math.cos(theta), Math.sin(theta));
            console.log("Vf", from.Vx * Math.cos(theta), from.Vy * Math.sin(theta));
            console.log("=====================");
            
            // console.log(theta * 180 / Math.PI, theta, Math.PI / 2, theta === Math.PI / 2)
        } else {
            let mt = from.Model.Mass + to.Model.Mass;

            let pxf = (to.Model.Mass / mt) * -to.Vx,
                pyf = (to.Model.Mass / mt) * -to.Vy;
            let pxt = (from.Model.Mass / mt) * -from.Vx,
                pyt = (from.Model.Mass / mt) * -from.Vy;

            from.Vx = pxf;
            from.Vy = pyf;
            to.Vx = pxt;
            to.Vy = pyt;
        }

        return this;
    }

    onTick(ts) {}
    onRender(ts) {}
}