import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// const initialContacts = [
//     {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//     {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//     {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//     {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
//   ];

  const itemsSlice = createSlice({
    name: "items",
    initialState: [],
    reducers: {
        addContact: {
            reducer: (store, {payload}) => {
                store.push(payload);
            },
            prepare: (data) => {
              return {
                  payload: {
                      ...data,
                      id: nanoid()
                  }
              }
          }
        },
        removeContact: (store, {payload}) => store.filter(({id}) => id !== payload)
    }
});

export const { addContact, removeContact } = itemsSlice.actions;
export default itemsSlice.reducer;
