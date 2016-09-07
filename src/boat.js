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

        path = Game.PF_Finder.findPath(
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
