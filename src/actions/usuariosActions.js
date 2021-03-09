import axios from "axios";
import { TRAER_TODOS, CARGANDO, ERROR } from "../types/usuariosTypes";

export const traerTodos = () => async (dispatch) => {
	dispatch({ type: CARGANDO });
	try {
		const payload = (await axios.get("https://jsonplaceholder.typicode.com/users")).data;
		dispatch({
			type: TRAER_TODOS,
			payload,
		});
	} catch (error) {
		dispatch({ type: ERROR, payload: `❗❗Error: ${error.message}` });
	}
};
