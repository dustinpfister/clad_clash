
var canvas = document.getElementsByTagName('canvas')[0],
context = canvas.getContext('2d');

attach(canvas);
drawGrid(canvas, context);
drawBoats(canvas, context);

var loop = function () {

    requestAnimationFrame(loop);

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid(canvas, context);
    drawBoats(canvas, context);

};

loop();
