import axios from "axios";
import { TRAER_TODOS } from "../types/usuariosTypes";
export const traerTodos = () => async (dispatch) => {
	const payload = (await axios.get("https://jsonplaceholder.typicode.com/users")).data;
	dispatch({
		type: TRAER_TODOS,
		payload,
	});
};
