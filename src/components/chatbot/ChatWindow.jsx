export default function ChatWindow({ messages, input, setInput, onSend, suggestions = [], onSuggestionClick }) {
  return (
    <div className="flex h-[420px] flex-col">
      <div className="mb-3 flex-1 space-y-2 overflow-y-auto rounded-xl bg-slate-50 p-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
              message.sender === 'user'
                ? 'ml-auto bg-indigo-600 text-white'
                : 'border border-slate-200 bg-white text-slate-700'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {suggestions.length ? (
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => onSuggestionClick?.(item)}
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
        className="flex gap-2"
      >
        <input
          className="input-base"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about lessons, progress, or next steps..."
        />
        <button className="btn-primary" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
