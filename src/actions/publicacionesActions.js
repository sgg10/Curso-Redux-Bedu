import axios from "axios";
import { TRAER_TODOS, CARGANDO, ERROR } from "../types/publicacionesTypes";

export const traerTodos = () => async (dispatch) => {
	dispatch({ type: CARGANDO });
	try {
		const payload = (await axios.get("https://jsonplaceholder.typicode.com/posts")).data;
		dispatch({
			type: TRAER_TODOS,
			payload,
		});
	} catch (error) {
		dispatch({ type: ERROR, payload: `❗❗Error: ${error.message}` });
	}
};

export const traerPorUsuario = (key) => async (dispatch, getState) => {
	dispatch({ type: CARGANDO });
	const { usuarios } = getState().usuariosReducers;
	const usuarios_id = usuarios[key].id;
	try {
		const payload = (await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuarios_id}`)).data;
		dispatch({
			type: TRAER_TODOS,
			payload,
		});
	} catch (error) {
		dispatch({ type: ERROR, payload: `❗❗Error: ${error.message}` });
	}
};
