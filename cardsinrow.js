const cardContainer = document.getElementById('card-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Generate 10 cards dynamically
const generateCards = (n) => {
  for (let i = 1; i <= n; i++) {
    const cardHTML = `
      <div class="card">
        <div class="CartButton">
          <img class="Ellipse1" src="https://via.placeholder.com/144x140" alt="Image ${i}">
          <div class="Pinterest">PINTEREST ${i}</div>
          <div style="display:flex; justify-content: center">
            <div style="display:flex; justify-content:flex-start;">
              <div class="Rectangle7">music</div>
              <div class="Rectangle7">pottery</div>
            </div>
          </div>
        </div>
      </div>
    `;
    cardContainer.innerHTML += cardHTML;
  }
};

generateCards(10); // Generate 10 cards

let currentPosition = 0;
const totalCards = 10;
const visibleCards = 5;
const cardWidth = 191; // 181px + 10px margin-right

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
