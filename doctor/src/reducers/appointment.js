const initialState = {
    data: [],
};

export const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_APPOINTMENTS":
            return {
                ...state,
                data: action.payload,
            };
        case "ADD_APPOINTMENT":
            return {
                ...state,
                data: [...state.data, action.payload],
            };
        default:
            return state;
    }
};
