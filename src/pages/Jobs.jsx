import { useMemo, useState } from 'react';
import JobCard from '../components/JobCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { internshipJobs } from '../data/jobs.js';

const categories = ['Electronics', 'Embedded Systems', 'IoT', 'Web Development', 'Software'];
const locations = [...new Set(internshipJobs.map((job) => job.location))].sort();

export default function Jobs({ onTrackJob }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const filteredJobs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return internshipJobs.filter((job) => {
      const matchesSearch = !normalizedSearch
        || job.title.toLowerCase().includes(normalizedSearch)
        || job.company.toLowerCase().includes(normalizedSearch);
      return matchesSearch
        && (!category || job.category === category)
        && (!location || job.location === location);
    });
  }, [search, category, location]);

  return (
    <div className="page jobs-page">
      <header className="page-title-row">
        <div>
          <p className="eyebrow">INTERNSHIP DIRECTORY</p>
          <h1>Explore opportunities</h1>
          <p className="heading-copy">A starting point for your next great experience.</p>
        </div>
        <a className="button button-primary" href="#add-application">Add application <span aria-hidden="true">+</span></a>
      </header>
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        location={location}
        onLocationChange={setLocation}
        categories={categories}
        locations={locations}
      />
      <div className="results-summary" aria-live="polite">
        <strong>{filteredJobs.length} {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'}</strong>
        <span>Sample listings · not verified live vacancies</span>
      </div>
      {filteredJobs.length ? (
        <div className="job-grid">
          {filteredJobs.map((job) => <JobCard key={job.id} job={job} onTrack={onTrackJob} />)}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true">⌕</div>
          <h2>No results found</h2>
          <p>Try another title, company, category, or location.</p>
        </div>
      )}
    </div>
  );
}
