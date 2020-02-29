import Model from "./../model/package.mjs";
import Render from "./Render.mjs";

export default class RenderCircle extends Render {
    constructor(shape) {
        super(shape);
    }

    Draw(ctx, time) {
        RenderCircle.Draw(this, ctx, time);
    }

    
    static Draw(rect, ctx, time) {
        ctx.strokeStyle = rect.get("color") ? rect.get("color") : "#000";
        ctx.fillStyle = rect.get("fill") ? rect.get("fill") : "#000";
        
        if(rect.get("solid")) {
            ctx.filLRect(
                rect.X, rect.Y,
                rect.Width, rect.Height
            );
         } else {
            ctx.strokeRect(
                rect.X, rect.Y,
                rect.Width, rect.Height
            );
         }
    }

    static Make(x, y, r) {
        return new RenderCircle(new Model.Circle(x, y, r));
    }
}