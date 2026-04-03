import Head from 'next/head'
import { useEffect, useRef } from 'react'

const FEATURES = [
  {
    icon: '🌿',
    title: 'Touch Grass IRL',
    text: 'Leave the matrix. Kick off your shoes, feel the sacred earth beneath your bare feet, and remember what it means to be alive, man. Real WiFi signals come from the mycelium network.',
  },
  {
    icon: '⚡',
    title: 'High-Voltage Hacking',
    text: 'Bring your soldering iron, your radical ideas, and your most degenerate firmware. We hack nature and nature hacks us back. Power comes from the sun, and so does enlightenment.',
  },
  {
    icon: '🏕️',
    title: 'Camping & Community',
    text: 'Three days of tent-dwelling, fire-gazing, and conspiring with fellow cosmic beings. Share food, share code, share your wildest visions under a sky full of actual stars.',
  },
  {
    icon: '🍄',
    title: 'Workshops & Vibes',
    text: 'From RF hacking in the meadow to analog synths at sunset, every workshop comes with a side of fresh air and the healing frequency of birdsong. Your IDE is the forest.',
  },
  {
    icon: '🌻',
    title: 'Free as in Flower',
    text: 'Open source everything. Open source your heart. No gatekeeping, no hustle culture — just radical openness, mutual aid, and the revolutionary act of just being present, dude.',
  },
  {
    icon: '🩸',
    title: 'Bleed for the Code',
    text: 'Sometimes you cut your finger on the breadboard. Sometimes the thorns get you. This is the price of freedom. Bandages provided. War stories celebrated.',
  },
]

const MARQUEE_TEXT = [
  'GO TOUCH GRASS',
  'FEEL THE EARTH',
  'HACK THE PLANET',
  'BE HERE NOW',
  'DARMCAMP 2025',
  'TOUCH GRASS',
  'UNPLUG TO PLUG IN',
  'THE GRASS IS GREENER AT DARMCAMP',
]

export default function Home() {
  const marqueeItems = [...MARQUEE_TEXT, ...MARQUEE_TEXT]
  const audioRef = useRef(null)
  const audioStartedRef = useRef(false)

  useEffect(() => {
    // Scroll-triggered fade-up animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.fadeUp').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (audioRef.current) return
    const audio = new Audio('/assets/song.mp3')
    audio.loop = true
    audioRef.current = audio

    const hero = document.querySelector('.hero')
    if (!hero) return

    let rampInterval = null

    const startAudio = () => {
      if (audioStartedRef.current) return
      audioStartedRef.current = true
      removeInteractionListeners()
      audio.volume = 0.1
      audio.play().catch(() => {})

      const startTime = Date.now()
      const rampDuration = 10000
      const startVolume = 0.1

      rampInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        if (elapsed >= rampDuration) {
          audio.volume = 1
          clearInterval(rampInterval)
          rampInterval = null
        } else {
          audio.volume = startVolume + (1 - startVolume) * (elapsed / rampDuration)
        }
      }, 100)
    }

    // Browsers require a trusted user gesture (click/key/touch) for audio autoplay.
    // Scroll-based IntersectionObserver triggers alone are blocked by most browsers.
    // Listeners are added only after the hero scrolls out of view.
    const onInteraction = () => startAudio()

    const addInteractionListeners = () => {
      document.addEventListener('click', onInteraction)
      document.addEventListener('keydown', onInteraction)
      document.addEventListener('touchstart', onInteraction)
    }

    const removeInteractionListeners = () => {
      document.removeEventListener('click', onInteraction)
      document.removeEventListener('keydown', onInteraction)
      document.removeEventListener('touchstart', onInteraction)
    }

    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !audioStartedRef.current) {
            // Try direct play — works in browsers that treat scroll as a gesture.
            // If blocked, the interaction listeners added below will start audio.
            startAudio()
            if (!audioStartedRef.current) addInteractionListeners()
          }
        })
      },
      { threshold: 0 }
    )
    heroObserver.observe(hero)

    return () => {
      heroObserver.disconnect()
      if (rampInterval !== null) clearInterval(rampInterval)
      audio.pause()
      removeInteractionListeners()
    }
  }, [])

  return (
    <>
      <Head>
        <title>DARMCAMP — Go Touch Grass</title>
        <meta name="description" content="DarmCamp — the hacker camp where you unplug, touch grass, and hack the revolution. Join us in the field." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </Head>

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="hero">
        <div className="heroBg" aria-hidden="true" />

        <div className="heroContent">
          <p className="heroEyebrow">✦ Darmstadt, Germany · Summer 2025 ✦</p>

          <h1 className="heroTitle">
            Go<br />
            <span>Touch</span><br />
            Grass
          </h1>

          <p className="heroSubtitle">
            The <strong>universe</strong> is calling you, dear child of the terminal.
            Put down the keyboard. Feel the dew. <em>Be free.</em>
          </p>

          <div className="grassEmojis" aria-hidden="true">
            🌿🌾🍀🌿🌱🌾🌿
          </div>
        </div>

        <div className="grassField" aria-hidden="true">
          <div className="grassBlades">
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className="blade"
                style={{
                  height: `${30 + Math.sin(i * 0.7) * 20 + Math.cos(i * 1.3) * 15}px`,
                  opacity: 0.6 + Math.sin(i * 0.5) * 0.3,
                  animationDelay: `${(i * 0.08) % 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="scrollCta" aria-label="Scroll down">
          <span>Scroll to enlightenment</span>
          <div className="scrollArrow" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE
      ═══════════════════════════════════════════ */}
      <div className="marqueeBar" aria-hidden="true">
        <div className="marqueeTrack">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marqueeItem">{item}</span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          ABOUT / MARKETING
      ═══════════════════════════════════════════ */}
      <section className="about" id="about">
        <div className="grassDecoLeft" aria-hidden="true">🌿🌿🌿</div>
        <div className="grassDecoRight" aria-hidden="true">🌿🌿🌿</div>

        {/* Intro copy */}
        <div className="container textCenter mb5">
          <p className="sectionLabel fadeUp delay1">✦ What Is DarmCamp? ✦</p>
          <h2 className="sectionTitle fadeUp delay2">
            Where <span className="accent">Hackers</span> Go<br />
            Back to the <span className="blood">Earth</span>
          </h2>
        </div>

        {/* Manifesto */}
        <div className="manifesto fadeUp delay3">
          <p>
            Listen, brother. Listen, sister. The fluorescent lights have been lying to you.
            The standing desk, the hot-desk, the cold-brew — none of it is real.
            <strong> DarmCamp is real.</strong>
          </p>
          <p>
            We are a tribe of hackers, makers, dreamers, and freaks who gather once a year
            in a field outside Darmstadt to remember the ancient wisdom:
            <em> grass exists, and you can touch it.</em>
          </p>
          <p>
            Three days of camping, hacking, soldering, jamming, stargazing, and communing
            with the mycorrhizal network beneath your feet. Bring your projects.
            Bring your weirdness. <strong>Leave your hustle.</strong>
          </p>
          <p>
            This is not a conference. This is not a hackathon.
            This is a <em>happening</em> — a festival of minds,
            a communion of curious souls who believe that the best debugging environment
            is a meadow at golden hour with a cold drink in your hand.
          </p>
        </div>

        {/* Stats */}
        <div className="statsRow">
          <div className="statItem fadeUp delay1">
            <span className="statNumber">3</span>
            <span className="statLabel">days of grass</span>
          </div>
          <div className="statItem fadeUp delay2">
            <span className="statNumber">∞</span>
            <span className="statLabel">blades touched</span>
          </div>
          <div className="statItem fadeUp delay3">
            <span className="statNumber">100%</span>
            <span className="statLabel">outside</span>
          </div>
          <div className="statItem fadeUp delay4">
            <span className="statNumber">0</span>
            <span className="statLabel">standing desks</span>
          </div>
        </div>

        {/* Quote */}
        <div className="quoteBlock fadeUp delay2">
          <p className="quoteText">
            "I came for the <em>open source</em> and stayed for the <em>open sky</em>.
            I touched so much grass, man. I became the grass.
            My pull requests smell like petrichor now."
          </p>
          <p className="quoteAuthor">— Anonymous Attendee, DarmCamp 2024</p>
        </div>

        {/* Feature Cards */}
        <div className="container">
          <div className="textCenter mb3">
            <p className="sectionLabel">✦ What Awaits You ✦</p>
            <h2 className="sectionTitle fadeUp">
              A <span className="accent">Full-Stack</span> Experience<br />
              of the <span className="blood">Living World</span>
            </h2>
          </div>
          <div className="featureGrid">
            {FEATURES.map((f, i) => (
              <div key={i} className={`featureCard fadeUp delay${(i % 5) + 1}`}>
                <span className="cardIcon">{f.icon}</span>
                <h3 className="cardTitle">{f.title}</h3>
                <p className="cardText">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Second marquee-style text block */}
        <div className="container textCenter mb5" style={{ marginTop: '5rem' }}>
          <p className="sectionLabel">✦ The DarmCamp Manifesto ✦</p>
          <h2 className="sectionTitle fadeUp">
            Touch Grass.<br />
            <span className="accent">Touch Grass.</span><br />
            <span className="blood">TOUCH GRASS.</span>
          </h2>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(249,243,227,0.7)', maxWidth: '600px', margin: '1.5rem auto 0', lineHeight: 1.8, fontStyle: 'italic' }}>
            Not metaphorically. Not digitally. Not in a simulated environment with haptic feedback.
            With your actual human hands. On actual grass. Under an actual sky.
            This is DarmCamp. This is freedom. This is love.
          </p>
        </div>

        {/* CTA */}
        <div className="ctaBlock fadeUp delay2">
          <h3 className="ctaTitle">🌿 Join the Happening 🌿</h3>
          <p className="ctaText">
            The earth is patient. The grass grows back every spring.
            But DarmCamp only happens once a year, and brother,
            you do not want to miss it. Sign up. Touch grass.
            Be transformed.
          </p>
          <a
            href="mailto:camp@darm.camp"
            className="ctaButton"
          >
            🌱 Count Me In
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer className="footer">
        <p>
          🌿 DARMCAMP · Somewhere in a field · Darmstadt, Germany ·{' '}
          <a href="mailto:camp@darm.camp">camp@darm.camp</a>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Open source · Open heart · Open field · Go touch grass
        </p>
      </footer>
    </>
  )
}
