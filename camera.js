var setupCamera = function(scene) {
	var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(0, 100, 0);
	camera.lookAt(new THREE.Vector3(50, 0, -50));
	camera.up = new THREE.Vector3(0, 1, 0);
	scene.add( camera );

	var someNumber = 0
	setInterval(function() {
		someNumber += 0.0005
		camera.lookAt(new THREE.Vector3(50, 0, -50));
		camera.position.z = Math.sin(someNumber) * -100
		camera.position.x = Math.cos(someNumber) * 100
	}, 16)

	return camera;
};
