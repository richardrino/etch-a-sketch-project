let grid = document.querySelector(".grid");

for (let i = 1; i <= 16; i++) {
  let gridRow = document.createElement("div");
  gridRow.classList.add("grid-row");
  grid.appendChild(gridRow);

  for (let j = 1; j <= 16; j++) {
    let gridSquare = document.createElement("div");
    gridSquare.classList.add("grid-square");
    gridRow.appendChild(gridSquare);
  }
}
