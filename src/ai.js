/*
 *    ai.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    AI for Clad Clash
 *
 */

var AI = (function () {

    var firstAction = true,
    action = false,
    actionST = new Date(),
    aiBoats = [],
    AIBoatIndex = 0,
    AIBoat = false,
    faction = 'player',

    state = 'select', // select, move, attack

    actions = {

        select : function () {

            AIBoat = aiBoats[AIBoatIndex];
            BoatCollection.selectBoatAt(AIBoat.x, AIBoat.y);

            console.log('AI: I am seletcing ai boat #: ' + AIBoatIndex);

            state = 'move';
        },

        move : function () {

            console.log('AI: okay so I will move the selected boat to move random move point.');

            movePoints = Map.getMovePoints();

            if (movePoints.length > 1) {

                mp = movePoints[Math.floor(Math.random() * movePoints.length)];

                Map.moveBoat(AIBoat, mp.x, mp.y);

                state = 'attack';

                // no move points? end turn
            } else {

                state = 'attack';

            }

        },

        attack : function () {

            console.log('AI: okay for attack state I just check if i end my turn or start over with the next boat');

            if (AIBoatIndex >= aiBoats.length - 1) {

                endTurn();

            } else {

                state = 'select';
                AIBoatIndex += 1;

            }

        }

    },

    nextAction = function () {

        actions[state]();

    },

    // AI ends it's turn
    endTurn = function () {

        console.log('AI: okay I am done');

        firstAction = true;
        action = false;
        AIBoatIndex = 0;
        AIBoat = false;
        state = 'select';
        Game.AIOver();

    };

    return {

        setFaction : function (fact) {

            faction = fact;

        },

        // what to do when it is the AI's turn
        tick : function () {

            var now = new Date();

            // if no action is in progress
            if (!action) {

                action = true;
                actionST = new Date();

                // first action?
                if (firstAction) {

                    firstAction = false;

                    console.log('AI: finding stuff for my first action.');

                    AIBoatIndex = 0;
                    aiBoats = BoatCollection.getBoatsByOwner(faction);

                }

                nextAction();

            }

            if (now - actionST >= 100) {

                action = false;

            }

            //Game.AIOver();

        }

    };

}
    ());
