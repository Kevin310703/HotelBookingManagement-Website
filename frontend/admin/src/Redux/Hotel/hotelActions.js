import axios from 'axios';

import {
  HOTEL_UPDATE_REQUEST,
  HOTEL_UPDATE_SUCCESS,
  HOTEL_UPDATE_FAIL,
} from './hotelTypes';

export const getAllHotels = () => async (dispatch) => {
  try {
    dispatch({ type: 'HOTELS_REQUEST' });

    const totalRecords = 8; // Replace with the actual total number of hotels
    const pageSize = 20;
    const totalPages = Math.ceil(totalRecords / pageSize);

    const requests = Array.from({ length: totalPages }, (_, i) =>
      axios.get(`http://213.136.80.48:8889/api/hotel?page=${i + 1}&pageSize=${pageSize}`)
    );

    const responses = await Promise.all(requests);
    const hotels = responses.flatMap(response => response.data.data);

    // Remove duplicate records
    const uniqueHotels = [];
    const seenIds = new Set();

    for (const hotel of hotels) {
      if (!seenIds.has(hotel.id)) {
        seenIds.add(hotel.id);
        uniqueHotels.push(hotel);
      }
    }

    // Sort hotels by ID in ascending order
    uniqueHotels.sort((a, b) => a.id - b.id);

    // Log the hotels array to the console
    console.log('Fetched Hotels:', uniqueHotels);

    dispatch({
      type: 'HOTELS_SUCCESS',
      payload: { data: uniqueHotels, total: uniqueHotels.length, pageSize },
    });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    dispatch({
      type: 'HOTELS_FAIL',
      payload: error.message,
    });
  }
};

export const getHotelById = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'GET_HOTEL_REQUEST' });
    const response = await axios.get(`http://213.136.80.48:8889/api/hotel/${id}`);
    dispatch({ type: 'GET_HOTEL_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'GET_HOTEL_FAIL', payload: error.message });
  }
};

export const updateHotel = (id, hotelData) => async (dispatch) => {
  try {
    dispatch({ type: HOTEL_UPDATE_REQUEST });

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

    const { data } = await axios.put(`http://213.136.80.48:8889/api/hotel/${id}`, hotelData, config);

    dispatch({ type: HOTEL_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: HOTEL_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};