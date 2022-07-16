import styles from "./Button.module.css";
import { useState } from "react";

const Button = (props) => {
	const [btnText, setbtnText] = useState("");

	const setState = () => {};

	return (
		<button
			className={styles}
			value={props.children}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
