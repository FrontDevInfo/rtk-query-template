import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {cardsAPI} from "./services/cardsAPI.js";
import {fileAPI} from "./services/fileAPI.js";

const rootReducer = combineReducers({
    // можно добавить и обычные редьюсеры redux
    [cardsAPI.reducerPath]: cardsAPI.reducer,
    [fileAPI.reducerPath]: fileAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(cardsAPI.middleware)
                .concat(fileAPI.middleware)
    })
}
