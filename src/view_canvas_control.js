/*
 *    view_canvas.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    Controller for clad clash that will use view_canvas
 *
 */

(function () {

    var states = {

        start : function () {},

        title : function () {

            Camp.newCamp();

            Main.stateChange('campaign');

        },

        campaign : function (e, x, y) {

            var mapIndex = 2 * Math.floor(y / 300) + Math.floor(x / 400),
            cy = Math.floor(mapIndex / 2),
            cx = mapIndex % 2;

            console.log('cell pos : ' + cx + ',' + cy);

            // end turn button
            if (api.boundingBox(x, y, 1, 1, 10, 530, 128, 64)) {

                console.log('end turn button pressed');

                if (Camp.activeFaction === 'player') {

                    console.log('yes it is your turn player, it shal end now...');
                    Camp.endTurn();

                } else {

                    console.log('nope it\'s the AI\'s turn.');

                }

                // not end turn buton
            } else {

                // if a game map is selected
                if (Camp.selected != 0) {

                    // if the game map is clicked again
                    if (mapIndex + 1 === Camp.selected) {

                        // are we clicking the game map menu button?
                        if (api.boundingBox(x, y, 1, 1, 100 + cx * 400, 100 + cy * 275, 64, 64)) {

                            console.log('Game Map Menu');
                            Main.stateChange('gameMapMenu');

                            // then we want to de-select
                        } else {

                            // de-select.
                            Camp.selected = 0;

                        }

                        // the player clicked another game map
                    } else {

                        Camp.targetMap(mapIndex + 1);
                        Camp.moveBoats('player');

                        if (Camp.isBattle(mapIndex + 1)) {

                            Camp.startGame(mapIndex);

                            Main.stateChange('game');

                        }

                    }

                    // attempt game map selection
                } else {

                    Camp.selectMap(mapIndex + 1, 'player');

                }

            }

        },

        gameMapMenu : function (e, x, y) {

            // build ship
            if (api.boundingBox(x, y, 1, 1, 300, 250, 200, 100)) {

                console.log('so far so g-g-g-g-good.');

            }

            // back
            if (api.boundingBox(x, y, 1, 1, 10, 530, 128, 64)) {

                // go back to the campaign state
                Main.stateChange('campaign');

            }

        },

        game : function (e, x, y) {

            Game.clickAt(x, y);

        }

    };

    View.getTopCanvas().addEventListener('click', function (e) {

        var box = e.target.getBoundingClientRect(),
        x = Math.floor(e.clientX - box.left),
        y = Math.floor(e.clientY - box.top);

        states[Main.getState()](e, x, y);

    });

}
    ());
