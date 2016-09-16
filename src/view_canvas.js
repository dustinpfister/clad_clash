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

            // draw boats HP
            ctx.fillStyle = '#000000';
            ctx.font = '15px courier';
            ctx.fillText(boats[i].HP, boats[i].x * 32 + offset.x + 16, boats[i].y * 32 + offset.y + 8);

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

    // show if a targeted boat can be attacked
    drawAttackInfo = function () {

        var boats = BoatCollection.boats,
        offset = Map.conf.offset;

        if (BoatCollection.targeted) {

            // your selected boats attack range
            if (BoatCollection.selected) {

                ctx.strokeStyle = '#ff0000';
                ctx.beginPath();
                ctx.arc(
                    boats[BoatCollection.selected - 1].x * 32 + 16 + offset.x,
                    boats[BoatCollection.selected - 1].y * 32 + 16 + offset.y,
                    boats[BoatCollection.selected - 1].range * 32 + 16,
                    0,
                    Math.PI * 2);
                ctx.stroke();

            }

        }

    },

    // draw game info
    drawInfo = function () {

        // draw boats HP
        ctx.fillStyle = '#000000';
        ctx.font = '15px courier';
        ctx.textAlign = 'left';
        ctx.fillText('victory: ' + BoatCollection.victory, 450, 130);

    },

    // main draw methods for each state
    draw = {

        start : function () {},

        title : function () {

            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';

            ctx.font = '75px courier';
            ctx.fillText('Clad Clash', 400, 75);

            ctx.font = '25px courier';
            ctx.fillText('( just click screen )', 400, 300);

        },

        campaign : function () {

            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ffffff';
            ctx.textBaseline = 'top';

            // title
            ctx.textAlign = 'center';
            ctx.font = '25px courier';
            ctx.fillText('Crude Campaign Map Placeholder.', 400, 50);
            ctx.font = '15px courier';
            ctx.fillText('(just choose a map.)', 400, 80);

            // faction turn
            ctx.textAlign = 'left';
            ctx.fillText('faction turn: ' + Camp.activeFaction, 10, 10);

            ctx.fillText('gold: ' + Camp.campData.gold.player, 10, 20);

            // game maps
            ctx.textAlign = 'center';
            Camp.campData.gameMaps.forEach(function (gameMap, index, maps) {

                var color = '#ffffff',
                shipCounts = Camp.shipCount(index + 1),
                y = Math.floor(index / 2),
                x = index % 2;

                if (gameMap.owner === 'player') {
                    color = '#00ff00';
                }

                if (gameMap.owner === 'ai') {
                    color = '#ff0000';
                }

                ctx.fillStyle = color;

                ctx.strokeStyle = '#ffffff';
                if (Camp.selected - 1 === index) {

                    ctx.strokeRect(100 + x * 400, 100 + y * 275, 200, 200);

                }

                ctx.font = '20px courier';
                ctx.fillText('map' + (index + 1), 200 + 400 * x, 150 + 300 * y);
                ctx.fillText('player ships: ' + shipCounts.player, 200 + 400 * x, 170 + 300 * y);
                ctx.fillText('ai ships: ' + shipCounts.ai, 200 + 400 * x, 190 + 300 * y);

            });

            // end turn button
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(10, 530, 128, 64);
            ctx.fillText('End Turn', 74, 546);

        },

        game : function () {

            ctx.fillStyle = '#8a8a8a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawMap();
            drawBoats();
            drawAttackInfo();
            drawInfo();

            // end turn button
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(448, 32, 128, 64);
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.font = '25px arial';
            ctx.fillText('End Turn', 512, 48);

        }

    }

    // public API
    return {

        setup : function (id) {

            canvas.width = 800;
            canvas.height = 600;

            container = document.getElementById(id);
            container.appendChild(canvas);

        },

        // always returns the only canvas or the top canvas if I get into layering
        getTopCanvas : function () {

            return canvas;

        },

        draw : function (state) {

            draw[state]();

        }

    }

}
    ());
