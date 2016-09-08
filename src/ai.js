

var AI = (function () {

    var firstAction = true,
    action = false,
    actionST = new Date(),
    aiBoats = [],
    AIBoatIndex = 0,
    AIBoat = false,

    nextAction = function () {

        // no AI boat then select the next index
        if (!AIBoat) {

            AIBoat = aiBoats[AIBoatIndex];
            BoatCollection.selectBoatAt(AIBoat.x, AIBoat.y);

            console.log('AI seletcing ai boat #: ' + AIBoatIndex);

        // we have an AIBoat? then lets do something with it.
        } else {

            console.log('AI: okay so move points?');
            console.log(Map.getMovePoints().length);

        }

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
