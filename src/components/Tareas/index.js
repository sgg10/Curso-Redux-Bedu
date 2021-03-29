import React, { Component } from "react";
import { connect } from "react-redux";

import * as tareasActions from "../../actions/tareasActions";

class Tareas extends Component {
	componentDidMount() {
		this.props.traerTodas();
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<h1>Tareas Saludar</h1>
			</div>
		);
	}
}

const mapStateToProps = ({ tareasReducers }) => ({ tareasReducers });

export default connect(mapStateToProps, tareasActions)(Tareas);
