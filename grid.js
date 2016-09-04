var Grid = (function () {

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
    pubObj;

    Boat = function (x, y, owner) {

        if (owner === undefined) {
            owner = 'player';
        }

        this.x = x;
        this.y = y;
        this.movement = 3;
        this.owner = owner;

    };
    Boat.prototype = {};

    // the public object that will be returned to Gird Global
    pubObj = {

        conf : conf,

        cells : [],
        boats : [],

        selected : 0,

        // set grid to the given map, if no map is given open ocean is assumed
        setGrid : function (map) {

            var i = 0,
            len = conf.width * conf.height;

            this.cells = [];
            while (i < len) {

                this.cells[i] = {

                    movePoint : true

                };

                if (map != undefined) {

                    this.cells[i].water = true;

                    if (map.data[i] != undefined) {

                        if (map.data[i] != 0) {

                            this.cells[i].water = false;

                        }

                    }

                } else {

                    this.cells[i].water = true;

                }

                i++;
            }

        },

        // set possible move points to the grid, for the given boat
        setMovePoints : function (boat) {

            var x = boat.x,
            y = boat.y;

            console.log('set move points:');

            console.log(x + ',' + y);

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

                            } else {

                                this.selected = 0;

                            }

                        }

                        // outside movement range
                    } else {

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
