var calculateNextTriangles = function(triangle, allPoints) {
	var p0 = triangle.position0;
	var p1 = triangle.position1;
	var p2 = triangle.position2;

	var inbetween0and1 = new THREE.Vector3((triangle.position0.x + triangle.position1.x)/2, (triangle.position0.y + triangle.position1.y)/2, (triangle.position0.z + triangle.position1.z)/2);
	var inbetween0and2 = new THREE.Vector3((triangle.position0.x + triangle.position2.x)/2, (triangle.position0.y + triangle.position2.y)/2, (triangle.position0.z + triangle.position2.z)/2);
	var inbetween1and2 = new THREE.Vector3((triangle.position1.x + triangle.position2.x)/2, (triangle.position1.y + triangle.position2.y)/2, (triangle.position1.z + triangle.position2.z)/2);
	p0.y = p0.y;
	p1.y = p1.y;
	p2.y = p2.y;

	var x1=p0.x;var x2=p1.x;var y1=p0.z;var y2=p1.z;
	var distanceBetweenPoints = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
	if(Math.random() > 0.5) distanceBetweenPoints = -distanceBetweenPoints;

	var thingy = function(x, y, z) {
		if (typeof(allPoints[x]) === 'undefined')
			allPoints[x] = []
		if (typeof(allPoints[x][z]) === 'undefined')
			allPoints[x][z] = y + Math.random() * distanceBetweenPoints / 5;
		return allPoints[x][z];
	}
	inbetween0and1.y = thingy(inbetween0and1.x, inbetween0and1.y, inbetween0and1.z);
	inbetween0and2.y = thingy(inbetween0and2.x, inbetween0and2.y, inbetween0and2.z);
	inbetween1and2.y = thingy(inbetween1and2.x, inbetween1and2.y, inbetween1and2.z);

	var newTriangles = [];
	var newTriangle0 = {
		position0: p0,
		position1: inbetween0and1,
		position2: inbetween0and2
	}
	var newTriangle1 = {
		position0: inbetween0and1,
		position1: p1,
		position2: inbetween1and2
	}
	var newTriangle2 = {
		position0: inbetween1and2,
		position1: p2,
		position2: inbetween0and2
	}
	var newTriangle3 = {
		position0: inbetween0and1,
		position1: inbetween1and2,
		position2: inbetween0and2
	}
	newTriangles.push(newTriangle0);
	newTriangles.push(newTriangle1);
	newTriangles.push(newTriangle2);
	newTriangles.push(newTriangle3);
	return newTriangles;
}
