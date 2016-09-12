/*
 *    main.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    working main app loop
 *
 */

var Main = (function () {

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

                View.setup('apparea');

            },

            tick : function () {

                stateChange('title');

            }

        },

        title : {

            firstRun : function () {},

            tick : function () {}

        },

        // the game state
        game : {

            firstRun : function () {},

            tick : function () {

                Game.tick();

            }

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

    return {

        // find the current state of the state machine
        getState : function () {

            return currentState;

        },

        // change the state machine state from outside main.js (such as by a controler)
        stateChange : function (state) {

            stateChange(state);

        }

    };

}
    ());
