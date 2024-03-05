import {configureStore, combineReducers, Tuple} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {createLogger} from 'redux-logger';
import {thunk} from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import userSlice from './features/user/userSlice';

const rootReducer = combineReducers({
    user: userSlice,
},);

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([thunk, createLogger()]),
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store)
export default store;