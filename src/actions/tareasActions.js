import axios from "axios";
import { TRAER_TODAS, CARGANDO, ERROR } from "../types/tareasTypes";

export const traerTodas = () => async (dispatch) => {
	dispatch({ type: CARGANDO });
	try {
		const payload = (await axios.get("https://jsonplaceholder.typicode.com/todos")).data;

		const tareas = {};
		payload.map(
			(tarea) =>
				(tareas[tarea.userId] = {
					...tareas[tarea.userId],
					[tarea.id]: {
						...tarea,
					},
				})
		);

		dispatch({
			type: TRAER_TODAS,
			payload: tareas,
		});
	} catch (error) {
		dispatch({ type: ERROR, payload: `❗❗Error: ${error.message}` });
	}
};
