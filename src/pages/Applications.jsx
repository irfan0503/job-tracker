import { useState } from 'react';

const statuses = ['Applied', 'Interview', 'Selected', 'Rejected'];

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? dateString
    : new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

export default function Applications({ applications, onDelete }) {
  const [statusFilter, setStatusFilter] = useState('');
  const visibleApplications = applications.filter((application) => !statusFilter || application.status === statusFilter);

  function confirmDelete(application) {
    const confirmed = window.confirm(`Delete the application for ${application.jobTitle} at ${application.companyName}?`);
    if (confirmed) onDelete(application.id);
  }

  return (
    <div className="page applications-page">
      <header className="page-title-row">
        <div>
          <p className="eyebrow">YOUR CAREER PIPELINE</p>
          <h1>My applications</h1>
          <p className="heading-copy">A clear view of every opportunity you are pursuing.</p>
        </div>
        <a className="button button-primary" href="#add-application">Add application <span aria-hidden="true">+</span></a>
      </header>
      <section className="application-summary" aria-label="Application summary">
        <div className="summary-mark" aria-hidden="true">▤</div>
        <div><span>Total tracked</span><strong>{applications.length}</strong></div>
        <div className="summary-divider" />
        <div className="summary-support">Your applications stay saved in this browser.</div>
      </section>
      <section className="application-list-section">
        <div className="list-toolbar">
          <div><h2>Application log</h2><span>{visibleApplications.length} shown</span></div>
          <label className="status-filter">
            <span>Filter status</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="">All statuses</option>
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
        </div>
        {visibleApplications.length ? (
          <div className="table-scroll">
            <table className="applications-table">
              <thead><tr><th>Opportunity</th><th>Student</th><th>Applied on</th><th>Status</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
              <tbody>
                {visibleApplications.map((application) => (
                  <tr key={application.id}>
                    <td><strong>{application.jobTitle}</strong><span className="table-company">{application.companyName}</span></td>
                    <td><span className="student-cell"><span className="student-avatar" aria-hidden="true">{application.studentName.trim().slice(0, 1).toUpperCase()}</span>{application.studentName}</span></td>
                    <td>{formatDate(application.applicationDate)}</td>
                    <td><span className={`status-badge status-${application.status.toLowerCase()}`}><span aria-hidden="true" />{application.status}</span></td>
                    <td><button className="delete-button" type="button" onClick={() => confirmDelete(application)} aria-label={`Delete ${application.jobTitle} at ${application.companyName}`}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state table-empty">
            <div className="empty-icon" aria-hidden="true">▤</div>
            <h2>No applications found</h2>
            <p>{applications.length ? 'No applications match this status. Choose another filter.' : 'Add an application to start building your career pipeline.'}</p>
            {!applications.length && <a className="button button-primary button-small" href="#add-application">Add your first application</a>}
          </div>
        )}
      </section>
    </div>
  );
}
