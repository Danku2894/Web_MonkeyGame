document.addEventListener('DOMContentLoaded', function() {
  // Khởi tạo animation
  const animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'animation.json'
  });

  // Xử lý form submit
  const registerForm = document.querySelector('.login-form');
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (validateForm(username, email, password, confirmPassword)) {
      const button = document.querySelector('.btn-login');
      button.innerHTML = 'Creating Account...';
      button.style.opacity = '0.7';
      
      // Giả lập đăng ký
      setTimeout(() => {
        showNotification('Account created successfully!', 'success');
        button.innerHTML = 'Register';
        button.style.opacity = '1';
        // Chuyển hướng đến trang đăng nhập sau 2 giây
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }, 2000);
    }
  });
});

function validateForm(username, email, password, confirmPassword) {
  if (!username || username.length < 3) {
    showNotification('Username must be at least 3 characters', 'error');
    return false;
  }
  
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email', 'error');
    return false;
  }
  
  if (!password || password.length < 6) {
    showNotification('Password must be at least 6 characters', 'error');
    return false;
  }
  
  if (password !== confirmPassword) {
    showNotification('Passwords do not match', 'error');
    return false;
  }
  
  return true;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleBtn = document.querySelector('.toggle-password i');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.className = 'fa-regular fa-eye';
  } else {
    passwordInput.type = 'password';
    toggleBtn.className = 'fa-regular fa-eye-slash';
  }
}

function toggleConfirmPassword() {
  const confirmPasswordInput = document.getElementById('confirm-password');
  const toggleBtn = confirmPasswordInput.nextElementSibling.querySelector('i');
  
  if (confirmPasswordInput.type === 'password') {
    confirmPasswordInput.type = 'text';
    toggleBtn.className = 'fa-regular fa-eye';
  } else {
    confirmPasswordInput.type = 'password';
    toggleBtn.className = 'fa-regular fa-eye-slash';
  }
} 