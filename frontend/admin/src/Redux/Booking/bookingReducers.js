const initialState = {
    loading: false,
    bookings: [],
    total: 0,
    pageSize: 20,
    page: 1,
    error: null
};

export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BOOKINGS_REQUEST':
            return { ...state, loading: true };
        case 'BOOKINGS_SUCCESS':
            return { 
                loading: false, 
                bookings: action.payload.data, 
                total: action.payload.total,
                pageSize: action.payload.pageSize,
                page: action.payload.page,
                error: null 
            };
        case 'BOOKINGS_FAIL':
            return { loading: false, bookings: [], error: action.payload };
        case 'BOOKING_UPDATE_FAIL':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};