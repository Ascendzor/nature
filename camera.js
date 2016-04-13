var setupCamera = function(scene) {
	var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(55, 80, 50);
	camera.lookAt(new THREE.Vector3(55, 0, -25));
	camera.up = new THREE.Vector3(0, 0, 1);
	scene.add( camera );

	var someNumber = 0
	setInterval(function() {
		someNumber += 0.01
		camera.position.z = Math.sin(someNumber) + 50
	}, 10)

	return camera;
};
