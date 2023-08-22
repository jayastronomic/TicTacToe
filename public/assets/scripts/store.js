//INITIALIZE GLOBAL STATE
const gridItems = Array.from($(".board").children);

var $S = {
  player: { username: "", logged_in: false },
  setPlayer(player) {
    this.player = { ...player };
  },

  board: new Matrix(
    gridItems.slice(0, 3),
    gridItems.slice(3, 6),
    gridItems.slice(6, 9)
  ),
  info: $(".info").firstElementChild,
  playAgain: $(".play-again-banner-wrapper"),
  twoPlayerSound: $("#two-player-sound"),
  noButton: $(".no-btn"),
  yesButton: $(".yes-btn"),
  findPlayer: $(".find-player"),
  findPlayerButton: $(".find-player-button"),
  passwordConfirmation: $(".confirm-password"),
  links: $(".links"),
  registrationForm: $("form"),
  signUpButton: $(".sign-up-button"),
  registrationFields: $("input"),
  gameInfo: $(".game-info").firstElementChild,
  modal: $(".modal"),
  home: $(".home"),
  registrations: $(".registrations"),
  twoPlayerCTRL: $("button.two-player-button"),
  onlineCTRL: $("button.online-button"),
  playerOne: {
    domScore: $("#player-one-score"),
    virtualScore: 0,
  },
  playerTwo: {
    domScore: $("#player-two-score"),
    virtualScore: 0,
  },
  draws: { domScore: $("#draw-score"), virtualScore: 0 },

  turns: 0,
  currentMarker: {
    marker:
      "<div data-marker='x' class='x-container'><div class='forward-slash'></div><div class='back-slash'></div></div>",
    sound() {
      const audio = document.createElement("audio");
      if (this.winner === "x") audio.src = "../assets/SFX/x-win.mp3";
      if (this.winner !== "x") audio.src = "../assets/SFX/x.wav";
      if ($S.winner === "No Winner" && $S.turns === 9)
        audio.src = "../assets/SFX/tie.mp3";
      return audio;
    },
  },

  toggleMarker() {
    this.currentMarker.marker ===
    "<div data-marker='x' class='x-container'><div class='forward-slash'></div><div class='back-slash'></div></div>"
      ? (this.currentMarker = {
          marker:
            "<div data-marker='o' class='o-container'><div class='outer-ring'></div></div>",
          sound() {
            const audio = document.createElement("audio");
            if ($S.winner === "o") audio.src = "../assets/SFX/o-win.mp3";
            if ($S.winner !== "o") audio.src = "../assets/SFX/o.wav";
            return audio;
          },
        })
      : (this.currentMarker = {
          marker:
            "<div data-marker='x' class='x-container'><div class='forward-slash'></div><div class='back-slash'></div></div>",
          sound() {
            const audio = document.createElement("audio");
            if ($S.winner === "x") audio.src = "../assets/SFX/x-win.mp3";
            if ($S.winner !== "x") audio.src = "../assets/SFX/x.wav";
            if ($S.winner === "No Winner" && $S.turns === 9)
              audio.src = "../assets/SFX/tie.mp3";
            return audio;
          },
        });
  },
  winner: "",

  playerTurn: "P1",
  togglePlayerTurn() {
    this.playerTurn === "P1"
      ? (this.playerTurn = "P2")
      : (this.playerTurn = "P1");
  },
  calculateScore(winningMarker) {
    if (winningMarker === "x") {
      this.playerOne.virtualScore += 1;
      this.playerOne.domScore.innerHTML = this.playerOne.virtualScore;
      this.playAgain.classList.add("fade-in");
      this.winner = "Player 1";
    }
    if (winningMarker === "o") {
      this.playerTwo.virtualScore += 1;
      this.playerTwo.domScore.innerHTML = this.playerTwo.virtualScore;
      this.playAgain.classList.add("fade-in");
      this.winner = "Player 2";
    }
    if (winningMarker === "No Winner") {
      this.draws.virtualScore += 1;
      this.draws.domScore.innerHTML = this.draws.virtualScore;
      this.playAgain.classList.add("fade-in");
      this.winner = "Draw";
    }
  },
  reset() {
    gridItems.forEach((cell) => {
      cell.innerHTML = "";
      cell.classList.remove("grid-item-off");
    });
    this.board = new Matrix(
      gridItems.slice(0, 3),
      gridItems.slice(3, 6),
      gridItems.slice(6, 9)
    );
    this.turns = 0;
    this.playerTurn = "P1";
    this.winner = "";
    this.info.innerHTML = "P1";
    this.gameInfo.innerHTML = "Turn";
    this.playAgain.classList.remove("fade-in");
    this.currentMarker = {
      marker:
        "<div data-marker='x' class='x-container'><div class='forward-slash'></div><div class='back-slash'></div></div>",
      sound() {
        const audio = document.createElement("audio");
        if ($S.winner === "x") audio.src = "../assets/SFX/x-win.mp3";
        if ($S.winner !== "x") audio.src = "../assets/SFX/x.wav";
        if ($S.winner === "No Winner" && $S.turns === 9)
          audio.src = "../assets/SFX/tie.mp3";
        return audio;
      },
    };
  },
  hardReset() {
    this.reset();
    this.playerOne.virtualScore = 0;
    this.playerOne.domScore.innerHTML = "0";
    this.playerTwo.virtualScore = 0;
    this.playerTwo.domScore.innerHTML = "0";
    this.draws.virtualScore = 0;
    this.draws.domScore.innerHTML = "0";
    this.modal.classList.remove("modal-inactive");
  },
};
