import axios from 'axios';

export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: 'USERS_REQUEST' });

        const { data } = await axios.get('http://213.136.80.48:8889/api/user');
        dispatch({
            type: 'USERS_SUCCESS',
            payload: data.data
        });
    } catch (error) {
        dispatch({
            type: 'USERS_FAIL',
            payload: error.message
        });
    }
};

export const addUser = (userData) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_ADD_REQUEST' });

        const { data } = await axios.post('http://213.136.80.48:8889/api/user', userData);
        dispatch({
            type: 'USER_ADD_SUCCESS',
            payload: data.data
        });
    } catch (error) {
        dispatch({
            type: 'USER_ADD_FAIL',
            payload: error.message
        });
    }
};

export const updateUser = (userId, userData) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_UPDATE_REQUEST' });

        const { data } = await axios.put(`http://213.136.80.48:8889/api/user/${userId}`, userData);
        dispatch({
            type: 'USER_UPDATE_SUCCESS',
            payload: data.data
        });
    } catch (error) {
        dispatch({
            type: 'USER_UPDATE_FAIL',
            payload: error.message
        });
    }
};