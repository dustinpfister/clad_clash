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

            // what gets passed to Map.setGrid
            map : {

                mapname : 'firstmap',
                data : [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]

            },

            // what is needed to set up BoatCollection Data
            boats : {

                player : [{
                        x : 1,
                        y : 9
                    }
                ],

                ai : [
                    {
                        x : 10,
                        y : 1
                    }
                ]

            }

        }
    ],

    // the public api
    api = {

        // start a new campaign
        newCamp : function () {

            console.log('starting a new campaign with firstmap');

        },

        startGame : function () {

            Game.setup(gameData[1]);

        }

    };

    // return the public API
    return api;

}
    ());
