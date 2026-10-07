export default function Footer() {
  return (
    <footer className="site-footer">
      <span>Student Job Tracker <span aria-hidden="true">·</span> Mini Project</span>
      <span>© {new Date().getFullYear()} Student Job Tracker</span>
    </footer>
  );
}
