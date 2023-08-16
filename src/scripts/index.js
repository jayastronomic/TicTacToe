//START GAME
_.twoPlayerCTRL.onclick = (e) => {
  _.gameStarted = true;
  _.modal.classList.add("inactive");
};

//ADD LISTENERS TO GRID
_.board.domMatrix.forEach((row) =>
  row.forEach((item) => {
    item.onclick = (e) => {
      if (_.turns === 9) return;
      const gridItem = e.target;
      const [x, y] = gridItem.getAttribute("data-point").split("");
      gridItem.innerHTML = _.currentMarker;
      const winner = _.board.updateVM(x, y);
      if (!winner) {
        _.toggleMarker();
        _.turns += 1;
        return;
      }
      _.winner = winner;
    };
  })
);
