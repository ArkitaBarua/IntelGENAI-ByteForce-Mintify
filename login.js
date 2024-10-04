// Sample user data
const users = [
    { email: "user1@example.com", password: "password1" },
    { email: "user2@example.com", password: "password2" },
];
 
// Check if the user is already logged in
let loggedInUser = localStorage.getItem("loggedInUser");

const loginBtn = document.getElementById("loginBtn");
const loginPopup = document.getElementById("loginPopup");
const closePopup = document.getElementById("closePopup");
const signinBtn = document.getElementById("signinBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");
const profileSection = document.getElementById("profile");
const userProfile = document.getElementById("userProfile");
const logoutBtn = document.getElementById("logoutBtn");

// Display the login popup
loginBtn.addEventListener("click", () => {
    loginPopup.classList.remove("hidden");
});

// Close the login popup
closePopup.addEventListener("click", () => {
    loginPopup.classList.add("hidden");
});

// Sign in button event listener
signinBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        loggedInUser = user.email;
        localStorage.setItem("loggedInUser", loggedInUser); // Store logged in user
        displayProfile(user.email);
        loginPopup.classList.add("hidden");
    } else {
        errorMsg.textContent = "Incorrect email or password. Please try again.";
        errorMsg.classList.remove("hidden");
    }
});

// Logout button event listener
logoutBtn.addEventListener("click", () => {
    loggedInUser = null;
    localStorage.removeItem("loggedInUser");
    profileSection.classList.add("hidden");
});

// Display profile if already logged in
function displayProfile(email) {
    userProfile.textContent = `Logged in as: ${email}`;
    profileSection.classList.remove("hidden");
}

// Check if user is already logged in on page load
if (loggedInUser) {
    displayProfile(loggedInUser);
}
