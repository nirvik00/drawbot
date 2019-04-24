var scene3d=document.getElementById('Scene3d');

var scene, camera, controls, renderer;

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

    // camera orbit zoom
    controls=new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.enableZoom=true;

    // window resize
    window.addEventListener('resize', onWindowResize, false);  
}

var mainLoop=function(){
    requestAnimationFrame(mainLoop);
    render();
}

var render=function(){
    renderer.render(scene,camera);
}

var onWindowResize=function(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
mainLoop();