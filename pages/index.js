import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

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
    text: 'Open source everything. Open source your heart. No gatekeeping, no hustle culture. Just radical openness, mutual aid, and the revolutionary act of just being present, dude.',
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
  'DARMCAMP 2026',
  'TOUCH GRASS',
  'UNPLUG TO PLUG IN',
  'THE GRASS IS GREENER AT DARMCAMP',
]

export default function Home() {
  const marqueeItems = [...MARQUEE_TEXT, ...MARQUEE_TEXT]
  const audioRef = useRef(null)
  const audioStartedRef = useRef(false)
  const [showVideo, setShowVideo] = useState(false)

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
      // Set the flag synchronously to prevent duplicate in-flight play() calls
      // if startAudio fires again before the first promise settles (e.g. rapid scroll).
      // The .catch() handler resets it if the browser blocks autoplay.
      audioStartedRef.current = true
      removeInteractionListeners()
      audio.volume = 0.1

      audio
        .play()
        .then(() => {
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
        })
        .catch(() => {
          // Autoplay was blocked by the browser; reset so the next user
          // interaction can trigger a fresh attempt.
          audioStartedRef.current = false
          addInteractionListeners()
        })
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
            // If blocked, startAudio's catch handler will add interaction listeners.
            startAudio()
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
        <title>DARMCAMP - Go Touch Grass</title>
        <meta name="description" content="DarmCamp - the hacker camp where you unplug, touch grass, and hack the revolution. Join us in the field." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>" />
      </Head>

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="hero">
        <div className="heroBg" aria-hidden="true" />

        <div className="heroContent">
          <p className="heroEyebrow">✦ Mainz, Germany · Summer 2026 ✦</p>

          <h1 className="heroTitle">
            Go<br />
            <span>Touch</span><br />
            Grass
          </h1>

          <p className="heroSubtitle">
            The <strong>universe</strong> is calling you, dear child of the terminal.
            Put down the keyboard. Feel the dew. <em>Be free.</em>
          </p>

          {/* <div className="grassEmojis" aria-hidden="true">
            🌿🌾🍀🌿🌱🌾🌿
          </div> */}
        </div>

        <div className="scrollCta" aria-label="Scroll down">
          <span>Scroll to enlightenment</span>
          <div className="scrollArrow" />
        </div>
      </section>

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
            The fluorescent lights have been lying to you.
            The standing desk, the hot-desk, the cold-brew; none of it is real.
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
            This is a <em>happening</em>; a festival of minds,
            a communion of curious souls who believe that the best debugging environment
            is a meadow at golden hour with a cold drink in your hand.
          </p>
        </div>

        {/* 
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
        </div> */}

        {/* Quote */}
        <div className="quoteBlock fadeUp delay2">
          <p className="quoteText">
            "I came for the <em>open source</em> and stayed for the <em>open sky</em>.
            I touched so much grass, man. I became the grass.
            My pull requests smell like petrichor now."
          </p>
          <p className="quoteAuthor">— Anonymous Attendee, DarmCamp 2025</p>
        </div>

        {/* Feature Cards */}
        {/* <div className="container">
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
        </div> */}

        {/* Second marquee-style text block */}
        <div className="container textCenter mb5" style={{ marginTop: '5rem' }}>
          <p className="sectionLabel">✦ The DarmCamp Manifesto ✦</p>
          <h2 className="sectionTitle fadeUp">
            Touch Grass.<br />
            <span className="accent">Touch Grass.</span><br />
            <span className="blood">TOUCH GRASS.</span>
          </h2>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'var(--text-muted)', maxWidth: '600px', margin: '1.5rem auto 0', lineHeight: 1.8, fontStyle: 'italic' }}>
            Not metaphorically. Not digitally. Not in a simulated environment with haptic feedback.
            With your actual human hands. On actual grass. Under an actual sky.
            This is freedom. This is love. This is DarmCamp.
          </p>
        </div>

        {/* EXPLAINER VIDEO */}
        <div className="container textCenter mb5" style={{ marginTop: '5rem', marginBottom: '8rem' }}>
          <p className="sectionLabel">✦ Why DarmCamp? ✦</p>
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '800px',
              margin: '2rem auto 0',
              aspectRatio: '16/9',
              background: '#000',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: showVideo ? 'default' : 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => !showVideo && setShowVideo(true)}
          >
            {showVideo ? (
              <video 
                src="/assets/explainer.mp4" 
                controls 
                autoPlay 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '85px',
                  height: '85px',
                  borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                  background: 'var(--forest)',
                  border: '2px dashed var(--sage)',
                  color: 'var(--cream)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 32px rgba(45, 106, 79, 0.4)',
                  transition: 'all 0.4s ease',
                  paddingLeft: '0.5rem',
                }}>▶</div>
                <h3 style={{ margin: 0, color: 'var(--cream)', fontSize: '1.5rem', fontFamily: 'inherit', fontStyle: 'italic', fontWeight: '400' }}>See the Vision</h3>
                <p style={{ color: 'var(--sage-light)', marginTop: '0.5rem', fontSize: '1rem' }}>Click to explore the meadow</p>
              </div>
            )}
          </div>
        </div>

            {/* CTA */}
        <div className="ctaBlock fadeUp delay2">
          <h3 className="ctaTitle">Join the Happening</h3>
          <p className="ctaText">
            The earth is patient. The grass grows back every spring.
            But DarmCamp only happens once a year, and brother,
            you do not want to miss it. Sign up. Touch grass.
            Feel the earth reclaim you.
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
          🌿 DARMCAMP · Somewhere in a field · Mainz, Germany ·{' '}
          <a href="mailto:camp@darm.camp">camp@darm.camp</a>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Open source · Open heart · Open field · Go touch grass
        </p>
      </footer>
    </>
  )
}
