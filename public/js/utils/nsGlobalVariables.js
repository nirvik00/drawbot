var SceneElementsArr=[]; //track of all elements requested
var ElementCounter=0;
var FloatingDiv; // main menu


var CANVAS, CANVASCONTEXT;
var DRAGGING=false;
var CONNECTING=false; var CONNECTINGLINE=[];
var CANVASMSG="";


var scene3d=document.getElementById('three-viewer'); //3js 
var scene, camera, controls, renderer; //3js