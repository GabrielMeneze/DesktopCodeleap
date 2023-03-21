import { configureStore } from "@reduxjs/toolkit";
import { DataReducer } from "../features/redux-slice";
import storage from 'redux-persist/lib/storage';

import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, DataReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})


export const persistor = persistStore(store)

