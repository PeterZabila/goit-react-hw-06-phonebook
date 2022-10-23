import { combineReducers } from "redux";

import items from "./contacts/items-slice";
import filter from "./filter/filter-slice";

const contactsReducer = combineReducers({
    items,
    filter,
});

export default contactsReducer;