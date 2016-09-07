
var Game = (function () {

    var conf = {

        width : 12,
        height : 12

    },
    maps = [{
            mapname : 'firstmap',
            data : [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, , 0, 1, 1, 1, 0, 0, 0, 0, 0, , 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]

        }

    ],

    pubObj,

    // the public object that will be returned to Gird Global
    pubObj = {

        conf : conf,

        cells : [],
        PF_Grid : [],
        PF_Finder : new PF.AStarFinder(),
        //boats : [],

        selected : 0,

        // set grid to the given map, if no map is given open ocean is assumed
        setGrid : function (map) {

            var i = 0,
            x,
            y,
            len = conf.width * conf.height;

            // pubObj.cells starts as blank array.
            this.cells = [];

            // set up cells and PF Grid
            while (i < len) {

                y = Math.floor(i / conf.width);
                x = i % conf.width;

                // move points are stored in pubObj.cells
                this.cells[i] = {

                    movePoint : false

                };

                if (map != undefined) {

                    this.cells[i].water = true;

                    if (map.data[i] != undefined) {

                        if (map.data[i] != 0) {

                            // water is not there
                            this.cells[i].water = false;

                        }

                    }

                } else {

                    this.cells[i].water = true;

                }

                i++;
            }

        },

        clearMovePoints : function () {

            this.cells.forEach(function (cell, index) {

                cell.movePoint = false;

            });

        },

        // set possible move points to the grid, for the given boat
        setMovePoints : function (boat) {

            var x,
            y,
            self = this;

            //this.updateBoatPFGrid(boat)

            boat.updatePFGrid();

            this.cells.forEach(function (cell, index) {

                cell.movePoint = false;

                y = Math.floor(index / conf.width),
                x = index % conf.width;

                cell.movePoint = boat.traceToBoat(cell, x, y);

            });

        },

        // get map cell at the given position
        getCellAt : function (x, y) {

            return this.cells[y * conf.width + x];

        },

        // when the player clicks a cell
        clickAt : function (x, y) {

            var boat,
            d,
            targetBoat;

            // if a boat is selected
            if (BoatCollection.selected) {

                boat = BoatCollection.boats[BoatCollection.selected - 1];
                targetBoat = BoatCollection.getBoatAt(x, y);
                d = api.distance(x, y, boat.x, boat.y);

                // if the player clicks the selected boat
                if (x === boat.x && y === boat.y) {

                    // deselect
                    this.clearMovePoints();
                    BoatCollection.selected = 0;

                } else {

                    // if clicking inside movement range of selected boat
                    if (d <= boat.movement) {

                        // if there a boat at that cell?
                        if (targetBoat) {

                            // if friend
                            if (targetBoat.owner === 'player') {

                                // selected the friendly boat
                                BoatCollection.selectBoatAt(x, y);

                            }

                            // no boat
                        } else {

                            if (this.getCellAt(x, y).movePoint) {

                                boat.x = x;
                                boat.y = y;

                                this.setMovePoints(boat);

                            } else {

                                this.clearMovePoints();
                                BoatCollection.selected = 0;

                            }

                        }

                        // outside movement range
                    } else {

                        this.clearMovePoints();
                        BoatCollection.selected = 0;

                    }

                }

                // check if a boat is being selected
            } else {

                BoatCollection.selectBoatAt(x, y);

            }

        }

    };

    // default to open ocean
    pubObj.setGrid(maps[0]);

    // set the boat collection
    BoatCollection.setCollection();

    return pubObj;

}
    ());
