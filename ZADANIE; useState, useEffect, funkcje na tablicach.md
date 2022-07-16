# podstawy i useState

`1` - zrób reużywalny komponent buttona do którego z zewnątrz możesz przekazać funkcję `onClick` oraz tekst, który dany button będzie wyświetlał. Niech to będzie prop `children`. możesz jakoś ostylować ten button wedle uznania.

`2` - zrób komponent `Item` który bedzie zwracał jakiś np `li` lub `div` i w środku będzie z lewej strony jakiś napis (przekazywany z zewnątrz) oraz z prawej strony 2 buttony z punktu 1. Pierwszy z nich będzie buttonem z napisem `toggle` a drugi z napisem `delete`.

Czyli uklad ma być taki:

```
|=============================================|
| John Smith          [toggle]   [delete]  |
|=============================================|
```

Do komponentu `Item` z zewnątrz powinno się móc przekazać propsy:

- `text` który będzie potem wyświetlony jako ten text z lewej strony. Będie to imię i nazwisko danego użytkonwika.
- `updateData` który będzie funkcją `setState`
- `id` który będzie id danego elementu/komponentu `Item`
- `isActive` który będzie określał czy dany `Item` jest "aktywny". Jeśli tak to będzie jakoś wizualnie wyrózniony - np zmienisz background-color CAŁEGO KOMPONENTU `Item`.

Wewnątrz komponentu `Item` te propsy mają być wyciągnietne z obiektu props przy pomocy destrukturyzacji.

`3` - stwórz komponent `List` który będzie w pętli renderował komponent `Item`.
w komponencie `List` powinno się użyć obiektu o strukturze:

```jsx
const data = {
  1: {
    name: "john",
    surname: "Smith",
    age: 16,
  },
  2: {
    name: "Will",
    surname: "Johanson",
    age: 35,
  },
};
```

zmienna `data` jest obiektem i najpierw musi zostać zamienona na tablicę a następnie trzeba z niej wybrać tylko te osoby, których wiek jest `WIĘKSZY LUB RÓWNY 18`. Następnie każdemu elementowi trzeba dodatkowo dodac klucz `isActive` z wartością `false`. Dopiero taką tablicę należy użyć. Finalnie ta tablica ma mieć strukture:

```jsx
const modifiedData = [
  {
    id: 1,
    name: "john",
    surname: "smith",
    isActive: false,
    // zwróć uwagę że nie ma tutaj zadnego klucza age. Aby usunąć ten klucz będziesz musiala skorzystać z map() i/lub destrukturyzacji i/lub reduce()
  },
];
```

Do przerobienia tego obiektu na tablicę skorzystaj z tych funkcji (użyj tych których potrzebujesz): `map()`, `filter()`, być może `reduce()`, myć może destrukturyzacji oraz `Objet.entires()` lub `Object.values()`.
Jeśli nie wiesz jak to zrobić to pomiń krok zamiany i od razu zrób tą tablicę ale zachęcam do spróbowania chociaż.

Ten komponent `List` musi przyjąć tą zmodyfikowaną tablicę (utworzoną z obiektu `data`) jako swój state i na jego podstawie wyrenderować w pętli listę `Item`.
Do komponentów `Item` musisz przekazać wszystkie niezbędne propsy.

`4` - wewnątrz komponentu `Item` musisz odebrać te propsy `text`, `updateData`, `id` oraz `isActive` (destrukturyzacją jak już wspomnialem w pkt `2`) i wykorzystać je w następujący sposób:

- kliknięcie przycisku z napisem `toggle` spowoduje że dany komponent `Item` w którym znajdował się ten przycisk `toggle` zostanie wyróżniony a wszystkie inne automatycznie będą niewyróżnione (domyślne). Musisz tutaj wykorzystać zmianę właściwości `isActive` która znajduje się na tej tablicy utworzonej na podstawie obiektu `data`.

- kliknięcie przycisku `delete` usuwa dane tego elementu z tablicy data i tym samym kasuje cały item z wewnątrz którego kliknięto item

`5` - komponent `List` powinien oprócz listy zwracać też przycisk z punktu `1` i ten przycisk będzie slużył do dodawania nowych elementów do listy. Kliknięcie przycisku spowoduje dodanie nowego elementu z losowy mid branym np z `performance.now()` lub `Math.random()` oraz na sztywno zahardcodowane imie i nazwisko `Jan Kowalski`

# useEffect

`1` - usunięcie danego elementu (jego odmontowanie) spowoduje wyświetlenie alertu z napisem `usunięto użytkownika John Smith`. Imię i nazwisko musi odpowiadać faktycznemu imieniu i nazwisku przekazych do tego komponentu `Item` (powinnaś przekazać to jako prop `text` do komponentu `Item`). Wyświetlanie alertu musisz zrobić wewnątrz `useEffect`.

`2` - wewnątrz komponentu `List` stwórz dodatkowy state przy pomocy `useState` o nazwie `isFetching` z funkcją `setIsFetching`. Niech domyślnie `isFetching` będzie `true`

`3` - zamiast wykorzystywać obiekt `data` jako inicjalny state pobierz dane z API do pokemonów. Dostępne są pod linkiem: `https://pokeapi.co/api/v2/pokemon`. listę pokemonów wrzuć do state. Pobieranie pokemonów zrób w `useEffect`. Na czas pobierania niech state `isFetching` będzie `true` a po udanym pobraniu niech będzie `false`. Będzie tutaj potrzebny `fetch()` oraz `async/await` lub `hen().catch()`
Jeśli `isFetching` jest `true` to nie renderuj listy komponentów `Item` tylko wyświetl napis `data is loading . . .`
