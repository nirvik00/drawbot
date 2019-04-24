var scene3d=document.getElementById('Scene3d');

var scene, camera, controls, renderer;

var init= ()=>{
    scene=new THREE.Scene();
    scene.background=new THREE.Color("rgb(255,255,255)");
    
    camera=new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.up=new THREE.Vector3(0,0,1);
    camera.position.x=0;
    camera.position.y=10;
    camera.position.z=10;
    
    renderer=new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    scene3d.appendChild(renderer.domElement);

    var axes=new THREE.AxesHelper(5);
    scene.add(axes);

    controls=new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.enableZoom=true;
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