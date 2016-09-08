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

    // draw the game map
    drawMap = function () {

        var cells = Map.cells,
        width = Map.conf.width,
        offset = Map.conf.offset,
        i = 0,
        len = cells.length,
        x,
        y;

        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        while (i < len) {

            x = i % width;
            y = Math.floor(i / width);

            ctx.fillStyle = '#ffff00';
            if (Map.cells[i].water) {
                ctx.fillStyle = '#00ffff';
            }
            ctx.fillRect(x * 32 + offset.x, y * 32 + offset.y, 32, 32);
            ctx.strokeRect(x * 32 + offset.x, y * 32 + offset.y, 32, 32);

            if (Map.cells[i].movePoint) {

                ctx.beginPath();
                ctx.arc(x * 32 + 16 + offset.x, y * 32 + 16 + offset.y, 10, 0, Math.PI * 2);
                ctx.stroke();
            }

            i++;
        }

    },

    // draw boats from BoatCollection
    drawBoats = function () {

        var boats = BoatCollection.boats,
        i = 0,
        offset = Map.conf.offset,
        len = boats.length,
        x,
        y;

        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        while (i < len) {

            ctx.fillStyle = boats[i].owner === 'player' ? '#00ff00' : '#ff0000';
            ctx.fillRect(boats[i].x * 32 + offset.x, boats[i].y * 32 + offset.y, 32, 32);

            i++;
        }

        if (BoatCollection.selected) {

            ctx.beginPath();
            ctx.arc(
                boats[BoatCollection.selected - 1].x * 32 + 16 + offset.x,
                boats[BoatCollection.selected - 1].y * 32 + 16 + offset.y,
                boats[BoatCollection.selected - 1].movement * 32 + 16,
                0,
                Math.PI * 2);
            ctx.stroke();

        }

    },

    // main draw methods for each state
    draw = {

        start : function () {},

        game : function () {

            ctx.fillStyle = '#8a8a8a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawMap();

        }

    }

    // public API
    return {

        setup : function (id) {

            console.log('setting up view');

            canvas.width = 800;
            canvas.height = 600;

            container = document.getElementById(id);
            container.appendChild(canvas);

        },

        draw : function (state) {

            draw[state]();

        }

    }

}
    ());
