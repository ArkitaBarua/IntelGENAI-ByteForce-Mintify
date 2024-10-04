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

const users = [
    { username: 'user', password: 'password1', profilePic: 'download.png' },
    { username: 'user2', password: 'password2', profilePic: 'profile2.jpg' }
];

// Check if a user is already logged in
const loggedInUser = localStorage.getItem('loggedInUser');

// Function to update navbar to show Profile button if user is logged in
// Update the navbar to show Profile button if user is logged in
function updateNavbarForLoggedInUser() {
    const loginButton = document.getElementById('loginBtn');
    const profileButton = document.getElementById('profileBtn');
    const profilePic = document.getElementById('profilePic');

    if (loggedInUser) {
        // If the user is logged in, remove the login button
        loginButton.style.display = 'none'; 
        const userData = JSON.parse(loggedInUser); // Get user data from local storage

        loginButton.style.display = 'none';
        profileButton.style.display = 'block';
        profilePic.src = userData.profilePic; // Update profile picture

        // Append the image to the profile button
        //profileButton.appendChild(profileImg);

        profileButton.onclick = function() {
            alert('Welcome to your profile, ' + userData.username);
            // Here you can redirect to the profile page
        };
    } else {
        // Show login button if no user is logged in
        loginButton.style.display = 'block';
        profileButton.style.display = 'none';

        loginButton.onclick = function() {
            document.getElementById('loginPopup').style.display = 'flex';
        };
    }
}
// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    updateNavbarForLoggedInUser();
});

// Close popup
document.getElementById('closePopup').onclick = function() {
    document.getElementById('loginPopup').style.display = 'none';
};


document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if entered credentials match any user in the sample data
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Login successful
        alert('Login successful!');
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Save full user data
        document.getElementById('loginPopup').style.display = 'none'; // Close popup
        updateNavbarForLoggedInUser(); // Update the navbar to show Profile button

        // Reload the page after successful login
        location.reload();
    } else {
        // Login failed
        alert('Invalid username or password. Please try again.');
        document.getElementById('username').value = ''; // Clear input fields
        document.getElementById('password').value = '';
    }
};


// Logout functionality
function logout() {
    localStorage.removeItem('loggedInUser'); // Clear the logged-in user from local storage
    updateNavbarForLoggedInUser(); // Reset the navbar to show Login button
}

// You can call the logout() function when needed, for example, from the Profile page







// Generate 10 cards dynamically
// Generate cards function for both carousels
// Function to generate cards dynamically with different content
const generateCardsForContainer = (containerId, n, data) => {
    const cardContainer = document.getElementById(containerId);

    for (let i = 0; i < n; i++) {
        const cardData = data[i]; // Extract card data for each iteration

        const card = document.createElement("div");
        card.classList.add("card");

        // Create card-inner div
        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        // Create card-front div
        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");

        // Add dynamic content for image, heading, and rectangles
        cardFront.innerHTML = `
            <a href="${cardData.url}" target="_blank" class="card-link">
              <div class="CartButton">
                <img class="Ellipse1" src="${cardData.image}" alt="Card Image"/>
                <div class="Pinterest" style="display:flex; justify-content: center;">${cardData.heading}</div>
                <div style="display:flex; justify-content: center;">
                  <div style="display:flex;justify-content:flex-start;">
                    <div class="Rectangle7">${cardData.rectangles[0]}</div>
                    <div class="Rectangle7">${cardData.rectangles[1]}</div>
                  </div>
                </div>
              </div>
            </a>
        `;

        // Append front to card-inner
        cardInner.appendChild(cardFront);

        // Append card-inner to card
        card.appendChild(cardInner);

        // Append card to the appropriate container
        cardContainer.appendChild(card);
    }
};

// Example data array with dynamic content
const cardData = [
    {
        image: 'pinicon.jpg',
        heading: 'Pinterest',
        rectangles: ['music', 'pottery'],
        url: 'https://www.pinterest.com',
    },
    {
        image: 'instaicon.jpg',
        heading: 'Instagram',
        rectangles: ['art', 'design'],
        url: 'https://www.instagram.com',
    },
    {
        image: 'p1.png',
        heading: 'Facebook',
        rectangles: ['social', 'network'],
        url: 'https://www.facebook.com',
    },
    {
        image: 'p2.png',
        heading: 'Spotify',
        rectangles: ['music', 'streaming'],
        url: 'https://www.spotify.com',
    },
    {
        image: 'sp.png',
        heading: 'Spotify',
        rectangles: ['music', 'streaming'],
        url: 'https://www.spotify.com',
    },
    {
        image: 'https://via.placeholder.com/144x140?text=Image4',
        heading: 'Spotify',
        rectangles: ['music', 'streaming'],
        url: 'https://www.spotify.com',
    },
    {
        image: 'https://via.placeholder.com/144x140?text=Image4',
        heading: 'Spotify',
        rectangles: ['music', 'streaming'],
        url: 'https://www.spotify.com',
    },
    {
        image: 'https://via.placeholder.com/144x140?text=Image4',
        heading: 'Spotify',
        rectangles: ['music', 'streaming'],
        url: 'https://www.spotify.com',
    },
    // Add more card data as needed
];

// Generate 4 cards in the container with the ID 'card-container-indie'
generateCardsForContainer('card-container-indie', cardData.length, cardData);
generateCardsForContainer('card-container-org', cardData.length, cardData);

  
  // Generate cards for both carousels
  //generateCardsForContainer('card-container-org', 10);   // Organization carousel
  //generateCardsForContainer('card-container-indie', 10); // Indie artists carousel
  
  // Common variables for carousel
  const totalCards = 10;
  const visibleCards = 5;
  const cardWidth = 201; // 181px + 10px margin-left + 10px margin-right
  
  // Slide organization carousel
  let currentPositionOrg = 0;
  const cardContainerOrg = document.getElementById('card-container-org');
  const prevBtnOrg = document.getElementById('prev-btn-org');
  const nextBtnOrg = document.getElementById('next-btn-org');
  
  // Move to the right
  nextBtnOrg.addEventListener('click', () => {
    if (currentPositionOrg < totalCards - visibleCards) {
      currentPositionOrg++;
      cardContainerOrg.style.transform = `translateX(-${currentPositionOrg * cardWidth}px)`;
    }
  });
  
  // Move to the left
  prevBtnOrg.addEventListener('click', () => {
    if (currentPositionOrg > 0) {
      currentPositionOrg--;
      cardContainerOrg.style.transform = `translateX(-${currentPositionOrg * cardWidth}px)`;
    }
  });
  
  // Slide indie artists carousel
  let currentPositionIndie = 0;
  const cardContainerIndie = document.getElementById('card-container-indie');
  const prevBtnIndie = document.getElementById('prev-btn-indie');
  const nextBtnIndie = document.getElementById('next-btn-indie');
  
  // Move to the right
  nextBtnIndie.addEventListener('click', () => {
    if (currentPositionIndie < totalCards - visibleCards) {
      currentPositionIndie++;
      cardContainerIndie.style.transform = `translateX(-${currentPositionIndie * cardWidth}px)`;
    }
  });
  
  // Move to the left
  prevBtnIndie.addEventListener('click', () => {
    if (currentPositionIndie > 0) {
      currentPositionIndie--;
      cardContainerIndie.style.transform = `translateX(-${currentPositionIndie * cardWidth}px)`;
    }
  });




  
  const gallery = document.getElementById('gallery');

  // Array of image URLs
  const imageUrls = [
      'art/artwork1.jpg',
      'art/artwork2.jpg',
      'art/artwork3.jpg',
      'art/artwork4.jpg',
      'art/artwork5.jpg',
      'art/artwork6.png',
      'art/artwork7.webp',
      'art/artwork8.webp',
      'art/artwork1.jpg',
      'art/artwork2.jpg',
      'art/artwork3.jpg',
      'art/artwork4.jpg',
      'art/artwork5.jpg',
      'art/artwork6.png',
      'art/artwork7.webp',
      'art/artwork8.webp',
      
  ];
// Array of profile names
const profileNames = [
    'Dusan Sol', 'Alicia Keys', 'John Doe', 'Jane Smith',
    'Emma Brown', 'Liam Turner', 'Sophia Lee', 'Mason Clark',
    'Ella Stone', 'Lucas Scott', 'Olivia Adams', 'Jacob Wood',
    'Ava Thompson', 'William Green', 'Isabella Moore', 'James White'
];

// Array of profile image URLs
const profileImages = [
    'https://via.placeholder.com/30?text=DS', 'https://via.placeholder.com/30?text=AK', 
    'https://via.placeholder.com/30?text=JD', 'https://via.placeholder.com/30?text=JS',
    'https://via.placeholder.com/30?text=EB', 'https://via.placeholder.com/30?text=LT', 
    'https://via.placeholder.com/30?text=SL', 'https://via.placeholder.com/30?text=MC',
    'https://via.placeholder.com/30?text=ES', 'https://via.placeholder.com/30?text=LS', 
    'https://via.placeholder.com/30?text=OA', 'https://via.placeholder.com/30?text=JW',
    'https://via.placeholder.com/30?text=AT', 'https://via.placeholder.com/30?text=WG', 
    'https://via.placeholder.com/30?text=IM', 'https://via.placeholder.com/30?text=JW'
];

// Array of number of likes
const likes = [
    28, 45, 67, 33, 89, 25, 75, 110, 53, 90, 64, 77, 112, 95, 84, 102
];

// Array of number of views
const views = [
    '2.4k', '3.1k', '1.8k', '4.5k', '5.2k', '6.7k', '3.6k', '4.9k', 
    '5.5k', '2.9k', '1.6k', '2.7k', '3.4k', '4.1k', '5.9k', '6.2k'
];
function generateGalleryItem(index, imageUrl, profileName, profileImage, likesCount, viewsCount) {
    const galleryItem = `
        <div class="gallery-item" data-index="${index - 1}">
            <div class="gallery-image">
                <img src="${imageUrl}" alt="Artwork ${index}">
                <div class="hover-icons">
                    <button class="like-btn">❤️</button>
                    <button class="bookmark-btn">🔖</button>
                </div>
            </div>
            <div class="gallery-info">
                <div class="artist-info">
                    <img class="artist-avatar" src="${profileImage}" alt="Avatar ${profileName}">
                    <span class="artist-name">${profileName}</span>
                </div>
                <div class="stats">
                    <span>❤️ ${likesCount}</span>
                    <span>👁 ${viewsCount}</span>
                </div>
            </div>
        </div>
    `;
    return galleryItem;
}


// Generate 16 items (4x4 grid) with different images, profile names, likes, and views
for (let i = 0; i < imageUrls.length; i++) {
    gallery.innerHTML += generateGalleryItem(
        i + 1,                      // Index
        imageUrls[i],                // Image URL
        profileNames[i],             // Profile Name
        profileImages[i],            // Profile Image
        likes[i],                    // Likes Count
        views[i]                     // Views Count
    );
}

//pop up artwork
// Get references for popup elements
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popupImage');
const imageTitle = document.getElementById('imageTitle');
const popupInfo = document.getElementById('popupInfo');
const action1 = document.getElementById('action1');
const action2 = document.getElementById('action2');


// Event listener for gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const index = this.getAttribute('data-index');

        // Update popup content with the clicked item's image and info
        popupImage.src = imageUrls[index];  // Use the correct image
        imageTitle.textContent = `Artwork ${parseInt(index) + 1}`;  // Display the title
        popupInfo.textContent = `This is the detailed information for Artwork ${parseInt(index) + 1}.`;

        // Update actions (example purposes)
        action1.textContent = `Explore Artwork ${parseInt(index) + 1}`;
        action2.textContent = `Learn More About Artwork ${parseInt(index) + 1}`;

        // Show the popup
        popup.classList.add('show');
    });
});

// Close button event listener
document.getElementById('closeButton').addEventListener('click', function() {
    popup.classList.remove('show');
});



// Function to update the health bar
function updateHealth(currentHealth, totalHealth) {
    const healthBar = document.getElementById('healthBar');
    const healthIndicator = document.getElementById('healthIndicator');
    const healthPercentageText = document.getElementById('healthPercentage');
  
    // Calculate the percentage of health left
    const healthPercentage = (currentHealth / totalHealth) * 100;
  
    // Set the width of the health bar dynamically
    healthBar.style.width = healthPercentage + '%';
  
    // Update the health percentage text
    healthPercentageText.textContent = Math.round(healthPercentage) + '%';
  
    // Move the health indicator arrow to the correct position
    healthIndicator.style.left = `calc(${healthPercentage}% - 15px)`;
  
    // If health is below 25%, make the bar red
    if (healthPercentage <= 25) {
      healthBar.classList.add('low-health');  // Apply red background
    } else {
      healthBar.classList.remove('low-health');  // Keep it green
    }
  }
  
  document.getElementById('myGardenBtn').addEventListener('click', function() {
    updateHealth(40, 100);  // Example of updating health to 40/100 when clicked
    // Trigger the function to generate cards with dynamic attributes
  generateCards(gcardData.length, gcardData);
});
  
  
  
  
  
  
  
  
  
  
  // Function to update the health bar inside the card
  function updateCardHealthBar(cardId, healthPercentage) {
    const healthBar = document.getElementById('healthBar-' + cardId);
    const healthText = document.getElementById('healthPercentage-' + cardId);
  
    // Set the width of the health bar based on the health percentage
    healthBar.style.width = healthPercentage + '%';
    //healthText.textContent = Math.round(healthPercentage) + '%';
  
    // If health is below 25%, change the bar to red
    if (healthPercentage <= 25) {
      healthBar.classList.add('low-health');
    } else {
      healthBar.classList.remove('low-health');
    }
  }
  
  // Function to generate cards dynamically
  function generateCards(numCards, data) {
    const cardContainer = document.getElementById("cardContainer");
  
    // Clear previous cards (optional, if you want to reset before generating new cards)
    cardContainer.innerHTML = '';
  
    // Ensure numCards does not exceed available data length
    const cardsToGenerate = Math.min(numCards, data.length);
  
    // Generate the specified number of cards
    for (let i = 0; i < cardsToGenerate; i++) {
      const gcardData = data[i]; // Extract card data for each iteration
  
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
              <img class="Ellipse1" src="${gcardData.image}" alt="Card Image"/>
              <div class="Pinterest" style="display:flex; justify-content: center;">${gcardData.heading}</div>
                </div>
              </div>
            </div>
          </a>
      `;
  
      // Create card-back div with dynamic attributes and health bar
      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");
      cardBack.innerHTML = `
        <div class="card-back-content">
          <p><strong>Plant Name:</strong> ${gcardData.plantName || 'Unknown'}</p>
          <p><strong>Sustenance Factor:</strong> ${gcardData.sustenanceFactor || 'N/A'}</p>
          <p><strong>Regeneration Factor:</strong> ${gcardData.regenerationFactor || 'N/A'}</p>
  
          <!-- Health Bar for each card -->
          <p><strong>Carbon Credit (CC):</strong> ${gcardData.cc || 'N/A'}</p>
          <p><strong>Health:</strong></p>
          <div class="card-health-bar-container">
            <div class="card-health-bar" id="healthBar-${i}"></div>
            
          </div>
  
        </div>
      `;
  
      // Append front and back to the card-inner
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
  
      // Append the card-inner to the card
      card.appendChild(cardInner);
  
      // Append the new card to the container
      cardContainer.appendChild(card);
  
      // Initialize the health bar for this card
      updateCardHealthBar(i, gcardData.health || 0);
    }
  }
  
  // Example card data array with dynamic attributes
  const gcardData = [
    {
      image: 'plant1.jpg',
      heading: 'Pinterest',
      plantName: 'Fern',
      sustenanceFactor: 0.43,
      regenerationFactor: 0.62,
      health: 75,  // Health percentage for this card
      cc: 20,
    },
    {
      image: 'plant2.jpg',
      heading: 'Instagram',
      plantName: 'Cactus',
      sustenanceFactor: 0.12,
      regenerationFactor: 0.23,
      health: 85,  // Health percentage for this card
      cc: 30,
    },
    // Add more card data with attributes as needed
  ];
  
  
  