import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
        }
    };
};

export const apiService = {
    // Submit a request (CREATE, EDIT, DELETE)
    submitRequest: async (actionType, payload, courseId = null) => {
        try {
            const response = await axios.post(`${API_URL}/requests`, {
                actionType,
                payload,
                courseId
            }, getAuthHeaders());
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    },

    // Get all pending requests (Admin side)
    getPendingRequests: async () => {
        try {
            const response = await axios.get(`${API_URL}/requests/pending`, getAuthHeaders());
            // It could be for instructor or admin based on back-end, but we use it for Admin here
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    },

    // Resolve request (Approve/Reject)
    resolveRequest: async (requestId, action, adminFeedback = '') => {
        try {
            const response = await axios.put(`${API_URL}/requests/${requestId}/resolve`, {
                action,
                adminFeedback
            }, getAuthHeaders());
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    }
};
