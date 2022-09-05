import Link from "next/link"

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h4 className="hero-title text-white text-center">
            Millions of shoppers can't wait to see what you have in store
          </h4>
          <div className="hero-btn-container">
            <Link href="/register">
              <button className="hero-btn">Start Selling</button>
            </Link>

            <Link href="/learn-more">
              <button className="hero-btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
