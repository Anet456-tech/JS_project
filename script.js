// ===== WORD SCRAMBLE GAME WITH LEVELS =====

// 🎚 WORD LISTS FOR EACH LEVEL
const wordLists = {
  easy: ["cat", "dog", "book", "pen", "apple", "ball", "car", "fish", "milk", "tree"],
  medium: ["penci", "grapes", "pillow", "school", "planet", "flower", "garden", "purple", "silver", "cookie"],
  hard: ["watermelon", "pineapple", "computer", "mountain", "milkshake", "dinosaur", "notebook", "rainbow", "umbrella", "hospital"]
};

// ===== GAME VARIABLES =====
let currentWord = "";
let scrambled = "";
let score = 0;
let timeLeft = 30;
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
const timerDisplay = document.getElementById("timer");
const levelSelect = document.getElementById("level");

// ===== SHUFFLE WORD FUNCTION =====
function shuffleWord(word) {
  let arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
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
  currentWord = words[Math.floor(Math.random() * words.length)];
  scrambled = shuffleWord(currentWord);
  if (scrambled === currentWord) scrambled = shuffleWord(currentWord);
  scrambledWordDisplay.textContent = scrambled;
}

// ===== TIMER FUNCTION =====
function startTimer() {
  clearInterval(timerInterval);
  if (currentLevel === "easy") timeLeft = 30;
  else if (currentLevel === "medium") timeLeft = 25;
  else timeLeft = 20;

  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      message.textContent = "⏰ Time’s up! Click Restart.";
      message.style.color = "red";
      disableGame();
    }
  }, 1000);
}

// ===== DISABLE / ENABLE INPUT =====
function disableGame() {
  guessInput.disabled = true;
  checkBtn.disabled = true;
}

function enableGame() {
  guessInput.disabled = false;
  checkBtn.disabled = false;
}

// ===== CHECK USER'S GUESS =====
checkBtn.addEventListener("click", () => {
  const guess = guessInput.value.toLowerCase();
  if (guess === currentWord) {
    message.textContent = "✅ Correct!";
    message.style.color = "green";
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
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
  scoreDisplay.textContent = `Score: ${score}`;
  enableGame();
  newWord();
  startTimer();
});

// ===== CHANGE LEVEL =====
levelSelect.addEventListener("change", () => {
  currentLevel = levelSelect.value;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  enableGame();
  newWord();
  startTimer();
});

// ===== START GAME =====
newWord();
startTimer();

