import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import Publicaciones from "./Publicaciones";
import Usuarios from "./Usuarios";
import Tareas from "./Tareas";

const App = () => (
	<BrowserRouter>
		<Menu />
		<Switch>
			<div className='margen'>
				<Route exact path='/' component={Usuarios} />
				<Route exact path='/tareas' component={Tareas} />
				<Route exact path='/publicaciones/:key' component={Publicaciones} />
			</div>
		</Switch>
	</BrowserRouter>
);
export default App;
