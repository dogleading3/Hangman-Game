import { wordsList } from "./wordList.js";

const wordDisplay = document.querySelector(".word-display");
const letterButtons = document.querySelectorAll(".letter-button");
const hintText = document.querySelector(".hint-text");
const remainingText = document.querySelector(".remaining-text");
const gameOver = document.querySelector(".game-over");
const playAgainButton = document.querySelector(".play-again");

let currentWord = "";
let remainingAttempts = 10;
let correctLetters = [];

playAgainButton.addEventListener("click", () => {
  remainingAttempts = 10;
  correctLetters = [];
  remainingText.textContent = `Remaining Attempts: ${remainingAttempts}`;
  letterButtons.forEach((button) => (button.disabled = false));

  gameOver.classList.remove("active");
  getRandomWord();
});

letterButtons.forEach((button) => {
  button.addEventListener("click", () => handleGuess(button));
});

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  const button = Array.from(letterButtons).find(
    (btn) => btn.textContent.toLowerCase() === key
  );
  if (button && !button.disabled) {
    handleGuess(button);
  }
});

const getRandomWord = () => {
  const { word, hint } =
    wordsList[Math.floor(Math.random() * wordsList.length)];
  currentWord = word;
  correctLetters = [];
  hintText.textContent = hint;
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<span class="word">_</span>`)
    .join("");
};

const handleGuess = (button) => {
  const clickedLetter = button.textContent.toLowerCase();
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        wordDisplay.querySelectorAll("span")[index].innerText = letter;
      }
    });
  } else {
    remainingAttempts--;
    remainingText.textContent = `Remaining Attempts: ${remainingAttempts}`;
  }
  button.disabled = true;
  if (remainingAttempts === 0) {
    gameOver.classList.add("active");
    gameOver.querySelector(".word").textContent = currentWord;
    gameOver.querySelector("h1").textContent = "You Lost";
  }
  if (!wordDisplay.textContent.includes("_")) {
    gameOver.classList.add("active");
    gameOver.querySelector(".word").textContent = currentWord;
    gameOver.querySelector("h1").textContent = "You Won";
  }
};

getRandomWord();
