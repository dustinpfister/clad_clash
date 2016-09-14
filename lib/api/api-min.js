/*
 *    api-min.js for Clad Clash
 *    Copyright 2016 by Dustin Pfister (GPL v3)
 *
 *    api.js is a custom framwork for clad clash
 *
 */

var api={distance:function(a,b,c,d){return Math.sqrt(Math.pow(a-c,2)+Math.pow(b-d,2))},boundingBox:function(a,b,c,d,e,f,g,h){if((a>e+g)||(a+c<e)||(b+d<f)||(b>f+h)){return false}return true}};
