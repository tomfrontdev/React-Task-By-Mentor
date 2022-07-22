import Button from "./Button";
import { useEffect } from "react";
import React from "react";
import styles from "./Item.module.css";

const Item = (props) => {
	return (
		<div className={`${styles.item} ${props.isActive && styles.active}`}>
			<p>{props.text}</p>
			<Button onClick={() => props.toggleClass(props.id)}>toggle</Button>
			<Button
				onClick={() => {
					props.deleteItem(props.id);
					props.sendName(props.text);
				}}
			>
				delete
			</Button>
		</div>
	);
};

export default Item;
