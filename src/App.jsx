import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Jobs from './pages/Jobs.jsx';
import AddApplication from './pages/AddApplication.jsx';
import Applications from './pages/Applications.jsx';

const STORAGE_KEY = 'student-job-tracker-applications';
const VALID_PAGES = ['home', 'jobs', 'add-application', 'applications'];

function readApplications() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Could not read saved applications:', error);
    return [];
  }
}

function getPageFromHash() {
  const page = window.location.hash.slice(1);
  return VALID_PAGES.includes(page) ? page : 'home';
}

export default function App() {
  const [applications, setApplications] = useState(readApplications);
  const [page, setPage] = useState(getPageFromHash);
  const [applicationDraft, setApplicationDraft] = useState(null);
  const [storageError, setStorageError] = useState('');

  useEffect(() => {
    function syncPage() {
      setPage(getPageFromHash());
    }
    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);

  function saveApplications(nextApplications) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextApplications));
      setApplications(nextApplications);
      setStorageError('');
      return true;
    } catch (error) {
      console.error('Could not save applications:', error);
      setStorageError('Your browser could not save this change. Check that local storage is enabled and try again.');
      return false;
    }
  }

  function addApplication(application) {
    const nextApplications = [...applications, { ...application, id: `${Date.now()}-${Math.random().toString(16).slice(2)}` }];
    return saveApplications(nextApplications);
  }

  function deleteApplication(applicationId) {
    const nextApplications = applications.filter((application) => application.id !== applicationId);
    return saveApplications(nextApplications);
  }

  function trackJob(job) {
    setApplicationDraft({ jobTitle: job.title, companyName: job.company });
    window.location.hash = 'add-application';
  }

  let currentPage;
  if (page === 'jobs') {
    currentPage = <Jobs onTrackJob={trackJob} />;
  } else if (page === 'add-application') {
    currentPage = (
      <AddApplication
        draft={applicationDraft}
        onSaved={() => setApplicationDraft(null)}
        onSubmit={addApplication}
      />
    );
  } else if (page === 'applications') {
    currentPage = <Applications applications={applications} onDelete={deleteApplication} />;
  } else {
    currentPage = <Home jobCount={10} applicationCount={applications.length} />;
  }

  return (
    <div className="app-shell">
      <Navbar activePage={page} applicationCount={applications.length} />
      <main className="app-main">
        {storageError && <div className="storage-alert" role="alert">{storageError}</div>}
        {currentPage}
        <Footer />
      </main>
    </div>
  );
}
