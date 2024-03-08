import axios from "../axios";

export const fetchAppointments = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/get-apps");

        dispatch({ type: "SET_APPOINTMENTS", payload: data });
    } catch (error) {
        return {
            error,
        };
    }
};
