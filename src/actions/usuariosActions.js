import axios from "axios";
export const traerTodos = () => async (dispatch) => {
	const payload = (await axios.get("https://jsonplaceholder.typicode.com/users")).data;
	dispatch({
		type: "traer_usuarios",
		payload,
	});
};
