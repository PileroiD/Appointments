import axios from "../axios";

export const addAppointment = (values) => async (dispatch) => {
    const { data } = await axios.post("/add-app", values);

    dispatch({ type: "ADD_APPOINTMENT", payload: data });

    return data;
};
