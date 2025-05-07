// רשימת מילים סודיות אפשריות
const secretWords = ["שרבוט", "חליל", "מתכון", "קליפה", "שבשבת", "פרפר", "שלטון"];
const secretWord = secretWords[Math.floor(Math.random() * secretWords.length)];

let bestGuess = "";
let bestScore = -1;

window.addEventListener("DOMContentLoaded", () => {
  const guessInput = document.getElementById("guessInput");
  const guessesList = document.getElementById("guessesList");
  const closestWordDisplay = document.getElementById("closestWordDisplay");

  // תמיכה בלחיצה על Enter
  guessInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      submitGuess();
    }
  });

  // כפתור ניחוש
  window.submitGuess = function () {
    const guess = guessInput.value.trim();
    if (!guess) return;

    const score = similarity(guess, secretWord);
    const li = document.createElement("li");
    li.textContent = `${guess} — קרבה: ${score}%`;
    guessesList.appendChild(li);

    if (score > bestScore) {
      bestScore = score;
      bestGuess = guess;
      closestWordDisplay.textContent = `המילה הכי קרובה עד עכשיו היא: ${bestGuess}`;
    }

    guessInput.value = "";
  };
});

// פונקציית חישוב קרבה
function similarity(guess, secret) {
  let score = 0;
  for (let i = 0; i < Math.min(guess.length, secret.length); i++) {
    if (guess[i] === secret[i]) score++;
  }
  return Math.floor((score / secret.length) * 100);
}
