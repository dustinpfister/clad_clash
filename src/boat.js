var Boat = function (x, y, owner) {

    if (owner === undefined) {

        owner = 'player';

    }

    this.x = x;
    this.y = y;
    this.movement = 3;
    this.owner = owner;

    this.PFGrid = {}; // to store a Pathfinding grid section.
    this.PFOffset = {

        x : 0,
        y : 0

    };

};

Boat.prototype.traceToBoat = function (cell, x, y) {

    var finder,
    path;

    // if cell is within range, and is water
    if (api.distance(this.x, this.y, x, y) <= this.movement & cell.water) {

        path = Map.PF_Finder.findPath(
                x - this.PFOffset.x,
                y - this.PFOffset.y,
                this.x - this.PFOffset.x,
                this.y - this.PFOffset.y,
                this.PFGrid.clone());

        // if we have nodes there is a path.
        if (path.length > 0) {

            return true;

        }

    }

    return false;

};

Boat.prototype.updatePFGrid = function () {
    // find starting and ending positions
    var sx = this.x - this.movement,
    sy = this.y - this.movement,
    ex = this.x + this.movement,
    ey = this.y + this.movement,
    w,
    h,
    x,
    y,
    cell;

    sx = sx < 0 ? 0 : sx;
    sy = sy < 0 ? 0 : sy;
    ex = ex >= Map.conf.width ? Map.conf.width - 1 : ex;
    ey = ey >= Map.conf.height ? Map.conf.height - 1 : ey;
    w = ex - sx + 1;
    h = ey - sy + 1;

    // set a new grid with the right width and height
    this.PFGrid = new PF.Grid(w, h);
    this.PFOffset = {

        x : sx,
        y : sy

    };

    // set locations that are not walkable
    y = sy;
    while (y < ey + 1) {

        x = sx;
        while (x < ex + 1) {

            cell = Map.getCellAt(x, y);

            // if land set false
            if (!cell.water) {

                this.PFGrid.setWalkableAt(x - sx, y - sy, false);

            }

            // to far? set to false
            if (api.distance(this.x, this.y, x, y) > this.movement) {

                this.PFGrid.setWalkableAt(x - sx, y - sy, false);

            }

            x += 1;

        }

        y += 1;

    }

};
