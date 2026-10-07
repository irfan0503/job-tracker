export default function Home({ jobCount, applicationCount }) {
  return (
    <div className="page home-page">
      <header className="page-heading">
        <div>
          <p className="eyebrow">YOUR CAREER WORKSPACE</p>
          <h1>Student Job Tracker</h1>
          <p className="heading-copy">Find internships, explore opportunities, and track your applications.</p>
        </div>
        <div className="heading-decoration" aria-hidden="true">
          <div className="decoration-orbit orbit-one" />
          <div className="decoration-orbit orbit-two" />
          <span>✳</span>
        </div>
      </header>

      <div className="home-actions">
        <a className="button button-primary" href="#jobs">Explore jobs <span aria-hidden="true">→</span></a>
        <a className="button button-secondary" href="#applications">Track applications</a>
      </div>

      <section className="stats-grid" aria-label="Tracker summary">
        <article className="stat-card stat-jobs">
          <div className="stat-icon" aria-hidden="true">⌕</div>
          <div className="stat-label">Opportunities to explore</div>
          <div className="stat-value">{jobCount}</div>
          <div className="stat-footnote">Sample internship listings</div>
        </article>
        <article className="stat-card stat-applications">
          <div className="stat-icon" aria-hidden="true">▤</div>
          <div className="stat-label">Applications tracked</div>
          <div className="stat-value">{applicationCount}</div>
          <div className="stat-footnote">Your saved applications</div>
        </article>
      </section>

      <section className="home-lower">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MAKE IT COUNT</p>
            <h2>Keep your search moving</h2>
          </div>
          <a className="text-link" href="#jobs">Browse opportunities <span aria-hidden="true">→</span></a>
        </div>
        <div className="next-step-row">
          <div className="step-number">01</div>
          <div className="step-copy">
            <strong>Find a role that fits</strong>
            <span>Explore sample internships across engineering and software.</span>
          </div>
          <a className="step-arrow" href="#jobs" aria-label="Explore job opportunities">↗</a>
        </div>
        <div className="next-step-row">
          <div className="step-number">02</div>
          <div className="step-copy">
            <strong>Stay on top of every application</strong>
            <span>Record where you applied and keep your status up to date.</span>
          </div>
          <a className="step-arrow" href="#add-application" aria-label="Add a new application">↗</a>
        </div>
      </section>
      <p className="sample-disclaimer"><span aria-hidden="true">i</span> Listings are sample records for this mini project, not verified live vacancies.</p>
    </div>
  );
}
