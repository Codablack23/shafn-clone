import { ConfigProvider } from 'antd';
// import App from "next/app";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import withReduxSaga from "next-redux-saga";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import wrapper from "../store/store";
import DefaultLayout from "../components/layouts/DefaultLayout";
import "../public/static/css/bootstrap.min.css";
import "../scss/style.scss";
import "../scss/home-default.scss";
import "../scss/market-place-1.scss";
import "slick-carousel/slick/slick.css";
import { CookiesProvider } from "react-cookie";
import "bootstrap-icons/font/bootstrap-icons.css";
import '@splidejs/react-splide/css';


/*import '../scss/electronic.scss';
import '../scss/furniture.scss';
import '../scss/organic.scss';
import '../scss/technology.scss';
import '../scss/autopart.scss';
import '../scss/electronic.scss';*/

// class MyApp extends App {
//     constructor(props) {
//         super(props);
//         this.persistor = persistStore(props.store);
//     }

//     componentDidMount() {
//         setTimeout(function () {
//             document.getElementById("__next").classList.add("loaded");
//         }, 100);

//         this.setState({ open: true });
//     }
//     render() {
//         const { Component, pageProps, store } = this.props;
//         const getLayout =
//             Component.getLayout ||
//             ((page) => <DefaultLayout children={page} />);
//         return getLayout(
//             <ConfigProvider>
//                 <Provider store={store}>
//                     <PersistGate
//                         loading={<Component {...pageProps} />}
//                         persistor={this.persistor}>
//                         <CookiesProvider>
//                             <Component {...pageProps} />
//                         </CookiesProvider>
//                     </PersistGate>
//                 </Provider>
//             </ConfigProvider>
//         );
//     }
// }

function App({Component, pageProps,}) {
    useEffect(() => {
        setTimeout(function () {
            document.getElementById("__next").classList.add("loaded");
        }, 100);
    },[])
    return(
        <DefaultLayout>
            <ConfigProvider>
                    <CookiesProvider>
                        <Component {...pageProps} />
                    </CookiesProvider>
            </ConfigProvider>
        </DefaultLayout>
    )
}

export default wrapper.withRedux(App);
