import Item from "./Item";
import React, { useEffect, useState } from "react";
import Button from "./Button";

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

const newArray = objectValues.map((item) => {
	return {
		...item[1],
		id: +item[0],
		isActive: false,
	};
});

const filteredArray = newArray.filter((user) => user.age > 18);

const modifiedData = filteredArray.map((user) => {
	const { age, ...rest } = user;
	return { ...rest };
});

const List = (props) => {
	const [enteredUser, setUser] = useState(modifiedData);
	const [enteredText, setText] = useState("");
	const [isFetching, setisFetching] = useState(true);
	const [enteredPokemon, setPokemon] = useState("")


	const toggleClass = (id) => {
		setUser((prev) =>
			prev.map((user) => {
				return {
					...user,
					isActive: false,
					...(user.id === id && {
						isActive: !user.isActive,
					}),
				};
			})
		);
	};

	const deleteItem = (id) => {
		setUser((prev) => {
			return prev.filter((user) => user.id !== id);
		});
	};

	const addUser = () => {
		const newUser = {
			name: "Jan",
			surname: "Kowalski",
			id: Math.random(),
		};

		setUser((prev) => {
			return [newUser, ...prev];
		});
	};

	const sendName = (text) => {
		setText(text);
	};

	useEffect(() => {
		console.log(`Usunięto uzytkownika: ${enteredText}`);
		async function getData() {
			try {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon`
				);
				console.log(response);
				const data = await response.json();
				setisFetching(false);
				setPokemon(data.results)
			} catch {
				console.log("Hi")
			}
		}
		getData();
	}, [enteredUser])





	// TODO: poniższy kod powoduje błąd: "Warning: Each child in a list should have a unique "key" prop". Musisz dodać prop "key"
	return (
		<React.Fragment>
			<Button onClick={addUser}>AddUser</Button>
			{enteredUser.map((user) => (
				<Item
					text={`${user.name} ${user.surname}`}
					toggleClass={toggleClass}
					deleteItem={deleteItem}
					sendName={sendName}
					id={user.id}
					isActive={user.isActive}
				></Item>
			))}
			{isFetching && <p> Data is loading</p>}
			{!isFetching && enteredPokemon.map((user) => (
				<Item
				text={user.name}
			></Item>
			))}
		</React.Fragment>
	);
};

export default List;
