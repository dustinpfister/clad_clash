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

    Boat,
    pubObj,

    Boat = function (x, y, owner) {

        if (owner === undefined) {

            owner = 'player';

        }

        this.x = x;
        this.y = y;
        this.movement = 3;
        this.owner = owner;
        this.PFGrid = {}; // to store a Pathfinding grid section.

    };

    // the public object that will be returned to Gird Global
    pubObj = {

        conf : conf,

        cells : [],
        PF_Grid : [],
        PF_Finder : null,
        boats : [],

        selected : 0,

        // set grid to the given map, if no map is given open ocean is assumed
        setGrid : function (map) {

            var i = 0,
            x,
            y,
            len = conf.width * conf.height;

            // pubObj.cells starts as blank array.
            this.cells = [];

            // using a pathFinder.js grid for pathfinding.
            this.PF_Grid = new PF.Grid(conf.width, conf.height);
            this.PF_Finder = new PF.AStarFinder();

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

                            // if land, then grid area is not walkabale.
                            this.PF_Grid.setWalkableAt(x, y, false);

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

        traceToBoat : (function () {

            var firstRun = true,

            log = function (text) {

                if (firstRun) {

                    console.log(text);

                }

            };

            return function (boat, x, y) {

                var finder,
                path;

                // if cell is within range, and is water
                if (api.distance(boat.x, boat.y, x, y) <= boat.movement) {

                    // trying the AStartFinder for now
                    //finder = new PF.AStarFinder(),

                    path = this.PF_Finder.findPath(x, y, boat.x, boat.y, this.PF_Grid.clone());

                    if (x === 4 && y == 6) {

                        //console.log(this.PF_Grid.clone());

                        //console.log('boatPos: ' + boat.x + ',' + boat.y);
                        //console.log('startPos: ' + x + ',' + y);
                        //console.log(path);

                    }

                    //log(x + ',' + y);
                    //log(path);

                    //firstRun = false;

                    return true;

                }

                return false;

            };
        }
            ()),

        // update the pfgrid for the given boat.
        updateBoatPFGrid : function (boat) {

            //boat.PFGrid = new PF.Grid(boat.movement, conf.height);

            var sx = boat.x - boat.movement,
            sy = boat.y - boat.movement;

			sx = sx < 0 ? 0 : sx;
			sy = sy < 0 ? 0 : sy;
			
            console.log(sx + ',' + sy);

        },

        // set possible move points to the grid, for the given boat
        setMovePoints : function (boat) {

            var x,
            y,
            self = this;

            this.updateBoatPFGrid(boat);

            this.cells.forEach(function (cell, index) {

                cell.movePoint = false;

                y = Math.floor(index / conf.width),
                x = index % conf.width;

                //cell.movePoint = true;

                cell.movePoint = self.traceToBoat(boat, x, y);

            });

        },

        // get map cell at the given position
        getCellAt : function (x, y) {

            return this.cells[y * conf.width + x];

        },

        // get any boat at the given pos
        getBoatAt : function (x, y) {

            var i = 0,
            len = this.boats.length;
            while (i < len) {

                if (this.boats[i].x === x && this.boats[i].y === y) {

                    // return the boat
                    return this.boats[i];

                }

                i++;

            }

            // return false if no boat is found
            return false;

        },

        // select a boat at x,y if there is one else set select to 0 (none)
        selectBoatAt : function (x, y) {

            var i = 0,
            len = this.boats.length;

            // assume nothing is there
            this.selected = 0;
            while (i < len) {

                if (this.boats[i].x === x && this.boats[i].y === y && this.boats[i].owner === 'player') {

                    // add one to index ( so it is one relative, and this.selcted can dubble as a boolean )
                    this.selected = i + 1;

                    this.setMovePoints(this.boats[i]);

                    break;
                }

                i++;

            }

        },

        // when the player clicks a cell
        clickAt : function (x, y) {

            var boat,
            d,
            targetBoat;

            // if a boat is selected
            if (this.selected) {

                boat = this.boats[this.selected - 1];
                targetBoat = this.getBoatAt(x, y);
                d = api.distance(x, y, boat.x, boat.y);

                // if the player clicks the selected boat
                if (x === boat.x && y === boat.y) {

                    // deselect
                    this.clearMovePoints();
                    this.selected = 0;

                } else {

                    // if clicking inside movement range of selected boat
                    if (d <= boat.movement) {

                        // if there a boat at that cell?
                        if (targetBoat) {

                            // if friend
                            if (targetBoat.owner === 'player') {

                                // selected the friendly boat
                                this.selectBoatAt(x, y);

                            }

                            // no boat
                        } else {

                            if (this.getCellAt(x, y).water) {

                                boat.x = x;
                                boat.y = y;

                                this.setMovePoints(boat);

                            } else {

                                this.clearMovePoints();
                                this.selected = 0;

                            }

                        }

                        // outside movement range
                    } else {

                        this.clearMovePoints();
                        this.selected = 0;

                    }

                }

                // check if a boat is being selected
            } else {

                this.selectBoatAt(x, y);

            }

        }

    };

    // default to open ocean
    pubObj.setGrid(maps[0]);

    // player boats
    pubObj.boats.push(new Boat(1, 1));
    pubObj.boats.push(new Boat(3, 1));

    // ai boats
    pubObj.boats.push(new Boat(9, 8, 'ai'));
    pubObj.boats.push(new Boat(11, 8, 'ai'));

    return pubObj;

}
    ());
