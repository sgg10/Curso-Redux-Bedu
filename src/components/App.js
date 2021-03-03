import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import Usuarios from "./usuarios";

const Tareas = () => <h1>Aquí estan las tareas</h1>;

const App = () => (
	<BrowserRouter>
		<Menu />
		<Switch>
			<Route exact path='/' component={Usuarios} />
			<Route exact path='/tareas' component={Tareas} />
		</Switch>
	</BrowserRouter>
);
export default App;
