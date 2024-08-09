import type { Metadata } from "next";
import "./scss/style.scss";
import "./globals.css"
import "bootstrap-icons/font/bootstrap-icons.min.css";
import '@splidejs/react-splide/css';
import CustomReduxProvider from "../redux-store/provider";
import StateProvider from "./components/layouts/StateProvider";
import ScrollProvider from "./components/layouts/ScrollProvider";



export const metadata: Metadata = {
  title: "ShafN |  We are here to serve you",
  description: "ShafN We are here to serve you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomReduxProvider>
          <StateProvider>
            <ScrollProvider>
              {children}
            </ScrollProvider>
          </StateProvider>
        </CustomReduxProvider>
      </body>
    </html>
  );
}
