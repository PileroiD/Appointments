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
        default:
            return state;
    }
};
