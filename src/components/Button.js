import styles from "./Button.module.css";
import React, { Component }  from 'react';

const Button = (props) => {
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
