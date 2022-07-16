import Button from "./Button";
import { useState } from "react";
import React from "react";
import styles from "./Item.module.css";

const Item = (props) => {
	return (
		<div className={styles.item}>
			<p>{props.isActive}</p>
			<p>{props.name}</p>
			<p>{props.surname}</p>
			<Button onClick={() => props.clickedElement(props.id)}>
				toggle
			</Button>
			<Button value={props.isActive}>delete</Button>
		</div>
	);
};

export default Item;
