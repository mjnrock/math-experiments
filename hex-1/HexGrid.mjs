import Hexagon from "./Hexagon.mjs";
import HexTile from "./HexTile.mjs";
import EnumOrientation from "./EnumOrientation.mjs";

export default class HexGrid {
    constructor(width, height, tileSize = 32, { isFlatGrid = true, offX = 0, offY = 0 } = {}) {
        this.Width = width;
        this.Height = height;
        this.PixelOffset = [ offX, offY ];

        this.Tiles = {};
        this.TileSize = tileSize;
        this.TileOrientation = isFlatGrid ? EnumOrientation.FLAT : EnumOrientation.POINTY;

        for(let q = 0; q < width; q++) {
            for(let r = 0; r < height; r++) {
                let s = ~~(-q - r);

                this.Tiles[ `${ q },${ r },${ s }` ] = new HexTile(q, r, s, this.TileSize);

                if(this.TileOrientation === EnumOrientation.FLAT) {
                    let [ w, h ] = Hexagon.GetSize(this.TileSize, this.TileOrientation);

                    let x = ~~(q * 0.75 * w),
                        y = ~~(r * h + (q & 1 ? h / 2 : 0));

                    this.Tiles[ `${ q },${ r },${ s }` ].Shape = new Hexagon(
                        this.PixelOffset[ 0 ] + x,
                        this.PixelOffset[ 1 ] + y,
                        this.TileSize,
                        this.TileOrientation
                    );
                }
            }
        }
    }

    static PointToTile(x, y, size, orientation = EnumOrientation.FLAT) {
        let q, r;

        let [ w, h ] = Hexagon.GetSize(size, orientation);
        // x -= w / 2
        if(orientation === EnumOrientation.FLAT) {
            q = (2 / 3 * x) / size;
            r = (-1 / 3 * x + Math.sqrt(3) / 3 * y) / size * 2;
        }

        return [
            ~~q,
            ~~r
        ];
    }
}