const profilePicInput = document.getElementById('profile-pic-upload');
const profilePicImg = document.getElementById('profile-pic');
const settingsForm = document.getElementById('settings-form');
const formMsg = document.getElementById('form-msg');

profilePicInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Preview uploaded image
  const reader = new FileReader();
  reader.onload = function(e) {
    profilePicImg.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

// Helper validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Helper validate phone number (simple pattern)
function validatePhone(phone) {
  return /^\+?[\d\s\-]{7,15}$/.test(phone);
}

settingsForm.addEventListener('submit', function(e) {
  e.preventDefault();
  formMsg.textContent = '';
  formMsg.className = 'form-message';

  const name = this.name.value.trim();
  const phone = this.phone.value.trim();
  const email = this.email.value.trim();
  const password = this.password.value;
  const confirmPassword = this['confirm-password'].value;

  if (!name) {
    formMsg.textContent = 'Please enter your name.';
    formMsg.classList.add('error');
    return;
  }
  if (phone && !validatePhone(phone)) {
    formMsg.textContent = 'Invalid phone number format.';
    formMsg.classList.add('error');
    return;
  }
  if (!email || !validateEmail(email)) {
    formMsg.textContent = 'Please enter a valid email.';
    formMsg.classList.add('error');
    return;
  }
  if (password || confirmPassword) {
    if (password.length < 6) {
      formMsg.textContent = 'Password should be at least 6 characters.';
      formMsg.classList.add('error');
      return;
    }
    if (password !== confirmPassword) {
      formMsg.textContent = 'Passwords do not match.';
      formMsg.classList.add('error');
      return;
    }
  }

  // Here you would send this data to your backend/server. For now, we simulate success.

  formMsg.textContent = 'Settings saved successfully!';
  formMsg.classList.add('success');

  // Optionally reset passwords fields
  this.password.value = '';
  this['confirm-password'].value = '';
});
