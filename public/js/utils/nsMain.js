var scene3d=document.getElementById('Scene3d');

var scene, camera, controls, renderer, raycaster;

var mouse, rollOverMesh, rollOverMaterial;
var cubeGeo, cubeMaterial;
var objects=[];

var init= ()=>{
    //prepare the scene
    scene=new THREE.Scene();
    scene.background=new THREE.Color("rgb(255,255,255)");
    
    //prepare the camera
    camera=new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);
    camera.position.set(500,500,1000);
    camera.lookAt(0,0,0);
    
    //prepare the webGL render
    renderer=new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    //make the scene
    scene3d.appendChild(renderer.domElement);

    //axes and grids
    var axes=new THREE.AxesHelper(150);
    scene.add(axes);
    var gridHelper=new THREE.GridHelper(1000,20);
    scene.add(gridHelper);

    // prepare mouse actions
    mouse=new THREE.Vector2();
    raycaster=new THREE.Raycaster();
    var geoPlane=new THREE.PlaneBufferGeometry(1000,1000);
    plane=new THREE.Mesh(geoPlane, new THREE.MeshBasicMaterial({visible:false}));
    plane.rotateX(-Math.PI/2);
    scene.add(plane);
    objects.push(plane);

    // roll-over helpers
    var rollOverGeo=new THREE.BoxBufferGeometry(50,50,50);
    rollOverMaterial=new THREE.MeshBasicMaterial({color:0xff0000, opacity:0.5,transparent:true});
    rollOverMesh=new THREE.Mesh(rollOverGeo, rollOverMaterial);
    scene.add(rollOverMesh);
    
    //prepare basic cube
    cubeGeo=new THREE.BoxBufferGeometry(50,50,50);
    cubeMaterial=new THREE.MeshBasicMaterial({color:new THREE.Color("rgb(255,0,0)")});
    
    // camera orbit zoom
    controls=new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.enableZoom=true;

    // window resize
    window.addEventListener('resize', onWindowResize, false);  

    //document interaction
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseDown', onDocumentMouseDown, false);
}

function onDocumentMouseDown(){}
function onDocumentMouseMove(event){
    event.preventDefault();
    mouse.set((event.clientX/window.innerWidth)*2-1, -(event.clientY/window.innerHeight)*2+1);
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    if ( intersects.length > 0 ) {
        var intersect = intersects[0];
        var vec=intersect.face.normal;
        if(vec.y<1){
            vec=new THREE.Vector3(0,1,0);
        }
        //rollOverMesh.position.copy(intersect.point).add(intersect.face.normal);
        rollOverMesh.position.copy(intersect.point).add(vec);
        rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
    }
    render();
}


function mainLoop(){
    requestAnimationFrame(mainLoop);
    render();
}

function render(){
    renderer.render(scene,camera);
}

function onWindowResize(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

var debugSphere=function(p,r){
    var geox = new THREE.SphereGeometry(r,10,10);
    var matx = new THREE.MeshBasicMaterial ({
      color: new THREE.Color("rgb(102,153,255)"),
    });
    var mesh = new THREE.Mesh(geox, matx);
    mesh.position.x = p.x;
    mesh.position.y = p.y;
    mesh.position.z = p.z; 
    return mesh;
}
  

init();
mainLoop();