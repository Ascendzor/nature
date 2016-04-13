var generations = 6;

clearScene = function(scene) {
	while(scene.children.length > 0) {
		scene.remove(scene.children[scene.children.length-1]);
	}
}

var getNewTriangles = function(triangles, vertices) {
	newTriangles = []
	triangles.forEach(function(triangle) {
		var children = calculateNextTriangles(triangle, vertices);
		children.forEach(function(child) {
			newTriangles.push(child);
		});
	});
	return newTriangles
}

var updateIndices = function(vertices, triangles) {
	indices = [];
	triangles.forEach(function(triangle) {
		Object.keys(triangle).forEach(function(key) {
			index = _.findKey(vertices, function(vertex) {
				return JSON.stringify(vertex) == JSON.stringify(triangle[key])
			})
			indices.push(index)
		})
	})
	return indices;
}

var getTheOneMesh = function(vertices, indices) {
	geometry = new THREE.Geometry();
	vertices.forEach(function(vertex) {
		geometry.vertices.push(vertex)
	})
	for(x=0;x<indices.length;x++) {
		geometry.faces.push(new THREE.Face3(indices[x], indices[x+1], indices[x+2]))
		x++
		x++
	}
	geometry.computeFaceNormals();
	return new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({wireframe: true}) );
}

var addTriangleToScene = function(scene) {
	var triangles = [];
	var startTriangle = {
		position0: {x: 0, y: 0, z: 0},
		position1: {x: 100, y: 0, z: 0},
		position2: {x: 0, y: 0, z: -100}
	}
	triangles.push(startTriangle);

	var vertices = []
	vertices.push({x: 0, y: 0, z: 0})
	vertices.push({x: 100, y: 0, z: 0})
	vertices.push({x: 0, y: 0, z: -100})

	var indices = [0, 1, 2]

	mesh = getTheOneMesh(vertices, indices)
	scene.add(mesh)

	var intervalHandle = setInterval(function(){
		clearScene(scene)
		triangles = getNewTriangles(triangles, vertices)
		indices = updateIndices(vertices, triangles)
		mesh = getTheOneMesh(vertices, indices)
		scene.add(mesh)

		generations--;
		if(generations == 0) clearInterval(intervalHandle);
	}, 2000);
};
