class Matrix {
  constructor(row1, row2, row3) {
    this.domMatrix = [row1, row2, row3];
    this.virtualMatrix = [[], [], []];
  }
  updateVM = (x, y) => {
    this.virtualMatrix[x][y] =
      this.domMatrix[x][y].firstChild.getAttribute("data-marker");
    return this.computeWinner();
  };

  computeWinner = () => {
    const matrix = this.virtualMatrix;
    const rows = matrix.length;
    const cols = matrix[0].length;
    // CHECK ROWS
    for (let row = 0; row < rows; row++) {
      if (
        matrix[row][0] &&
        matrix[row][0] === matrix[row][1] &&
        matrix[row][0] === matrix[row][2]
      ) {
        this.winningLane = [`${row}0`, `${row}1`, `${row}2`];
        const winner = {
          winningLane: this.winningLane,
          winningMarker: matrix[row][0],
        };
        return winner;
      }
    }
    // CHECK COLS
    for (let col = 0; col < cols; col++) {
      if (
        matrix[0][col] &&
        matrix[0][col] === matrix[1][col] &&
        matrix[0][col] === matrix[2][col]
      ) {
        {
          const winner = {
            winningLane: [`0${col}`, `1${col}`, `2${col}`],
            winningMarker: matrix[0][col],
          };
          return winner;
        }
      }
    }
    //CHECK DIAGNOLS
    if (
      matrix[0][0] &&
      matrix[0][0] === matrix[1][1] &&
      matrix[0][0] === matrix[2][2]
    ) {
      const winner = {
        winningLane: ["00", "11", "22"],
        winningMarker: matrix[0][0],
      };
      return winner;
    }

    if (
      matrix[0][2] &&
      matrix[0][2] === matrix[1][1] &&
      matrix[0][2] === matrix[2][0]
    ) {
      const winner = {
        winningLane: ["02", "11", "20"],
        winningMarker: matrix[0][2],
      };
      return winner;
    }

    return { winningMarker: "No Winner" };
  };
}
