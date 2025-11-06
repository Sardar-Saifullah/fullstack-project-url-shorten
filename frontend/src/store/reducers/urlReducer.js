import { URL_ACTION_TYPES } from '../actions/urlActions';

const initialState = {
  urls: [],
  loading: false,
  error: null,
  creating: false
};

export const urlReducer = (state = initialState, action) => {
  switch (action.type) {
    case URL_ACTION_TYPES.CREATE_URL_REQUEST:
      return { ...state, creating: true, error: null };
    
    case URL_ACTION_TYPES.CREATE_URL_SUCCESS:
      return {
        ...state,
        creating: false,
        urls: [action.payload.data, ...state.urls],
        error: null
      };
    
    case URL_ACTION_TYPES.CREATE_URL_FAILURE:
      return { ...state, creating: false, error: action.payload };
    
    case URL_ACTION_TYPES.GET_ALL_URLS_REQUEST:
      return { ...state, loading: true, error: null };
    
    case URL_ACTION_TYPES.GET_ALL_URLS_SUCCESS:
      return {
        ...state,
        loading: false,
        urls: action.payload,
        error: null
      };
    
    case URL_ACTION_TYPES.GET_ALL_URLS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    case URL_ACTION_TYPES.UPDATE_URL_SUCCESS:
      const updatedUrls = state.urls.map(url =>
        url.shortCode === action.payload.data.shortCode ? action.payload.data : url
      );
      return { ...state, urls: updatedUrls, error: null };
    
    case URL_ACTION_TYPES.DELETE_URL_SUCCESS:
      const filteredUrls = state.urls.filter(url => url.shortCode !== action.payload);
      return { ...state, urls: filteredUrls, error: null };
    
    case URL_ACTION_TYPES.UPDATE_URL_FAILURE:
    case URL_ACTION_TYPES.DELETE_URL_FAILURE:
      return { ...state, error: action.payload };
    
    default:
      return state;
  }
};