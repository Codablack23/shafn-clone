import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white ps__main-header">
      <nav className="ps__navbar ps__page-container">
        <div className="brand-container">
          <Link href={"/"}>
            <a>
              <img src={"/img/logo_light.png"} alt="logo" />
            </a>
          </Link>
        </div>
        <div className="ps__navlinks">
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/register">
            <a>Sign up</a>
          </Link>
        </div>
      </nav>
    </header>
  )
}
