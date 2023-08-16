class Matrix {
  constructor(row1, row2, row3) {
    this.domMatrix = [row1, row2, row3];
    this.virtualMatrix = [[], [], []];
  }
  updateVM = (x, y) => {
    this.virtualMatrix[x][y] = this.domMatrix[x][y].innerHTML;
    return this.computeWinner();
  };

  computeWinner = () => {
    const matrix = this.virtualMatrix;
    const rows = matrix.length;
    const cols = matrix[0].length;

    // CHECK ROWS
    for (let row = 0; row < rows; row++) {
      if (
        matrix[row][0] === matrix[row][1] &&
        matrix[row][0] === matrix[row][2]
      )
        return matrix[row][0];
    }

    // CHECK COLS
    for (let col = 0; col < cols; col++) {
      if (
        matrix[0][col] === matrix[1][col] &&
        matrix[0][col] === matrix[2][col]
      )
        return matrix[0][col];
    }

    //CHECK DIAGNOLS
    if (matrix[0][0] === matrix[1][1] && matrix[0][0] === matrix[2][2])
      return matrix[0][0];
    if (matrix[0][2] === matrix[1][1] && matrix[0][2] === matrix[2][0])
      return matrix[0][2];

    return false;
  };
}
