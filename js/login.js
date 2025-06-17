import { AuthService } from './services/authService.js';

const authService = new AuthService();

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    try {
        const token = await authService.login(username, password);
        localStorage.setItem('token', token);
        window.location.href = 'dashboard.html';
    } catch (error) {
        messageDiv.className = 'message error';
        messageDiv.textContent = error.message || 'An error occurred during login';
        console.error('Login error:', error);
    }
});