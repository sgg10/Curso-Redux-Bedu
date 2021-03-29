import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Fatal from "../common/Fatal";

import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuarios, abrirCerrar } = publicacionesActions;

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

	ponerPublicaciones = () => {
		const {
			usuariosReducers,
			usuariosReducers: { usuarios },
			publicacionesReducers,
			publicacionesReducers: { publicaciones },
			match: {
				params: { key },
			},
		} = this.props;

		if (!usuarios.length) return;
		if (usuariosReducers.error) return;

		if (publicacionesReducers.cargando) {
			return <Spinner />;
		}
		if (publicacionesReducers.error) {
			return <Fatal message={publicacionesReducers.error} />;
		}
		if (!publicaciones.length) return;
		if (!("publicaciones_key" in usuarios[key])) return;

		const { publicaciones_key } = usuarios[key];

		return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key);
	};

	mostrarInfo = (publicaciones, pub_key) =>
		publicaciones.map((publicacion, com_key) => (
			<div key={publicacion.id} className='pub_titulo' onClick={() => this.props.abrirCerrar(pub_key, com_key)}>
				<h2>{publicacion.title}</h2>
				<h3>{publicacion.body}</h3>
				{publicacion.abierto ? "abierto" : "cerrado"}
			</div>
		));

	render() {
		console.log(this.props);
		return (
			<div>
				{this.ponerUsuario()}
				{this.ponerPublicaciones()}
			</div>
		);
	}
}

const mapStateToProps = ({ usuariosReducers, publicacionesReducers }) => {
	return { usuariosReducers, publicacionesReducers };
};

const mapDispatchToProps = {
	usuariosTraerTodos,
	publicacionesTraerPorUsuarios,
	abrirCerrar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
