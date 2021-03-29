import axios from "axios";
import { ACTUALIZAR, CARGANDO, ERROR } from "../types/publicacionesTypes";
import * as usuariosTypes from "../types/usuariosTypes";

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) => {
	dispatch({ type: CARGANDO });
	const { usuarios } = getState().usuariosReducers;
	const { publicaciones } = getState().publicacionesReducers;
	const usuarios_id = usuarios[key].id;

	try {
		const data = (await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuarios_id}`)).data;
		const nuevas = data.map((publicacion) => ({
			...publicacion,
			comentarios: [],
			abierto: false,
		}));
		const publicaciones_actualizadas = [...publicaciones, nuevas];

		const publicaciones_key = publicaciones_actualizadas.length - 1;
		const usuarios_actualizados = [...usuarios];
		usuarios_actualizados[key] = {
			...usuarios[key],
			publicaciones_key,
		};

		dispatch({
			type: ACTUALIZAR,
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

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
	const { publicaciones } = getState().publicacionesReducers;

	const actualizada = {
		...publicaciones[pub_key][com_key],
		abierto: !publicaciones[pub_key][com_key].abierto,
	};

	const publicaciones_actualizadas = [...publicaciones];
	publicaciones_actualizadas[pub_key] = [...publicaciones[pub_key]];
	publicaciones_actualizadas[pub_key][com_key] = actualizada;

	dispatch({
		type: ACTUALIZAR,
		payload: publicaciones_actualizadas,
	});
};

export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {
	const { publicaciones } = getState().publicacionesReducers;
	const seleccionado = publicaciones[pub_key][com_key];

	try {
		const data = (await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionado.id}`)).data;
		const actualizada = {
			...publicaciones[pub_key][com_key],
			comentarios: data,
		};
		const publicaciones_actualizadas = [...publicaciones];
		publicaciones_actualizadas[pub_key] = [...publicaciones[pub_key]];
		publicaciones_actualizadas[pub_key][com_key] = actualizada;

		dispatch({
			type: ACTUALIZAR,
			payload: publicaciones_actualizadas,
		});
	} catch (error) {
		dispatch({ type: ERROR, payload: `❗❗Error: ${error.message}` });
	}
};
