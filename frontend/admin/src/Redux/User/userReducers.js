const initialState = {
    users: [],
    loading: false,
    error: null,
    userAddSuccess: false,
    userUpdateSuccess: false
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'USERS_SUCCESS':
            return { ...state, loading: false, users: action.payload };
        case 'USERS_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'USER_ADD_REQUEST':
            return { ...state, loading: true, error: null };
        case 'USER_ADD_SUCCESS':
            return { ...state, loading: false, userAddSuccess: true, users: [...state.users, action.payload] };
        case 'USER_ADD_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'USER_UPDATE_REQUEST':
            return { ...state, loading: true, error: null };
        case 'USER_UPDATE_SUCCESS':
            return {
                ...state,
                loading: false,
                userUpdateSuccess: true,
                users: state.users.map(user =>
                    user.id === action.payload.id ? action.payload : user
                )
            };
        case 'USER_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};