let currentPosition = 0;

function moveRight() {
  const cardsRow = document.getElementById("cardsRow");
  if (currentPosition > -100) { // Can move right only up to -100% (2nd set of 5 cards)
    currentPosition -= 100; // Move left by 100%
    cardsRow.style.transform = `translateX(${currentPosition}%)`;
  }
}

function moveLeft() {
  const cardsRow = document.getElementById("cardsRow");
  if (currentPosition < 0) { // Can move left only to the start (0%)
    currentPosition += 100; // Move right by 100%
    cardsRow.style.transform = `translateX(${currentPosition}%)`;
  }
}
