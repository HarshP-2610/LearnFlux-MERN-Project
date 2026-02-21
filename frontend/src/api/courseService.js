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

export const courseService = {
    // Read - get published courses
    getPublishedCourses: async () => {
        try {
            const response = await axios.get(`${API_URL}/courses`);
            return response.data; // The backend should be updated to return only published OR we handle the filter in backend
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    },

    // Read - get all courses for admin
    getAllCourses: async () => {
        try {
            const response = await axios.get(`${API_URL}/courses/all`, getAuthHeaders());
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    },

    // Read - get instructor's courses
    getInstructorCourses: async () => {
        try {
            const response = await axios.get(`${API_URL}/instructor/courses`, getAuthHeaders());
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    },

    // Read single
    getCourseById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/courses/${id}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    },

    // Create course
    createCourse: async (courseData) => {
        try {
            const response = await axios.post(`${API_URL}/courses`, courseData, getAuthHeaders());
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    },

    // Update course (e.g., Admin changing status)
    updateCourse: async (id, updateData) => {
        try {
            const response = await axios.put(`${API_URL}/courses/${id}`, updateData, getAuthHeaders());
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    },

    // specifically update via patch
    updateCourseStatus: async (id, statusData) => {
        try {
            const response = await axios.patch(`${API_URL}/courses/${id}/status`, statusData, getAuthHeaders());
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    },

    // Delete course
    deleteCourse: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/courses/${id}`, getAuthHeaders());
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network Error');
        }
    }
};
