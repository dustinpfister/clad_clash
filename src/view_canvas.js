/*
 *    view_canvas.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    2d canvas powered view for Clad Clash
 *
 */

var View = (function () {

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container,

    draw = {

        start : function () {},

        game : function () {}

    }

    // public API
    return {

        setup : function (id) {

            console.log('setting up view');

            container = document.getElementById(id);
            container.appendChild(canvas);

        },

        draw : function (state) {}

    }

}
    ());
