const cardContainer = document.getElementById('card-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentPosition = 0;
const totalCards = 10;
const visibleCards = 5;
const cardWidth = 201; // 181px + 10px margin-left + 10px margin-right

// Generate 10 cards dynamically
const generateCards = (n) => {
  for (let i = 1; i <= n; i++) {
    const card = document.createElement("div");
    card.classList.add("card");

    // Create card-inner div
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    // Create card-front div
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.innerHTML = `
      <div class="CartButton">
        <img class="Ellipse1" src="https://via.placeholder.com/144x140" />
        <div class="Pinterest">PINTEREST ${i}</div>
        <div style="display:flex; justify-content: center;">
          <div style="display:flex;justify-content:flex-start;">
            <div class="Rectangle7">music</div>
            <div class="Rectangle7">pottery</div>
          </div>
        </div>
      </div>
    `;

    // Create card-back div
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.innerHTML = `<p>Back of Card ${i}</p>`;

    // Append front and back to card-inner
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);

    // Append card-inner to card
    card.appendChild(cardInner);

    // Append card to card-container
    cardContainer.appendChild(card);
  }
};

generateCards(10); // Generate 10 cards

// Move carousel to the right
nextBtn.addEventListener('click', () => {
  if (currentPosition < totalCards - visibleCards) {
    currentPosition++;
    cardContainer.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
  }
});

// Move carousel to the left
prevBtn.addEventListener('click', () => {
  if (currentPosition > 0) {
    currentPosition--;
    cardContainer.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
  }
});
