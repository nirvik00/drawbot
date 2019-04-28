var SceneElementsArr=[]; //track of all elements requested
var FloatingDiv; // main menu


var scene3d=document.getElementById('Scene3d'); //3js 
var scene, camera3, controls, renderer, raycaster; //3js

var mouse, rollOverMesh, rollOverMaterial; //3js
var cubeGeo, cubeMaterial; //3js
var isShiftDn=false; //3js 
var isCtrlDn=false; //3js
var objects=[]; //3js