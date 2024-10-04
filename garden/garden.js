const cardsData = [
    { image: 'gardenbg.jpg', name: 'Image 1', info: 'Information about Image 1' },
    { image: 'image2.jpg', name: 'Image 2', info: 'Information about Image 2' },
    { image: 'image3.jpg', name: 'Image 3', info: 'Information about Image 3' },
    { image: 'image4.jpg', name: 'Image 4', info: 'Information about Image 4' },
    { image: 'image5.jpg', name: 'Image 5', info: 'Information about Image 5' },
    { image: 'image6.jpg', name: 'Image 6', info: 'Information about Image 6' },
    { image: 'image7.jpg', name: 'Image 7', info: 'Information about Image 7' },
    { image: 'image8.jpg', name: 'Image 8', info: 'Information about Image 8' },
    { image: 'image9.jpg', name: 'Image 9', info: 'Information about Image 9' },
    { image: 'image10.jpg', name: 'Image 10', info: 'Information about Image 10' },
    { image: 'image11.jpg', name: 'Image 11', info: 'Information about Image 11' },
    { image: 'image12.jpg', name: 'Image 12', info: 'Information about Image 12' },
    { image: 'image13.jpg', name: 'Image 13', info: 'Information about Image 13' },
    { image: 'image14.jpg', name: 'Image 14', info: 'Information about Image 14' },
    { image: 'image15.jpg', name: 'Image 15', info: 'Information about Image 15' },
    { image: 'image16.jpg', name: 'Image 16', info: 'Information about Image 16' },
    { image: 'image17.jpg', name: 'Image 17', info: 'Information about Image 17' },
    { image: 'image18.jpg', name: 'Image 18', info: 'Information about Image 18' },
    { image: 'image19.jpg', name: 'Image 19', info: 'Information about Image 19' },
    { image: 'image20.jpg', name: 'Image 20', info: 'Information about Image 20' },
    { image: 'image21.jpg', name: 'Image 21', info: 'Information about Image 21' },
    { image: 'image22.jpg', name: 'Image 22', info: 'Information about Image 22' },
    { image: 'image23.jpg', name: 'Image 23', info: 'Information about Image 23' },
    { image: 'image24.jpg', name: 'Image 24', info: 'Information about Image 24' },
    { image: 'image25.jpg', name: 'Image 25', info: 'Information about Image 25' }
  ];
  
  const cardGrid = document.querySelector('.card-grid');
  
  // Function to generate card HTML
  function createCard(card) {
    return `
      <div class="card">
        <div class="card-inner">
          <div class="card-front">
            <img src="${card.image}" alt="${card.name}">
            <h3>${card.name}</h3>
          </div>
          <div class="card-back">
            <p>${card.info}</p>
          </div>
        </div>
      </div>
    `;
  }
  
  // Insert all cards into the grid
  cardsData.forEach(card => {
    cardGrid.innerHTML += createCard(card);
  });
  