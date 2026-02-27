const filters = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Web Development', 'AI/ML', 'Design'];

export default function FilterSidebar({ activeFilter, onChange }) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">Filter Courses</h3>
      <div className="space-y-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`w-full rounded-full px-4 py-2 text-left text-sm transition duration-300 ${
              activeFilter === item
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </aside>
  );
}

export { filters as courseFilterOptions };
