import React from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Fatal from "../common/Fatal";

const Comentarios = (props) => {
	const {
		comentarios,
		publicacionesReducers: { com_cargando, com_error },
	} = props;
	if (com_error) {
		return <Fatal message={com_error} />;
	}
	if (com_cargando && !comentarios.length) {
		return <Spinner />;
	}

	const ponerComentarios = () =>
		comentarios.map(({ email, body, id }) => (
			<li key={id}>
				<b>
					<u>{email}</u>
				</b>
				<br />
				{body}
			</li>
		));
	return <ul>{ponerComentarios()}</ul>;
};

const mapStateToProps = ({ publicacionesReducers }) => ({ publicacionesReducers });

export default connect(mapStateToProps)(Comentarios);
