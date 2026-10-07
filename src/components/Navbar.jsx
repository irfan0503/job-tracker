const links = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'jobs', label: 'Jobs', icon: '⌕' },
  { id: 'add-application', label: 'Add Application', icon: '+' },
  { id: 'applications', label: 'Applications', icon: '▤' },
];

export default function Navbar({ activePage, applicationCount }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#home" aria-label="Job Tracker home">
        <span className="brand-mark" aria-hidden="true">J</span>
        <span>Job <span className="brand-light">Tracker</span></span>
      </a>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="primary-nav" aria-label="Main navigation">
        {links.map((link) => (
          <a
            className={`nav-link ${activePage === link.id ? 'active' : ''}`}
            href={`#${link.id}`}
            aria-current={activePage === link.id ? 'page' : undefined}
            key={link.id}
          >
            <span className="nav-icon" aria-hidden="true">{link.icon}</span>
            <span>{link.label}</span>
            {link.id === 'applications' && applicationCount > 0 && (
              <span className="nav-count">{applicationCount}</span>
            )}
          </a>
        ))}
      </nav>
      <div className="sidebar-note">
        <div className="note-symbol" aria-hidden="true">✦</div>
        <p className="note-title">Small steps, big careers.</p>
        <p>Keep every opportunity in one place and make your next move with confidence.</p>
      </div>
      <div className="profile-row">
        <div className="profile-avatar" aria-hidden="true">ST</div>
        <div><strong>Student workspace</strong><span>Internship search</span></div>
      </div>
    </aside>
  );
}
