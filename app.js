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
 * Create default 16x16 grid
 */
function createDefaultGrid() {
  let grid = document.querySelector(".grid");

  for (let i = 1; i <= 16; i++) {
    let gridRow = document.createElement("div");
    gridRow.classList.add("grid-row");
    grid.appendChild(gridRow);

    for (let j = 1; j <= 16; j++) {
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

  createDefaultGrid();
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

createDefaultGrid();

let resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetGrid);
