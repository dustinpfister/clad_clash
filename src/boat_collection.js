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
        victory : 'none', // 'none' means no victory, else name of victorious faction.


        setBoats : function (gameMap) {

            var self = this,
            side = 'def',
            boatData = gameMap.boats,
            spawnOptions = [];

            this.boats = [];
            this.victory = 'none';

            // set up player boats
            side = 'attk';
            if (gameMap.owner === 'player') {
                side = 'def';
            }
            spawnOptions = _.range(gameMap.map.spawnAt[side].length);
            boatData.player.forEach(function (boat, index) {

                var spawnIndex,
                spawnPoint;

                if (spawnOptions.length > 0) {

                    spawnIndex = spawnOptions.splice(Math.floor(Math.random() * spawnOptions.length), 1);
                    spawnPoint = gameMap.map.spawnAt[side][spawnIndex];
                    self.boats.push(new Boat('p' + Number(index + 1), spawnPoint.x, spawnPoint.y));

                }

            });

            // set up player boats
            side = 'attk';
            if (gameMap.owner === 'ai') {
                side = 'def';
            }
            spawnOptions = _.range(gameMap.map.spawnAt[side].length);
            boatData.ai.forEach(function (boat, index) {

                var spawnIndex,
                spawnPoint;

                if (spawnOptions.length > 0) {

                    spawnIndex = spawnOptions.splice(Math.floor(Math.random() * spawnOptions.length), 1);
                    spawnPoint = gameMap.map.spawnAt[side][spawnIndex];
                    self.boats.push(new Boat('a' + Number(index + 1), spawnPoint.x, spawnPoint.y, 'ai'));

                }

            });
            /*
            // set up ai boats
            boatData.ai.forEach(function (boat, index) {

            self.boats.push(new Boat('a' + Number(index + 1), boat.x, boat.y, 'ai'));

            });
             */

        },

        setCollection : function () {

            this.boats = [];
            this.victory = 'none';

            // player boats
            this.boats.push(new Boat('p1', 1, 1));
            this.boats.push(new Boat('p2', 3, 1));

            // ai boats
            this.boats.push(new Boat('a1', 8, 10, 'ai'));
            this.boats.push(new Boat('a2', 10, 10, 'ai'));

        },

        victoryCheck : function () {

            var owner,
            self = this;

            this.victory = 'none';

            if (this.boats.length > 0) {

                owner = this.boats[0].owner;

                this.boats.forEach(function (boat, index) {

                    if (boat.owner != owner) {

                        return self.victory;

                    }

                    if (index === self.boats.length - 1) {

                        self.victory = owner;

                    }

                });

            }

            return this.victory;

        },

        // purge a boat by the given id
        purgeBoatById : function (id) {

            var i = 0,
            len = this.boats.length;
            while (i < len) {

                if (this.boats[i].id === id) {

                    this.boats.splice(i, 1);

                    this.victoryCheck();

                    break;

                }

                i += 1;

            }

        },

        // the selected boat attacks the targeted boat
        attackTarget : function () {

            var boat,
            target,
            d,
            inRange;

            // do we have a seleted, and targeted boat?
            if (this.selected > 0 && this.targeted > 0 && this.attackState === 1) {

                boat = this.boats[this.selected - 1];
                target = this.boats[this.targeted - 1];
                d = api.distance(boat.x, boat.y, target.x, target.y);
                inRange = d <= boat.range + 1;

                if (!boat.cannonFired) {

                    // if in range attack
                    if (inRange) {

                        target.HP -= boat.cannons * 5;

                        if (target.HP < 0) {

                            target.HP = 0;

                        }

                        if (target.HP === 0) {

                            this.purgeBoatById(target.id);

                        }

                        boat.cannonFired = true;

                    }

                }

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

        // get non owner boats that are in range of the given boat
        getBoatsInRange : function (boat) {

            var theBoats = [];

            this.boats.forEach(function (otherBoat) {

                // a non owner boat
                if (boat.owner != otherBoat.owner) {

                    if (api.distance(boat.x, boat.y, otherBoat.x, otherBoat.y) <= boat.range + 1) {

                        theBoats.push(otherBoat);

                    }

                }

            });

            return theBoats;

        },

        // reset boats
        resetBoats : function () {

            this.selected = 0;
            this.targeted = 0;
            this.attackState = 0;

            Map.clearMovePoints();

            this.boats.forEach(function (boat) {

                boat.reset();

            });

        }

    };

    return pubAPI;

}
    ());
