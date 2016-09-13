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

            console.log('just start a new campaign when the screen is clicked for now.');

            Camp.newCamp();

            Main.stateChange('campaign');

        },

        campaign : function (e, x, y) {

            Main.stateChange('game');

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
