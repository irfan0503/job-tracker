# Job Tracker – Student Internship Directory

A beginner-friendly React and Vite mini project for exploring sample internships and tracking application progress. Listings are sample records, not verified live vacancies. Application data is stored only in this browser's local storage.

## Run the project

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`.

## Project walkthrough

- `Navbar.jsx` provides responsive navigation and highlights the active view.
- `JobCard.jsx` renders one sample internship and its search and tracking actions.
- `SearchBar.jsx` combines title/company search with category and location filters.
- `Home.jsx` displays the project introduction and live job/application counts.
- `Jobs.jsx` filters the sample dataset and renders reusable job cards.
- `AddApplication.jsx` validates and saves a student's application details.
- `Applications.jsx` filters saved records by status and confirms before deletion.
- `App.jsx` coordinates page navigation, shared application state, and local storage.
- `index.css` contains the responsive purple dashboard design without a UI framework.
