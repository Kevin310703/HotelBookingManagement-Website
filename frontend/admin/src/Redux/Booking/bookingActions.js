import axios from 'axios';

export const getBookings = (page = 1, pageSize = 20) => async (dispatch) => {
    try {
        dispatch({ type: 'BOOKINGS_REQUEST' });

        const { data } = await axios.get(`http://213.136.80.48:8889/api/booking?page=${page}&pageSize=${pageSize}`);
        console.log('Fetched Bookings:', data);

        if (data && data.data) {
            dispatch({
                type: 'BOOKINGS_SUCCESS',
                payload: data,
            });
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Error fetching bookings:', error);
        dispatch({
            type: 'BOOKINGS_FAIL',
            payload: error.message,
        });
    }
};

export const updateBookingStatus = (bookingId, status) => async (dispatch) => {
    try {
        await axios.put(`http://213.136.80.48:8889/api/booking/${bookingId}`, { status });
        dispatch(getBookings());
    } catch (error) {
        console.error('Error updating booking:', error);
        dispatch({
            type: 'BOOKING_UPDATE_FAIL',
            payload: error.message,
        });
    }
};