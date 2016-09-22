/*
 *    campaign.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    the current state of the players campaign, also setsup new games, and is effected by the outcome of games.
 *
 */

var Camp = (function () {

    // what should be hard coded defaults for a new campain.
    var campDefaults = {

        // starting gold
        gold : {

            player : 100,
            ai : 100,
            perMap : 50

        },

        // game maps
        gameMaps : [{

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
        ]

    },

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

    // reset all the maps moveBoats bools
    resetMaps = function () {

        api.campData.gameMaps.forEach(function (gameMap) {

            gameMap.moveBoats = true;

        });

    },

    // the public api
    api = {

        campData : campData,

        selected : 0,
        target : 0,

        // what to do on a machine state first run.
        firstRun : function () {

            // set moveBoats bool true for all maps
            resetMaps();

            this.selected = 0;
            this.target = 0;

        },

        // counts the number of maps owned by each faction.
        mapCount : function () {

            var count = {

                none : 0,
                player : 0,
                ai : 0

            };

            this.campData.gameMaps.forEach(function (map) {

                count[map.owner] += 1;

            });

            return count;

        },

        // get an array of indexs (1 relative) of game maps that are owned by the given faction
        mapList : function (faction) {

            var list = [];

            this.campData.gameMaps.forEach(function (map, index) {

                if (map.owner === faction) {

                    list.push(index + 1);

                }

            });

            return list;

        },

        // end the current turn
        endTurn : function () {

            var mapCT = this.mapCount(),
            gold = this.campData.gold;

            this.activeFaction = this.activeFaction === 'player' ? 'ai' : 'player';
            this.turnNum += 1;
            this.selected = 0;
            this.target = 0;

            gold[this.activeFaction] += gold.perMap * mapCT[this.activeFaction];

            resetMaps();

        },

        // start a new campaign
        newCamp : function () {

            // campData is a clone of campDefaults
            this.campData = _.clone(campDefaults); ;

            // starting at turn #0, with player going first.
            this.turnNum = 0;
            this.activeFaction = 'player';

            // add starting boats
            this.campData.gameMaps.forEach(function (gameMap, index, maps) {

                // default map owner is 'none'
                gameMap.owner = 'none';

                // boats can be moved
                gameMap.moveBoats = true;

                // default boats are empty arrays
                gameMap.boats = {

                    player : [],
                    ai : []

                };

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

        },

        // select the given game map index (1 relative, 0 = none)
        selectMap : function (index, faction) {

            if (this.activeFaction === faction) {

                if (this.campData.gameMaps[index - 1].owner === faction) {

                    this.selected = index;

                }

            }

        },

        // target the given game map index (1 relative, 0 = none)
        targetMap : function (index) {

            this.target = index;

        },

        // start a game with the given game map index
        startGame : function (index) {

            Game.setup(getGameMapById('t' + Number(index + 1)));

        },

        // returns a count of ships for each faction of the given 1 relative map index
        shipCount : function (index) {

            var map = this.campData.gameMaps[index - 1];

            return {

                player : map.boats.player.length,
                ai : map.boats.ai.length

            };

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

        // returns true if the count of boats of both factions at a map is greater than zero
        isBattle : function (index) {

            var map = this.campData.gameMaps[index - 1],

            playerCount = map.boats.player.length,
            aiCount = map.boats.ai.length;

            if (playerCount > 0 && aiCount > 0) {

                return true;

            }

            return false;

        },

        // what to do when a battle is over.
        onBattleEnd : function (victor) {

            var map = this.campData.gameMaps[this.target - 1];

            if (map.owner === victor) {

                // anything if the owner defends?

                // attaker wins
            } else {

                map.owner = victor;

            }

        },

        // move all your the boats from your selected game map to the targeted game map
        moveBoats : function (faction) {

            var selMap,
            tarMap;

            if (this.activeFaction === faction) {

                // a selected and target map must be set
                if (!(this.target === 0) && !(this.selected === 0)) {

                    selMap = this.campData.gameMaps[this.selected - 1];
                    tarMap = this.campData.gameMaps[this.target - 1];

                    // moveBoats bool must be true for the selected map
                    if (selMap.moveBoats) {

                        // if there are boats in the selected map
                        if (selMap.boats[faction].length > 0) {

                            // the faction gets the map if there are no boats
                            if (this.noBoats(this.target)) {

                                tarMap.owner = faction;

                            }

                            // move the boats.
                            tarMap.boats[faction] = tarMap.boats[faction].concat(selMap.boats[faction]);
                            selMap.boats[faction] = [];

                            // can not move any more boats from the selected or target map
                            selMap.moveBoats = false;
                            tarMap.moveBoats = false;

                        }

                    }

                }

            }

        },

        // the given faction wants to buy a boat at the selected map.
        buyBoat : function (faction, count) {

            var map,
            boatCount,
            i = 0;

            if (count === undefined) {
                count = 1;
            }

            if (this.selected && this.campData.gold[faction] >= 50) {

                // the map
                map = this.campData.gameMaps[this.selected - 1],
                boatCount = map.boats[faction].length;

                // build ship(s)
                while (i < count) {

                    if (boatCount < 6) {

                        map.boats[faction].push(0);

                        // debit gold
                        this.campData.gold[faction] -= 50;

                    } else {

                        break;

                    }

                    i += 1;

                }

            } else {

                console.log('no map selected, or not enough gold.');

            }

        }

    };

    // return the public API
    return api;

}
    ());
