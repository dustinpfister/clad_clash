/*
 *    main.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    working main app loop
 *
 */

(function () {

    // the current machine state, and firstRun bool
    var currentState = 'start',
    firstRun = true,

    // change a machine sttae
    stateChange = function (state) {

        currentState = state;
        firstRun = true;

    },

   // the state machine
    machine = {

        // start state
        start : {

            firstRun : function () {

                console.log('start first runs');

                View.setup('apparea');

            },

            tick : function () {

                stateChange('game')

            }

        },

        // the game state
        game : {

            firstRun : function () {},

            tick : function () {}

        }

    },

    // main app loop
    loop = function () {

        requestAnimationFrame(loop);

        if (firstRun) {

            machine[currentState].firstRun();

        }

        machine[currentState].tick();
        View.draw(currentState);

    };

    // hold onto your butts...
    loop();

}
    ());
