import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Fatal from "../common/Fatal";
import Tabla from "./Tabla";
import * as usuariosActions from "../../actions/usuariosActions";

class Usuarios extends Component {
	componentDidMount() {
		if (!this.props.usuarios.length) {
			this.props.traerTodos();
		}
	}

	ponerContenido = () => {
		if (this.props.cargando) {
			return <Spinner />;
		}
		if (this.props.error) {
			return <Fatal message={this.props.error} />;
		}
		return <Tabla />;
	};

	render() {
		return (
			<div>
				<h1>Usuarios</h1>
				{this.ponerContenido()}
			</div>
		);
	}
}

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducers;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);
