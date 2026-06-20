/* Me contacter — contact page.
   Reuses the established design system (tokens, type, nav). */

function ContactPage({ accent = '#6E8E3A', accentSoft = '#DAEACD', accentInk = '#355C1E' }) {
  const [lang, setLangState] = React.useState(() => window.getInitialLang ? window.getInitialLang() : 'fr');
  const setLang = (l) => { window.setLangPref && window.setLangPref(l); setLangState(l); };
  const [theme, setThemeState] = React.useState(() => window.getInitialTheme ? window.getInitialTheme() : 'light');
  const setTheme = (val) => { window.setThemePref && window.setThemePref(val); setThemeState(val); };
  React.useEffect(() => {}, []);
  const [hoveredCard, setHoveredCard] = React.useState('linkedin');
  const t = I18N[lang];
  useContentVersion();

  let L = lang === 'fr' ? {
    title: 'Me contacter',
    intro: "Un projet en tête ? Une question ? Je serais ravi d'échanger avec vous.",
    email: 'Email',
    emailValue: 'irmane@hotmail.fr',
    linkedin: 'LinkedIn',
    linkedinValue: 'Connectons-nous',
    formTitle: 'Envoyez-moi un message',
    nameLabel: 'Nom',
    namePh: 'Votre nom',
    emailLabel: 'Email',
    emailPh: 'email@exemple.com',
    msgLabel: 'Message',
    msgPh: 'Un service, une question, un petit coucou…',
    send: 'Envoyer mon message',
    sent: 'Message envoyé · Merci !',
    errName: 'Merci d’indiquer votre nom.',
    errEmail: 'Adresse email invalide.',
    errEmailRequired: 'L’email est requis.',
    errMessage: 'Votre message ne peut pas être vide.',
  } : {
    title: 'Get in touch',
    intro: "A project in mind? A question? I'd be glad to hear from you.",
    email: 'Email',
    emailValue: 'irmane@hotmail.fr',
    linkedin: 'LinkedIn',
    linkedinValue: "Let's connect",
    formTitle: 'Send me a message',
    nameLabel: 'Name',
    namePh: 'Your name',
    emailLabel: 'Email',
    emailPh: 'email@example.com',
    msgLabel: 'Message',
    msgPh: 'A service, a question, just saying hi…',
    send: 'Send my message',
    sent: 'Message sent · Thank you!',
    errName: 'Please enter your name.',
    errEmail: 'Invalid email address.',
    errEmailRequired: 'Email is required.',
    errMessage: 'Your message cannot be empty.',
  };
  L = applyContentOverrides('contact', lang, L);

  return (
    <div className="ct-root" data-theme={theme} style={{
      width: '100%', minHeight: '100vh',
      background: 'var(--paper)', color: 'var(--ink)',
      fontFamily: '"Albert Sans","Manrope",system-ui,sans-serif',
      ['--accent']: accent, ['--accent-soft']: accentSoft, ['--accent-soft-ink']: accentInk,
      transition: 'background .3s,color .3s', position: 'relative',
      display: 'flex', flexDirection: 'column',
    }}>
      <style>{`
        .ct-root { font-feature-settings: "ss01","cv11"; }
        .ct-display { font-family:'Bricolage Grotesque', system-ui, sans-serif; font-weight:500; font-variation-settings:"wdth" 100, "opsz" 96; letter-spacing:-0.035em; line-height:0.95; }
        .ct-mono { font-family:'JetBrains Mono', monospace; font-size:11.5px; letter-spacing:0.4px; text-transform:uppercase; color:var(--ink-muted); font-weight:500; }
        .ct-link { transition: color .2s; }
        .ct-link:hover { color: var(--accent); }

        /* contact tiles */
        .ct-tile {
          display: flex; align-items: center; gap: 22px;
          padding: 22px 26px;
          border-radius: 18px;
          border: 1px solid var(--line);
          background: var(--paper);
          transition: background .25s, border-color .25s, transform .25s, box-shadow .25s;
          text-align: left; width: 100%;
          position: relative;
        }
        .ct-tile:hover { background: var(--paper-2); border-color: var(--line-strong); transform: translateY(-1px); }
        .ct-tile:hover .ct-tile-val { color: var(--accent); }
        .ct-tile:hover .ct-tile-ext { color: var(--accent); transform: translate(2px,-2px); }
        .ct-tile-ext {
          margin-left: auto;
          color: var(--ink-faint);
          transition: color .25s, transform .25s;
          display: inline-flex;
        }
        .ct-tile-icon {
          flex-shrink: 0;
          width: 56px; height: 56px; border-radius: 50%;
          background: color-mix(in oklab, var(--accent-soft) 55%, var(--accent)); color: var(--accent-soft-ink);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600; font-size: 18px; letter-spacing: -0.02em;
        }
        .ct-tile-title { font-family:'Bricolage Grotesque', sans-serif; font-weight:600; font-size: 19px; letter-spacing:-0.01em; color: var(--ink); }
        .ct-tile-val { font-size: 14.5px; color: var(--accent-soft-ink); transition: color .25s; margin-top: 2px; }

        /* form */
        .ct-form-wrap {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 36px 36px 32px;
        }
        .ct-form-title { font-family:'Bricolage Grotesque', sans-serif; font-weight:600; font-size: 24px; letter-spacing:-0.015em; color: var(--ink); margin-bottom: 28px; }
        .ct-label { display:block; font-size: 13.5px; font-weight: 600; color: var(--ink); margin-bottom: 9px; letter-spacing: 0.1px; }
        .ct-required { color: var(--accent); margin-left: 3px; font-weight: 600; }
        .ct-field, .ct-area {
          width: 100%;
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 14px 16px;
          font: inherit; font-size: 15px;
          color: var(--ink);
          transition: border-color .2s, box-shadow .2s, background .2s;
          outline: none;
        }
        .ct-field::placeholder, .ct-area::placeholder { color: var(--ink-faint); }
        .ct-field:focus, .ct-area:focus { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent) 20%, transparent); }
        .ct-field[aria-invalid="true"], .ct-area[aria-invalid="true"] {
          border-color: var(--danger);
          background: color-mix(in oklab, var(--danger-soft) 32%, var(--card));
        }
        .ct-field[aria-invalid="true"]:focus, .ct-area[aria-invalid="true"]:focus {
          border-color: var(--danger);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--danger) 22%, transparent);
        }
        .ct-error {
          display: flex; align-items: center; gap: 6px;
          margin-top: 8px;
          font-size: 13px; font-weight: 500;
          color: var(--danger);
        }
        .ct-error svg { flex-shrink: 0; }
        .ct-area { resize: vertical; min-height: 156px; line-height: 1.5; font-family: inherit; }
        .ct-row + .ct-row { margin-top: 22px; }

        .ct-submit {
          margin-top: 28px;
          width: 100%;
          background: var(--accent);
          color: #fff;
          border-radius: 10px;
          height: 56px;
          font-size: 15.5px; font-weight: 600; letter-spacing: 0.1px;
          transition: background .2s, transform .15s, box-shadow .25s;
          display: inline-flex; align-items:center; justify-content:center; gap: 10px;
        }
        .ct-submit:hover { background: color-mix(in oklab, var(--accent) 88%, black); box-shadow: 0 12px 28px -14px color-mix(in oklab, var(--accent) 80%, transparent); }
        .ct-submit:active { transform: translateY(1px); }

        /* toast */
        .ct-toast {
          position: fixed; left: 50%; transform: translateX(-50%);
          bottom: 32px; padding: 12px 22px;
          background: var(--ink); color: var(--paper);
          border-radius: 999px; font-size: 13.5px; font-weight: 500;
          box-shadow: 0 18px 40px -16px rgba(0,0,0,0.35);
          z-index: 50;
          font-family: 'Albert Sans', sans-serif;
        }

        /* ───── Responsive ───── */
        @media (max-width: 1024px) {
          .ct-root > header > div, .ct-root > main, .ct-root > footer > div { padding-left:32px !important; padding-right:32px !important; }
        }
        @media (max-width: 680px) {
          .ct-root > header > div { padding:14px 20px !important; }
          .ct-root > main { padding:56px 20px 72px !important; }
          .ct-root > footer > div { padding:18px 20px !important; }
          .ct-root > header nav { gap:16px !important; font-size:12.5px !important; }
          .ct-form-wrap { padding:24px 20px !important; }
          .ct-tile { padding:18px 18px !important; gap:16px !important; }
        }
        @media (max-width: 400px) {
          .ct-root > header .ct-mono { display:none; }
        }
      `}</style>

      {/* — TOP NAV — */}
      <header style={{ borderBottom:'1px solid var(--line)', position:'sticky', top:0, zIndex:10, background:'color-mix(in oklab, var(--paper) 90%, transparent)', backdropFilter:'blur(8px)' }}>
        <div style={{ padding:'18px 48px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <a href="./" style={{ fontFamily:'"Bricolage Grotesque", sans-serif', fontWeight:700, fontSize:21, letterSpacing:-0.6 }}>I<span style={{ color:'var(--accent)' }}>.</span>UX</a>
            <span className="ct-mono">{t.location}</span>
          </div>
          <ResponsiveNav linkClass="ct-link" lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}
            items={[
              { href: 'projets/', label: t.navWork },
              { href: 'apropos/', label: t.navAbout },
              { href: 'contact/', label: t.navContact, active: true },
            ]} />
        </div>
      </header>

      <main style={{ maxWidth: 760, width: '100%', margin: '0 auto', padding: '88px 48px 96px', flex: 1 }}>

        {/* Title block */}
        <h1 className="ct-display" style={{ fontSize:'clamp(40px, 9vw, 58px)', color:'var(--accent-soft-ink)' }}>{L.title}</h1>
        <p style={{ fontSize:18, lineHeight:1.55, color:'var(--ink-2)', marginTop:22, maxWidth:560, textWrap:'pretty' }}>{L.intro}</p>

        {/* Contact tiles */}
        <div style={{ display:'flex', flexDirection:'column', gap: 16, marginTop: 48 }}>
          <a className="ct-tile" href="mailto:irmane@hotmail.fr"
             onMouseEnter={()=>setHoveredCard('email')}
             style={hoveredCard === 'email' ? { background:'var(--paper-2)', borderColor:'var(--line-strong)' } : {}}>
            <div className="ct-tile-icon" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="m3 7 9 6 9-6"/>
              </svg>
            </div>
            <div style={{ display:'flex', flexDirection:'column' }}>
              <div className="ct-tile-title">{L.email}</div>
              <div className="ct-tile-val">{L.emailValue}</div>
            </div>
            <span className="ct-tile-ext" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 5h5v5"/>
                <path d="M19 5 10 14"/>
                <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/>
              </svg>
            </span>
          </a>

          <a className="ct-tile" href="https://www.linkedin.com/" target="_blank" rel="noreferrer"
             onMouseEnter={()=>setHoveredCard('linkedin')}
             style={hoveredCard === 'linkedin' ? { background:'var(--paper-2)', borderColor:'var(--line-strong)' } : {}}>
            <div className="ct-tile-icon" aria-hidden>in</div>
            <div style={{ display:'flex', flexDirection:'column' }}>
              <div className="ct-tile-title">{L.linkedin}</div>
              <div className="ct-tile-val">{L.linkedinValue}</div>
            </div>
            <span className="ct-tile-ext" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 5h5v5"/>
                <path d="M19 5 10 14"/>
                <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/>
              </svg>
            </span>
          </a>
        </div>

      </main>

      {/* — FOOTER — */}
      <footer style={{ borderTop:'1px solid var(--line)' }}>
        <div style={{ padding:'22px 48px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span className="ct-mono">{t.footerCredit} · 2026</span>
        </div>
      </footer>
      <BackToTopFab />
    </div>
  );
}

Object.assign(window, { ContactPage });
