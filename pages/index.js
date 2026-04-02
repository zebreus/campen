import Head from 'next/head'

const FEATURES = [
  {
    title: 'Built for Builders',
    text: 'Join makers, hackers, and creators in a focused outdoor environment designed for meaningful collaboration.',
  },
  {
    title: 'Nature-First Atmosphere',
    text: 'A calm grass landscape and open sky provide the perfect backdrop for deep work and fresh ideas.',
  },
  {
    title: 'Workshops & Talks',
    text: 'Hands-on sessions, practical demos, and short talks from people shipping real things.',
  },
  {
    title: 'Community & Campfires',
    text: 'Meet thoughtful people, share projects, and end the day with reflective conversations under the stars.',
  },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>DarmCamp — Modern Camp Experience</title>
        <meta
          name="description"
          content="A sleek modern camp landing page with glassmorphism, reflections, and a nature-inspired atmosphere."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(167,243,208,0.2),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_35%),linear-gradient(to_bottom,rgba(16,185,129,0.35),rgba(6,78,59,0.75))]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1800&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'soft-light',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-10 md:px-10">
          <header className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <p className="text-sm font-semibold tracking-[0.2em] text-emerald-100">DARMCAMP</p>
            <a
              href="mailto:camp@darm.camp"
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/90 transition hover:bg-white/20"
            >
              Contact
            </a>
          </header>

          <section className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/25 bg-white/10 p-7 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_30px_60px_rgba(0,0,0,0.35)] md:p-10">
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-emerald-100/90">Darmstadt · Summer 2026</p>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
                Contemporary camp culture,
                <span className="block bg-gradient-to-r from-emerald-100 via-lime-100 to-white bg-clip-text text-transparent">
                  crafted with glass and light.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-emerald-50/90 md:text-lg">
                A sleek modern gathering for people who build. Reflective surfaces, calm green surroundings, and real connection in nature.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:camp@darm.camp"
                  className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-950 transition hover:bg-white"
                >
                  Join DarmCamp
                </a>
                <a
                  href="#features"
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/20"
                >
                  Explore
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/25 bg-white/10 p-6 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_30px_60px_rgba(0,0,0,0.3)] md:p-8">
              <div className="rounded-2xl border border-white/30 bg-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/90">Next Event</p>
                <p className="mt-3 text-3xl font-semibold text-white">3 Days</p>
                <p className="mt-1 text-sm text-emerald-50/90">Talks, workshops, open-air hacking</p>
              </div>
              <div className="mt-4 rounded-2xl border border-white/30 bg-gradient-to-br from-white/30 to-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/90">Theme</p>
                <p className="mt-2 text-lg font-medium text-white">Nature meets modern craft</p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-50/90">A fresh visual language built on grass tones, transparency, and reflective depth.</p>
              </div>
            </div>
          </section>

          <section id="features" className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_20px_40px_rgba(0,0,0,0.25)]"
              >
                <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-emerald-50/90">{feature.text}</p>
              </article>
            ))}
          </section>

          <footer className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-center text-xs uppercase tracking-[0.18em] text-emerald-100/90 backdrop-blur-xl">
            DarmCamp · camp@darm.camp · Touch grass, build together
          </footer>
        </div>
      </main>
    </>
  )
}
