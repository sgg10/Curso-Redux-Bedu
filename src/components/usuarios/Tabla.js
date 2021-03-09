import React from "react";
import { connect } from "react-redux";

const Tabla = (props) => {
	const ponerFilas = () =>
		props.usuarios.map(({ id, name, email, website }) => (
			<tr key={id}>
				<td>{name}</td>
				<td>{email}</td>
				<td>{website}</td>
			</tr>
		));
	return (
		<table className='tabla'>
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Correo</th>
					<th>Enlace</th>
				</tr>
			</thead>
			<tbody>{ponerFilas()}</tbody>
		</table>
	);
};

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducers;
};

export default connect(mapStateToProps)(Tabla);
