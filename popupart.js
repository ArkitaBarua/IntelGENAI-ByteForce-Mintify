const gallery = document.getElementById('gallery');

// Sample data arrays (you can replace them with real data)
const imageUrls = [
    'https://via.placeholder.com/300x200.png?text=Image+1',
    'https://via.placeholder.com/300x200.png?text=Image+2',
    'https://via.placeholder.com/300x200.png?text=Image+3',
    // Add more image URLs
];
const profileNames = ['Artist 1', 'Artist 2', 'Artist 3'];
const profileImages = [
    'https://via.placeholder.com/30.png?text=A1',
    'https://via.placeholder.com/30.png?text=A2',
    'https://via.placeholder.com/30.png?text=A3',
];
const likes = [120, 250, 80];
const views = [540, 800, 300];

// Function to generate gallery items
function generateGalleryItem(index, imageUrl, profileName, profileImage, likesCount, viewsCount) {
    const galleryItem = `
        <div class="gallery-item" data-index="${index}">
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

// Generate gallery items
for (let i = 0; i < imageUrls.length; i++) {
    gallery.innerHTML += generateGalleryItem(
        i,                          // Index
        imageUrls[i],                // Image URL
        profileNames[i],             // Profile Name
        profileImages[i],            // Profile Image
        likes[i],                    // Likes Count
        views[i]                     // Views Count
    );
}

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
        popupImage.src = imageUrls[index];
        imageTitle.textContent = `Artwork ${parseInt(index) + 1}`;
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
