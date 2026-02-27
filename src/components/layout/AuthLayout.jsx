import { useState } from 'react';
import fallbackImage from '../../assets/hero-learning.svg';

export default function AuthLayout({
  children,
  heading = 'Welcome Back',
  subheading = 'Continue your learning journey with AI-assisted guidance, clean workflow, and focused practice.',
  panelTag = 'Smart Learning Space',
  panelText = 'Fast. Structured. Contest-Ready.',
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imageSrc, setImageSrc] = useState('/auth-ai.jpg');

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-slate-50 to-purple-100">
      <div className="pointer-events-none absolute -top-24 left-10 h-72 w-72 rounded-full bg-indigo-300/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-300/30 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-stretch px-4 py-6 md:grid-cols-2 md:px-8">
        <section
          className="relative hidden flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-600 to-purple-600 p-10 text-white shadow-sm md:flex"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <img
            src={imageSrc}
            alt="AI assisted learning"
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setImageSrc(fallbackImage)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-indigo-800/45 to-indigo-500/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_35%)]" />
          <div className="absolute left-10 top-16 h-20 w-20 rounded-full bg-white/20 blur-xl animate-float-slow" />
          <div className="absolute bottom-16 right-16 h-28 w-28 rounded-3xl bg-cyan-200/20 blur-lg animate-float-slower" />
          <div className="absolute right-20 top-32 h-10 w-10 rotate-12 rounded-xl bg-pink-300/35 shadow-xl shadow-purple-900/40 animate-float-slow" />

          <div
            className="relative z-10 mt-auto rounded-[1.5rem] border border-white/15 bg-white/10 p-8 backdrop-blur-md transition-transform duration-300"
            style={{ transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
          >
            <h1 className="text-5xl font-semibold leading-tight">{heading}</h1>
            <p className="mt-5 max-w-md text-lg text-white/85">{subheading}</p>
            <div className="mt-10 rounded-2xl border border-white/20 bg-black/15 p-5">
              <p className="text-sm text-white/75">{panelTag}</p>
              <p className="mt-2 text-xl font-semibold">{panelText}</p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center py-6 md:py-0">{children}</section>
      </div>
    </main>
  );
}
