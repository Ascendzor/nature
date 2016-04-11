var scene = new THREE.Scene();

var camera = setupCamera(scene);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

addTriangleToScene(scene);

function render() {
  renderer.render( scene, camera );
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
