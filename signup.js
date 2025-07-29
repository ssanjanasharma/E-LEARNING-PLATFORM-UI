const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirm-password');

const nameMsg = document.getElementById('name-msg');
const emailMsg = document.getElementById('email-msg');
const passwordMsg = document.getElementById('password-msg');
const confirmPasswordMsg = document.getElementById('confirm-password-msg');
const formMsg = document.getElementById('form-msg');

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

nameField.addEventListener('input', () => {
  if (nameField.value.trim().length < 2) {
    nameMsg.textContent = "Please enter your full name (at least 2 characters).";
  } else {
    nameMsg.textContent = "";
  }
});

emailField.addEventListener('input', () => {
  if (!emailField.value) {
    emailMsg.textContent = "";
  } else if (!validateEmail(emailField.value)) {
    emailMsg.textContent = "Please enter a valid email address.";
  } else {
    emailMsg.textContent = "";
  }
});

passwordField.addEventListener('input', () => {
  if (!passwordField.value) {
    passwordMsg.textContent = "";
  } else if (passwordField.value.length < 6) {
    passwordMsg.textContent = "Password must be at least 6 characters.";
  } else {
    passwordMsg.textContent = "";
  }
});

confirmPasswordField.addEventListener('input', () => {
  if (!confirmPasswordField.value) {
    confirmPasswordMsg.textContent = "";
  } else if (confirmPasswordField.value !== passwordField.value) {
    confirmPasswordMsg.textContent = "Passwords do not match.";
  } else {
    confirmPasswordMsg.textContent = "";
  }
});

document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  formMsg.textContent = '';
  formMsg.style.color = '';

  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const password = passwordField.value;
  const confirmPassword = confirmPasswordField.value;

  let valid = true;

  if (name.length < 2) {
    nameMsg.textContent = "Please enter your full name (at least 2 characters).";
    valid = false;
  }

  if (!validateEmail(email)) {
    emailMsg.textContent = "Please enter a valid email address.";
    valid = false;
  }

  if (password.length < 6) {
    passwordMsg.textContent = "Password must be at least 6 characters.";
    valid = false;
  }

  if (confirmPassword !== password) {
    confirmPasswordMsg.textContent = "Passwords do not match.";
    valid = false;
  }

  if (!valid) {
    formMsg.style.color = '#e03a4d';
    formMsg.textContent = 'Please fix the errors above.';
    return;
  }

  // Simulate a signup success (replace this with your real logic/API call)
  formMsg.style.color = '#18836a';
  formMsg.textContent = 'Sign up successful! Redirecting to login...';

  // Optionally: redirect to login.html after short delay
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1800);
});
