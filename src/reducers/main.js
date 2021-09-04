import filterTextReducer from "./filterTextReducer";
import itemInfoReducer from "./itemInfoReducer";
import popUpInfoReducer from "./popUpInfoReducer";
import { combineReducers } from "redux";
import {
  donePageNumberReducer,
  pinPageNumberReducer,
  todoPageNumberReducer,
} from "./pageNumberReducer";
import {
  doneLoadingReducer,
  pinLoadingReducer,
  todoLoadingReducer,
} from "./setLoadingReducer";
import countReducer from "./countReducer";
import isPopUpReducer from "./isPopUpReducer";
import isFilteredReducer from "./isFilteredReducer";
import filterItemsReducer from "./filterItemsReducer";
import pinItemsReducer from "./pinItemsReducer";
import doneItemsReducer from "./doneItemsReducer";
import itemsReducer from "./itemsReducer";
import editItemReducer from "./editItemReducer";

const allReducers = combineReducers({
  filterText: filterTextReducer,
  itemInfo: itemInfoReducer,
  popUpInfo: popUpInfoReducer,
  todoPageNumber: todoPageNumberReducer,
  donePageNumber: donePageNumberReducer,
  pinPageNumber: pinPageNumberReducer,
  todoLoading: todoLoadingReducer,
  pinLoading: pinLoadingReducer,
  doneLoading: doneLoadingReducer,
  count: countReducer,
  isPopUp: isPopUpReducer,
  isFiltered: isFilteredReducer,
  filterItems: filterItemsReducer,
  pinItems: pinItemsReducer,
  doneItems: doneItemsReducer,
  items: itemsReducer,
  editItem: editItemReducer,
});

export default allReducers;
