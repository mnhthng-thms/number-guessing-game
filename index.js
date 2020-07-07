/* generateRandomNumber :: Void -> Number 
   @TODO: function generating random number in range of 0 to 100 
*/
const generateRandomNumber = () => Math.floor(Math.random() * 101);

/* getPlayerGuess :: Void -> Number
   @TODO: extract value currently in the textbox 
*/
const getPlayerGuess = () => {
  const guessTxt = document.getElementById("guess-txt"); 
  const validatedInput = sanitise(guessTxt.value);
  
  // update the textbox with the sanitised input
  guessTxt.value = validatedInput;

  return validatedInput;
}

/* justifyGuess :: Number -> Number -> String 
   @TODO: compare the target number with the number guessed by user
          & return a message to user
*/
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

/* displayMessage :: String -> Void 
   @TODO: update message container based on the passed-in message string 
*/
const displayMessage = (messageString) => {
  const messageDom = document.querySelector("div#message");

  messageDom.innerHTML = messageString;

  if (messageString === "Congratulations!! You guessed correctly!") {
    // change background colour of the container to green
    messageDom.className = "alert alert-success";
  } else {
    // change background colour of the container to yellow
    messageDom.className = "alert alert-danger";
  }
};

/* updateGuessCounter :: Void -> Void 
   @TODO: perform mutations around inner HTML of "div#guess-counter>span#num-guess"
*/
const updateGuessCounter = () => {
  // extract the number of guesses left
  let guessesLeft = parseInt(
    document.getElementById("num-guess").innerHTML
  );

  if (guessesLeft <= 1) {
    // stop counting
    document.getElementById("guess-counter").innerHTML = 
      `The game ends here! The target number is <b>${targetNumber}</b>!`;

    // this prospect function call will generate a closure around `targetNumber`;
  } 
  else {
    //carry on counting
    document.getElementById("num-guess").innerHTML = guessesLeft - 1;
  }
};

/*   -*-LET THE GAME BEGIN-*-   */

const targetNumber = generateRandomNumber();

document.getElementById("guess-btn").addEventListener("click", function (e) {
    updateGuessCounter();

    const message = justifyGuess(targetNumber)(getPlayerGuess());
    displayMessage(message);

    e.preventDefault();
});