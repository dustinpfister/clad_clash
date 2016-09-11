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
    targetBoat,
    faction = 'player',

    state = 'select', // select, move, attack

    actions = {

        select : function () {

            AIBoat = aiBoats[AIBoatIndex];
            BoatCollection.selectBoatAt(AIBoat.x, AIBoat.y);

            state = 'move';
        },

        move : function () {

            movePoints = Map.getMovePoints();

            if (movePoints.length > 1) {

                mp = movePoints[Math.floor(Math.random() * movePoints.length)];

                Map.moveBoat(AIBoat, mp.x, mp.y);

                state = 'findTargets';

                // no move points
            } else {

                state = 'findTargets';

            }

        },

        findTargets : function () {

            var targets;

            console.log('AI: okay well how do I attack?');

            targets = BoatCollection.getBoatsInRange(AIBoat);

            if (targets.length > 0) {

                console.log('AI: I have one or more boats to attack');

                targetBoat = targets[Math.floor(Math.random() * targets.length)];

                BoatCollection.targetBoatAt(targetBoat.x, targetBoat.y);

                state = 'attack';

            } else {

                console.log('AI: no boat to attack');

                BoatCollection.resetBoats();
                state = 'select';
                AIBoatIndex += 1;

            }

            if (AIBoatIndex >= aiBoats.length) {

                endTurn();

            }

        },

        attack : function () {

            console.log('AI: okay so do i attack or what?');

            BoatCollection.attackState = 1;
            BoatCollection.attackTarget();

            BoatCollection.resetBoats();
            state = 'select';
            AIBoatIndex += 1;

            if (AIBoatIndex >= aiBoats.length) {

                endTurn();

            }
        }

    },

    nextAction = function () {

        actions[state]();

    },

    // AI ends it's turn
    endTurn = function () {

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

            aiBoats = BoatCollection.getBoatsByOwner(faction);

            // if ai has boats
            if (aiBoats.length > 0) {

                // if no action is in progress
                if (!action) {

                    action = true;
                    actionST = new Date();

                    // first action?
                    if (firstAction) {

                        firstAction = false;

                        AIBoatIndex = 0;

                    }

                    nextAction();

                }

                if (now - actionST >= 100) {

                    action = false;

                }

            } else {

                endTurn();

            }

        }

    };

}
    ());
