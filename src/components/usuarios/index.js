import React, { Component } from "react";
import axios from "axios";

class Usuarios extends Component {
	constructor() {
		super();
		this.state = {
			usuarios: [],
		};
	}

	ponerFilas = () =>
		this.state.usuarios.map(({ id, name, email, website }) => (
			<tr key={id}>
				<td>{name}</td>
				<td>{email}</td>
				<td>{website}</td>
			</tr>
		));

	async componentDidMount() {
		const usuarios = (await axios.get("https://jsonplaceholder.typicode.com/users")).data;
		this.setState({ usuarios });
	}

	render() {
		return (
			<div>
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
			</div>
		);
	}
}

export default Usuarios;
