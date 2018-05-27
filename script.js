window.onload = function() {
  var gameStart = document.getElementById('start');
  var gameScore = document.getElementById('score');
  var hiScore = document.getElementById('hiScore');
  var cardsClicked = 0;
  var prevPick = undefined;
  var clickLock = false;
  hiScore.innerText = localStorage.getItem('bestScore');
  // all three of these are spans at this point

  gameStart.addEventListener('click', function(event) {
    gameScore.innerText = 0;
    cardsClicked = 0;
    prevPick = undefined;

    // creating array of pic URLs
    var pics = [];
    for (var i = 0; i < 8; i++) {
      pics.push('pics/' + String(i) + '.jpg', 'pics/' + String(i) + '.jpg');
    }

    // shuffle the above array (found via Google)
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    shuffleArray(pics);

    // assigning/dealing cards
    var cardFronts = document.querySelectorAll('.cardFront');
    for (var i = 0; i < cardFronts.length; i++) {
      cardFronts[i].src = pics[i];
    }

    // creating "cardStates" array tracking images and flipped status of each card
    var cardStates = [];
    for (var i = 0; i < cardFronts.length; i++) {
      cardStates.push({ imgSrc: cardFronts[i].src, isFlipped: false });
    }

    var cardBacks = document.querySelectorAll('.cardBack');

    for (let i = 0; i < cardStates.length; i++) {
      cardStates[i].isFlipped = false;
      cardBacks[i].style.opacity = 1;
      console.log('flippy back');
    }

    console.log(cardBacks);
    for (let i = 0; i < cardBacks.length; i++) {
      cardBacks[i].addEventListener('click', function(event) {
        console.log(cardStates[i]);
        if (cardStates[i].isFlipped === true) {
          console.log('already flipped');
        } else {
          cardStates[i].isFlipped = true;
          cardBacks[i].style.opacity = 0;
          gameScore.innerText++;
          cardsClicked++;
        }
        if (cardsClicked === 1) {
          prevPick = i;
        } else if (cardsClicked === 2) {
          clickLock = true;
          if (cardStates[prevPick].imgSrc === cardStates[i].imgSrc) {
            cardsClicked = 0;
            prevPick = undefined;
          } else {
            cardsClicked = 0;

            setTimeout(function() {
              cardStates[prevPick].isFlipped = false;
              cardStates[i].isFlipped = false;
              cardBacks[prevPick].style.opacity = 1;
              prevPick = undefined;
              cardBacks[i].style.opacity = 1;
            }, 1000);
          }

          if (
            cardStates.every(function(obj) {
              return obj.isFlipped === true;
            })
          ) {
            if (!hiScore.innerText || gameScore.innerText < hiScore.innerText) {
              hiScore.innerText = gameScore.innerText;
              localStorage.setItem('bestScore', hiScore.innerText);
            }
          }
          // debug:
          //  I  have a "rapid clicks" problem
          //  on second game, weird bugs related to both "undefined" &
          //   things not flipping back over
          //
          // }
        }
      });
    }
  });
};
