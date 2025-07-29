const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const form = document.getElementById('login-form');
const emailMsg = document.getElementById('email-msg');
const passwordMsg = document.getElementById('password-msg');
const formMsg = document.getElementById('form-msg');

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

emailField.addEventListener('input', function() {
  if (!emailField.value) {
    emailMsg.textContent = '';
  } else if (!validateEmail(emailField.value)) {
    emailMsg.textContent = "Please enter a valid email address.";
  } else {
    emailMsg.textContent = '';
  }
});

passwordField.addEventListener('input', function() {
  if (!passwordField.value) {
    passwordMsg.textContent = '';
  } else if (passwordField.value.length < 6) {
    passwordMsg.textContent = "Password must be at least 6 characters.";
  } else {
    passwordMsg.textContent = '';
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  formMsg.textContent = '';
  
  // Validate fields
  let valid = true;
  if (!validateEmail(emailField.value)) {
    emailMsg.textContent = "Please enter a valid email address.";
    valid = false;
  }
  if (passwordField.value.length < 6) {
    passwordMsg.textContent = "Password must be at least 6 characters.";
    valid = false;
  }

  if (valid) {
    // Simulate successful login (replace this with your real logic)
    formMsg.style.color = "#18836a";
    formMsg.textContent = "Login successful! (Demo only)";
    // Optionally redirect with:
    // window.location.href = "dashboard.html";
    form.reset();
    setTimeout(() => { formMsg.textContent = ""; }, 2400);
  } else {
    formMsg.style.color = "#e03a4d";
    formMsg.textContent = "Please fix errors above.";
  }
});
