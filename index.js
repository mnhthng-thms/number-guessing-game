// function generating random number in range of 0 to 100
const generateRandomNumber = () => Math.floor(Math.random() * 101);

// !! impure !!
const getPlayerGuess = () =>
  parseInt(document.getElementById("guess-txt").value);

// !! strictly pure !!
const justifyGuess = (targetNumber) => (guessNumber) => {
  const diff = guessNumber - targetNumber;

  if (diff > 0) {
    if (diff <= 5) return "Your guess is higher than expected!";
    if (diff > 5 && diff <= 10)
      return "Your guess is too high compared to the target number!";
    return "Your guess is way too high compared to the target number!";
  }
  if (diff < 0) {
    if (diff >= -5) return "Your guess is lower than expected!";
    if (diff >= -10 && diff < -5)
      return "Your guess is too low compared to the target number!";
    return "Your guess is way too low compared to the target number!";
  }

  return "Congratulations!! You guessed correctly!";
};

// update message container based on the passed-in message string
const displayMessage = (messageString) => {
  const messageDom = document.querySelector("div#message");

  messageDom.innerHTML = messageString;
  if (messageString === "Congratulations!! You guessed correctly!") {
    messageDom.className = "alert alert-success";
  } else {
    messageDom.className = "alert alert-danger";
  }
};

// !! totally impure !!
const updateGuessCounter = () => {
  let guessesLeft = parseInt(
    document.getElementById("num-guess").innerHTML
  );
  if (guessesLeft <= 1) {
    document.getElementById(
      "guess-counter"
    ).innerHTML = `The game ends here! The target number is <b>${targetNumber}</b>!`;

    // this prospect function call will generate a closure around `targetNumber`;
  } else {
    document.getElementById("num-guess").innerHTML = guessesLeft - 1;
  }
};

const targetNumber = generateRandomNumber();

document
  .getElementById("guess-btn")
  .addEventListener("click", function (e) {
    updateGuessCounter();

    const message = justifyGuess(targetNumber)(getPlayerGuess());
    displayMessage(message);
    e.preventDefault();
  });