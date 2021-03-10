import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Fatal from "../common/Fatal";

import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuarios } = publicacionesActions;

class Publicaciones extends Component {
	async componentDidMount() {
		const {
			usuariosTraerTodos,
			publicacionesTraerPorUsuarios,
			match: {
				params: { key },
			},
		} = this.props;
		if (!this.props.usuariosReducers.usuarios.length) {
			await usuariosTraerTodos();
		}
		if (this.props.usuariosReducers.error) {
			return;
		}
		if (!("publicaciones_key" in this.props.usuariosReducers.usuarios[key])) {
			publicacionesTraerPorUsuarios(key);
		}
	}

	ponerUsuario = () => {
		const {
			usuariosReducers,
			match: {
				params: { key },
			},
		} = this.props;
		if (usuariosReducers.error) {
			return <Fatal message={usuariosReducers.error} />;
		}
		if (!usuariosReducers.usuarios.length || usuariosReducers.cargando) {
			return <Spinner />;
		}
		const nombre = usuariosReducers.usuarios[key].name;
		return <h1>Publicaciones de {nombre} </h1>;
	};

	render() {
		console.log(this.props);
		return <div>{this.ponerUsuario()}</div>;
	}
}

const mapStateToProps = ({ usuariosReducers, publicacionesReducers }) => {
	return { usuariosReducers, publicacionesReducers };
};

const mapDispatchToProps = {
	usuariosTraerTodos,
	publicacionesTraerPorUsuarios,
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
