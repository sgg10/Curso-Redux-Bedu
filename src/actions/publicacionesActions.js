import axios from "axios";
import { TRAER_POR_USUARIOS, CARGANDO, ERROR } from "../types/publicacionesTypes";

export const traerPorUsuario = (key) => async (dispatch, getState) => {
	dispatch({ type: CARGANDO });
	const { usuarios } = getState().usuariosReducers;
	const { publicaciones } = getState().publicacionesReducers;
	const usuarios_id = usuarios[key].id;

	try {
		const data = (await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuarios_id}`)).data;
		const publicaciones_actualizadas = [...publicaciones, data];
		dispatch({
			type: TRAER_POR_USUARIOS,
			payload: publicaciones_actualizadas,
		});
	} catch (error) {
		dispatch({ type: ERROR, payload: `❗❗Error: ${error.message}` });
	}
};
