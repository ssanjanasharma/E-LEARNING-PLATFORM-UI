// Helper function to safely add event listeners
function addListener(selector, event, handler) {
  const element = document.querySelector(selector);
  if (element) element.addEventListener(event, handler);
}

// Display a popup when clicking any 'Follow' button inside mentors list
document.querySelectorAll('.mentor button').forEach(btn => {
  btn.addEventListener('click', () => {
    alert("You are now following this mentor!");
  });
});

// Upgrade to Pro button interaction
addListener('.upgrade-btn', 'click', () => {
  alert("Redirecting you to the Pro subscription page!");
});

// Cache DOM elements
const showSignupBtn = document.getElementById('show-signup');
const showLoginBtn = document.getElementById('show-login');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard-main');
const authContainer = document.getElementById('auth-container');  // FIXED: changed from localStorage.getId to getElementById
const logoutBtn = document.getElementById('logout-btn');

// Function to toggle auth forms display
function toggleForms(showSignup) {
  if (showSignup) {
    showSignupBtn.classList.add('active');
    showLoginBtn.classList.remove('active');
    signupForm.style.display = 'flex';
    loginForm.style.display = 'none';
  } else {
    showSignupBtn.classList.remove('active');
    showLoginBtn.classList.add('active');
    signupForm.style.display = 'none';
    loginForm.style.display = 'flex';
  }
}

// Attach click handlers to toggle buttons
if (showSignupBtn && showLoginBtn) {
  showSignupBtn.onclick = () => toggleForms(true);
  showLoginBtn.onclick = () => toggleForms(false);
}

// Switch forms via text links inside forms (safe check for elements)
const toLoginLink = document.getElementById('to-login');
const toSignupLink = document.getElementById('to-signup');
if (toLoginLink) toLoginLink.onclick = () => toggleForms(false);
if (toSignupLink) toSignupLink.onclick = () => toggleForms(true);

// Simple localStorage-based user "database"
function saveUser(email, name, password) {
  localStorage.setItem('user__' + email, JSON.stringify({ name, email, password }));
}
function getUser(email) {
  const data = localStorage.getItem('user__' + email);
  return data ? JSON.parse(data) : null;
}

// Signup form submission handler
signupForm.onsubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const pass = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  const msg = document.getElementById('signup-msg');

  msg.textContent = '';

  // Basic validations
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = 'Invalid email format.';
    return;
  }
  if (pass.length < 5) {
    msg.textContent = 'Password should be at least 5 characters.';
    return;
  }
  if (pass !== confirm) {
    msg.textContent = 'Passwords do not match.';
    return;
  }
  if (getUser(email)) {
    msg.textContent = 'User already exists! Please login.';
    return;
  }

  saveUser(email, name, pass);
  localStorage.setItem('currentUser', email);
  showDashboard();
};

// Login form submission handler
loginForm.onsubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass = document.getElementById('login-password').value;
  const msg = document.getElementById('login-msg');

  msg.textContent = '';

  const user = getUser(email);
  if (!user) {
    msg.textContent = 'Account does not exist!';
    return;
  }
  if (user.password !== pass) {
    msg.textContent = 'Incorrect password!';
    return;
  }

  localStorage.setItem('currentUser', email);
  showDashboard();
};

// Show dashboard, hide auth container
function showDashboard() {
  if (authContainer && dashboard) {
    authContainer.style.display = 'none';
    dashboard.style.display = 'block';
  }
}

// Logout logic
if (logoutBtn) {
  logoutBtn.onclick = function () {
    localStorage.removeItem('currentUser');
    if (dashboard && authContainer) {
      dashboard.style.display = 'none';
      authContainer.style.display = 'block';
    }
    toggleForms(false); // Show login form on logout
  };
}

// Check authentication state on page load
window.onload = function () {
  const email = localStorage.getItem('currentUser');
  if (email && getUser(email)) {
    showDashboard();
  } else {
    if (authContainer && dashboard) {
      authContainer.style.display = 'block';
      dashboard.style.display = 'none';
    }
    toggleForms(true); // Start at signup as desired
  }
};
