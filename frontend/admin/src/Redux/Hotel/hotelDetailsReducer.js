// src/Redux/hotelReducers.js
const initialHotelDetailsState = {
  hotel: {},
  loading: false,
  error: null,
};

export const hotelDetailsReducer = (state = initialHotelDetailsState, action) => {
  switch (action.type) {
    case 'GET_HOTEL_REQUEST':
      return { ...state, loading: true };
    case 'GET_HOTEL_SUCCESS':
      return { loading: false, hotel: action.payload, error: null };
    case 'GET_HOTEL_FAIL':
      return { loading: false, error: action.payload, hotel: {} };
    case 'UPDATE_HOTEL_REQUEST':
      return { ...state, loading: true };
    case 'UPDATE_HOTEL_SUCCESS':
      return { loading: false, hotel: action.payload, error: null };
    case 'UPDATE_HOTEL_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};