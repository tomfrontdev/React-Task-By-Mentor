import Item from "./Item";
import React, { useState } from "react";

const List = (props) => {
	const data = {
		1: {
			name: "John",
			surname: "Smith",
			age: 21,
		},
		2: {
			name: "Patrycja",
			surname: "Wesołowska",
			age: 26,
		},
		3: {
			name: "Tomasz",
			surname: "Cividino",
			age: 31,
		},

		4: {
			name: "Jan",
			surname: "Cividino",
			age: 1,
		},
		5: {
			name: "Lukasz",
			surname: "Wojakowski",
			age: 45,
		},
	};

	const objectValues = Object.entries(data);

	objectValues.map((item) => {
		item[1].id = +item[0][0];
	});

	const objectEntries = Object.values(data);

	const modifiedData = objectEntries.filter((user) => user.age > 18);

	modifiedData.map((user) => {
		delete user.age;
		user.isActive = "true";
	});

	// const deletedArray = (id) => {
	// 	const newArr = modifiedData.filter((user) => user.id !== id);
	// 	setUser(newArr);
	// 	console.log(newArr);
	// };

	const [enteredUser, setUser] = useState(modifiedData);

	const clicked = (id) => {
		const clickedElement = modifiedData.filter((user) => user.id == id);
		const [user] = clickedElement;
		if (user.isActive == "true") {
			user.isActive = "false";
			console.log(modifiedData);
			setUser(modifiedData);
			return;
		}

		if (user.isActive == "false") {
			user.isActive = "true";
			console.log(modifiedData);
			setUser(modifiedData);
			return;
		}
	};

	return enteredUser.map((user) => (
		<React.Fragment>
			<Item
				name={user.name}
				surname={user.surname}
				clickedElement={clicked}
				id={user.id}
				isActive={user.isActive}
			></Item>
		</React.Fragment>
	));
};
export default List;
