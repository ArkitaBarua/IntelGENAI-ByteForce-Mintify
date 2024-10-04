document.getElementById('loginBtn').onclick = function() {
    document.getElementById('loginPopup').style.display = 'flex';
}

document.getElementById('closePopup').onclick = function() {
    document.getElementById('loginPopup').style.display = 'none';
}

document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example check for username and password
    if (username === 'user' && password === 'pass') {
        alert('Login successful!');
        // You can redirect or show user profile here
    } else {
        alert('Invalid username or password. Please try again.');
        // Clear input fields
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
}
