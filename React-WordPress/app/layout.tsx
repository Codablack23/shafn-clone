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
import LanguageSwitcher from "./components/LanguageSwitcher";



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
    <html>
        <Script
          src="/scripts/lang-config.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/scripts/translation.js"
          strategy="beforeInteractive"
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />
      <body>
        <CustomReduxProvider>
          <StateProvider>
            <ScrollProvider>
              {children}
            </ScrollProvider>
          </StateProvider>
        </CustomReduxProvider>
        <LanguageSwitcher/>
      </body>
    </html>
  );
}
