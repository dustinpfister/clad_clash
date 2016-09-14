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

                console.log('userscore!');

                var obj = {
                    mess : 'i am the default!',
                    foo : 'bar'
                },

                working = _.clone(obj);

                working.mess = 'I am the obj you are working with'

                    console.log(obj);
                console.log(working);

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

        campaign : {

            firstRun : function () {},

            tick : function () {}

        },

        // the game state
        game : {

            firstRun : function () {},

            tick : function () {

                Game.tick();

                // if victory
                if (BoatCollection.victory != 'none') {

                    console.log('changing machine state back to campaign');

                    // calling reset boats will reset other module values as well
                    BoatCollection.resetBoats();
                    stateChange('campaign');

                }

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
