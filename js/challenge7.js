const WORD = "SOUND";
const GRID_ROWS = 6;
const GRID_COLS = 5;

let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let currentGuess = [];

// Initialize game grid
const gameGrid = document.getElementById("game-grid");
for (let i = 0; i < GRID_ROWS; i++) {
  for (let j = 0; j < GRID_COLS; j++) {
    const cell = document.createElement("div");
    cell.className =
      "w-14 h-14 border-2 border-gray-600 flex items-center justify-center text-2xl font-bold rounded";
    gameGrid.appendChild(cell);
  }
}

// Handle physical keyboard input
document.addEventListener("keydown", (e) => {
  if (gameOver) return;

  if (e.key === "Enter") {
    if (currentCol === GRID_COLS) {
      checkGuess();
    }
  } else if (e.key === "Backspace") {
    if (currentCol > 0) {
      currentCol--;
      currentGuess.pop();
      updateGrid();
    }
  } else if (e.key.match(/^[a-zA-Z]$/) && currentCol < GRID_COLS) {
    const key = e.key.toUpperCase();
    currentGuess.push(key);
    updateGrid();
    currentCol++;
  }
});

function updateGrid() {
  const row = gameGrid.children;
  for (let i = 0; i < GRID_COLS; i++) {
    const cell = row[currentRow * GRID_COLS + i];
    cell.textContent = currentGuess[i] || "";
  }
}

function checkGuess() {
  const guess = currentGuess.join("");
  
  // Validate the word through Free Dictionary API
  isValidWord(guess).then(isValid => {
    if (isValid) {
      const row = gameGrid.children;

      for (let i = 0; i < GRID_COLS; i++) {
        const cell = row[currentRow * GRID_COLS + i];
        if (guess[i] === WORD[i]) {
          cell.classList.add("correct");
        } else if (WORD.includes(guess[i])) {
          cell.classList.add("wrong-position");
        } else {
          cell.classList.add("incorrect");
        }
      }

      if (guess === WORD) {
        gameOver = true;
        document
          .getElementById("completion-message")
          .classList.remove("hidden");
        return;
      }

      currentRow++;
      if (currentRow === GRID_ROWS) {
        gameOver = true;
        return;
      }

      currentGuess = [];
      currentCol = 0;
    } else {
      alert("Invalid word! Please enter a valid word.");
    }
  });
}

function isValidWord(word) {
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Dictionary API request failed");
      }
      return response.json();
    })
    .then(data => {
      // If definitions are returned, the word is valid
      return data.length > 0;
    })
    .catch(err => {
      console.error(err);
      alert("Error validating word. Please try again.");
      return false;
    });
}

function toggleHint() {
  const hint = document.getElementById("hint");
  hint.classList.toggle("hidden");
}
