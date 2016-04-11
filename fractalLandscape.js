var generations = 7;
var getTriangleMesh = function(triangle) {
	var newGeom = new THREE.Geometry();
	newGeom.vertices.push(triangle.position0);
	newGeom.vertices.push(triangle.position1);
	newGeom.vertices.push(triangle.position2);
	newGeom.faces.push( new THREE.Face3( 0, 1, 2 ) );
	newGeom.computeFaceNormals();
	return new THREE.Mesh(newGeom, new THREE.MeshNormalMaterial({wireframe: true}) );
}

var allPoints = [];
var addTriangleToScene = function(scene) {
	var currentTriangles = [];
	var startTriangle = {
		position0: new THREE.Vector3(0,0,0),
		position1: new THREE.Vector3(100,0,0),
		position2: new THREE.Vector3(0,0,-100)
	}
	allPoints[0] = []
	allPoints[0][0] = 0
	allPoints[100] = []
	allPoints[100][0] = 0
	allPoints[0]
	allPoints[0][-100] = 0
	currentTriangles.push(startTriangle);

	var startMesh = getTriangleMesh(currentTriangles[0]);
	scene.add(startMesh);

	var intervalHandle = setInterval(function(){
		var newSetOfTriangles = [];
		while(scene.children.length > 0) {
			scene.remove(scene.children[scene.children.length-1]);
		}

		currentTriangles.forEach(function(triangle) {

			var triangles = calculateNextTriangles(triangle, allPoints);
			triangles.forEach(function(triangle) {
				var mesh = getTriangleMesh(triangle);
				scene.add(mesh);
				newSetOfTriangles.push(triangle);
			});
		});

		currentTriangles = newSetOfTriangles;

		generations--;
		if(generations == 0) clearInterval(intervalHandle);
	}, 2000);
};
