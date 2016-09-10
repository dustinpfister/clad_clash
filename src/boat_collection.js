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

        selected : 0, // the current selected boat that is owned by the faction (player, or AI)
        targeted : 0, // the current trageted enemy faction boat.

        attackState : 0, // 0 (boat is just targeted) 1 (attack the boat)

        setCollection : function () {

            this.boats = [];

            // player boats
            this.boats.push(new Boat('p1', 1, 1));
            this.boats.push(new Boat('p2', 3, 1));

            // ai boats
            this.boats.push(new Boat('a1', 9, 8, 'ai'));
            this.boats.push(new Boat('a2', 11, 8, 'ai'));

        },

        // the selected boat attacks the targeted boat
        attackTarget : function () {

            // do we have a seleted, and targeted boat?
            if (this.selected > 0 && this.targeted > 0 && this.attackState === 1) {

                console.log('ATTACK!');

                //this.attackState = 0;

            } else {

                console.log(this.attackState);
                console.log('will attack next time');

                // if this is the first time, set attack state to 1
                //this.attackState = 1;

            }

            this.attackState += 1;
            if (this.attackState === 2) {

                this.attackState = 0;

            }

        },

        // target a boat at the given location
        targetBoatAt : function (x, y) {

            var i = 0,
            len = this.boats.length;

            // assume nothing is there
            this.targeted = 0;
            //this.attackState = 0;
            while (i < len) {

                if (this.boats[i].x === x && this.boats[i].y === y) {

                    // add one to index ( so it is one relative, and this.targeted can dubble as a boolean )
                    this.targeted = i + 1;

                    break;
                }

                i++;

            }

        },

        // select a friendly boat at the given location
        selectBoatAt : function (x, y) {

            var i = 0,
            len = this.boats.length;

            // assume nothing is there
            this.selected = 0;
            while (i < len) {

                if (this.boats[i].x === x && this.boats[i].y === y) {

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

        // get a collection of boats by the given owner
        getBoatsByOwner : function (owner) {

            var theBoats = [];

            this.boats.forEach(function (boat) {

                if (boat.owner === owner) {

                    theBoats.push(boat);

                }

            });

            return theBoats;

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
