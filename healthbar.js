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
  
  // Example call to initialize health bar
  // Set health to 70% of total
  updateHealth(20, 100);
  