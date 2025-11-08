// ===== WORD SCRAMBLE GAME WITH LEVELS =====
const wordLists = {
  easy: ["cat", "dog", "book", "pen", "apple", "ball", "car", "fish", "milk", "tree"],
  medium: ["pencil", "grapes", "pillow", "school", "planet", "flower", "garden", "purple", "silver", "cookie"],
  hard: ["watermelon", "pineapple", "computer", "mountain", "milkshake", "dinosaur", "notebook", "rainbow", "umbrella", "hospital"]
};

// ===== GAME VARIABLES =====
let currentWord = "";
let scrambled = "";
let score = 0;
let timeLeft = 20;
let timerInterval;
let currentLevel = "easy";

// ===== DOM ELEMENTS =====
const scrambledWordDisplay = document.getElementById("scrambled-word");
const guessInput = document.getElementById("guess");
const message = document.getElementById("message");
const checkBtn = document.getElementById("check-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("time");
const levelSlider = document.getElementById("level");
const levelLabel = document.getElementById("level-label");

// ===== SHUFFLE WORD FUNCTION =====
function shuffleWord(word) {
  let arr = word.split("");
  for (let i =letters.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

// ===== PICK A NEW WORD BASED ON LEVEL =====
function newWord() {
  const words = wordLists[currentLevel];
  message.textContent = "";
  guessInput.value = "";
  enableGame();
  currentWord = words[Math.floor(Math.random() * words.length)];
  scrambled = shuffleWord(currentWord);
  while (scrambled === currentWord) {
    scrambled = shuffleWord(currentWord);
  }
  scrambledWordDisplay.textContent = scrambled;
}

// ===== TIMER FUNCTION =====
function startTimer() {
  clearInterval(timerInterval);

  if (currentLevel === "easy") timeLeft = 20;
  else if (currentLevel === "medium") timeLeft = 30;
  else if (currentLevel === "hard") timeLeft = 50;

  timerDisplay.textContent = timeLeft;
  enableGame();

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      message.textContent = "⏰ Time’s up! Click Restart.";
      message.style.color = "red";
      scrambledWordDisplay.textContent = currentWord.toUpperCase();
      disableGame();
    }
  }, 1000);
}

// ===== DISABLE / ENABLE INPUT =====
function disableGame() {
  guessInput.disabled = true;
  checkBtn.disabled = true;
  nextBtn.disabled = true;
}

function enableGame() {
  guessInput.disabled = false;
  checkBtn.disabled = false;
  nextBtn.disabled = false;
}

// ===== CHECK USER'S GUESS =====
checkBtn.addEventListener("click", () => {
  const guess = guessInput.value.toLowerCase().trim();
  if (guess === currentWord) {
    message.textContent = "✅ Correct!";
    message.style.color = "green";
    score++;
    scoreDisplay.textContent = score;
    newWord();
  } else {
    message.textContent = "❌ Try again!";
    message.style.color = "red";
  }
});

// ===== NEXT WORD BUTTON =====
nextBtn.addEventListener("click", newWord);

// ===== RESTART GAME =====
restartBtn.addEventListener("click", () => {
  score = 0;
  scoreDisplay.textContent = score;
  newWord();
  startTimer();
});

// ===== LEVEL SLIDER CHANGE =====
levelSlider.addEventListener("input", () => {
  const val = parseInt(levelSlider.value);
  if (val === 1) currentLevel = "easy";
  else if (val === 2) currentLevel = "medium";
  else if (val === 3) currentLevel = "hard";

  levelLabel.textContent = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);
  score = 0;
  scoreDisplay.textContent = score;
  newWord();
  startTimer();
});

// ===== START GAME =====
newWord();
startTimer();
