// TWO PlAYER MODE
$S.twoPlayerCTRL.onclick = (e) => {
  $S.twoPlayerSound.play();
  $S.modal.classList.add("modal-inactive");
  $S.board.domMatrix.forEach((row) =>
    row.forEach((col) => {
      col.classList.add("grid-item-grow");
    })
  );
  $S.info.innerHTML = $S.playerTurn;
};
// ONLINE MODE
$S.onlineCTRL.onclick = () => {
  const audio = document.createElement("audio");
  audio.src = "../assets/SFX/online.mp3";
  audio.play();
  $S.home.style.display = "none";
  $S.registrations.style.display = "flex";
};

// SIGN UP LISTENER
$S.signUpButton.onclick = (e) => {
  if (e.target.innerHTML === "Sign up") {
    $S.passwordConfirmation.style.display = "flex";
    $S.signUpButton.innerHTML = "Log in";
    $S.registrationFields.forEach((input) => (input.value = ""));
  } else {
    $S.passwordConfirmation.style.display = "none";
    $S.signUpButton.innerHTML = "Sign up";
    $S.registrationFields.forEach((input) => (input.value = ""));
  }
};

$S.registrationForm.onsubmit = async (e) => {
  e.preventDefault();
  if ($S.signUpButton.innerHTML === "Sign up") {
    const username = e.target[0].value;
    const password = e.target[1].value;
    const player = {
      player: {
        username,
        password,
      },
    };
    const authPlayer = await dynamiceFetch("/login", player);
    if (authPlayer.logged_in) {
      $S.setPlayer(authPlayer);
      $S.registrations.style.display = "none";
      $S.findPlayer.style.display = "flex";
    }
  }
  if ($S.signUpButton.innerHTML === "Log in") {
    const username = e.target[0].value;
    const password = e.target[1].value;
    const passwordConfirmation = e.target[2].value;
    const player = {
      player: {
        username,
        password,
        password_confirmation: passwordConfirmation,
      },
    };
    const authPlayer = await dynamiceFetch("/players", player);
    if (authPlayer.logged_in) {
      console.log(authPlayer);
      $S.setPlayer(authPlayer);
      $S.registrations.style.display = "none";
      $S.findPlayer.style.display = "flex";
    }
  }
};

//Find Player
$S.findPlayerButton.onclick = (e) => {
  e.preventDefault();
};

//ADD LISTENERS TO GRID
$S.board.domMatrix.forEach((row) =>
  row.forEach((col) => {
    col.onclick = (e) => {
      const gridItem = e.target;
      if ($S.turns === 9) return;
      if (gridItem.innerHTML) return;
      const [x, y] = gridItem.getAttribute("data-point").split("");
      gridItem.innerHTML = $S.currentMarker.marker;
      gridItem.classList.add("grid-item-off");
      const { winningMarker, winningLane } = $S.board.updateVM(x, y);
      $S.turns += 1;
      $S.winner = winningMarker;
      $S.currentMarker.sound().play();
      if ($S.winner === "No Winner" && $S.turns === 9) {
        $S.calculateScore(winningMarker);
        $S.gameInfo.innerHTML = "Tie Game";
        $S.info.innerHTML = "";
        return;
      }
      if ($S.winner === "No Winner") {
        $S.togglePlayerTurn();
        setTimeout(() => ($S.info.innerHTML = $S.playerTurn), 400);
        $S.toggleMarker();
        return;
      }
      $S.calculateScore(winningMarker);
      let i = 1;
      $S.board.domMatrix.forEach((row) =>
        row.forEach((gridItem) => {
          gridItem.classList.add("grid-item-off");
          if (winningLane.includes(gridItem.getAttribute("data-point"))) {
            gridItem.firstElementChild.classList.add(`bounce${i}`);
            i++;
          }
        })
      );
      $S.gameInfo.innerHTML = "WINNER";
      $S.info.innerHTML = $S.winner;
    };
  })
);

$S.yesButton.onclick = () => {
  const audio = document.createElement("audio");
  audio.src = "../assets/SFX/reset.wav";
  audio.play();
  $S.reset();
};
$S.noButton.onclick = () => {
  $S.hardReset();
};
