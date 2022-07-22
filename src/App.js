import "./App.css";
import List from "./components/List";
import Button from "./components/Button";
import styles from "./components/Button.module.css";
import { useState } from "react";
const App = () => {
	return (
		<div className="App">
			<List></List>
		</div>
	);
};

export default App;
