export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4" onClick={onClose}>
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700" aria-label="Close">
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
