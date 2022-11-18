class ClickAndHold {
  /**
   *
   * @param {Object} target The HTML element to apply the event to
   * @param {Function} callback The function to run once the target is clicked and held
   */
  constructor(target, callback) {
    this.target = target;
    this.callback = callback;
    this.isHeld = false;
    this.activeHoldTimeoutId = null;

    ["mousedown", "touchstart"].forEach((type) => {
      this.target.addEventListener(type, this._onHoldStart.bind(this));
    });

    ["mouseup", "touchend", "touchcancel"].forEach((type) => {
      this.target.addEventListener(type, this._onHoldEnd.bind(this));
    });

    this.target.addEventListener("mouseover", this._onHold.bind(this));
  }

  _onHoldStart() {
    this.isHeld = true;
    isDrawing = true;

    this.activeHoldTimeoutId = setTimeout(() => {
      if (this.isHeld) {
        this.callback(this.target);
      }
    }, 50);
  }

  _onHold() {
    this.callback(this.target);
  }

  _onHoldEnd() {
    this.isHeld = false;
    isDrawing = false;
    clearTimeout(this.activeHoldTimeoutId);
  }

  /**
   *
   * @param {Object} target The HTML element to apply the event to
   * @param {Function} callback The function to run once the target is clicked and held
   */
  static apply(target, callback) {
    new ClickAndHold(target, callback);
  }
}

/**
 * Create grid based on current grid size
 */
function createGrid(gridSize) {
  let grid = document.querySelector(".grid");

  for (let i = 1; i <= gridSize; i++) {
    let gridRow = document.createElement("div");
    gridRow.classList.add("grid-row");
    grid.appendChild(gridRow);

    for (let j = 1; j <= gridSize; j++) {
      let gridSquare = document.createElement("div");
      gridSquare.classList.add("grid-square");
      gridSquare.currentColor = 100;
      gridRow.appendChild(gridSquare);
      ClickAndHold.apply(gridSquare, changeColor);
    }
  }
}

function resetGrid() {
  let grid = document.querySelector(".grid");

  while (grid.hasChildNodes()) {
    grid.removeChild(grid.firstChild);
  }

  createGrid(gridSize);
}

/**
 *
 * @param {Object} target The HTML element to change the background color of
 */
function changeColor(target) {
  if (isDrawing) {
    if (target.currentColor !== 0) target.currentColor -= 10;
    target.style.backgroundColor = `rgb(0%, 0%, ${target.currentColor}%)`;
  }
}

let isDrawing = false;
let gridSize = 16;

createGrid(gridSize);

let resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetGrid);

let gridSizeButton = document.querySelector("#grid-size-button");
gridSizeButton.addEventListener("click", changeGridSize);

function getGridSize() {
  let gridSize = Number(prompt("Enter a grid size no larger than 100"));
  return gridSize;
}

function changeGridSize() {
  // Get new grid size from user
  let newGridSize = getGridSize();
  gridSize = newGridSize;

  // Remove old container
  let gridContainer = document.querySelector(".container");
  gridContainer.removeChild(gridContainer.children[1]);

  // Create new grid based on new grid size and add to DOM
  let grid = document.createElement("div");
  grid.classList.add("grid");
  let gridTitle = document.querySelector(".title");
  gridTitle.after(grid);
  createGrid(gridSize);
}
