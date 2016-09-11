/*
 *    egg.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    Easter Egg stuff for Clad Clash.
 *
 */

var egg = (function () {

    var t,

    autoLoop = function () {

        console.log(BoatCollection.victory);

        if (BoatCollection.victory != 'none') {

            Game.autoPlay = false;

            BoatCollection.resetBoats();
            BoatCollection.setCollection();

            clearTimeout(t);

        }

    };

    return {

        autoPlay : function () {

            Game.autoPlay = !Game.autoPlay;

            if (Game.autoPlay) {

                t = setInterval(autoLoop, 200);

            } else {

                clearInterval(t);

            }

        }

    };

}
    ());
