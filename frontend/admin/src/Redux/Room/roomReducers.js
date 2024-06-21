import {
  ROOM_UPDATE_REQUEST,
  ROOM_UPDATE_SUCCESS,
  ROOM_UPDATE_FAIL,
} from './roomTypes';

const initialState = {
    loading: false,
    rooms: [],
    total: 0,
    pageSize: 20,
    page: 1,
    error: null,
    room: null
  };
  
  export const roomReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ROOMS_REQUEST':
        return { ...state, loading: true };
      case 'ROOMS_SUCCESS':
        return { 
          ...state, 
          loading: false, 
          rooms: action.payload.data, 
          total: action.payload.total,
          pageSize: action.payload.pageSize,
          page: action.payload.page,
          error: null 
        };
      case 'ROOMS_FAIL':
        return { ...state, loading: false, rooms: [], error: action.payload };
      case 'ROOM_REQUEST':
        return { ...state, loading: true };
      case 'ROOM_SUCCESS':
        return { ...state, loading: false, room: action.payload, error: null };
      case 'ROOM_FAIL':
        return { ...state, loading: false, room: null, error: action.payload };

      case ROOM_UPDATE_REQUEST:
        return { ...state, loading: true };
      case ROOM_UPDATE_SUCCESS:
        return { ...state, loading: false, room: action.payload };
      case ROOM_UPDATE_FAIL:
        return { ...state, loading: false, error: action.payload };

      default:
        return state;
    }
  };  