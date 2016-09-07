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
