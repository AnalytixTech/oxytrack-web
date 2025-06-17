import { API_ENDPOINTS } from '../config/api.js';

export class AuthService {
    async login(username, password) {
        try {
            const response = await fetch(API_ENDPOINTS.auth.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (!data.data) {
                throw new Error('No token in response');
            }

            return data.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(username, password) {
        try {
            const response = await fetch(API_ENDPOINTS.auth.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }
}