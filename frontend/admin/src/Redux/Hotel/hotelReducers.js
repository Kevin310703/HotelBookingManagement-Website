import {
  HOTEL_UPDATE_REQUEST,
  HOTEL_UPDATE_SUCCESS,
  HOTEL_UPDATE_FAIL,
} from './hotelTypes';

const initialState = {
  loading: false,
  hotels: [],
  total: 0,
  pageSize: 20,
  page: 1,
  error: null,
  hotel: null,
};

export const hotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HOTELS_REQUEST':
      return { ...state, loading: true };
    case 'HOTELS_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        hotels: action.payload.data, 
        total: action.payload.total,
        pageSize: action.payload.pageSize,
        page: action.payload.page,
        error: null 
      };
    case 'HOTELS_FAIL':
      return { ...state, loading: false, hotels: [], error: action.payload };
    case 'HOTEL_REQUEST':
      return { ...state, loading: true };
    case 'HOTEL_SUCCESS':
      return { ...state, loading: false, hotel: action.payload, error: null };
    case 'HOTEL_FAIL':
      return { ...state, loading: false, hotel: null, error: action.payload };

    case HOTEL_UPDATE_REQUEST:
      return { ...state, loading: true };
    case HOTEL_UPDATE_SUCCESS:
      return { ...state, loading: false, hotel: action.payload };
    case HOTEL_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};