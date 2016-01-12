// ==UserScript==
// @name         TagPro Ball Glow Under Tiles
// @description  Adds a glow under the tiles
// @version      0.2.1
// @author       Some Ball -1
// @include      http://tagpro-*.koalabeast.com:*
// @include      http://tangent.jukejuice.com:*
// @include      http://*.newcompte.fr:*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';


    'tiles':        'http://i.imgur.com/3sOTPxA.png', //alt tiles: QY80lbv or lfJKkIH
    'speedpad':     'http://i.imgur.com/iwrrew9.png',
    'speedpadRed':  'http://i.imgur.com/3sOTPxA.png',
    'speedpadBlue': 'http://i.imgur.com/CxINKm3.png',
    'portal':       'http://i.imgur.com/YOaozSC.png',
    'splats':       'http://i.imgur.com/hlVXQ3T.png',
});


tagpro.ready(function() {
    var glow = 'http://i.imgur.com/hI93CS5.png';
    var tr = tagpro.renderer;
    
    function addGlows(player) {
        var bottomTintColor = player.team === 1 ? 0xFF0000 : 0x0000FF;
        
        player.sprites.bottomGlow = new PIXI.Sprite(PIXI.Texture.fromImage(glow));
        player.sprites.bottomGlow.alpha = 0.65;
        player.sprites.bottomGlow.tint = bottomTintColor;
        player.sprites.bottomGlow.anchor = new PIXI.Point(0.5, 0.5);
        player.sprites.bottomGlow.position = new PIXI.Point(Math.round(player.x)+20, Math.round(player.y)+20);
        tr.layers.background.addChildAt(player.sprites.bottomGlow, 0);
    }
    
    var dp = tr.drawPlayer;
    tr.drawPlayer = function(player) {
        if (player.draw && player.sprites && !player.sprites.bottomGlow) addGlows(player);
        return dp.apply(this, arguments);
    };
    
    var upc = tr.updatePlayerColor;
    tr.updatePlayerColor = function(player) {
        if (!player.sprites.bottomGlow) {
            addGlows(player);
        } else {
            var color = player.team === 1 ? "red" : "blue";
            var tileId = color + "ball";
            if (player.sprites.actualBall.tileId !== tileId) {
                tr.layers.background.removeChild(player.sprites.bottomGlow);
                addGlows(player);
            }
        }
        return upc.apply(this, arguments);
    };
    
    var upsp = tr.updatePlayerSpritePosition;
    tr.updatePlayerSpritePosition = function(player) {
        if(!player.sprites.bottomGlow) addGlows(player);
        else player.sprites.bottomGlow.position = new PIXI.Point(Math.round(player.x)+20, Math.round(player.y)+20);
        return upsp.apply(this, arguments);
    };
});
