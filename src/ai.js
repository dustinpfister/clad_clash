

var AI = (function () {

    var firstAction = true,
    action = false,
    aiBoats = [],
    AIBoatIndex = 0,
    AIBoat;

    return {

        // what to do when it is the AI's turn
        tick : function () {

            // if no action is in progress
            if (!action) {

                action = true;

                // first action?
                if (firstAction) {

                    firstAction = false;

                    console.log('AI: finding stuff for my first action.');

                    AIBoatIndex = 0;
                    aiBoats = BoatCollection.getBoatsByOwner('ai');

                }
				
				AIBoat = aiBoats[AIBoatIndex];
				
				console.log(AIBoat);

            }

            //Game.AIOver();

        }

    };

}
    ());
