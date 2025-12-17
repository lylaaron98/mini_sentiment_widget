/**
 * API module for handling feedback submissions
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://httpbin.org/post';

/**
 * Submit feedback data to the backend
 * @param {Object} feedbackData - The feedback data to submit
 * @param {number} feedbackData.rating - Rating value (1-5)
 * @param {string} feedbackData.comment - User's feedback comment
 * @param {string} feedbackData.pageUrl - URL of the page where feedback was submitted
 * @param {string} feedbackData.timestamp - ISO 8601 timestamp of submission
 * @returns {Promise<Object>} Response data from the API
 */
export async function submitFeedback(feedbackData) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
}

/**
 * Helper function to create feedback payload with current timestamp and page URL
 * @param {number} rating - Rating value (1-5)
 * @param {string} comment - User's feedback comment
 * @returns {Object} Formatted feedback data ready for submission
 */
export function createFeedbackPayload(rating, comment) {
  return {
    rating,
    comment,
    pageUrl: window.location.href,
    timestamp: new Date().toISOString(),
  };
}
