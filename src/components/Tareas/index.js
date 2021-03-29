import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Fatal from "../common/Fatal";

import * as tareasActions from "../../actions/tareasActions";

class Tareas extends Component {
	componentDidMount() {
		this.props.traerTodas();
	}

	mostrarContenido = () => {
		const { tareas, cargando, error } = this.props.tareasReducers;
		console.log(tareas, cargando, error);
		if (cargando) {
			return <Spinner />;
		}
		if (error) {
			return <Fatal message={error} />;
		}
		return Object.keys(tareas).map((user_id) => (
			<div key={user_id}>
				<h2>Usuario {user_id}</h2>
				<div className='contenedor_tareas'>{this.ponerTareas(user_id)}</div>
			</div>
		));
	};

	ponerTareas = (user_id) => {
		const { tareas } = this.props.tareasReducers;
		const por_usuario = { ...tareas[user_id] };
		return Object.keys(por_usuario).map((tarea_id) => (
			<div key={tarea_id}>
				<input type='checkbox' defaultChecked={por_usuario[tarea_id].completed} />
				{por_usuario[tarea_id].title}
			</div>
		));
	};

	render() {
		console.log(this.props);
		return <div>{this.mostrarContenido()}</div>;
	}
}

const mapStateToProps = ({ tareasReducers }) => ({ tareasReducers });

export default connect(mapStateToProps, tareasActions)(Tareas);
