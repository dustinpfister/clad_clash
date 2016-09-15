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

                // spawn locations
                spawnAt : {

                    // spawn locations for attacker
                    attk : [{
                            x : 1,
                            y : 1
                        }, {
                            x : 2,
                            y : 2
                        }
                    ],

                    // spawn locations for def
                    def : [{
                            x : 10,
                            y : 10
                        }, {
                            x : 9,
                            y : 9
                        }
                    ]

                },
                data : [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, , 0, 1, 1, 1, 0, 0, 0, 0, 0, , 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]

            }

        }, {

            areaName : 'second area',
            id : 't2',

            // what gets passed to Map.setGrid
            map : {

                mapname : 'secondmap',

                // spawn locations
                spawnAt : {

                    // spawn locations for attacker
                    attk : [{
                            x : 1,
                            y : 1
                        }, {
                            x : 2,
                            y : 2
                        }
                    ],

                    // spawn locations for def
                    def : [{
                            x : 10,
                            y : 10
                        }, {
                            x : 9,
                            y : 9
                        }
                    ]

                },
                data : [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]

            }

        }, {
            areaName : 'area 3',
            id : 't3',

            map : {
                mapname : 'map3',

                // spawn locations
                spawnAt : {

                    // spawn locations for attacker
                    attk : [{
                            x : 1,
                            y : 1
                        }, {
                            x : 2,
                            y : 2
                        }
                    ],

                    // spawn locations for def
                    def : [{
                            x : 10,
                            y : 10
                        }, {
                            x : 9,
                            y : 9
                        }
                    ]

                },
                data : []
            }

        }, {
            areaName : 'area 4',
            id : 't4',
            map : {
                mapname : 'map4',

                // spawn locations
                spawnAt : {

                    // spawn locations for attacker
                    attk : [{
                            x : 1,
                            y : 1
                        }, {
                            x : 2,
                            y : 2
                        }
                    ],

                    // spawn locations for def
                    def : [{
                            x : 10,
                            y : 10
                        }, {
                            x : 9,
                            y : 9
                        }
                    ]

                },
                data : []
            }

        }
    ],

    // the current campData
    campData = {},

    // get a game data object by it's id
    getGameMapById = function (id) {

        var i = 0,
        len = api.campData.gameMaps.length;
        while (i < len) {

            if (api.campData.gameMaps[i].id === id) {

                return api.campData.gameMaps[i];

            }

            i += 1;

        }

        return false;

    },

    // the public api
    api = {

        campData : campData,

        selected : 0,
        target : 0,

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
                        gameMap.boats.player.push(0);

                }

                // ai starts with last game map in array
                if (index === maps.length - 1) {

                    gameMap.owner = 'ai';
                    gameMap.boats.ai.push(0);

                }

            });

            console.log('campData:');
            console.log(this.campData)

        },

        // select the given game map index (1 relative, 0 = none)
        selectMap : function (index, faction) {

            if (this.campData.gameMaps[index - 1].owner === faction) {

                console.log('selecting ' + faction + ' map with an index of : ' + (index - 1));

                this.selected = index;

            }

        },

        // target the given game map index (1 relative, 0 = none)
        targetMap : function (index) {

            this.target = index;

        },

        // start a game with the given game map index
        startGame : function (index) {

            console.log(index);

            Game.setup(getGameMapById('t' + Number(index + 1)));

        },

        // returns true if there are no baots at the given map index
        noBoats : function (index) {

            var map = this.campData.gameMaps[index - 1],

            playerCount = map.boats.player.length,
            aiCount = map.boats.ai.length;

            if (playerCount === 0 && aiCount === 0) {

                return true;

            }

            return false;

        },

        // move all your the boats from your selected game map to the targeted game map
        moveBoats : function (faction) {

            var selMap,
            tarMap;

            if (this.target === 0 || this.selected === 0) {

                console.log('no target or selected map set.');
                console.log('selected: ' + this.selected);
                console.log('target: ' + this.target);

            } else {

                console.log(faction + ' is moveing boats.');

                selMap = this.campData.gameMaps[this.selected - 1];
                tarMap = this.campData.gameMaps[this.target - 1];

                console.log('target map: ' + this.target);
                console.log(tarMap);
                console.log('selected map: ' + this.selected);
                console.log(selMap);

                console.log('no boats at target = ' + this.noBoats(this.target));

                // the faction gets the map if there are no boats
                if (this.noBoats(this.target)) {

                    tarMap.owner = faction;

                }

                console.log('okay moving the boats...');
                console.log(selMap.boats[faction]);
                console.log(tarMap.boats[faction]);

                tarMap.boats[faction] = tarMap.boats[faction].concat(selMap.boats[faction]);

                selMap.boats[faction] = [];

                console.log(selMap.boats[faction]);
                console.log(tarMap.boats[faction]);

            }

        }

    };

    // return the public API
    return api;

}
    ());
