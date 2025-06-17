import { AuthService } from './services/authService.js';

const authService = new AuthService();

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    try {
        await authService.register(username, password);
        messageDiv.className = 'message success';
        messageDiv.textContent = 'Registration successful!';
        document.getElementById('registerForm').reset();
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } catch (error) {
        messageDiv.className = 'message error';
        messageDiv.textContent = error.message || 'Registration failed';
        console.error('Registration error:', error);
    }
});