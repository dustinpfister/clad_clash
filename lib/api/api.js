/*
 *    api.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    api.js is a custom framwork for clad clash
 *
 */

var api = {

    // distance formula
    distance : function (x1, y1, x2, y2) {

        // return the distance between the two points
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    },

    // your basic bounding box collision detection
    boundingBox : function (x1, y1, w1, h1, x2, y2, w2, h2) {

        // if the two objects do not overlap
        if ((x1 > x2 + w2) || (x1 + w1 < x2) || (y1 + h1 < y2) || (y1 > y2 + h2)) {

            //then they do not overlap
            return false;

        }

        // else they do
        return true;

    }

};
