import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { createWrapper } from "next-redux-wrapper";

const bindMiddleware = (middleware) => {
    if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
        const { composeWithDevTools } = require("@redux-devtools/extension");
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const persistConfig = {
    key: "martfury",
    storage,
    whitelist: [
        "cart",
        "checkoutItems",
        "compare",
        "auth",
        "wishlist",
        "recentlyViewedProducts",
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        persistedReducer,
        initialState,
        bindMiddleware([sagaMiddleware])
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
}

export default createWrapper(configureStore);
