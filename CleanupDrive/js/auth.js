// auth.js

// Handle Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // For testing/demo purposes - replace this with actual API call
    if (email && password) {
        // Simulate successful login
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('userName', email.split('@')[0]); // Just using email name as username for demo
        
        // Important: Use window.location.href for redirect
        window.location.href = 'dashboard.html';
    } else {
        alert('Please fill in all fields');
    }

    // When you implement actual API:
    /*
    try {
        const response = await fetch('your-api-url/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.name);
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
    */
});

// Handle Registration
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    // For testing/demo purposes - replace with actual API call
    if (name && email && phone && password) {
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    } else {
        alert('Please fill in all fields');
    }
});

// Check if user is already logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'dashboard.html';
    }
}

// Run auth check on login/register pages
if (document.querySelector('.auth-page')) {
    checkAuth();
}