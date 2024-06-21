// src/Redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './User/userReducers';
import { roomReducer } from './Room/roomReducers';
import { roomDetailsReducer } from './Room/roomDetailsReducer';

import { hotelReducer} from './Hotel/hotelReducers'
import { hotelDetailsReducer } from './Hotel/hotelDetailsReducer';

import { bookingReducer } from './Booking/bookingReducers';

const reducer = combineReducers({
    userState: userReducer,
    roomState: roomReducer,
    roomDetailState: roomDetailsReducer,
    hotelState: hotelReducer,
    hotelDetailState: hotelDetailsReducer,
    bookings: bookingReducer,
    // Thêm các reducer khác tại đây
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;