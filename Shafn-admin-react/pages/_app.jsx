import React, { useEffect } from "react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
// import '../../../styles/_custom.scss'

// import DefaultLayout from "@/components/layouts/DefaultLayout"
import { makeStore, persistor, wrapper } from "@/store/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.min.css";
import "@/styles/style.scss";

// import "@/styles/_custom.scss";
import { Provider } from "react-redux";

function App({ Component, pageProps }) {
  //   const getLayout =
  //     Component.getLayout || ((page) => <DefaultLayout children={page} />)
  useEffect(() => {
    setTimeout(function () {
      document.getElementById("__next").classList.add("loaded");
    }, 100);
  }, []);
  // return getLayout(<Component {...pageProps} />);
  return (
    <Provider store={makeStore()}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(App);
