import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import * as usuariosActions from "../../actions/usuariosActions";

class Usuarios extends Component {
	ponerFilas = () =>
		this.props.usuarios.map(({ id, name, email, website }) => (
			<tr key={id}>
				<td>{name}</td>
				<td>{email}</td>
				<td>{website}</td>
			</tr>
		));

	componentDidMount() {
		this.props.traerTodos();
	}

	ponerContenido = () => {
		return (
			<table className='tabla'>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Correo</th>
						<th>Enlace</th>
					</tr>
				</thead>
				<tbody>{this.ponerFilas()}</tbody>
			</table>
		);
	};

	render() {
		if (this.props.cargando) {
			return <Spinner />;
		}
		return <div>{this.ponerContenido()}</div>;
	}
}

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducers;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);
