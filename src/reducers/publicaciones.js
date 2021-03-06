import { TRAER_POR_USUARIOS, CARGANDO, ERROR } from "../types/publicacionesTypes";
const INITIAL_STATE = {
	publicaciones: [],
	cargando: false,
	error: "",
};

function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case TRAER_POR_USUARIOS:
			return { ...state, publicaciones: action.payload, cargando: false, error: "" };
		case CARGANDO:
			return { ...state, cargando: true };
		case ERROR:
			return { ...state, error: action.payload, cargando: false };
		default:
			return { ...state };
	}
}

export default reducer;
