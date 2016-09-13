/*
 *    campaign.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    the current state of the players campaign, also setsup new games, and is effected by the outcome of games.
 *
 */

var Camp = (function () {

    // game data object
    var gameData = [{

            areaName : 'first area',
            id : 't1',

            // what gets passed to Map.setGrid
            map : {

                mapname : 'firstmap',
                data : [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, , 0, 1, 1, 1, 0, 0, 0, 0, 0, , 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]

            },

            // what is needed to set up BoatCollection Data
            boats : {

                player : [{
                        x : 1,
                        y : 8
                    }, {
                        x : 1,
                        y : 1
                    }
                ],

                ai : [{
                        x : 2,
                        y : 8
                    }, {
                        x : 11,
                        y : 8
                    }
                ]

            }

        }, {

            areaName : 'second area',
            id : 't2',

            // what gets passed to Map.setGrid
            map : {

                mapname : 'secondmap',
                data : [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]

            },

            // what is needed to set up BoatCollection Data
            boats : {

                player : [{
                        x : 1,
                        y : 9
                    }
                ],

                ai : [{
                        x : 10,
                        y : 1
                    }
                ]

            }

        }, {
            areaName : 'area 3',
            id : 't3',
            map : {
                mapname : 'map3',
                data : []
            },
            boats : {
                player : [],
                ai : []

            }

        }, {
            areaName : 'area 4',
            id : 't4',
            map : {
                mapname : 'map4',
                data : []
            },
            boats : {
                player : [],
                ai : []

            }

        }
    ],

    // get a game data object by it's id
    getGameDataById = function (id) {

        var i = 0,
        len = gameData.length;
        while (i < len) {

            if (gameData[i].id === id) {

                return gameData[i];

            }

            i += 1;

        }

        return false;

    },

    // the public api
    api = {

        // start a new campaign
        newCamp : function () {

            console.log('starting a new campaign with firstmap');

        },

        startGame : function (index) {

            console.log(index);

            //Game.setup(gameData[1]);

            Game.setup(getGameDataById('t' + Number(index + 1)));

        }

    };

    // return the public API
    return api;

}
    ());
