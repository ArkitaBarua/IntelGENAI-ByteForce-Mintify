// Scroll left function
function scrollLeft(carouselId) {
    const carousel = document.getElementById(carouselId);
    carousel.scrollBy({
      left: -300, // Scroll left by 300px
      behavior: 'smooth',
    });
  }
  
  // Scroll right function
  function scrollRight(carouselId) {
    const carousel = document.getElementById(carouselId);
    carousel.scrollBy({
      left: 300, // Scroll right by 300px
      behavior: 'smooth',
    });
  }
  