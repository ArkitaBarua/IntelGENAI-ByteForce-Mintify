
  // Initialize lists to store entered data
  const nftNames = [];
  const nftPrices = [];
  const nftDescriptions = [];

  // Search functionality
  const searchInput = document.querySelector('.search-input');
  const searchIcon = document.querySelector('.search-icon');

  searchIcon.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
      console.log('Searching for:', query);
      // You can replace this with a redirect or search handling logic
    } else {
      alert('Please enter a search term.');
    }
  });

  // Handle Enter key in search bar
  searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      searchIcon.click();
    }
  });

  // NFT name entry
  const nftNameInput = document.querySelector('.step1 .input-box');
  const nftNameButton = document.querySelector('.step1 .enter-button');

  nftNameButton.addEventListener('click', () => {
    const nftName = nftNameInput.value;
    if (nftName) {
      nftNames.push(nftName);  // Add name to list
      console.log('NFT Name entered:', nftName);
      alert(`NFT Name "${nftName}" saved!`);
      nftNameInput.value = '';  // Clear input after saving
    } else {
      alert('Please enter the NFT name.');
    }
  });

  // Price entry
  const priceInput = document.querySelector('.step2 .input-box');
  const priceButton = document.querySelector('.step2 .enter-button');

  priceButton.addEventListener('click', () => {
    const price = priceInput.value;
    if (price && !isNaN(price)) {
      nftPrices.push(price);  // Add price to list
      console.log('Price entered:', price);
      alert(`Price "${price}" saved!`);
      priceInput.value = '';  // Clear input after saving
    } else {
      alert('Please enter a valid price.');
    }
  });

  // Description entry
  const descriptionInput = document.querySelector('.step3 .input-box');
  const descriptionButton = document.querySelector('.step3 .enter-button');

  descriptionButton.addEventListener('click', () => {
    const description = descriptionInput.value;
    if (description) {
      nftDescriptions.push(description);  // Add description to list
      console.log('Description entered:', description);
      alert('Description saved!');
      descriptionInput.value = '';  // Clear input after saving
    } else {
      alert('Please enter a description.');
    }
  });

  // File upload
  const fileInput = document.querySelector('#upload-file');

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
      alert(`File "${file.name}" uploaded successfully!`);
    } else {
      alert('Please upload a file.');
    }
  });

  // Garden button functionality
  const myGardenButton = document.querySelector('.my-garden-button');
  myGardenButton.addEventListener('click', () => {
    alert('Redirecting to your garden!');
    // Example redirect: location.href = 'garden.html';
  });

  // Login button functionality
  const loginButton = document.querySelector('.login-button');
  loginButton.addEventListener('click', () => {
    alert('Redirecting to login page.');
    // Example redirect: location.href = 'login.html';
  });

