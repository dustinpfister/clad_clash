/*
 *    main.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    working main app loop
 *
 */

(function () {

    var currentState = 'start',
    firstRun = true,

    stateChange = function (state) {

        currentState = state;
        firstRun = true;

    },

    machine = {

        start : {

            firstRun : function () {

                console.log('start first runs');

                View.setup('apparea');

            },

            tick : function () {

                stateChange('game')

            }

        },

        game : {

            firstRun : function () {},

            tick : function () {}

        }

    },

    loop = function () {

        requestAnimationFrame(loop);

        if (firstRun) {

            machine[currentState].firstRun();

        }

        machine[currentState].tick();
		View.draw(currentState);

    };

    loop();

}
    ());
