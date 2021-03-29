import { combineReducers } from "redux";
import usuariosReducers from "./usuarios";
import publicacionesReducers from "./publicaciones";
import tareasReducers from "./Tareas";

export default combineReducers({
	usuariosReducers,
	publicacionesReducers,
	tareasReducers,
});
