/*
 *    control_canvas.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    working controler
 *
 */

var attach = function (canvas) {

    canvas.addEventListener('click', function (e) {

        var box = e.target.getBoundingClientRect(),
        x = Math.floor(e.clientX - box.left),
        y = Math.floor(e.clientY - box.top);

        //x = Math.floor((e.clientX - box.left) / 32),
        //y = Math.floor((e.clientY - box.top) / 32);

        Game.clickAt(x, y);

    });

};