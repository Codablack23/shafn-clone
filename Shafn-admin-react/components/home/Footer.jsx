import FooterCopyright from "./modules/FooterCopyright";
import FooterWidgets from "./modules/FooterWidgets";

export default function Footer() {
  return (
    <footer className="ps-footer">
      <div className="ps-footer__content_wrapper container">
        <FooterWidgets />
        {/* <FooterLinks /> */}
        <FooterCopyright />
      </div>
    </footer>
  );
}
