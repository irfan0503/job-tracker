export default function JobCard({ job, onTrack }) {
  const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(`${job.title} ${job.company} internship`)}`;

  return (
    <article className="job-card">
      <div className="job-card-topline">
        <div className="company-avatar" aria-hidden="true">{job.company.slice(0, 1)}</div>
        <span className="job-type">{job.type}</span>
      </div>
      <p className="job-company">{job.company}</p>
      <h2>{job.title}</h2>
      <p className="job-description">{job.description}</p>
      <div className="job-meta">
        <span><span aria-hidden="true">⌖</span>{job.location}</span>
        <span className="category-pill">{job.category}</span>
      </div>
      <div className="job-actions">
        <a className="text-link" href={searchUrl} target="_blank" rel="noreferrer">
          Search openings <span aria-hidden="true">↗</span>
        </a>
        <button className="button button-primary button-small" type="button" onClick={() => onTrack(job)}>
          Track application <span aria-hidden="true">+</span>
        </button>
      </div>
    </article>
  );
}
