import { combineReducers } from "redux";
import usuariosReducers from "./usuarios";
import publicacionesReducers from "./publicaciones";
export default combineReducers({
	usuariosReducers,
	publicacionesReducers,
});
