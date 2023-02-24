import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
// import createWebStorage from "redux-persist/es/storage/createWebStorage";
import storage from "redux-persist/lib/storage";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { createWrapper } from "next-redux-wrapper";

const bindMiddleware = (middleware) => {
  if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// const createNoopStorage = () => {
//   return {
//     getItem(_key) {
//       return Promise.resolve(null);
//     },
//     setItem(_key, value) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key) {
//       return Promise.resolve();
//     },
//   };
// };

// const storage =
//   typeof window !== "undefined"
//     ? createWebStorage("local")
//     : createNoopStorage();

const persistConfig = {
  key: "shafn",
  storage,
  blacklist: ["configs"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
let persistor;

const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(persistedReducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  persistor = persistStore(store);

  return store;
};

const wrapper = createWrapper(makeStore, { debug: false });

export { makeStore, persistor, wrapper };
