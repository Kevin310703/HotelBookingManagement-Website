// src/Redux/roomReducers.js
const initialRoomDetailsState = {
  room: {},
  loading: false,
  error: null,
};

export const roomDetailsReducer = (state = initialRoomDetailsState, action) => {
  switch (action.type) {
    case 'GET_ROOM_REQUEST':
      return { ...state, loading: true };
    case 'GET_ROOM_SUCCESS':
      return { loading: false, room: action.payload, error: null };
    case 'GET_ROOM_FAIL':
      return { loading: false, error: action.payload, room: {} };
    case 'UPDATE_ROOM_REQUEST':
      return { ...state, loading: true };
    case 'UPDATE_ROOM_SUCCESS':
      return { loading: false, room: action.payload, error: null };
    case 'UPDATE_ROOM_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};