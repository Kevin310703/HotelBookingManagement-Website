import axios from 'axios';

import {
  ROOM_UPDATE_REQUEST,
  ROOM_UPDATE_SUCCESS,
  ROOM_UPDATE_FAIL,
} from './roomTypes';

export const getAllRooms = () => async (dispatch) => {
  try {
    dispatch({ type: 'ROOMS_REQUEST' });

    const totalRecords = 446;
    const pageSize = 20;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const requests = Array.from({ length: totalPages }, (_, i) =>
      axios.get(`http://213.136.80.48:8889/api/room?page=${i + 1}&pageSize=${pageSize}`)
    );

    const responses = await Promise.all(requests);
    const rooms = responses.flatMap(response => response.data.data);

    // Remove duplicate records
    const uniqueRooms = [];
    const seenIds = new Set();

    for (const room of rooms) {
      if (!seenIds.has(room.id)) {
        seenIds.add(room.id);
        uniqueRooms.push(room);
      }
    }

    // Sort rooms by ID in ascending order
    uniqueRooms.sort((a, b) => a.id - b.id);

    // Log the rooms array to the console
    console.log('Fetched Rooms:', uniqueRooms);

    dispatch({
      type: 'ROOMS_SUCCESS',
      payload: { data: uniqueRooms, total: uniqueRooms.length, pageSize },
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    dispatch({
      type: 'ROOMS_FAIL',
      payload: error.message,
    });
  }
};

export const getRoomById = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'GET_ROOM_REQUEST' });
    const response = await axios.get(`http://213.136.80.48:8889/api/room/${id}`);
    dispatch({ type: 'GET_ROOM_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_ROOM_FAIL', payload: error.message });
  }
};

export const updateRoom = (id, roomData) => async (dispatch) => {
  try {
    dispatch({ type: ROOM_UPDATE_REQUEST });

    const token = localStorage.getItem('token'); // Get the token from local storage
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    };

    const { data } = await axios.put(`http://213.136.80.48:8889/api/room/${id}`, roomData, config);

    dispatch({ type: ROOM_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ROOM_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};