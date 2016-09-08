/*
 *    main.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    working main app loop
 *
 */

var canvas = document.getElementsByTagName('canvas')[0],
context = canvas.getContext('2d');

attach(canvas);
drawGrid(canvas, context);
drawBoats(canvas, context);

var loop = function () {

    requestAnimationFrame(loop);

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBack(canvas, context);
    drawGrid(canvas, context);
    drawBoats(canvas, context);

};

loop();
