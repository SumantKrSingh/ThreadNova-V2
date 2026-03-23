import './About.scss'
const stats = [
  { id: 1, number: '500+', label: 'Products available' },
  { id: 2, number: '12K+', label: 'Happy customers' },
  { id: 3, number: '50%', label: 'Sale day discounts' },
  { id: 4, number: '2', label: 'Years in fashion' },
]

const cards = [
  {
    id: 1,
    icon: '⭐',
    title: 'Premium Quality',
    desc: "Every piece is carefully selected for fabric quality, stitching, and finish. We don't compromise on what touches your skin.",
  },
  {
    id: 2,
    icon: '✅',
    title: 'Honest Pricing',
    desc: 'No hidden markups. What you see is what you pay. Real discounts on real prices.',
  },
  {
    id: 3,
    icon: '👤',
    title: 'For Everyone',
    desc: 'Fashion has no boundaries. Our collection covers men, women, and all occasions.',
  },
]

const timeline = [
  {
    id: 1,
    year: '2023',
    detail:
      'Thread~Nova launches with 50 products and a simple mission — great fashion at honest prices.',
    desc: 'We started Thread~Nova with one question — why does finding good clothes have to be so hard? Too many options, poor quality, inflated prices.',
  },
  {
    id: 2,
    year: '2024',
    detail:
      "Expanded to 500+ products across men's, women's, and accessories. Hit 10,000 happy customers.",
    desc: 'So we built something different. A curated store where every product earns its place — tested for quality, priced fairly, and presented honestly.',
  },
  {
    id: 3,
    year: '2025',
    detail: 'Launched sale events, introduced new seasonal collections and multi-currency support.',
    desc: "Today Thread~Nova serves thousands of customers across India, with a growing catalog of men's and women's fashion that keeps getting better.",
  },
]

const heroCategories = ["Men's Wear", "Women's Wear", 'New Arrivals', 'Accessories']

function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-tag">OUR STORY</span>
            <h1 className="hero-title">
              Fashion that <span className="hero-highlight">speaks</span> for itself
            </h1>
            <p className="hero-description">
              Thread~Nova was born from a simple belief — great style shouldn't cost a fortune. We
              curate premium clothing for men and women who value quality, comfort, and
              individuality.
            </p>
            <button type="button" className="hero-btn">
              Shop the collection
            </button>
          </div>
          <div className="hero-media">
            <div className="hero-grid">
              {heroCategories.map((label, i) => (
                <div key={i} className="hero-grid-item">
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        {stats.map(({ id, number, label }) => (
          <div className="stats-data" key={id}>
            <h2 className="stats-number">{number}</h2>
            <span className="stats-label">{label}</span>
          </div>
        ))}
      </section>

      {/* Values Section */}
      <section className="value-cards">
        <div className="value-text">
          <span className="value-tag">WHAT WE STAND FOR</span>
          <h2 className="value-title">Our values</h2>
        </div>
        <div className="cards-container">
          {cards.map(({ id, icon, title, desc }) => (
            <div className="card" key={id}>
              <span className="card-icon">{icon}</span>
              <h3 className="card-title">{title}</h3>
              <span className="card-desc">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-history">
        <div className="timeline-content">
          <span className="timeline-tag">HOW IT STARTED</span>
          <h2 className="timeline-title">The Thread~Nova story</h2>
          {timeline.map(({ id, desc }) => (
            <p className="timeline-desc" key={id}>
              {desc}
            </p>
          ))}
        </div>
        <div className="timeline">
          {timeline.map(({ id, year, detail }) => (
            <div className="timeline-item" key={id}>
              <span className="timeline-year">{year}</span>
              <p className="timeline-detail">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2 className="cta-heading">Ready to find your style?</h2>
        <p className="cta-desc">
          Browse hundreds of curated pieces for men and women — new arrivals every week.
        </p>
        <div className="cta-actions">
          <button type="button" className="cta-btn">
            Shop Now
          </button>
          <button type="button" className="cta-btn">
            Contact Us
          </button>
        </div>
      </section>
    </>
  )
}

export default About
