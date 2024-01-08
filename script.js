const maxAttempts = 5; // Set the maximum number of attempts
let guesses = 0;
let gameOver = false;
let randomNumber = generateRandomNumber();

const guessSubmit = document.getElementById("guessSubmit");
const guessInput = document.getElementById("guessInput");
const guessesText = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const restartButton = document.getElementById("restartButton");

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function checkGuess() {
    if (gameOver) {
        return;
    }

    const userGuess = Number(guessInput.value);
    guesses++;

    if (userGuess === randomNumber) {
        gameOver = true;
        displayResult(true);
    } else if (guesses === maxAttempts) {
        gameOver = true;
        displayResult(false);
    } else {
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "red";

        if (userGuess < randomNumber) {
            lowOrHi.textContent = "Last guess was too low!";
        } else {
            lowOrHi.textContent = "Last guess was too high!";
        }
    }

    guessesText.textContent = `Guesses: ${guesses}`;
    guessInput.value = "";
    guessInput.focus();
}

function displayResult(isWinner) {
    if (isWinner) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "green";
    } else {
        lastResult.textContent = `Game over. The correct number was ${randomNumber}.`;
        lastResult.style.backgroundColor = "red";
    }

    // Disable the input and submit button
    guessInput.disabled = true;
    guessSubmit.disabled = true;

    // Show the restart button
    restartButton.style.display = "block";
}

function restartGame() {
    guesses = 0;
    gameOver = false;
    randomNumber = generateRandomNumber();

    lastResult.textContent = "";
    lastResult.style.backgroundColor = "";
    lowOrHi.textContent = "";
    guessesText.textContent = "Guesses: 0";
    guessInput.value = "";
    guessInput.disabled = false;
    guessSubmit.disabled = false;

    // Hide the restart button
    restartButton.style.display = "none";

    // Focus on the input field
    guessInput.focus();
}

guessSubmit.addEventListener("click", checkGuess);
restartButton.addEventListener("click", restartGame);

// Make the Enter key trigger the "Submit Guess" button click
guessInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        guessSubmit.click();
    }
});
// ...

// Function to handle the spacebar key press
function handleSpacebarPress(event) {
    if (event.key === " ") {
        restartButton.click();
    }
}

// Add an event listener for the spacebar key press
document.addEventListener("keydown", handleSpacebarPress);

// ...

