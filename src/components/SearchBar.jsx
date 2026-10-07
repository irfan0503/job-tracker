export default function SearchBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  location,
  onLocationChange,
  categories,
  locations,
}) {
  return (
    <section className="filter-panel" aria-label="Filter internship opportunities">
      <label className="search-field">
        <span className="field-icon" aria-hidden="true">⌕</span>
        <span className="visually-hidden">Search by job title or company</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search roles or companies"
        />
      </label>
      <label className="select-field">
        <span className="visually-hidden">Filter by category</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="">All categories</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      <label className="select-field">
        <span className="visually-hidden">Filter by location</span>
        <select value={location} onChange={(event) => onLocationChange(event.target.value)}>
          <option value="">All locations</option>
          {locations.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      {(search || category || location) && (
        <button
          className="button button-quiet clear-filters"
          type="button"
          onClick={() => {
            onSearchChange('');
            onCategoryChange('');
            onLocationChange('');
          }}
        >
          Clear filters
        </button>
      )}
    </section>
  );
}
