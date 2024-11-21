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
  const loginForm = document.querySelector('.login-form');
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (validateForm(email, password)) {
      // Thêm class loading cho nút
      const button = document.querySelector('.btn-login');
      button.innerHTML = 'Logging in...';
      button.style.opacity = '0.7';
      
      // Giả lập đăng nhập
      setTimeout(() => {
        showNotification('Login successful!', 'success');
        button.innerHTML = 'Login';
        button.style.opacity = '1';
      }, 2000);
    }
  });

  // Thêm hiệu ứng ripple cho nút
  const button = document.querySelector('.btn-login');
  button.addEventListener('click', createRipple);
});

// Hàm validate form
function validateForm(email, password) {
  let isValid = true;
  
  if (!email || !isValidEmail(email)) {
    showNotification('Please enter a valid email', 'error');
    isValid = false;
  }
  
  if (!password || password.length < 6) {
    showNotification('Password must be at least 6 characters', 'error');
    isValid = false;
  }
  
  return isValid;
}

// Kiểm tra email hợp lệ
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Hiệu ứng ripple khi click button
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  
  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
  ripple.classList.add('ripple');
  
  button.appendChild(ripple);
  
  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
}

// Hiển thị thông báo
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

// Hàm toggle password
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
  