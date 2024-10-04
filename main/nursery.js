
  
  function generateCards(numCards, data) {
    const cardContainer = document.getElementById("cardContainer");
  
    // Clear previous cards
    cardContainer.innerHTML = '';
  
    // Ensure numCards does not exceed available data length
    const cardsToGenerate = Math.min(numCards, data.length);
  
    // Generate the specified number of cards
    for (let i = 0; i < cardsToGenerate; i++) {
      const cardData = data[i];
  
      // Create a new card div
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
              <img class="Ellipse1" src="${cardData.image}" alt="Card Image" style="width: 100%;"/>
              <div class="Pinterest" style="display:flex; justify-content: center;">${cardData.heading}</div>
          </div>
      `;
  
      // Create card-back div with dynamic attributes and health bar
      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");
      cardBack.innerHTML = `
        <div class="card-back-content">
          <p><strong>Plant Name:</strong> ${cardData.plantName || 'Unknown'}</p>
          <p><strong>Sustenance Factor:</strong> ${cardData.sustenanceFactor || 'N/A'}</p>
          <p><strong>Regeneration Factor:</strong> ${cardData.regenerationFactor || 'N/A'}</p>
  
          <!-- Health Bar for each card -->
          <p><strong>Carbon Credit (CC):</strong> ${cardData.cc || 'N/A'}</p>
        </div>
      `;
  
      // Append front and back to the card-inner
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
  
      // Append the card-inner to the card
      card.appendChild(cardInner);
  
      // Append the new card to the container
      cardContainer.appendChild(card);
  
    }
  }
  
  
  // Example card data array with dynamic attributes
  const cardData = [
    {
      image: 'plant1.jpg',
      heading: 'Bright',
      plantName: 'Fern',
      sustenanceFactor: 0.67,
      regenerationFactor: 0.87,
      health: 75,  // Health percentage for this card
      cc: 20,
    },
    {
      image: 'plant2.jpg',
      heading: 'Enlighten',
      plantName: 'Cactus',
      sustenanceFactor: 0.86,
      regenerationFactor: 0.65,
      health: 55,  // Health percentage for this card
      cc: 30,
    },
    {
      image: 'plant3.webp',
      heading: 'Dream',
      plantName: 'Cactus',
      sustenanceFactor: 0.12,
      regenerationFactor: 0.21,
      health: 15,  // Health percentage for this card
      cc: 30,
    },
    {
        image: 'plant1.jpg',
        heading: 'Bright',
        plantName: 'Fern',
        sustenanceFactor: 0.67,
        regenerationFactor: 0.87,
        health: 75,  // Health percentage for this card
        cc: 20,
      },
      {
        image: 'plant2.jpg',
        heading: 'Enlighten',
        plantName: 'Cactus',
        sustenanceFactor: 0.86,
        regenerationFactor: 0.65,
        health: 55,  // Health percentage for this card
        cc: 30,
      },
      {
        image: 'plant3.webp',
        heading: 'Dream',
        plantName: 'Cactus',
        sustenanceFactor: 0.12,
        regenerationFactor: 0.21,
        health: 15,  // Health percentage for this card
        cc: 30,
      }
    // Add more card data with attributes as needed
  ];
  
  // Trigger the function to generate cards with dynamic attributes
  generateCards(cardData.length, cardData);
  