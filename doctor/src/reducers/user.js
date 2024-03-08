const initialState = {
    data: {},
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                data: action.payload,
            };
        case "LOG_OUT":
            return initialState;
        default:
            return state;
    }
};
