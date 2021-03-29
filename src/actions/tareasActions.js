import axios from "axios";
import { TRAER_TODAS, CARGANDO, ERROR } from "../types/tareasTypes";

export const traerTodas = () => async (dispatch) => {
	dispatch({ type: CARGANDO });
	try {
		const payload = (await axios.get("https://jsonplaceholder.typicode.com/todos")).data;
		dispatch({
			type: TRAER_TODAS,
			payload,
		});
	} catch (error) {
		dispatch({ type: ERROR, payload: `❗❗Error: ${error.message}` });
	}
};
