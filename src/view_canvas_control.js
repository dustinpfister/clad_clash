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

            var mapIndex = 2 * Math.floor(y / 300) + Math.floor(x / 400);

            if (api.boundingBox(x, y, 1, 1, 10, 530, 128, 64)) {

                console.log('end turn button pressed');

                if (Camp.activeFaction === 'player') {

                    console.log('yes it is your turn player, it shal end now...');
                    Camp.endTurn();

                } else {

                    console.log('nope it\'s the AI\'s turn.');

                }

            } else {

                if (Camp.selected != 0) {

                    if (mapIndex + 1 === Camp.selected) {

                        Camp.selected = 0;

                    } else {

                        Camp.targetMap(mapIndex + 1);

                        Camp.moveBoats('player');

                        if (Camp.isBattle(mapIndex + 1)) {

                            console.log('I am going to bust a cap in yo ass!');

                            Camp.startGame(mapIndex);

                            Main.stateChange('game');

                        }

                    }

                } else {

                    Camp.selectMap(mapIndex + 1, 'player');

                }

            }

        },

        gameMapMenu : function(e,x,y){},

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
