import type { Metadata } from "next";
import "react-image-gallery/styles/css/image-gallery.css";
import "./scss/style.scss";
import "./globals.css"
import "bootstrap-icons/font/bootstrap-icons.min.css";
import '@splidejs/react-splide/css';
import CustomReduxProvider from "../redux-store/provider";
import StateProvider from "./components/layouts/StateProvider";
import ScrollProvider from "./components/layouts/ScrollProvider";
import Script from "next/script";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_TITLE || "ShafN",
  description: process.env.NEXT_PUBLIC_TITLE_DESCRIPTION || "Smarter Beauty Shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <CustomReduxProvider>
          <StateProvider>
            <ScrollProvider>
              {children}
            </ScrollProvider>
          </StateProvider>
        </CustomReduxProvider>
        {/* <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/145933911.js"></script> */}
        <script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/145953484.js"></script>
      </body>
    </html>
  );
}
