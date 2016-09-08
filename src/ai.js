

var AI = (function () {

    var firstAction = true,
    action = false,
    actionST = new Date(),
    aiBoats = [],
    AIBoatIndex = 0,
    AIBoat = false,

    nextAction = function () {

        var movePoints,
        mp,
        x,
        y;

        // no AI boat then select the next index
        if (!AIBoat) {

            AIBoat = aiBoats[AIBoatIndex];
            BoatCollection.selectBoatAt(AIBoat.x, AIBoat.y);

            console.log('AI seletcing ai boat #: ' + AIBoatIndex);

            // we have an AIBoat? then lets do something with it.
        } else {

            console.log('AI: okay so I will move the selected boat to move random move point.');

            movePoints = Map.getMovePoints();

            if (movePoints.length > 1) {

                console.log(movePoints.length);

                mp = movePoints[Math.floor(Math.random() * movePoints.length)];

                Map.moveBoat(AIBoat, mp.x, mp.y);

                // no move points? end turn
            } else {

                endTurn();

            }

        }

    },

    // AI ends it's turn
    endTurn = function () {

        firstAction = true;
        action = false;
        AIBoatIndex = 0;
        AIBoat = false;
        Game.AIOver();

    };

    return {

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
                    aiBoats = BoatCollection.getBoatsByOwner('ai');

                }

                nextAction();

            }

            if (now - actionST >= 1500) {

                action = false;

            }

            //Game.AIOver();

        }

    };

}
    ());
