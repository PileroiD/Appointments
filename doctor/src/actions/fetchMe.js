import axios from "../axios";

export const fetchMe = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/getme");

        dispatch({ type: "SET_USER", payload: data });
    } catch (error) {
        console.log(error.response.data.message);
    }
};
