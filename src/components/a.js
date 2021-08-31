// let endIndex = currentPage * 3;
// let startIndex = endIndex - 3;
// let paginatedItems = items.slice(startIndex, endIndex);
// let paginatedItems = items;
// let doneStateItems = doneItems;
// let pinStateItems = pinItems;

// window.addEventListener("popstate", (event) => {
//   console.log(event.state);
//   paginatedItems = event.state.todo;
//   doneStateItems = event.state.done;
//   pinStateItems = event.state.pin;
//   // setItems(event.state.todo);
//   // setDoneItems(event.state.done);
//   // setPinItems(event.state.pin);
// });

// console.log(paginatedItems);
// console.log(doneStateItems);
// console.log(pinStateItems);
// if (location.state !== undefined) {
//   setItems(location.state.todo);
//   setDoneItems(location.state.done);
//   setPinItems(location.state.pin);
// } else {
//   setItems([]);
//   setDoneItems([]);
//   setPinItems([]);
// }

// const history = useHistory();
// useEffect(() => {
//   console.log("loaded");
//   window.history.replaceState({ todo: [], done: [], pin: [] }, null, "/");
// }, []);

// window.history.pushState(
//   { todo: items, done: doneItems, pin: pinItems },
//   null,
//   "/"
// );
// history.push({
//   state: {
//     todo: items,
//     done: doneItems,
//     pin: pinItems,
//   },
// });

// import Pagination from "./Pagination";
// const [currentPage, setCurrentPage] = useState(1);
// function changePageNumber(pgNumber) {
//   setCurrentPage(pgNumber);
// }

/* <Pagination
            total={items.length}
            toChange={changePageNumber}
            currentPage={currentPage}
          /> */

//   let timeoutID;
//   function debouncedVersion(mainFn, delay) {
//     return function () {
//       if (timeoutID) {
//         clearTimeout(timeoutID);
//       }

//       timeoutID = setTimeout(() => {
//         mainFn();
//       }, delay);
//     };
//   }
