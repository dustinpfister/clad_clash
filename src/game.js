/*
 *    game.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    works with the game state
 *
 */

var Game = (function () {

    // the public object that will be returned to Game Global
    var pubObj = {

        playerTurn : true,
        autoPlay : false,

        // setup the game with the given data (used by campaign.js)
        setup : function (data) {},

        clickAt : function (x, y) {

            if (this.playerTurn && !this.autoPlay) {

                // if clicking map area
                if (api.boundingBox(x, y, 1, 1, Map.conf.offset.x, Map.conf.offset.y, 384, 384)) {

                    x = Math.floor((x - Map.conf.offset.x) / 32),
                    y = Math.floor((y - Map.conf.offset.y) / 32);

                    Map.clickAt(x, y);

                }

                // end turn button?
                if (api.boundingBox(x, y, 1, 1, 420, 32, 128, 64)) {

                    this.endTurn();

                }

            }

        },

        // the player ends their turn.
        endTurn : function () {

            this.playerTurn = false;

            BoatCollection.resetBoats();

        },

        // the AI is done with its turn
        AIOver : function () {

            this.playerTurn = !this.playerTurn;

            BoatCollection.resetBoats();

        },

        // what to do on each frame tick
        tick : function () {

            if (this.playerTurn) {

                if (this.autoPlay) {

                    AI.setFaction('player');
                    AI.tick();

                }

            } else {

                AI.setFaction('ai');
                AI.tick();

            }

        }

    };

    // set up the map
    Map.setGrid({
        mapname : 'firstmap',
        data : [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, , 0, 1, 1, 1, 0, 0, 0, 0, 0, , 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]

    });

    // set the boat collection
    BoatCollection.setCollection();

    return pubObj;

}
    ());
