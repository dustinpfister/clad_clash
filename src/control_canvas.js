
var attach = function (canvas) {

    canvas.addEventListener('click', function (e) {

        var box = e.target.getBoundingClientRect(),
        x = Math.floor((e.clientX - box.left) / 32),
        y = Math.floor((e.clientY - box.top) / 32);

        //console.log(x + ',' +y);

        Map.clickAt(x, y);

    });

};
