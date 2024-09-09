// Action Types
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

// Action Creators
export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

// Initial State
const initialState = {
  query: '', // Default search query
};

// Reducer
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
