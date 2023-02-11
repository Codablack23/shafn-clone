import FooterCopyright from "./modules/FooterCopyright";
import FooterWidgets from "./modules/FooterWidgets";

export default function Footer(){
    return(
        <footer className="ps-footer">
        <div className="container">
            <FooterWidgets />
            {/* <FooterLinks /> */}
            <FooterCopyright />
        </div>
    </footer>
    )
}