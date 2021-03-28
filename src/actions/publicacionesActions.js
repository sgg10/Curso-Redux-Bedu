import axios from "axios";
import { TRAER_POR_USUARIOS, CARGANDO, ERROR } from "../types/publicacionesTypes";
import * as usuariosTypes from "../types/usuariosTypes";

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) => {
	dispatch({ type: CARGANDO });
	const { usuarios } = getState().usuariosReducers;
	const { publicaciones } = getState().publicacionesReducers;
	const usuarios_id = usuarios[key].id;

	try {
		const data = (await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuarios_id}`)).data;
		const publicaciones_actualizadas = [...publicaciones, data];

		const publicaciones_key = publicaciones_actualizadas.length - 1;
		const usuarios_actualizados = [...usuarios];
		usuarios_actualizados[key] = {
			...usuarios[key],
			publicaciones_key,
		};

		dispatch({
			type: TRAER_POR_USUARIOS,
			payload: publicaciones_actualizadas,
		});
		dispatch({
			type: USUARIOS_TRAER_TODOS,
			payload: usuarios_actualizados,
		});
	} catch (error) {
		dispatch({ type: ERROR, payload: `❗❗Error: ${error.message}` });
	}
};
