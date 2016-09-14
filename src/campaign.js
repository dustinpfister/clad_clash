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
    campData = {},

    // get a game data object by it's id
    getGameMapById = function (id) {

        var i = 0,
        len = campData.gameMaps.length;
        while (i < len) {

            if (campData.gameMaps[i].id === id) {

                return campData.gameMaps[i];

            }

            i += 1;

        }

        return false;

    },

    // the public api
    api = {

        campData : campData,

        // start a new campaign
        newCamp : function () {

            console.log('starting a new campaign with firstmap');

            // campData is a new object
            this.campData = {};

            // clone campData.gameMaps from campDefaults.
            this.campData.gameMaps = _.clone(campDefaults);

            // starting boats
            this.campData.gameMaps.forEach(function (gameMap, index, maps) {

                // default map owner is 'none'
                gameMap.owner = 'none';

                // default boats are empty arrays
                gameMap.boats = {

                    player : [],
                    ai : []

                }

                // player starts with game map 0;
                if (index === 0) {

                    gameMap.owner = 'player'

                }

                // ai starts with last game map in array
                if (index === maps.length - 1) {

                    gameMap.owner = 'ai';

                }

            });

            console.log('campData:');
            console.log(this.campData)

        },

        startGame : function (index) {

            console.log(index);

            //Game.setup(gameData[1]);

            Game.setup(getGameMapById('t' + Number(index + 1)));

        }

    };

    // return the public API
    return api;

}
    ());
