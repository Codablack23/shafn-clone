import Head from "next/head";
import Header from "../home/Header";
import ModalCookie from "../home/modalCookie";

export default function HomepageLayout({children,title,page}){
    return (
        <div className="ps__vendor-homepage">
        <Head>
            <title>ShafN | {title?title:'Home'}</title>
        </Head>
        <Header/>
        {children}
        {page != "accounts" &&  <ModalCookie/>}
        
        </div>
    )
}