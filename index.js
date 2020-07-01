// function generating random number in range of 0 to 100
const generateRandomNumber = () => Math.floor(Math.random() * 101);

// !! impure !!
const getPlayerGuess = () =>
  parseInt(document.getElementById("guess-txt").value);

// !! strictly pure !!
const justifyGuess = (targetNumber) => (guessNumber) => {
  return (R.cond ([
    [ R.flip (R.lte) (-10), 
      R.always ("Your guess is way too low compared to the target number!")
    ],
    [ R.allPass ([ R.flip (R.gt) (-10), R.flip (R.lte) (-5)]), 
      R.always ("Your guess is too low compared to the target number!")
    ],
    [ R.allPass ([ R.flip (R.gte) (-5), R.flip (R.lt) (0)]), 
      R.always ("Your guess is lower than expected!")
    ], 
    [ R.equals (0), 
      R.always ("Congratulations!! You guessed correctly!")
    ],
    [ R.allPass ([ R.flip (R.gt) (0), R.flip (R.lte) (5)]), 
      R.always ("Your guess is higher than expected!")
    ], 
    [ R.allPass ([ R.flip (R.gt) (5), R.flip (R.lte) (10)]), 
      R.always ("Your guess is too high compared to the target number!")
    ],
    [ R.flip (R.gte) (10), 
      R.always ("Your guess is way too high compared to the target number!")
    ]
  ])) (guessNumber - targetNumber); 
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