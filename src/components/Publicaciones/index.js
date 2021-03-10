import React, { Component } from "react";
import { connect } from "react-redux";

import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuarios } = publicacionesActions;

class Publicaciones extends Component {
	async componentDidMount() {
		if (!this.props.usuariosReducers.usuarios.length) {
			await this.props.usuariosTraerTodos();
		}
		this.props.publicacionesTraerPorUsuarios(this.props.match.params.key);
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<h1>Publicaciones de </h1>
				{this.props.match.params.key}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
