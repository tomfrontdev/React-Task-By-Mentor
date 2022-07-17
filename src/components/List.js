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

	// TODO: poniższy kod jest błędny ponieważ:

	// 1 - funkcja map() działa tak że callback który do niej przekazujesz (twoja funkcja strzalkowa) musi coś zwrócić
	// bo to co zwrócisz jest potem tym nowym "elementem" tablicy pod tym samym indexem ale ty nic nie zwracasz
	// (jak nic nie zwracasz to jest tak jakbyś zwrócił undefined)

	// 2 - map() zwraca nową tablicę jako swój wynik ale ty nie wyłapujesz tej tablicy
	// nigdzie i de facto używasz map() tylko po to żeby przejśc po tablicy.
	// Jak chcesz tylko i wyłącznie przejść po tablicy to powinieneś użyć .forEach()
	// ale w tym przypadku powinieneś skorzystać z .map() i powinieneś złapać wynik .map()
	// czyli powinno być tak: const newArray = objectValues.map()

	// 3 - wenątrz map MUTUJESZ oryginalny obiekt co raczej nie powinno mieć miejsca ponieważ map() służy własnie do tego
	// żeby nie mutowac oryginalnych elementów tylko zwrócić całkiem nowe (a finalnie wgl całą nową tablicę).
	// Ty mutujesz oryginalny obiekt zapisem:  item[1].id = +item[0][0] przez co nadpisujesz oryginalne obiekty zmiennej objectValues.
	//  Technicznie rzecz biorąc to działa ale jest niezgodne z zasadmi programowania i używania .map().

	//  Ten kod powinien wyglądać tak:
	// const myNewArray = objectValues.map((item) => {
	//   // łapiesz wynik .map() i przypisujesz do zmiennej myNewArray
	//   return {
	//     // zwracasz nowy obiekt bo .map() wymaga zwrocenia i to co zwrócisz to będzie nowy element w tej tablicy
	//     ...item[1], // najpierw destrukturyzujesz oryginalny obiekt przez co nowy obiekt będzie miał identyczną strukturę
	//     id: +item[0], // dopiero teraz dodajesz nowe pole "id" i przypisujesz do niego item[0]
	// co będzie stringiem np "3" i od razu zamieniasz to na liczbę dodajac znak
	// + na początku (czyli + przed stingiem zawierającym niby cyfrę ale w postaci stringa zamieni go na liczbę)
	//   };
	// });

	const newArray = objectValues.map((item) => {
		return {
			...item[1],
			id: +item[0],
			isActive: true,
		};
	});

	const modifiedData = newArray.filter((user) => user.age > 18);

	console.log("New Array", newArray);

	console.log("Original data", data);

	console.log("Final array", modifiedData);

	// console.log(newArray);

	// TODO: ten krok będzie zbedny jak zastosujesz mój przykład zakomentowany powyżej (ten z myNewArray)
	// const objectEntries = Object.values(data);

	// TODO: tutaj zastosowałeś filter dokładnie tak jak się powinno, filturjesz coś i przypisujesz do nowej zmiennej modifiedData.
	//  Dokładnie tak samo powinieneś używac map() czyli przypisywać wynik do zmiennej :)
	// const modifiedData = objectEntries.filter((user) => user.age > 18);

	// TODO: tutaj też jest kilka rzeczy które można usprawnić:

	// 1 - używasz map żeby przelecieć po oryginalnej tablicy ale tego co zwróci map nie przypisujesz nigdzie a callback
	//  funkcji map nic nie zwraca. Ponadto nadpisujesz oryginalne obiekty zapisem user.isActive = "true";

	// 2 - używasz poniżej "delete" - tego się nie powinno stosować ponieważ "delete"
	// tak jakby na chama usunie dany atrybut ale to tylko i wyłącznie go usuwa.

	// Ty nie tworzysz nowej referencji do tego obiektu
	// z usuniętym elementem (czyli nie zwracasz nowego obiektu) więc JS/React mysli że to TEN SAM OBIEKT
	// więc i tak nic się nie przerenderuje. Jak chcesz coś usunąć i
	// jednocześnie zwrócić nowy obiekt (aby utworzyc nową referencję)
	// to najprościej jest po prostu zdestrukturyzowac to CZEGO NIE CHCESZ a potem tego NIE PRZEKAZYWAĆ tylko przekazać ...rest:
	// const ItemsWithDeletedAgeField = modifiedData.map(
	//   ({ age, ...itemWithoutAge }) => { // destrukturyzuje age i resztę obiektu przypisuję do "itemWithoutAge"
	//     return {
	//       ...itemWithoutAge, // jak tutaj teraz zdestrukturyzuję itemsWithoutAge to dostanę nowy obiekt o
	// tej samej strukturze ale bez "age"
	//     };
	//   }
	// );
	// 3 - dodajesz  tutaj nowe pole "isActive" ale w zasadzie mógłbyś to zrobić już na samym początku
	//  (tam gdzie pokazuję przykład z "myNewArray")

	// const deletedArray = (id) => {
	// 	const newArr = modifiedData.filter((user) => user.id !== id);
	// 	setUser(newArr);
	// 	console.log(newArr);
	// };

	const [enteredUser, setUser] = useState(modifiedData);

	// console.log(enteredUser);

	// TODO: nie ma potrzeby tworzyc tutaj let.
	//  Powinienieś uzyć const zamist let i ten const powinien byc zadeklarowany WEWNĄTRZ funkcji toggleClass
	//   ponieważ to ta funkcja korzysta z newArray. Przecież poza/na zewnątrz funkcji toggleClass nie używasz
	//   newArray więc nie ma potrzeby aby wyciągać tę zmienną "poza" funkcję toggleClass

	// TODO: ta funkcja ma toglować element a nie go usuwać.
	// Poniższy kod USUNIE element ponieważ filter() sprawi że elementu który wywołał tą funkcje nie bedzie wynikowo w
	// zmiennej newArray którą potem przekazujesz do setUser która też ustawi taką tablicę BEZ ELEMENTU. n
	// ie masz usuwać elementu tylko zmienić jego pole isActive z false na true (jeśli wcześniej było false)
	// lub z true na false (jeśli wcześniej było true)

	// w map() musisz zwrócić nowy obiekt, zdestrukturyzować user a potem dopisać logikę
	//  która zmieni pole isActive

	const toggleClass = (id) => {
		const newArray = modifiedData.map((user) => {
			return {
				...user,
				isActive: !user.isActive,
			};
		});

		console.log(newArray);

		// clickedArray.filter((user) => user.id == id);
		// const [user] = clickedArray;
		// console.log(clickedArray);

		// if (user.isActive == "true") {
		// 	user.isActive = "false";
		// 	setUser(clickedElement);
		// 	return;
		// }

		// if (user.isActive == "false") {
		// 	user.isActive = "true";
		// 	setUser(clickedElement);
		// 	return;
		// }
	};

	// const deleteItem = (id) => {
	// 	const deletedItem = modifiedData
	// 		.map((user) => {
	// 			{
	// 				return user;
	// 			}
	// 		})
	// 		.filter((user) => user.id !== id);
	// 	console.log(deletedItem);
	// };

	// TODO: poniższy kod powoduje błąd: "Warning: Each child in a list should have a unique "key" prop". Musisz dodać prop "key"
	return enteredUser.map((user) => (
		<React.Fragment>
			<Item
				name={user.name}
				surname={user.surname}
				toggleClass={toggleClass}
				// deleteItem={deleteItem}
				id={user.id}
				isActive={user.isActive}
			></Item>
		</React.Fragment>
	));
};
export default List;
