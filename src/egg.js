/*
 *    egg.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    Easter Egg stuff for Clad Clash.
 *
 */

var egg = (function () {

    var t,

    once = true,

    autoLoop = function () {

        console.log(BoatCollection.victory);

        if (BoatCollection.victory != 'none') {

            BoatCollection.resetBoats();
            BoatCollection.setCollection();

            if (once) {

                Game.autoPlay = false;
                clearTimeout(t);

            }

        }

    };

    return {

        autoPlay : function (playOnce) {

            Game.autoPlay = !Game.autoPlay;

            once = playOnce === undefined ? true : playOnce;

            if (Game.autoPlay) {

                t = setInterval(autoLoop, 200);

            } else {

                clearInterval(t);

            }

        }

    };

}
    ());
