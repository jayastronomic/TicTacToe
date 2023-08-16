//INITIALIZE GLOBAL STATE
const gridItems = Array.from(document.querySelector(".board").children);

var _ = {
  modal: document.querySelector(".modal"),
  twoPlayerCTRL: document.querySelector("button.two-player-button"),
  gameStarted: false,
  playerOne: { wins: document.getElementById("player-one-score") },
  playerTwo: { wins: document.getElementById("player-two-score") },
  draws: document.querySelector("draw-score"),
  board: new Matrix(
    gridItems.slice(0, 3),
    gridItems.slice(3, 6),
    gridItems.slice(6, 9)
  ),
  currentMarker: "x",
  turns: 0,
  toggleMarker: function () {
    this.currentMarker === "x"
      ? (this.currentMarker = "o")
      : (this.currentMarker = "x");
  },
  winner: null,
};
