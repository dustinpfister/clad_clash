/*
 *    campaign.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    the current state of the players campaign, also setsup new games, and is effected by the outcome of games.
 *
 */

var Camp = (function () {

    // what should be hard coded defaults for a new campain.
    var campDefaults = [{

            areaName : 'first area',
            id : 't1',

            // what gets passed to Map.setGrid
            map : {

                mapname : 'firstmap',
                data : [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, , 0, 1, 1, 1, 0, 0, 0, 0, 0, , 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]

            }

        }, {

            areaName : 'second area',
            id : 't2',

            // what gets passed to Map.setGrid
            map : {

                mapname : 'secondmap',
                data : [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]

            }

        }, {
            areaName : 'area 3',
            id : 't3',
            map : {
                mapname : 'map3',
                data : []
            }

        }, {
            areaName : 'area 4',
            id : 't4',
            map : {
                mapname : 'map4',
                data : []
            }

        }
    ],

    // the current campData
    campData,

    // get a game data object by it's id
    getGameDataById = function (id) {

        var i = 0,
        len = campData.length;
        while (i < len) {

            if (campData[i].id === id) {

                return campData[i];

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

            // campData is a new object
            campData = {};

            // clone campData.gameMaps from campDefaults.
            campData.gameMaps = _.clone(campDefaults);

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
