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

Array.prototype.multiplyWith = function (matB) {
  const res = Array(9);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      res[j * 3 + i] = 0;
      for (let k = 0; k < 3; k++) {
        res[j*3 + i] += (this[k*3 + i] * matB[j*3 + k]); 
      }
    }
  }
  return res;
};

function BuildTransform( positionX, positionY, rotation, scale )
{
  const rotInRadians = rotation * (Math.PI / 180);
  const R = [
    Math.cos(rotInRadians),  Math.sin(rotInRadians),  0,
    -Math.sin(rotInRadians), Math.cos(rotInRadians),  0,
    0,                       0,                       1
  ];

  const S = [
    scale,  0,      0,
    0,      scale,  0,
    0,      0,      1
  ];

  const T = [
    1,        0,        0,
    0,        1,        0,
    positionX,positionY,1
  ];
  
  // (T * R * S) * v
  // trans = T * R * S
  return T.multiplyWith(R).multiplyWith(S);
}

// Esta función retorna una matriz que resula de la composición de trasn1 y trans2. Ambas 
// matrices vienen como un arreglo 1D expresado en orden "column-major", y se deberá 
// retornar también una matriz en orden "column-major". La composición debe aplicar 
// primero trans1 y luego trans2. 
function ComposeTransforms( trans1, trans2 )
{
  // (T2 * T1) * v
  return trans2.multiplyWith(trans1);
}
