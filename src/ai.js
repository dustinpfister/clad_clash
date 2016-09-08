

var AI = (function () {

    var firstAction = true,
    action = false,
    aiBoats;

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

                    aiBoats = BoatCollection.getBoatsByOwner('ai');

                }

            }

            //Game.AIOver();

        }

    };

}
    ());
