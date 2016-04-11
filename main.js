var scene = new THREE.Scene();

var camera = setupCamera(scene);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

addTriangleToScene(scene);
console.log(scene);

function render() { requestAnimationFrame( render ); renderer.render( scene, camera ); } render();