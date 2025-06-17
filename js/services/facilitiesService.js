import { API_ENDPOINTS } from '../config/api.js';

export class FacilitiesService {
    constructor(token) {
        this.token = token;
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    async getFacilities(status = 'active') {
        try {
            const endpoint = status === 'active' ? API_ENDPOINTS.facilities.getActive : API_ENDPOINTS.facilities.getInactive;
            const response = await fetch(endpoint, {
                headers: this.headers
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch facilities');
            }

            return Array.isArray(data) ? data : 
                   Array.isArray(data.facilities) ? data.facilities : 
                   [data];
        } catch (error) {
            console.error('Error fetching facilities:', error);
            throw error;
        }
    }

    async createFacility(facilityData) {
        try {
            const response = await fetch(API_ENDPOINTS.facilities.base, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(facilityData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create facility');
            }

            return data;
        } catch (error) {
            console.error('Error creating facility:', error);
            throw error;
        }
    }

    async updateFacility(id, facilityData) {
        try {
            const response = await fetch(API_ENDPOINTS.facilities.getById(id), {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(facilityData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update facility');
            }

            return data;
        } catch (error) {
            console.error('Error updating facility:', error);
            throw error;
        }
    }

    async toggleFacilityStatus(id, isActive) {
        try {
            const endpoint = isActive ? 
                API_ENDPOINTS.facilities.deactivate(id) : 
                API_ENDPOINTS.facilities.reactivate(id);

            const response = await fetch(endpoint, {
                method: 'PATCH',
                headers: this.headers
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `Failed to ${isActive ? 'deactivate' : 'reactivate'} facility`);
            }

            return data;
        } catch (error) {
            console.error('Error toggling facility status:', error);
            throw error;
        }
    }
}