import React from "react";
import "../../assets/css/iconos.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Tabla = (props) => {
	const ponerFilas = () =>
		props.usuarios.map(({ id, name, email, website }, key) => (
			<tr key={id}>
				<td>{name}</td>
				<td>{email}</td>
				<td>{website}</td>
				<td>
					<Link to={`/publicaciones/${key}`}>
						<div className='eye-solid icon' />
					</Link>
				</td>
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
