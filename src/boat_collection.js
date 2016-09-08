/*
 *    boat_collection.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    works with the current collection of Boats in the map.
 *
 */

var BoatCollection = (function () {

    var boats = [],

    pubAPI = {

        boats : boats,

        selected : 0,

        setCollection : function () {

            this.boats = [];

            // player boats
            this.boats.push(new Boat(1, 1));
            this.boats.push(new Boat(3, 1));

            // ai boats
            this.boats.push(new Boat(9, 8, 'ai'));
            this.boats.push(new Boat(11, 8, 'ai'));

        },

        selectBoatAt : function (x, y) {

            var i = 0,
            len = this.boats.length;

            // assume nothing is there
            this.selected = 0;
            while (i < len) {

                if (this.boats[i].x === x && this.boats[i].y === y && this.boats[i].owner === 'player') {

                    // add one to index ( so it is one relative, and this.selcted can dubble as a boolean )
                    this.selected = i + 1;

                    Map.setMovePoints(this.boats[i]);

                    break;
                }

                i++;

            }

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

        // reset boats
        resetBoats : function () {

            this.selected = 0;
            Map.clearMovePoints();

            this.boats.forEach(function (boat) {

                boat.reset();

            });

        }

    };

    return pubAPI;

}
    ());
