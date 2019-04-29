var SceneElementsArr=[]; //track of all elements requested
var ElementCounter=0;
var FloatingDiv; // main menu


var CANVAS, CANVASCONTEXT;
var dragging=false;


var scene3d=document.getElementById('three-viewer'); //3js 
var scene, camera, controls, renderer; //3js