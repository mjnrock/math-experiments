import Model from "./../model/package.mjs";
import Render from "./Render.mjs";

export default class RenderCircle extends Render {
    constructor(shape) {
        super(shape);
    }

    Draw(ctx, time) {
        RenderCircle.Draw(this, ctx, time);
    }

    
    static Draw(circle, ctx, time) {
        ctx.strokeStyle = circle.get("color") ? circle.get("color") : "#000";
        ctx.fillStyle = circle.get("fill") ? circle.get("fill") : "#000";

        ctx.beginPath();
        ctx.arc(circle.X, circle.Y, circle.Radius, 0, 2 * Math.PI);

        if(circle.get("solid")) {
            ctx.fill();
            ctx.stroke();
         } else {
            ctx.stroke();
         }
    }

    static Make(x, y, r) {
        return new RenderCircle(new Model.Circle(x, y, r));
    }
}