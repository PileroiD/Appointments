import axios from "../axios";

export const registerUser = (values) => async (dispatch) => {
    try {
        const { data } = await axios.post("/register", values);

        if (data) {
            localStorage.setItem("token", data.token);
        } else {
            alert("Failed to log in");
        }

        dispatch({ type: "SET_USER", payload: data });

        return {
            msg: "success",
        };
    } catch (error) {
        return {
            error,
        };
    }
};
