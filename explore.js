
    const gallery = document.getElementById('gallery');

    // Array of image URLs
    const imageUrls = [
        'artwork1.jpg',
        'artwork2.jpg',
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
        'https://example.com/image5.jpg',
        'https://example.com/image6.jpg',
        'https://example.com/image7.jpg',
        'https://example.com/image8.jpg',
        'https://example.com/image9.jpg',
        'https://example.com/image10.jpg',
        'https://example.com/image11.jpg',
        'https://example.com/image12.jpg',
        'https://example.com/image13.jpg',
        'https://example.com/image14.jpg',
        'https://example.com/image15.jpg',
        'https://example.com/image16.jpg',
    ];

    function generateGalleryItem(index, imageUrl) {
        const galleryItem = `
            <div class="gallery-item">
                <div class="gallery-image">
                    <img src="${imageUrl}" alt="Artwork ${index}">
                    <div class="hover-icons">
                        <button class="like-btn">❤️</button>
                        <button class="bookmark-btn">🔖</button>
                    </div>
                </div>
                <div class="gallery-info">
                    <div class="artist-info">
                        <img class="artist-avatar" src="https://via.placeholder.com/30" alt="Avatar ${index}">
                        <span class="artist-name">Dusan Sol</span>
                    </div>
                    <div class="stats">
                        <span>❤️ 28</span>
                        <span>👁 2.4k</span>
                    </div>
                </div>
            </div>
        `;
        return galleryItem;
    }

    // Generate 16 items (4x4 grid) with different images
    for (let i = 0; i < imageUrls.length; i++) {
        gallery.innerHTML += generateGalleryItem(i + 1, imageUrls[i]);
    }

