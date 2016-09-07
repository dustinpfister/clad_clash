
var Game = (function () {

    // the public object that will be returned to Game Global
    var pubObj = {

        playerTurn : true,

        clickAt : function (x, y) {

            if (this.playerTurn) {

                // if clicking map area
                if (api.boundingBox(x, y, 1, 1, Map.conf.offset.x, Map.conf.offset.y, 384, 384)) {

                    x = Math.floor((x - Map.conf.offset.x) / 32),
                    y = Math.floor((y - Map.conf.offset.y) / 32);

                    Map.clickAt(x, y);

                }

            }

        },

        // the player ends their turn.
        endTurn : function () {

            this.playerTurn = false;

        },

        // the AI is done with its turn
        AIOver : function () {

            this.playerTurn = true;

            BoatCollection.resetBoats();

        }

    };

    // set up the map
    Map.setGrid(0);

    // set the boat collection
    BoatCollection.setCollection();

    return pubObj;

}
    ());
