var generations = 10;

clearScene = function(scene) {
	while(scene.children.length > 0) {
		scene.remove(scene.children[scene.children.length-1]);
	}
}

var getNewTriangles = function(triangles, vertices, performantVertices) {
	newTriangles = []
	triangles.forEach(function(triangle) {
		var children = calculateNextTriangles(triangle, vertices, performantVertices);
		children.forEach(function(child) {
			newTriangles.push(child);
		});
	});
	return newTriangles
}

var updateIndices = function(vertices, triangles, performantVertices) {
	indices = [];
	triangles.forEach(function(triangle) {
		Object.keys(triangle).forEach(function(key) {
			if(key == 'generation') return
			var x = triangle[key].x
			var z = triangle[key].z
			var index = performantVertices[x][z].index
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
	return new THREE.Mesh(geometry, new THREE.MeshNormalMaterial() );
}

var addTriangleToScene = function(scene) {
	var triangles = [];
	var startTriangle = {
		position0: {x: 0, y: 0, z: 0},
		position1: {x: 100, y: 0, z: 0},
		position2: {x: 0, y: 0, z: -100},
		generation: 0
	}
	triangles.push(startTriangle);

	var vertices = []
	vertices.push({x: 0, y: 0, z: 0})
	vertices.push({x: 100, y: 0, z: 0})
	vertices.push({x: 0, y: 0, z: -100})

	var performantVertices = []
	performantVertices[0] = []
	performantVertices[0][0] = {
		y: 0,
		index: 0
	}
	performantVertices[0] = []
	performantVertices[0][0] = {
		y: 0,
		index: 0
	}
	performantVertices[100] = []
	performantVertices[100][0] = {
		y: 0,
		index: 1
	}
	performantVertices[0][-100] = {
		y: 0,
		index: 2
	}

	var indices = [0, 1, 2]

	mesh = getTheOneMesh(vertices, indices)
	scene.add(mesh)

	var intervalHandle = setInterval(function(){
		clearScene(scene)
		var beforeTriangles = +(new Date())
		triangles = getNewTriangles(triangles, vertices, performantVertices)
		var afterTriangles = +(new Date())
		indices = updateIndices(vertices, triangles, performantVertices)
		var afterIndices = +(new Date())
		mesh = getTheOneMesh(vertices, indices)
		var afterMesh = +(new Date())
		scene.add(mesh)

		var secondsTrianglesTook = (afterTriangles - beforeTriangles)
		var secondsIndicesTook = (afterIndices - afterTriangles)
		var secondsMeshTook = (afterMesh - afterIndices)
		console.log(secondsTrianglesTook)
		console.log(secondsIndicesTook)
		console.log(secondsMeshTook)

		generations--;
		if(generations == 0) clearInterval(intervalHandle);
	}, 2000);
};
