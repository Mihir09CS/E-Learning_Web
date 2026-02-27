import { useState } from 'react';
import Modal from '../ui/Modal.jsx';
import ChatWindow from './ChatWindow.jsx';

const capabilities = [
  'Frontend concepts (HTML, CSS, JS, React, Tailwind)',
  'Web development basics (routing, API flow, state, responsive UI)',
  'This platform navigation (dashboard, courses, player, profile, admin, help)',
  'Course recommendations and next learning steps',
  'Debugging guidance for common UI/UX issues',
];

const cannedReply = (message) => {
  const text = message.toLowerCase();
  if (text.includes('what can you do') || text.includes('help with') || text.includes('capabilities')) {
    return 'I can help with frontend/web concepts, site navigation, course recommendations, and UI debugging tips.';
  }
  if (text.includes('html') || text.includes('css') || text.includes('javascript') || text.includes('react') || text.includes('tailwind')) {
    return 'For frontend topics, I can explain concepts, suggest best practices, and give step-by-step examples for HTML/CSS/JS/React/Tailwind.';
  }
  if (text.includes('responsive') || text.includes('mobile')) {
    return 'Responsive tip: use mobile-first layout, consistent spacing scales, and breakpoints with flexible grids and fluid media.';
  }
  if (text.includes('api') || text.includes('backend') || text.includes('fetch')) {
    return 'Web flow tip: API calls should handle loading, success, and error states clearly, and responses should map to predictable UI state.';
  }
  if (text.includes('bug') || text.includes('error') || text.includes('fix')) {
    return 'Debug flow: isolate component -> check props/state -> validate render conditions -> inspect network/console -> apply minimal fix.';
  }
  if (text.includes('doubt') || text.includes('confuse')) {
    return 'Break the topic into fundamentals first, then practice one real example. Tell me the exact doubt and I can simplify it.';
  }
  if (text.includes('concept') || text.includes('explain')) {
    return 'Concept tip: focus on what, why, and when to use it. I can explain any term in simple steps.';
  }
  if (text.includes('navigation') || text.includes('where')) {
    return 'Use Dashboard for progress, Courses for catalog, and Course Player to continue lessons step-by-step.';
  }
  if (text.includes('recommend') || text.includes('course')) {
    return 'Recommended path: React Foundation -> UI Systems with Tailwind -> AI Productivity Workflows.';
  }
  if (text.includes('progress')) return 'You are on track. Complete the next lesson to increase your progress.';
  if (text.includes('next')) return 'Next step: finish the current lesson and try the quick recap quiz.';
  return 'I can answer doubts, explain concepts, guide navigation, and recommend courses.';
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi, I am your learning assistant. I can help with frontend/web concepts, platform navigation, and course guidance.',
    },
  ]);
  const suggestions = [
    'Explain this concept simply',
    'Recommend next course',
    'How do I track progress?',
    'Guide me to course player',
  ];

  const pushMessage = (text) => {
    if (!text.trim()) return;
    const userMessage = { id: Date.now(), sender: 'user', text: text.trim() };
    const botMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      text: cannedReply(text),
    };
    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    pushMessage(input);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className="fixed bottom-5 right-5 z-40 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700"
      >
        AI Helper
      </button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="AI Learning Assistant">
        <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">What I can answer</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            {capabilities.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-3 flex justify-end">
          <button className="btn-secondary" onClick={() => setIsMinimized((prev) => !prev)}>
            {isMinimized ? 'Expand' : 'Minimize'}
          </button>
        </div>
        {isMinimized ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Chat minimized. Click Expand to continue.
          </div>
        ) : (
          <ChatWindow
            messages={messages}
            input={input}
            setInput={setInput}
            onSend={handleSend}
            suggestions={suggestions}
            onSuggestionClick={(question) => pushMessage(question)}
          />
        )}
      </Modal>
    </>
  );
}
