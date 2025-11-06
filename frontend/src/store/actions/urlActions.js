import * as urlService from '../../services/urlService';

// Action Types
export const URL_ACTION_TYPES = {
  CREATE_URL_REQUEST: 'CREATE_URL_REQUEST',
  CREATE_URL_SUCCESS: 'CREATE_URL_SUCCESS',
  CREATE_URL_FAILURE: 'CREATE_URL_FAILURE',
  GET_ALL_URLS_REQUEST: 'GET_ALL_URLS_REQUEST',
  GET_ALL_URLS_SUCCESS: 'GET_ALL_URLS_SUCCESS',
  GET_ALL_URLS_FAILURE: 'GET_ALL_URLS_FAILURE',
  UPDATE_URL_REQUEST: 'UPDATE_URL_REQUEST',
  UPDATE_URL_SUCCESS: 'UPDATE_URL_SUCCESS',
  UPDATE_URL_FAILURE: 'UPDATE_URL_FAILURE',
  DELETE_URL_REQUEST: 'DELETE_URL_REQUEST',
  DELETE_URL_SUCCESS: 'DELETE_URL_SUCCESS',
  DELETE_URL_FAILURE: 'DELETE_URL_FAILURE',
  GET_ORIGINAL_URL_SUCCESS: 'GET_ORIGINAL_URL_SUCCESS'
};

// Action Creators
export const createShortUrl = (originalUrl) => async (dispatch) => {
    
  dispatch({ type: URL_ACTION_TYPES.CREATE_URL_REQUEST });
  try {
    
    const response = await urlService.createShortUrl(originalUrl);
     // Fix: Check the actual response structure from your backend
    const urlData = response.data.data || response.data;
    dispatch({
      type: URL_ACTION_TYPES.CREATE_URL_SUCCESS,
      payload: response.data
    });
    return { payload: { data: urlData } }; // Return consistent structure
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Failed to create short URL';
    dispatch({
      type: URL_ACTION_TYPES.CREATE_URL_FAILURE,
      payload: errorMessage
    });
    throw new Error(errorMessage);
  }
};

export const getAllUrls = () => async (dispatch) => {
  dispatch({ type: URL_ACTION_TYPES.GET_ALL_URLS_REQUEST });
  try {
    const response = await urlService.getAllUrls();
    // Fix: Check the actual response structure
    const urlsData = response.data || [];
    dispatch({
      type: URL_ACTION_TYPES.GET_ALL_URLS_SUCCESS,
      payload: urlsData
    });
  } catch (error) {
     const errorMessage = error.response?.data?.error || 'Failed to fetch URLs';
    dispatch({
      type: URL_ACTION_TYPES.GET_ALL_URLS_FAILURE,
      payload: errorMessage
    });
  }
};

// Fix: Add this new action for redirects
export const getOriginalUrlAsync = (shortCode) => async (dispatch) => {
  try {
    const response = await urlService.getOriginalUrl(shortCode);
    
    if (response.status >= 300 && response.status < 400) {
      // If it's a redirect, return the location header
      return response.headers.location;
    } else if (response.data) {
      // If it returns the URL directly
      return response.data.originalUrl || response.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting original URL:', error);
    throw error;
  }
};

export const updateUrl = (shortCode, originalUrl) => async (dispatch) => {
  dispatch({ type: URL_ACTION_TYPES.UPDATE_URL_REQUEST });
  try {
    const response = await urlService.updateUrl(shortCode, originalUrl);
    dispatch({
      type: URL_ACTION_TYPES.UPDATE_URL_SUCCESS,
      payload: response.data
    });
    return response;
  } catch (error) {
    dispatch({
      type: URL_ACTION_TYPES.UPDATE_URL_FAILURE,
      payload: error.response?.data?.error || 'Failed to update URL'
    });
    throw error;
  }
};

export const deleteUrl = (shortCode) => async (dispatch) => {
  dispatch({ type: URL_ACTION_TYPES.DELETE_URL_REQUEST });
  try {
    await urlService.deleteUrl(shortCode);
    dispatch({
      type: URL_ACTION_TYPES.DELETE_URL_SUCCESS,
      payload: shortCode
    });
  } catch (error) {
    dispatch({
      type: URL_ACTION_TYPES.DELETE_URL_FAILURE,
      payload: error.response?.data?.error || 'Failed to delete URL'
    });
    throw error;
  }
};