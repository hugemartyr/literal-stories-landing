"use client";

import { Bell, Bookmark, BookOpen, ChevronDown, Feather, MessageCircle, PenLine, Play, Settings, Sparkles, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

/* eslint-disable react/no-unescaped-entities */

const LANDING_CSS = `
.asterix-landing {
  --ink: #0F0C10;
  --ink-soft: #1C1218;
  --ink-deep: #08070A;
  --surface: #1C1218;
  --surface-2: #241823;
  --paper: #FAF5EE;
  --paper-warm: #EDE5D2;
  --maroon: #6B1E3A;
  --maroon-deep: #4a1428;
  --rose: #A8425A;
  --blush: #DDB5B5;
  --gold: #B8965A;
  --gold-soft: rgba(184,150,90,0.18);
  --gold-strong: #C9A368;
  --mist: #D9CECC;
  --rule: rgba(184,150,90,0.25);
  --rule-strong: rgba(184,150,90,0.55);
  --display: 'Cormorant Garamond', Georgia, serif;
  --editorial: 'Libre Caslon Text', Georgia, serif;
  --read: 'Merriweather', Georgia, serif;
  --ui: 'Jost', system-ui, sans-serif;
  --hand: 'Caveat', cursive;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--ui);
  -webkit-font-smoothing: antialiased;
  width: 100%;
  overflow-x: hidden;
}
.asterix-landing * { box-sizing: border-box; }
.asterix-landing a { color: inherit; text-decoration: none; }
.asterix-landing ::selection { background: var(--maroon); color: var(--blush); }

.asterix-landing .eyebrow { font-family: var(--ui); font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); font-weight: 500; }
.asterix-landing .eyebrow.muted { color: var(--mist); opacity: 0.55; }
.asterix-landing .h-display { font-family: var(--display); font-weight: 300; line-height: 0.95; letter-spacing: -0.01em; margin: 0; }
.asterix-landing .read { font-family: var(--read); line-height: 1.75; color: rgba(250,245,238,0.78); margin: 0; }
.asterix-landing .read em, .asterix-landing .read i { color: var(--blush); }

.asterix-landing .container { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
.asterix-landing .container.narrow { max-width: 760px; }
.asterix-landing .container.wide { max-width: 1320px; }
.asterix-landing .section { padding: 120px 0; position: relative; }

.asterix-landing .nav { position: sticky; top: 0; z-index: 50; background: rgba(15,12,16,0.78); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid var(--rule); }
.asterix-landing .nav .inner { height: 64px; display: flex; align-items: center; justify-content: space-between; }
.asterix-landing .nav .links { display: flex; gap: 28px; align-items: center; }
.asterix-landing .nav .links a { color: var(--mist); font-family: var(--ui); font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 500; transition: color 0.2s; }
.asterix-landing .nav .links a:hover { color: var(--gold); }
.asterix-landing .nav .cta { background: var(--maroon); color: var(--blush); border: none; padding: 10px 22px; border-radius: 999px; font-family: var(--ui); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; font-weight: 500; display: inline-block; }
.asterix-landing .nav .cta:hover { background: var(--maroon-deep); }

.asterix-landing .amb { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.asterix-landing .amb span { position: absolute; background: var(--gold); border-radius: 50%; opacity: 0.4; animation: ax-drift 10s ease-in-out infinite; filter: blur(0.8px); }
@keyframes ax-drift { 0%,100% { transform: translateY(0) translateX(0); opacity: 0.2; } 50% { transform: translateY(-40px) translateX(8px); opacity: 0.6; } }

.asterix-landing .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; border: none; cursor: pointer; font-family: var(--ui); font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 12px; padding: 0 26px; height: 52px; border-radius: 2px; transition: transform .2s, background .2s; text-decoration: none; }
.asterix-landing .btn:hover { transform: translateY(-1px); }
.asterix-landing .btn.primary { background: var(--maroon); color: var(--blush); }
.asterix-landing .btn.primary:hover { background: var(--maroon-deep); }
.asterix-landing .btn.ghost { background: transparent; color: var(--gold); border: 1px solid var(--gold); }
.asterix-landing .btn.ghost:hover { background: var(--gold-soft); }

.asterix-landing .pull-quote { font-family: var(--display); font-style: italic; font-weight: 300; font-size: clamp(28px, 4vw, 56px); line-height: 1.1; color: var(--paper); letter-spacing: -0.005em; }

.asterix-landing footer { border-top: 1px solid var(--rule); padding: 60px 0 100px; color: var(--mist); font-family: var(--ui); font-size: 12px; }
.asterix-landing footer a:hover { color: var(--gold); }

.asterix-landing .dropcap::first-letter { font-family: var(--display); font-size: 5em; line-height: 0.85; float: left; padding-right: 0.12em; padding-top: 0.08em; color: var(--maroon); font-weight: 400; }

.asterix-landing .card { background: var(--surface); border: 1px solid var(--rule); border-radius: 8px; padding: 26px; }

.asterix-landing .marquee { overflow: hidden; white-space: nowrap; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); padding: 24px 0; }
.asterix-landing .marquee-track { display: inline-flex; gap: 80px; animation: ax-scroll 50s linear infinite; font-family: var(--display); font-style: italic; font-size: 22px; color: var(--paper); font-weight: 300; }
.asterix-landing .marquee-track .dot { color: var(--gold); font-style: normal; }
@keyframes ax-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

.asterix-landing .flourish { font-family: 'Libre Caslon Text', Georgia, serif; font-style: italic; font-weight: 700; color: var(--blush); letter-spacing: 0.005em; position: relative; white-space: nowrap; }
.asterix-landing .flourish::before { content: ''; position: absolute; left: 0; right: 0; bottom: -0.05em; height: 1px; background: linear-gradient(90deg, transparent, var(--gold) 18%, var(--gold) 82%, transparent); opacity: 0.5; pointer-events: none; }

/* Phone mock */
.asterix-landing .phone { width: 280px; height: 580px; background: var(--ink); border: 1px solid var(--rule-strong); border-radius: 42px; padding: 14px 12px; position: relative; box-shadow: 0 0 0 8px #0a070b, 0 40px 80px rgba(0,0,0,0.55); }
.asterix-landing .phone .island { position: absolute; top: 14px; left: 50%; transform: translateX(-50%); width: 92px; height: 26px; background: #000; border-radius: 14px; }
.asterix-landing .phone .screen { width: 100%; height: 100%; border-radius: 30px; overflow: hidden; padding-top: 48px; display: flex; flex-direction: column; gap: 10px; }

.asterix-landing .app-surface {
  --app-bg: #F8F4EB;
  --app-card: #FFFEFC;
  --app-ink: #17203A;
  --app-muted: #6C6860;
  --app-rule: #E2D9CD;
  --app-rose: #D9A0A6;
  --app-rose-soft: #F7ECEC;
  --app-chip: #FBF6ED;
  background: var(--app-bg);
  color: var(--app-ink);
  font-family: var(--ui);
}
.asterix-landing .app-title { font-family: var(--display); color: var(--app-ink); font-weight: 600; line-height: 1; }
.asterix-landing .app-script { font-family: var(--display); font-style: italic; color: var(--app-muted); }
.asterix-landing .app-label { font-family: var(--ui); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--app-muted); }
.asterix-landing .app-card { background: var(--app-card); border: 1px solid var(--app-rule); border-radius: 24px; box-shadow: 0 16px 40px rgba(23,32,58,0.08); }
.asterix-landing .app-chip { background: var(--app-chip); border: 1px solid var(--app-rule); color: var(--app-muted); border-radius: 999px; padding: 5px 10px; font-size: 11px; white-space: nowrap; }
.asterix-landing .app-icon-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--app-rule); background: var(--app-card); display: inline-flex; align-items: center; justify-content: center; color: var(--app-ink); }
.asterix-landing .demo-phone { width: 310px; height: 635px; background: #0b0d13; border: 1px solid rgba(255,255,255,0.16); border-radius: 42px; padding: 12px; position: relative; box-shadow: 0 0 0 8px #07080d, 0 40px 80px rgba(0,0,0,0.55); }
.asterix-landing .demo-phone .screen { width: 100%; height: 100%; border-radius: 32px; overflow: hidden; display: flex; flex-direction: column; }
.asterix-landing .demo-top { height: 60px; padding: 0 18px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--app-rule); background: rgba(248,244,235,0.94); }
.asterix-landing .demo-bottom { margin-top: auto; height: 66px; padding: 8px 14px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; border-top: 1px solid var(--app-rule); background: rgba(255,254,252,0.95); }
.asterix-landing .demo-tab { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; color: var(--app-muted); font-size: 9px; }
.asterix-landing .demo-tab.active { color: var(--app-ink); }
.asterix-landing .demo-tab.active::after { content: ""; width: 4px; height: 4px; border-radius: 50%; background: var(--app-rose); }
.asterix-landing .demo-profile-art { background: radial-gradient(circle at 38% 28%, #f0dcc6 0 16%, transparent 17%), radial-gradient(circle at 58% 48%, #958f83 0 18%, transparent 19%), linear-gradient(145deg, #e7dac8 0%, #b7ab9d 45%, #7e7b75 100%); }
.asterix-landing .demo-wave { display: flex; align-items: center; gap: 5px; flex: 1; height: 28px; }
.asterix-landing .demo-wave span { width: 6px; border-radius: 999px; background: #DDD6CC; }

@media (max-width: 880px) {
  .asterix-landing .section { padding: 80px 0; }
  .asterix-landing .grid-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
  .asterix-landing .grid-3 { grid-template-columns: 1fr !important; gap: 18px !important; }
  .asterix-landing .grid-footer { grid-template-columns: 1fr 1fr !important; gap: 30px !important; }
  .asterix-landing .nav .links { display: none !important; }
  .asterix-landing .staircase-row { flex-wrap: wrap !important; justify-content: center !important; }
  .asterix-landing .premise-row { grid-template-columns: 1fr 16px 1fr !important; }
  .asterix-landing .hide-mobile { display: none !important; }
  .asterix-landing .demo-phone { width: 290px; height: 600px; }
}
`;

function Sparkle({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d={`M ${c} 0 C ${c} ${c * 0.6} ${c * 0.6} ${c} 0 ${c} C ${c * 0.6} ${c} ${c} ${c * 1.4} ${c} ${size} C ${c} ${c * 1.4} ${c * 1.4} ${c} ${size} ${c} C ${c * 1.4} ${c} ${c} ${c * 0.6} ${c} 0 Z`} fill={color} />
    </svg>
  );
}

function Wordmark({ size = 22, color = "var(--paper)", goldColor = "var(--gold)" }: { size?: number; color?: string; goldColor?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.32, fontFamily: "var(--display)", fontWeight: 400, fontSize: size, color, lineHeight: 1, letterSpacing: "0.01em" }}>
      <Sparkle size={size * 0.55} color={goldColor} />
      <span>Asterix</span>
    </span>
  );
}

function Particles({ count = 24 }: { count?: number }) {
  const dots = useMemo(() => Array.from({ length: count }, () => ({
    left: Math.random() * 100, top: Math.random() * 100,
    size: 1 + Math.random() * 2.5, delay: Math.random() * 10, dur: 8 + Math.random() * 8,
  })), [count]);
  return (
    <div className="amb">
      {dots.map((d, i) => (
        <span key={i} style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size, animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s` }} />
      ))}
    </div>
  );
}

function Nav() {
  return (
    <header className="nav">
      <div className="container inner">
        <Wordmark size={22} />
        <nav className="links">
          <a href="#how">How it works</a>
          <a href="#resonance">Resonance</a>
          <a href="#manifesto">Manifesto</a>
          
        </nav>
        <Link href="/auth/signup" className="cta">Register for Beta</Link>
      </div>
    </header>
  );
}

function DemoNav({ active = "Discover" }: { active?: "Discover" | "Drafts" | "Messages" | "Alerts" }) {
  const tabs = [
    { label: "Discover", icon: BookOpen },
    { label: "Drafts", icon: Bookmark },
    { label: "Messages", icon: MessageCircle },
    { label: "Alerts", icon: Bell },
  ] as const;

  return (
    <div className="demo-bottom">
      {tabs.map(({ label, icon: Icon }) => (
        <div key={label} className={`demo-tab ${active === label ? "active" : ""}`}>
          <Icon size={16} strokeWidth={1.8} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function DemoTopBar() {
  return (
    <div className="demo-top">
      <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.02em" }}>Asterix</div>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <span style={{ position: "relative", display: "inline-flex" }}>
          <Bell size={20} strokeWidth={2} />
          <span style={{ position: "absolute", right: -9, top: -10, width: 22, height: 22, borderRadius: "50%", background: "var(--app-rose)", color: "white", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>4</span>
        </span>
        <UserRound size={20} strokeWidth={2} />
      </div>
    </div>
  );
}

/* A small, product-faithful Asterix discover phone mock for the hero. */
function HeroPhone() {
  return (
    <div className="demo-phone">
      <div className="screen app-surface">
        <DemoTopBar />
        <div style={{ padding: "28px 18px 0", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 className="app-title" style={{ fontSize: 32, margin: 0 }}>Discover</h3>
          <div className="app-script" style={{ fontSize: 13, marginTop: 5 }}>A fresh page, chosen for your shelf.</div>

          <div className="app-card" style={{ marginTop: 22, padding: 16, textAlign: "center" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", margin: "0 auto", background: "var(--app-rose-soft)", color: "var(--app-rose)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={18} strokeWidth={1.8} />
            </div>
            <p style={{ margin: "18px 0 10px", fontFamily: "var(--display)", fontSize: 21, fontStyle: "italic", lineHeight: 1.35, color: "var(--app-ink)" }}>
              "A margin note can be a doorway."
            </p>
            <div className="app-label">Anonymous reader</div>

            <div style={{ marginTop: 18, padding: 14, borderRadius: 18, border: "1px solid #F0D9DC", background: "rgba(255,254,252,0.7)" }}>
              <div className="app-label" style={{ color: "#B77F87", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <Sparkles size={13} /> Literary resonance
              </div>
              <div style={{ fontSize: 48, lineHeight: 1, marginTop: 8, fontWeight: 700, letterSpacing: "-0.03em" }}>68%</div>
              <div style={{ color: "var(--app-muted)", marginTop: 4, fontSize: 13 }}>A quiet but promising alignment</div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 7, flexWrap: "wrap" }}>
                <span className="app-chip">shared authors</span>
                <span className="app-chip">nearby reader</span>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div className="demo-profile-art" style={{ width: 86, height: 86, borderRadius: "50%", filter: "blur(2px)", margin: "0 auto", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 38, height: 30, borderRadius: "18px 0 0 0", background: "rgba(248,244,235,0.82)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>18%</div>
              </div>
              <div className="app-title" style={{ fontSize: 22, marginTop: 12 }}>Mira Vale</div>
              <div style={{ color: "var(--app-muted)", fontSize: 14, marginTop: 3 }}>29 · Pune</div>
            </div>
          </div>
        </div>
        <div style={{ padding: "12px 18px", display: "grid", gridTemplateColumns: "40px 1fr 40px", gap: 9, borderTop: "1px solid var(--app-rule)" }}>
          <button className="app-icon-btn" aria-label="Pass"><X size={19} /></button>
          <button style={{ border: 0, borderRadius: 999, background: "var(--app-ink)", color: "white", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Feather size={16} /> Begin
          </button>
          <button className="app-icon-btn" aria-label="Save"><Bookmark size={17} /></button>
        </div>
        <DemoNav active="Discover" />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="section" style={{ paddingTop: 110, paddingBottom: 80, overflow: "hidden" }}>
      <Particles count={28} />
      <div style={{ position: "absolute", top: -100, left: "50%", width: 800, height: 800, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(184,150,90,0.10), transparent 60%)", pointerEvents: "none" }} />
      <div className="container grid-2" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div className="eyebrow">A literary correspondence</div>
          <h1 className="h-display" style={{ fontSize: "clamp(44px, 7vw, 92px)", marginTop: 18 }}>
            Some love stories begin
            <br />with a <span className="flourish">sentence</span>.
          </h1>
          <p className="read" style={{ marginTop: 24, maxWidth: 480, fontSize: 16 }}>
            Asterix is a literary correspondence platform — built for readers, writers, and the slowly-spoken. Find the reader whose margins resemble yours. Words first. Photographs, later.
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/auth/signup" className="btn primary">Register for Beta</Link>
            
          </div>
          <div style={{ marginTop: 18, fontFamily: "var(--ui)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(217,206,204,0.55)" }}>
            <Sparkle size={9} color="var(--gold)" /> &nbsp; One reader a day · chosen by how they read
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", position: "relative" }} className="hide-mobile">
          <div style={{ filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.4))" }}>
            <HeroPhone />
          </div>
          <div style={{ position: "absolute", top: 60, left: -10, transform: "rotate(-4deg)", background: "rgba(28,18,24,0.92)", border: "1px solid var(--rule-strong)", borderRadius: 4, padding: "8px 12px", fontFamily: "var(--hand)", fontSize: 18, color: "var(--gold)" }}>
            today's page
          </div>
          <div style={{ position: "absolute", bottom: 110, right: -10, transform: "rotate(3deg)", background: "rgba(107,30,58,0.92)", border: "1px solid var(--rose)", borderRadius: 4, padding: "8px 12px", fontFamily: "var(--hand)", fontSize: 18, color: "var(--blush)" }}>
            words first
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const lines = [
    "Find the reader whose margins resemble yours.",
    "A correspondence, not a swipe.",
    "Identity revealed in pages, not photographs.",
    "Rare resonance · parallel melancholy · kindred footnotes.",
    "One reader a day. Read carefully.",
  ];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...lines, ...lines].map((l, i) => (
          <span key={i}>"{l}" <span className="dot">·</span></span>
        ))}
      </div>
    </div>
  );
}

function Premise() {
  const pairs = [
    { is: "A literary correspondence", isnt: "An infinite-swipe carousel" },
    { is: "Words as the primary signal", isnt: "Photos as the primary signal" },
    
    { is: "Emotional compatibility, explained", isnt: "An opaque algorithm" },
    { is: "Identity revealed slowly, by chapter", isnt: "Full reveal on the first tap" },
    { is: "Voice notes and marginalia, earned", isnt: "Read receipts and quick replies" },
  ];
  return (
    <section className="section" style={{ background: "var(--ink-soft)" }}>
      <div className="container">
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 60, alignItems: "start" }}>
          <div>
            <div className="eyebrow">The premise</div>
            <h2 className="h-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginTop: 16 }}>
              Asterix is, and is <span className="flourish">not</span>.
            </h2>
            <p className="read" style={{ marginTop: 22, fontSize: 15, maxWidth: 380 }}>
              Every other dating app treats language as a container for profiles. Asterix treats it as the thing itself. Here is what that means in practice.
            </p>
          </div>
          <div>
            <div className="premise-row" style={{ display: "grid", gridTemplateColumns: "1fr 24px 1fr", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--rule)" }}>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>Asterix IS</div>
              <div />
              <div className="eyebrow muted">Asterix IS NOT</div>
            </div>
            {pairs.map((p, i) => (
              <div key={i} className="premise-row" style={{ display: "grid", gridTemplateColumns: "1fr 24px 1fr", alignItems: "center", padding: "18px 0", borderBottom: i < pairs.length - 1 ? "1px dashed var(--rule)" : "none" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--paper)", fontStyle: "italic", fontWeight: 400 }}>{p.is}</div>
                <div style={{ textAlign: "center" }}><Sparkle size={10} color="var(--gold)" /></div>
                <div style={{ fontFamily: "var(--read)", fontSize: 14, color: "rgba(217,206,204,0.5)", textDecoration: "line-through" }}>{p.isnt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Compose your literary identity",
      body: "Favorite authors and books. Emotional archetypes. Relationship intent. The shape of your voice. Asterix turns the way you read into who you are on the app.",
      footnote: "A profile written in pages, not bullet points.",
    },
    {
      num: "02",
      title: "Discover resonance, not faces",
      body: "Our compatibility engine pairs you on emotional alignment — slow burn versus voracious, re-readers versus completionists. Every match comes with a poetic label and an explanation.",
      footnote: "Rare Resonance · Parallel Melancholy · Kindred Footnotes.",
    },
    {
      num: "03",
      title: "Reveal through correspondence",
      body: "Photographs clarify as you write. Voice notes unlock. Marginalia is shared. Emotional layers open one by one — a staircase, not a switch.",
      footnote: "The face is the dessert, not the menu.",
    },
    {
      num: "04",
      title: "Begin intentional correspondence",
      body: "No emoji, no read receipts, no streaks. Just a slower, literary-first conversation between two readers who have already chosen to read each other.",
      footnote: "Slow. Meaningful. Earned.",
    },
  ];
  return (
    <section id="how" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="eyebrow">How it works</div>
          <h2 className="h-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginTop: 16 }}>
            Be amazed by new readers. <span className="flourish">The rest, in time.</span>
          </h2>
        </div>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {steps.map((s, i) => (
            <div key={i} className="card">
              <div style={{ fontFamily: "var(--display)", fontSize: 56, color: "var(--gold)", fontWeight: 300, lineHeight: 0.9, marginBottom: 14 }}>{s.num}</div>
              <div style={{ fontFamily: "var(--display)", fontStyle: "italic", fontSize: 22, color: "var(--paper)", fontWeight: 400, lineHeight: 1.2, marginBottom: 12 }}>{s.title}</div>
              <p className="read" style={{ fontSize: 13.5, marginBottom: 14 }}>{s.body}</p>
              <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 12, fontFamily: "var(--hand)", fontSize: 15, color: "var(--gold)" }}>{s.footnote}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Staircase() {
  const wave = [18, 10, 22, 15, 26, 13, 20, 17, 24, 11, 21, 15, 23, 12, 19, 16, 25, 13, 20, 14];
  return (
    <section className="section" style={{ background: "var(--ink-soft)" }}>
      <div className="container wide">
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center" }}>
          <div>
            <div className="eyebrow">The reveal staircase</div>
            <h2 className="h-display" style={{ fontSize: "clamp(36px, 5vw, 60px)", marginTop: 16 }}>
              Their face <span className="flourish">clarifies</span> as you write.
            </h2>
            <p className="read" style={{ marginTop: 22, fontSize: 15 }}>
              Five stages between hidden and revealed. Each one is unlocked by a real exchange — a full paragraph in each direction, minimum. Voice notes, marginalia, and emotional layers open the same way: earned, not given.
            </p>
            <div style={{ marginTop: 22, fontFamily: "var(--hand)", fontSize: 20, color: "var(--gold)", maxWidth: 380 }}>
              The face is the dessert, not the menu.
            </div>
          </div>
          <div className="app-surface app-card" style={{ padding: 0, overflow: "hidden", maxWidth: 520, justifySelf: "center", width: "100%" }}>
            <div style={{ height: 56, padding: "0 22px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--app-rule)" }}>
              <div className="app-label">Your edition</div>
              <div style={{ display: "flex", gap: 10 }}>
                <span className="app-icon-btn"><PenLine size={16} /></span>
                <span className="app-icon-btn"><Settings size={16} /></span>
              </div>
            </div>

            <div style={{ padding: 22 }}>
              <div style={{ border: "1px solid var(--app-rule)", borderRadius: 22, overflow: "hidden", background: "white", boxShadow: "0 12px 28px rgba(23,32,58,0.06)" }}>
                <div className="demo-profile-art" style={{ height: 150, filter: "blur(5px)", transform: "scale(1.02)" }} />
                <div style={{ padding: "0 22px 24px", marginTop: -40, position: "relative" }}>
                  <div className="demo-profile-art" style={{ width: 82, height: 82, borderRadius: "50%", border: "4px solid white", filter: "blur(2px)" }} />
                  <div className="app-title" style={{ fontSize: 32, marginTop: 18 }}>Iris Moreau</div>
                  <div style={{ color: "var(--app-muted)", marginTop: 2 }}>Essayist · Mumbai</div>
                  <div className="app-script" style={{ fontSize: 17, marginTop: 16 }}>"A romantic with a paper trail."</div>
                </div>
              </div>

              <div style={{ marginTop: 22 }}>
                <div className="app-label">Couplet</div>
                <div className="app-card" style={{ marginTop: 10, padding: "20px 22px", boxShadow: "none" }}>
                  <div className="app-title" style={{ fontSize: 22, fontWeight: 500 }}>If our story started in a secondhand bookshop...</div>
                  <div style={{ marginTop: 18, height: 1, width: 170, background: "var(--app-muted)" }} />
                </div>
              </div>

              <div style={{ marginTop: 22 }}>
                <div className="app-label">Audio verse</div>
                <div className="app-card" style={{ marginTop: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 14, boxShadow: "none" }}>
                  <span style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--app-ink)", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Play size={18} fill="currentColor" />
                  </span>
                  <div className="demo-wave">
                    {wave.map((h, i) => <span key={i} style={{ height: h }} />)}
                  </div>
                  <span style={{ color: "var(--app-muted)", fontSize: 13 }}>0:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Resonance() {
  const labels = [
    ["Rare Resonance", "When you both keep sentences instead of scenes."],
    ["Parallel Melancholy", "A shared key — minor, slow, unhurried."],
    ["Golden Tension", "Opposite shelves; the same hunger."],
    ["Kindred Footnotes", "You both read the marginalia first."],
    ["Unwritten Chapter", "A connection still finding its form."],
  ];
  return (
    <section id="resonance" className="section">
      <div className="container">
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div className="eyebrow">Emotional compatibility</div>
            <h2 className="h-display" style={{ fontSize: "clamp(36px, 5vw, 60px)", marginTop: 16 }}>
              72 of 100. <span className="flourish">Whispered</span>, never shouted.
            </h2>
            <p className="read" style={{ marginTop: 22, fontSize: 15 }}>
              Asterix scores every match on resonance — how the two of you read, not how you look. Every score arrives with a poetic label and an honest explanation. The number is visible because we believe in evidence. It is quiet because we don't believe in scoreboards.
            </p>
            <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 12, fontFamily: "var(--read)", fontSize: 14, color: "rgba(217,206,204,0.78)" }}>
              {labels.map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, borderBottom: "1px dashed var(--rule)", paddingBottom: 10 }}>
                  <span className="eyebrow" style={{ color: "var(--gold)", fontSize: 9 }}>{row[0]}</span>
                  <span style={{ fontStyle: "italic", color: "var(--blush)" }}>{row[1]}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div className="app-surface app-card" style={{ maxWidth: 420, padding: 0, overflow: "hidden", width: "100%" }}>
              <div style={{ padding: "22px 24px", borderBottom: "1px solid var(--app-rule)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div className="app-label">Today&apos;s pages</div>
                  <div className="app-title" style={{ fontSize: 28, marginTop: 6 }}>Literary resonance</div>
                </div>
                <span style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--app-rose-soft)", color: "#B77F87", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Sparkles size={20} />
                </span>
              </div>
              <div style={{ padding: 24, textAlign: "center" }}>
                <div style={{ border: "1px solid #F0D9DC", borderRadius: 22, padding: "22px 18px", background: "rgba(255,254,252,0.78)" }}>
                  <div className="app-label" style={{ color: "#A9747C" }}>Compatibility</div>
                  <div style={{ fontSize: 70, lineHeight: 1, fontWeight: 700, letterSpacing: "-0.04em", marginTop: 10 }}>74%</div>
                  <div style={{ color: "var(--app-muted)", fontSize: 15, marginTop: 4 }}>Compelling alignment</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 18 }}>
                    <span className="app-chip">keeps annotations</span>
                    <span className="app-chip">late-night reader</span>
                  </div>
                </div>
                <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "76px 1fr", gap: 16, textAlign: "left", alignItems: "center" }}>
                  <div className="demo-profile-art" style={{ width: 76, height: 76, borderRadius: "50%", filter: "blur(3px)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", right: 0, bottom: 0, background: "rgba(248,244,235,0.88)", borderRadius: "16px 0 0 0", padding: "6px 8px", fontWeight: 700, fontSize: 12 }}>42%</div>
                  </div>
                  <div>
                    <div className="app-title" style={{ fontSize: 24 }}>Elias North</div>
                    <div style={{ color: "var(--app-muted)", marginTop: 2 }}>31 · Bandra</div>
                    <button style={{ marginTop: 12, height: 38, padding: "0 16px", borderRadius: 999, border: "1px solid var(--app-rule)", background: "white", color: "var(--app-muted)", display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                      Read margins <ChevronDown size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Correspondence() {
  const notes = [
    { label: "Reveal notes", body: "Chapter three · identity clearer" },
    { label: "Reading preference", body: "Often chooses sentences with weather in them." },
  ];

  return (
    <section className="section" style={{ background: "var(--ink-soft)" }}>
      <div className="container">
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div className="app-surface app-card" style={{ padding: 0, overflow: "hidden", minHeight: 470 }}>
            <div style={{ height: 62, borderBottom: "1px solid var(--app-rule)", display: "grid", gridTemplateColumns: "48px 1fr 170px", gap: 14, alignItems: "center", padding: "0 18px" }}>
              <button style={{ border: 0, background: "transparent", color: "var(--app-ink)", fontSize: 22 }}>‹</button>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className="demo-profile-art" style={{ width: 38, height: 38, borderRadius: "50%", filter: "blur(1px)" }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Rowan</div>
                  <div className="app-label" style={{ fontSize: 8 }}>Revelation</div>
                </div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: "#E3D8D2", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ width: "64%", height: "100%", background: "var(--app-rose)" }} />
                  </div>
                  <span style={{ color: "var(--app-muted)", fontSize: 11 }}>64%</span>
                </div>
                <div className="app-label" style={{ fontSize: 8, marginTop: 6 }}>14h of ink left</div>
              </div>
            </div>
            <div style={{ minHeight: 300, padding: "26px 18px 18px", display: "grid", gridTemplateColumns: "1fr", alignContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ alignSelf: "flex-start", maxWidth: "74%", borderRadius: 999, background: "#F2EFE8", color: "var(--app-ink)", padding: "10px 16px", fontSize: 13, boxShadow: "0 2px 6px rgba(23,32,58,0.05)" }}>
                  What line is following you this week?
                </div>
                <div style={{ alignSelf: "flex-end", maxWidth: "78%", borderRadius: 999, background: "var(--app-rose)", color: "white", padding: "10px 16px", fontSize: 13, boxShadow: "0 2px 8px rgba(217,160,166,0.35)" }}>
                  One about rain arriving before forgiveness.
                </div>
              </div>

              <div style={{ maxWidth: 330, margin: "34px auto 0", display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                {notes.map((note) => (
                  <div key={note.label} className="app-card" style={{ padding: "14px 16px", boxShadow: "0 6px 18px rgba(23,32,58,0.06)", borderRadius: 16 }}>
                    <div className="app-label">{note.label}</div>
                    <div style={{ color: "var(--app-ink)", fontSize: 13, marginTop: 6 }}>{note.body}</div>
                  </div>
                ))}
                <div className="app-card" style={{ padding: 12, boxShadow: "0 6px 18px rgba(23,32,58,0.06)", borderRadius: 16 }}>
                  <div className="app-label">Marginalia</div>
                  <div style={{ height: 120, marginTop: 9, borderRadius: 12, background: "linear-gradient(135deg, #2F2D29 0 48%, #E9E0D2 49% 100%)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 78, bottom: 18, width: 86, height: 52, background: "#F8F4EB", transform: "rotate(-1deg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--hand)", fontSize: 18, color: "#302B25" }}>turn the page</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: 66, borderTop: "1px solid var(--app-rule)", display: "grid", gridTemplateColumns: "1fr 78px", gap: 12, padding: "10px 14px", background: "rgba(255,254,252,0.68)" }}>
              <div style={{ border: "1px solid var(--app-rule)", borderRadius: 999, display: "flex", alignItems: "center", padding: "0 16px", color: "#9D9890", fontSize: 13 }}>Write your next line...</div>
              <button style={{ border: 0, borderRadius: 18, background: "var(--app-rose)", color: "white", fontWeight: 600 }}>Send</button>
            </div>
          </div>
          <div>
            <div className="eyebrow">Intentional correspondence</div>
            <h2 className="h-display" style={{ fontSize: "clamp(36px, 5vw, 60px)", marginTop: 16 }}>
              Conversations that <span className="flourish">earn</span> their next line.
            </h2>
            <p className="read" style={{ marginTop: 22, fontSize: 15 }}>
              Book-led openers. Voice stanzas. Marginalia shared between two readers. No streaks to maintain, no fires to keep alive, no anxiety pinging through the day. Just an emotionally aligned conversation that moves at the speed of two minds.
            </p>
            <ul className="read" style={{ marginTop: 18, paddingLeft: 18, fontSize: 14, color: "rgba(217,206,204,0.78)" }}>
              <li>Letters, not pings — a paragraph in each direction, minimum.</li>
              <li>Voice notes unlock on letter two. Marginalia on letter three.</li>
              <li>No emoji. No read receipts. No quick replies.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Voice() {
  const alerts = [
    { title: "A reader answered your note", body: "They left a sentence in the margin.", fresh: true },
    { title: "Your letter was accepted", body: "The next chapter is open.", fresh: false },
    { title: "New resonance found", body: "A careful reader shares your shelf.", fresh: true },
    { title: "Ink timer reset", body: "You have the evening to reply.", fresh: false },
  ];
  return (
    <section id="voice" className="section">
      <div className="container">
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div className="eyebrow">Voice</div>
            <h2 className="h-display" style={{ fontSize: "clamp(36px, 5vw, 60px)", marginTop: 16 }}>
              How <span className="flourish">a librarian</span> writes to you.
            </h2>
            <p className="read" style={{ marginTop: 22, fontSize: 15 }}>
              Every micro-copy line in Asterix is product design. Notifications are calm, legible, and gently specific: enough signal to return, never enough noise to chase.
            </p>
          </div>
          <div className="demo-phone" style={{ justifySelf: "center", width: 300, height: 610 }}>
            <div className="screen app-surface">
              <DemoTopBar />
              <div style={{ padding: "28px 18px 0", flex: 1, overflow: "hidden" }}>
                <h3 className="app-title" style={{ fontSize: 30, margin: 0 }}>Notifications</h3>
                <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                  {alerts.map((alert) => (
                    <div
                      key={alert.title}
                      style={{
                        border: `1px solid ${alert.fresh ? "var(--app-rose)" : "var(--app-rule)"}`,
                        borderRadius: 20,
                        padding: "16px 18px",
                        background: alert.fresh ? "rgba(255,254,252,0.42)" : "rgba(255,254,252,0.64)",
                      }}
                    >
                      <div style={{ color: alert.fresh ? "var(--app-ink)" : "#626978", fontWeight: 700, fontSize: 16, lineHeight: 1.2 }}>{alert.title}</div>
                      <div className="app-script" style={{ fontSize: 14, marginTop: 10 }}>{alert.body}</div>
                    </div>
                  ))}
                </div>
              </div>
              <DemoNav active="Alerts" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="section">
      <div className="container narrow">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="eyebrow">From the editors of Asterix</div>
          <h2 className="h-display" style={{ fontSize: "clamp(36px, 5vw, 60px)", marginTop: 16 }}>
            A short <span className="flourish">manifesto</span>, for the slowly-spoken sort.
          </h2>
        </div>

        <div style={{ background: "var(--paper)", color: "var(--ink)", padding: "60px 56px", position: "relative", boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}>
          <div style={{ position: "absolute", top: 0, left: 56, right: 56, height: 1, background: "var(--maroon)" }} />

          <div className="eyebrow" style={{ color: "var(--maroon)", textAlign: "center" }}>Vol. I · No. 1</div>
          <p className="dropcap" style={{ marginTop: 22, fontFamily: "var(--read)", fontSize: 16, color: "rgba(15,12,16,0.85)", lineHeight: 1.85 }}>
            We made Asterix because we were tired. Tired of the swipe, the photograph, the smile rehearsed in a Lyft. Tired of being shown forty strangers at a coffee shop and asked, repeatedly, to choose one without speaking to any of them. Tired of an industry that solved a problem we did not have — how do I see <i>more</i> people — and left untouched the problem we did — how do I know <i>any</i> of them.
          </p>

          <p style={{ fontFamily: "var(--read)", fontSize: 16, color: "rgba(15,12,16,0.85)", lineHeight: 1.85, marginTop: 18 }}>
            The premise here is not new. It is, in fact, very old. For most of human history, romance began in correspondence — a letter, a poem passed between hands, a sentence written in a margin and slid across a table. People knew the shape of each other's minds before the shape of each other's faces. The result was occasionally clumsy and frequently slow. But the people who made it through were rarely surprised by who they ended up with.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "36px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(15,12,16,0.15)" }} />
            <Sparkle size={14} color="var(--maroon)" />
            <div style={{ flex: 1, height: 1, background: "rgba(15,12,16,0.15)" }} />
          </div>

          <p className="pull-quote" style={{ color: "var(--ink)", fontSize: 32, textAlign: "center", maxWidth: 540, margin: "0 auto", lineHeight: 1.25 }}>
            "Photographs are not what is most you. The way you read is."
          </p>

          <p style={{ fontFamily: "var(--read)", fontSize: 16, color: "rgba(15,12,16,0.85)", lineHeight: 1.85, marginTop: 36 }}>
            So we built an app where words come first. Each morning, you receive one reader — chosen not for their photograph but for the way they think. An excerpt. A note in the margin. A book on their bedside. If something stays with you, you write back. If nothing stays with you, you close the page. There are no streaks to maintain, no fires to keep alive, no anxiety pinging through the day.
          </p>

          <p style={{ fontFamily: "var(--read)", fontSize: 16, color: "rgba(15,12,16,0.85)", lineHeight: 1.85, marginTop: 18 }}>
            The photograph comes, eventually. It clarifies a little with each letter. By the fifth, you know what they look like. By then, you also know whether they re-read books they have already finished, and whether they think Murakami is a draft of a feeling or the final one.
          </p>

          <p style={{ fontFamily: "var(--read)", fontSize: 16, color: "rgba(15,12,16,0.85)", lineHeight: 1.85, marginTop: 18 }}>
            We have built every part of this slowly, in the hope that it will be used slowly. We trust the people who find it. We hope it finds <i>you</i>.
          </p>

          <div style={{ marginTop: 40, textAlign: "right" }}>
            <div style={{ fontFamily: "var(--hand)", fontSize: 28, color: "var(--maroon)" }}>— the editors</div>
            <div style={{ fontFamily: "var(--ui)", fontSize: 10, color: "rgba(15,12,16,0.5)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 4 }}>Mumbai · MMXXVI</div>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 56, right: 56, height: 1, background: "var(--maroon)" }} />
        </div>
      </div>
    </section>
  );
}

function Press() {
  const testimonials = [
    { quote: "It is the only dating app I have ever opened in a library and not felt watched.", who: "Aisha M.", what: "beta reader · letter 14" },
    { quote: "My first match wrote me three paragraphs about Lispector. I cried in a café. We have been writing since February.", who: "Devansh K.", what: "beta reader · letter 28" },
    { quote: "I deleted everything else three weeks in. I just wanted to be read to.", who: "Tara V.", what: "beta reader · letter 9" },
  ];
  return (
    <section className="section" style={{ background: "var(--ink-soft)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="eyebrow">Early readers</div>
          <h2 className="h-display" style={{ fontSize: "clamp(32px, 4.5vw, 54px)", marginTop: 14 }}>
            What people have <span className="flourish">written back</span>.
          </h2>
        </div>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="card" style={{ padding: 32 }}>
              <Sparkle size={18} color="var(--gold)" />
              <p style={{ marginTop: 18, fontFamily: "var(--display)", fontStyle: "italic", fontSize: 22, fontWeight: 400, color: "var(--paper)", lineHeight: 1.4 }}>
                "{t.quote}"
              </p>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--rule)" }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 16, color: "var(--paper)" }}>{t.who}</div>
                <div className="eyebrow" style={{ marginTop: 4, fontSize: 9, color: "rgba(217,206,204,0.5)" }}>{t.what}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section" style={{ paddingBottom: 60, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", width: 700, height: 700, transform: "translate(-50%, -30%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(107,30,58,0.20), transparent 60%)", pointerEvents: "none" }} />
      <Particles count={18} />
      <div className="container narrow" style={{ textAlign: "center", position: "relative" }}>
        <Sparkle size={32} color="var(--gold)" />
        <h2 className="h-display" style={{ fontSize: "clamp(40px, 6vw, 72px)", marginTop: 24 }}>
          Tell us <span className="flourish">what you feel</span>.
        </h2>
        <p className="read" style={{ marginTop: 22, fontSize: 16, maxWidth: 540, margin: "22px auto 0" }}>
          Words first, photographs later. Compose your literary identity and meet the reader whose margins resemble yours.
        </p>
        <div style={{ margin: "36px auto 0", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/auth/signup" className="btn primary">Register for Beta</Link>
          
        </div>
        <div style={{ marginTop: 18, fontFamily: "var(--hand)", fontSize: 18, color: "var(--gold)" }}>
          Or close the book — return whenever you like.
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="grid-footer" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, alignItems: "flex-start" }}>
          <div>
            <Wordmark size={22} />
            <p style={{ marginTop: 16, fontFamily: "var(--read)", fontSize: 13, color: "rgba(217,206,204,0.55)", lineHeight: 1.65, maxWidth: 320, fontStyle: "italic" }}>
              A literary correspondence. One reader a day. Words first, photographs later.
            </p>
            <div style={{ marginTop: 18, fontFamily: "var(--ui)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(217,206,204,0.4)" }}>Vol. I · Mumbai · MMXXVI</div>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "var(--gold)" }}>The app</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
              <li><a href="#how">How it works</a></li>
              <li><a href="#resonance">Resonance</a></li>
              <li><a href="#voice">Voice</a></li>
              <li><Link href="/auth/signup">Register for Beta</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "var(--gold)" }}>The room</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
              <li><a href="#manifesto">Manifesto</a></li>
              <li><a href="#">Editorial</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "var(--gold)" }}>Legal</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 60, paddingTop: 24, borderTop: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "rgba(217,206,204,0.45)", fontSize: 11, letterSpacing: "0.12em" }}>© 2026 Asterix Editions. All correspondence private.</span>
          <span style={{ fontFamily: "var(--hand)", fontSize: 16, color: "var(--gold)" }}>— set in Cormorant, Merriweather, Jost.</span>
        </div>
      </div>
    </footer>
  );
}


export default function Landing() {
  return (
    <div className="asterix-landing">
      <style dangerouslySetInnerHTML={{ __html: LANDING_CSS }} />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Premise />
        <HowItWorks />
        <Staircase />
        <Resonance />
        <Correspondence />
        <Voice />
        <Manifesto />
        <Press />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
