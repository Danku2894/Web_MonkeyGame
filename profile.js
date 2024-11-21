document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập
    const userData = getUserData();
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }

    // Load thông tin người dùng
    loadUserProfile();

    // Xử lý form cập nhật profile
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }

    // Xử lý toggle password
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    });

    // Xử lý menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Lấy thông tin người dùng từ localStorage
function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

// Load thông tin profile
function loadUserProfile() {
    const userData = getUserData();
    if (userData) {
        document.getElementById('username').value = userData.username || '';
        document.getElementById('email').value = userData.email || '';
        
        // Load avatar nếu có
        const avatar = document.getElementById('profileAvatar');
        if (userData.avatar) {
            avatar.src = userData.avatar;
        }
    }
}

// Xử lý cập nhật profile
function handleProfileUpdate(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate
    if (newPassword && newPassword !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp', 'error');
        return;
    }

    // Cập nhật thông tin
    const userData = getUserData();
    const updatedUser = {
        ...userData,
        username,
        email,
        password: newPassword || userData.password
    };

    // Lưu vào localStorage
    localStorage.setItem('userData', JSON.stringify(updatedUser));

    // Cập nhật danh sách users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === userData.email);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
    }

    showNotification('Cập nhật thông tin thành công', 'success');
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

// Xử lý đăng xuất
function logout() {
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
} 