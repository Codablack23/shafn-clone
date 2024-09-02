import type { Metadata } from "next";
import "./scss/style.scss";
import "./globals.css"
import "bootstrap-icons/font/bootstrap-icons.min.css";
import '@splidejs/react-splide/css';
import CustomReduxProvider from "../redux-store/provider";
import StateProvider from "./components/layouts/StateProvider";
import ScrollProvider from "./components/layouts/ScrollProvider";



export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_TITLE || "ShafN",
  description:process.env.NEXT_PUBLIC_TITLE_DESCRIPTION || "Smarter Beauty Shopping",
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
