import Shape from "./Shape.mjs";
import EnumOrientation from "./EnumOrientation.mjs";

export default class Hexagon extends Shape {
    constructor(x, y, size = 1, orientation = EnumOrientation.FLAT) {
        super();

        this.X = x;
        this.Y = y;
        
        this.Size = size;
        if(orientation === EnumOrientation.FLAT) {
            this.Width = 2 * size;
            this.Height = Math.sqrt(3) * size;
        } else {
            this.Height = 2 * size;
            this.Width = Math.sqrt(3) * size;
        }
        this.Orientation = orientation;
    }

    Scale(factor = 1.0) {
        return new Hexagon(
            this.X,
            this.Y,
            this.Size * factor,
            this.Orientation
        );
    }

    GetCorners(asObject = false) {
        return Hexagon.CalcCorners(this.X, this.Y, this.Size, { isFlatTopped: this.Orientation === EnumOrientation.FLAT, asObject });
    }

    GetDimensions() {
        return [
            this.Width,
            this.Height
        ];
    }

    static GetSize(size, orientation = EnumOrientation.FLAT) {
        if(orientation === EnumOrientation.FLAT) {
            return [
                2 * size,
                Math.sqrt(3) * size
            ];
        } else {
            return [
                Math.sqrt(3) * size,
                2 * size
            ];
        }
    }
    
    static CalcCorner(x, y, size, i = 0, isFlatTopped = true) {
        let deg = isFlatTopped ? [ 0, 60, 120, 180, 240, 300 ] : [ 30, 90, 150, 210, 270, 330 ];
        let rad = Math.PI / 180 * deg[ i ];

        return [
            x + size * Math.cos(rad),
            y + size * Math.sin(rad)
        ];
    }
    static CalcCorners(x, y, size, { isFlatTopped = true, asObject = false } = {}) {
        let corners = [];

        for(let i = 0; i < 6; i++) {
            let [ cx, cy ] = Hexagon.CalcCorner(x, y, size, i, { isFlatTopped });

            corners.push(
                asObject ? {
                    X: cx,
                    Y: cy
                } : [
                    cx,
                    cy
                ]
            )
        }

        return corners;
    }
};