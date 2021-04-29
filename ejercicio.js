// Esta función construye una matriz de transfromación de 3x3 en coordenadas homogéneas 
// utilizando los parámetros de posición, rotación y escala. La estructura de datos a 
// devolver es un arreglo 1D con 9 valores en orden "column-major". Es decir, para un 
// arreglo A[] de 0 a 8, cada posición corresponderá a la siguiente matriz:
//
// | A[0] A[3] A[6] |
// | A[1] A[4] A[7] |
// | A[2] A[5] A[8] |
// 
// Se deberá aplicar primero la escala, luego la rotación y finalmente la traslación. 
// Las rotaciones vienen expresadas en grados.

// point • matrix
function multiplyMatrixAndPoint(matrix, point) {
  // Give a simple variable name to each part of the matrix, a column and row number
  let c0r0 = matrix[0], c1r0 = matrix[1], c2r0 = matrix[2];
  let c0r1 = matrix[3], c1r1 = matrix[4], c2r1 = matrix[5];
  let c0r2 = matrix[6], c1r2 = matrix[7], c2r2 = matrix[8];

  // Now set some simple names for the point
  let x = point[0];
  let y = point[1];
  let z = point[2];

  // Multiply the point against each part of the 1st column, then add together
  let resultX = (x * c0r0) + (y * c0r1) + (z * c0r2);

  // Multiply the point against each part of the 2nd column, then add together
  let resultY = (x * c1r0) + (y * c1r1) + (z * c1r2);

  // Multiply the point against each part of the 3rd column, then add together
  let resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2);

  return [resultX, resultY, resultZ];
};

//matrixB • matrixA
function multiplyMatrices(matrixA, matrixB) {
  // Slice the second matrix up into rows
  let row0 = [matrixB[0], matrixB[1], matrixB[2]];
  let row1 = [matrixB[3], matrixB[4], matrixB[5]];
	let row2 = [matrixB[6], matrixB[7], matrixB[8]];
	

  // Multiply each row by matrixA
  let result0 = multiplyMatrixAndPoint(matrixA, row0);
  let result1 = multiplyMatrixAndPoint(matrixA, row1);
	let result2 = multiplyMatrixAndPoint(matrixA, row2);
	
  // Turn the result rows back into a single matrix
  return [
    result0[0], result0[1], result0[2],
    result1[0], result1[1], result1[2],
    result2[0], result2[1], result2[2]
  ];
};

function BuildTransform( positionX, positionY, rotation, scale )
{
	const rotInRadians = rotation * (Math.PI / 180);
	const R = [
		Math.cos(rotInRadians),	Math.sin(rotInRadians),		0,
	 -Math.sin(rotInRadians),	Math.cos(rotInRadians),		0,
		0,									0,										1
	];

	const S = [
		scale,	0,			0,
		0, 			scale,	0,
		0,			0,			1
	];

	const T = [
		1, 					0,					0,
		0,					1,					0,
		positionX,	positionY,	1
	];
	
	// (T * R * S) * v
	// trans = T * R * S
	return multiplyMatrices(multiplyMatrices(T, R), S);
}

// Esta función retorna una matriz que resula de la composición de trasn1 y trans2. Ambas 
// matrices vienen como un arreglo 1D expresado en orden "column-major", y se deberá 
// retornar también una matriz en orden "column-major". La composición debe aplicar 
// primero trans1 y luego trans2. 
function ComposeTransforms( trans1, trans2 )
{
	// (T2 * T1) * v
	return multiplyMatrices(trans2, trans1);
}


