import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import contactsReducer from "./contactsReducer";
// import { persistContactsReducer } from './contacts/items-slice'

const contactsPersistConfig = {
    key: 'items',
    storage,
    whitelist: ['items'],
    blacklist: ['filter']
}

const persistedContactsReducer = persistReducer(contactsPersistConfig, contactsReducer )

export const store = configureStore(
    {
        reducer: {
            contacts: persistedContactsReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    });

export const persistor = persistStore(store);
