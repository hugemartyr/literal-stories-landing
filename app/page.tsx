'use client';

import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    
(() => {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

  const card = document.getElementById('letterCard');
  const letter = document.getElementById('letter');
  if (card && letter) {
    const letterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => card.classList.add('opened'), 350);
          letterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });
    letterObserver.observe(letter);
  }

  const manifesto = document.getElementById('manifesto');
  if (manifesto) {
    const manifestoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => manifesto.classList.add('opened'), 500);
          manifestoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    manifestoObserver.observe(manifesto);
  }

  const navItems = Array.from(document.querySelectorAll<HTMLElement>('.nav-item'));
  const sections = navItems.map((b) => document.getElementById(b.dataset.target || ''));

  navItems.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const target = sections[i];
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const setActive = (idx: number) => {
    navItems.forEach((b, i) => b.classList.toggle('active', i === idx));
  };

  const updateActive = () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.4;
    let current = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] && (sections[i] as HTMLElement).offsetTop <= scrollPos) current = i;
    }
    setActive(current);
  };

  let rafTicking = false;
  window.addEventListener('scroll', () => {
    if (!rafTicking) {
      requestAnimationFrame(() => {
        updateActive();
        rafTicking = false;
      });
      rafTicking = true;
    }
  }, { passive: true });
  updateActive();

  const STORAGE_KEY = 'asterix.preface.position';
  const saveBtn = document.getElementById('navSave');
  const toast = document.getElementById('toast');

  const showToast = (html: string, ms = 3200) => {
    if (!toast) return;
    toast.innerHTML = html;
    toast.classList.add('show');
    const t = (showToast as any)._t;
    if (t) clearTimeout(t);
    (showToast as any)._t = setTimeout(() => toast.classList.remove('show'), ms);
  };

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ pos: window.scrollY, when: Date.now() }));
        saveBtn.setAttribute('data-saved', 'true');
        setTimeout(() => saveBtn.removeAttribute('data-saved'), 1600);
        showToast('<span class="toast-mark">Bookmarked</span>Your place is kept. Come back when you can.');
      } catch {
        showToast('<span class="toast-mark">Bookmark</span>Your browser would not let us keep your place.');
      }
    });
  }

  window.addEventListener('load', () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved.pos !== 'number' || saved.pos < 200) return;

      setTimeout(() => {
        showToast('<span class="toast-mark">Welcome back</span>You marked a page here last time. <a href="#" id="resumeLink" style="color:var(--maroon);font-weight:600;text-decoration:underline">Return to it →</a>', 6000);
        const link = document.getElementById('resumeLink');
        if (link && toast) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: saved.pos, behavior: 'smooth' });
            toast.classList.remove('show');
          });
        }
      }, 900);
    } catch {}
  });

  const form = document.getElementById('signup') as HTMLFormElement | null;
  const portrait = document.getElementById('portrait');

  if (form && portrait) {
    form.querySelectorAll<HTMLInputElement>('input').forEach((el) => {
      el.addEventListener('focus', () => portrait.classList.add('unblurring'));
      el.addEventListener('blur', () => {
        if (!document.activeElement || !form.contains(document.activeElement)) {
          portrait.classList.remove('unblurring');
        }
      });
    });

    const confirmEl = document.getElementById('confirm');
    const emailInput = document.getElementById('email') as HTMLInputElement | null;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
    
      const nameInput = document.getElementById('name') as HTMLInputElement | null;
      const emailInput = document.getElementById('email') as HTMLInputElement | null;
      const bookInput = document.getElementById('book') as HTMLInputElement | null;
    
      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const book = bookInput?.value.trim() || '';
    
      if (!name || !email || !email.includes('@')) {
        emailInput?.focus();
        return;
      }
    
      try {
        const res = await fetch('/api/invite', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            book,
          }),
        });
    
        if (!res.ok) {
          const err = await res.json();
          alert(err.error || 'Submission failed');
          return;
        }
    
        form.style.display = 'none';
    
        document
          .querySelectorAll<HTMLElement>(
            '.colophon .lede, .colophon h2, .colophon .section-label, .colophon .micro'
          )
          .forEach((el) => (el.style.display = 'none'));
    
        if (confirmEl) {
          confirmEl.classList.add('show');
          confirmEl.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
    
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
      } catch {
        alert('Network error. Try again.');
      }
    });
  }
})();

  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Libre+Caslon+Text:ital,wght@0,400;1,400;1,700&family=Jost:wght@300;400;500;600&family=Caveat:wght@500;600;700&display=swap" rel="stylesheet" />
      <div dangerouslySetInnerHTML={{ __html: '<!-- ===== Functional bookmark nav ===== -->\n  <nav class="nav" aria-label="Reading navigation">\n    <div class="nav-track" aria-hidden="true"></div>\n    <button class="nav-save" id="navSave" type="button" aria-label="Save my place"></button>\n    <button class="nav-item" data-target="hero">\n      <span class="nav-tick"></span>\n      <span class="nav-label">Preface</span>\n    </button>\n    <button class="nav-item" data-target="chapter-i">\n      <span class="nav-tick"></span>\n      <span class="nav-label">I &middot; Why</span>\n    </button>\n    <button class="nav-item" data-target="chapter-ii">\n      <span class="nav-tick"></span>\n      <span class="nav-label">II &middot; Who</span>\n    </button>\n    <button class="nav-item" data-target="chapter-iii">\n      <span class="nav-tick"></span>\n      <span class="nav-label">III &middot; Editors</span>\n    </button>\n    <button class="nav-item" data-target="register">\n      <span class="nav-tick"></span>\n      <span class="nav-label">Colophon</span>\n    </button>\n  </nav>\n\n  <div class="toast" id="toast" role="status" aria-live="polite"></div>\n\n  <main class="stage">\n\n    <header class="topbar">\n      <span class="wordmark">\n        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">\n          <path d="M7 0 C7 4.2 4.2 7 0 7 C4.2 7 7 9.8 7 14 C7 9.8 9.8 7 14 7 C9.8 7 7 4.2 7 0 Z"/>\n        </svg>\n        Asterix\n      </span>\n      <span class="here">Preface</span>\n    </header>\n\n    <!-- ===== HERO ===== -->\n    <section class="hero" id="hero">\n      <div class="particles" aria-hidden="true">\n        <span class="particle" style="left:8%;  top:22%; --d:0s;   --t:9s;"></span>\n        <span class="particle" style="left:14%; top:68%; --d:1.5s; --t:11s;"></span>\n        <span class="particle" style="left:22%; top:14%; --d:3s;   --t:10s;"></span>\n        <span class="particle" style="left:38%; top:48%; --d:0.7s; --t:13s;"></span>\n        <span class="particle" style="left:52%; top:18%; --d:2.2s; --t:9s;"></span>\n        <span class="particle" style="left:64%; top:78%; --d:0s;   --t:12s;"></span>\n        <span class="particle" style="left:72%; top:32%; --d:1.4s; --t:10s;"></span>\n        <span class="particle" style="left:84%; top:60%; --d:3.4s; --t:11s;"></span>\n        <span class="particle" style="left:91%; top:18%; --d:2s;   --t:13s;"></span>\n        <span class="particle" style="left:46%; top:88%; --d:0.5s; --t:10s;"></span>\n        <span class="particle" style="left:30%; top:84%; --d:2.6s; --t:11s;"></span>\n        <span class="particle" style="left:88%; top:42%; --d:1.1s; --t:9s;"></span>\n      </div>\n\n      <div class="hero-content">\n        <div class="hero-eyebrow" data-reveal>\n          <svg width="10" height="10" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">\n            <path d="M7 0 C7 4.2 4.2 7 0 7 C4.2 7 7 9.8 7 14 C7 9.8 9.8 7 14 7 C9.8 7 7 4.2 7 0 Z"/>\n          </svg>\n          A literary correspondence\n        </div>\n        <h1 data-reveal data-reveal-delay style="--d: 0.1s;">\n          Some love stories<br/>\n          begin with a <span class="em">sentence.</span>\n        </h1>\n        <p class="hero-body" data-reveal data-reveal-delay style="--d: 0.25s;">\n          Asterix is a literary correspondence platform   built for readers, writers, and the slowly-spoken. Find the reader whose margins resemble yours. Words first. Photographs, later.\n        </p>\n        <div class="hero-actions" data-reveal data-reveal-delay style="--d: 0.4s;">\n          <a href="#register" class="cta-filled">\n            <span>Reserve a card</span>\n          </a>\n          <a href="#letter" class="cta-ghost">\n            <span>Read the preface</span>\n            <span class="arr">&rarr;</span>\n          </a>\n        </div>\n        <div class="hero-foot" data-reveal data-reveal-delay style="--d: 0.55s;">\n          <svg width="10" height="10" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">\n            <path d="M7 0 C7 4.2 4.2 7 0 7 C4.2 7 7 9.8 7 14 C7 9.8 9.8 7 14 7 C9.8 7 7 4.2 7 0 Z"/>\n          </svg>\n          One reader a day &middot; chosen by how they read\n        </div>\n      </div>\n\n      <!-- hero marginalia: single scrawl, far right gutter -->\n      <div class="scrawl-hero" data-reveal data-reveal-delay style="--d: 0.85s;">\n        what is the sentence<br/>that&rsquo;s been<br/>following you?\n      </div>\n\n      <!-- ex-libris stamp: corner accent, sized to never collide -->\n      <svg class="stamp-hero" viewBox="0 0 100 100" aria-hidden="true">\n        <defs>\n          <path id="st-hero-top" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0" />\n          <path id="st-hero-bot" d="M 50,50 m -38,0 a 38,38 0 1,0 76,0" />\n        </defs>\n        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" stroke-width="1.4" />\n        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.55" />\n        <text font-family="Jost, sans-serif" font-size="6.5" letter-spacing="3" fill="currentColor" font-weight="600">\n          <textPath href="#st-hero-top" startOffset="50%" text-anchor="middle">EX LIBRIS &middot; ASTERIX</textPath>\n        </text>\n        <text font-family="Jost, sans-serif" font-size="6.5" letter-spacing="3" fill="currentColor" font-weight="600">\n          <textPath href="#st-hero-bot" startOffset="50%" text-anchor="middle">&middot; VOL. I &middot; NO. 1 &middot;</textPath>\n        </text>\n        <g transform="translate(50 52)" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.85">\n          <line x1="0" y1="-9" x2="0" y2="9"/>\n          <line x1="-9" y1="0" x2="9" y2="0"/>\n          <line x1="-6.4" y1="-6.4" x2="6.4" y2="6.4"/>\n          <line x1="6.4" y1="-6.4" x2="-6.4" y2="6.4"/>\n        </g>\n      </svg>\n    </section>\n\n    <!-- ===== Centerpiece sample letter ===== -->\n    <section class="letter-section" id="letter" data-reveal>\n      <span class="stamp-label">this came today</span>\n\n      <!-- postal cancellation lives in the right gutter, never on the card -->\n      <svg class="postal-letter" viewBox="0 0 220 200" aria-hidden="true">\n        <g stroke="currentColor" stroke-width="1.6">\n          <line x1="6"  y1="95"  x2="36" y2="95" />\n          <line x1="6"  y1="100" x2="36" y2="100" />\n          <line x1="6"  y1="105" x2="36" y2="105" />\n          <line x1="184" y1="95"  x2="214" y2="95" />\n          <line x1="184" y1="100" x2="214" y2="100" />\n          <line x1="184" y1="105" x2="214" y2="105" />\n        </g>\n        <circle cx="110" cy="100" r="58" fill="none" stroke="currentColor" stroke-width="1.4" />\n        <circle cx="110" cy="100" r="48" fill="none" stroke="currentColor" stroke-width="0.7" opacity="0.5" />\n        <defs>\n          <path id="pc-top" d="M 110,100 m -40,0 a 40,40 0 1,1 80,0" />\n          <path id="pc-bot" d="M 110,100 m -40,0 a 40,40 0 1,0 80,0" />\n        </defs>\n        <text font-family="Jost, sans-serif" font-size="8" letter-spacing="3.5" fill="currentColor" font-weight="600">\n          <textPath href="#pc-top" startOffset="50%" text-anchor="middle">ASTERIX &middot; MUMBAI</textPath>\n        </text>\n        <text x="110" y="105" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-size="18" fill="currentColor" font-weight="500">XIX &middot; V &middot; 26</text>\n        <text font-family="Jost, sans-serif" font-size="7" letter-spacing="3" fill="currentColor" font-weight="600">\n          <textPath href="#pc-bot" startOffset="50%" text-anchor="middle">&middot; LITERARY POST &middot;</textPath>\n        </text>\n      </svg>\n\n      <article class="card" id="letterCard">\n        <div class="crease" aria-hidden="true"></div>\n        <span class="card-corner" aria-hidden="true"></span>\n\n        <div class="card-fold">\n          <header class="card-header">\n            <span class="addressed">For you,</span>\n            <span class="chapter-tag">Chapter 1 of 5</span>\n          </header>\n\n          <div class="excerpt">\n            <span class="lead">I was so drawn to her personality and humour</span> that I couldn&rsquo;t fathom a person could be so interesting. She might have read me like a chapter, but for me she was the whole damn book.\n            <div class="excerpt-meta">  from a letter, returned</div>\n          </div>\n\n          <footer class="card-foot">\n            <div class="portrait">\n              <div class="portrait-disc" id="portrait" aria-hidden="true"></div>\n              <div class="portrait-label">Their face clarifies as you write.</div>\n            </div>\n\n            <div class="seal" aria-hidden="true" title="Wax seal">\n              <div class="seal-half left">\n                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">\n                  <defs>\n                    <radialGradient id="wax" cx="40%" cy="35%" r="65%">\n                      <stop offset="0%"  stop-color="#A8425A"/>\n                      <stop offset="60%" stop-color="#6B1E3A"/>\n                      <stop offset="100%" stop-color="#3D0E22"/>\n                    </radialGradient>\n                  </defs>\n                  <circle cx="32" cy="32" r="26" fill="url(#wax)" />\n                  <circle cx="32" cy="32" r="22" fill="none" stroke="#3D0E22" stroke-width="0.6" opacity="0.5"/>\n                  <g transform="translate(32 32)" stroke="#F4ECDC" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.92">\n                    <line x1="0" y1="-9" x2="0" y2="9"/>\n                    <line x1="-9" y1="0" x2="9" y2="0"/>\n                    <line x1="-6.5" y1="-6.5" x2="6.5" y2="6.5"/>\n                    <line x1="6.5" y1="-6.5" x2="-6.5" y2="6.5"/>\n                  </g>\n                </svg>\n              </div>\n              <div class="seal-half right">\n                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">\n                  <circle cx="32" cy="32" r="26" fill="url(#wax)" />\n                  <circle cx="32" cy="32" r="22" fill="none" stroke="#3D0E22" stroke-width="0.6" opacity="0.5"/>\n                  <g transform="translate(32 32)" stroke="#F4ECDC" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.92">\n                    <line x1="0" y1="-9" x2="0" y2="9"/>\n                    <line x1="-9" y1="0" x2="9" y2="0"/>\n                    <line x1="-6.5" y1="-6.5" x2="6.5" y2="6.5"/>\n                    <line x1="6.5" y1="-6.5" x2="-6.5" y2="6.5"/>\n                  </g>\n                </svg>\n              </div>\n            </div>\n          </footer>\n        </div>\n      </article>\n    </section>\n\n    <div class="crux" data-reveal aria-hidden="true">\n      <span class="line"></span>\n      <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">\n        <path d="M7 0 C7 4.2 4.2 7 0 7 C4.2 7 7 9.8 7 14 C7 9.8 9.8 7 14 7 C9.8 7 7 4.2 7 0 Z"/>\n      </svg>\n      <span class="line"></span>\n    </div>\n\n    <!-- ===== CHAPTER I — Why ===== -->\n    <section class="chapter" id="chapter-i" data-reveal data-chapter="I">\n      <div class="chapter-ribbon" aria-hidden="true"><span class="num">I</span></div>\n\n      <header class="chapter-head">\n        <div class="chapter-label">Chapter I</div>\n        <h2>On <span class="em">why</span> this exists.</h2>\n      </header>\n\n      <div class="prose">\n        <p>\n          <span class="drop">M</span>odern dating asks one question, asked very fast: does this person look like someone you would want? It asks it of forty strangers in a coffee shop, before any of them has spoken. It asks it again tomorrow. It does not, at any point, ask what they keep on their bedside, or which sentence they have copied into the back of a notebook, or how they think when no one is watching.\n        </p>\n        <p>We think this is the <span class="pencil-underline">wrong question, asked too soon</span>.</p>\n        <p>\n          The thing that makes a person worth knowing   the way they read a paragraph, the books they have re&#8209;read, the lines they have lifted into the margin of another life   is <em class="accent">invisible</em> in a photograph. It surfaces in writing. It surfaces slowly. And it can only be found by people who are willing to look for it.\n        </p>\n        <p>Asterix is the place to look.</p>\n      </div>\n\n      <!-- right-gutter marginalia -->\n      <span class="scrawl scrawl-i">the wrong question.<br/>every Saturday.</span>\n\n      <!-- sticky note in the right gutter -->\n      <div class="sticky sticky-i">\n        <span class="lab">a reader asks</span>\n        but how do<br/>they FIND<br/>them?\n      </div>\n    </section>\n\n    <!-- ===== CHAPTER II — Who ===== -->\n    <section class="chapter" id="chapter-ii" data-reveal data-chapter="II">\n      <div class="chapter-ribbon" aria-hidden="true"><span class="num">II</span></div>\n      <header class="chapter-head">\n        <div class="chapter-label">Chapter II</div>\n        <h2>On <span class="em">who</span> this is for.</h2>\n      </header>\n      <div class="prose">\n        <p>\n          <span class="drop">T</span>his is for the kind of person who would write back. Who would rather read a paragraph than send a sticker. Who has, this week, <span class="pencil-underline">kept a sentence</span>   copied it into a notes app, a margin, a head&#8209;loop   because it described something they had felt but had not yet said.\n        </p>\n        <p>\n          It is for re&#8209;readers. For the ones who circle a phrase before they finish the page. For the ones who write more in private than they post in public. For the ones whose ideal first date includes a bookshop and a long walk back.\n        </p>\n        <p>\n          It is also, more deeply, for the kind of person who is <em class="accent">tired.</em> Of the swipe. Of the photograph. Of the slow erosion that comes from being shown forty strangers a day, asked to choose, and offered no language with which to do so.\n        </p>\n        <p>\n          &ldquo;And honestly you don&rsquo;t absolutely have to be the most well read person out there. Asterix ain&rsquo;t a competition, it&rsquo;s very far from it. Every niche has a voice and they aren&rsquo;t compared. They are beyond comparison. What works for you, works for u, others are none the wiser&rdquo;\n        </p>\n        <p>If any of that sounds like you, the rest of this letter is also.</p>\n      </div>\n\n      <!-- left-gutter marginalia -->\n      <span class="scrawl scrawl-ii">guilty.<br/>(all of it.)</span>\n\n      <!-- sticky note in the left gutter -->\n      <div class="sticky sticky-ii">\n        <span class="lab">a reader asks</span>\n        what if i&rsquo;m<br/>not &lsquo;literary&rsquo;<br/>enough?\n      </div>\n    </section>\n\n    <!-- ===== CHAPTER III — Editors\' manifesto ===== -->\n    <section class="chapter chapter--letter" id="chapter-iii" data-reveal data-chapter="III">\n      <div class="chapter-ribbon" aria-hidden="true"><span class="num">III</span></div>\n\n      <div class="manifesto-banner">\n        <div class="manifesto-eyebrow">From the editors of Asterix</div>\n        <h2>A short <span class="em">manifesto</span>, for the slowly&#8209;spoken sort.</h2>\n        <div class="manifesto-rule" aria-hidden="true"></div>\n      </div>\n\n      <article class="manifesto-paper" id="manifesto">\n        <div class="manifesto-vol">Vol. I &middot; No. 1</div>\n\n        <p style="font-family: var(--caslon); font-size: 15px; line-height: 1.72; color: #2B1A20; font-style: italic; position: relative; z-index: 2; margin: 0 0 14px;">\n          <span style="font-family: var(--caslon); float: left; font-size: 54px; line-height: 0.9; padding: 6px 10px 0 0; color: var(--maroon); font-style: italic; font-weight: 700;">W</span>e made Asterix because we were tired. Tired of the swipe, the photograph, the smile rehearsed on the way to a bar. Tired of being shown forty strangers in a coffee shop and asked, repeatedly, to choose one without speaking to any of them. Tired of an industry that solved a problem we did not have   how do I see <em class="accent" style="font-weight:700; color:var(--maroon)">more</em> people   and left untouched the problem we did: how do I know <em class="accent" style="font-weight:700; color:var(--maroon)">any</em> of them.\n        </p>\n\n        <p style="font-family: var(--caslon); font-size: 15px; line-height: 1.72; color: #2B1A20; font-style: italic; position: relative; z-index: 2; margin: 0;">\n          The premise here is not new. It is, in fact, very old. For most of human history, romance began in correspondence   a letter, a poem passed between hands, a sentence written in a margin and slid across a table. People knew the shape of each other&rsquo;s minds before the shape of each other&rsquo;s faces. The result was occasionally clumsy and frequently slow. The people who made it through were rarely surprised by who they ended up with.\n        </p>\n\n        <div class="manifesto-sealwrap">\n          <div class="seal-rule" aria-hidden="true"></div>\n          <div class="seal" aria-hidden="true">\n            <div class="seal-half left">\n              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">\n                <circle cx="32" cy="32" r="26" fill="url(#wax)" />\n                <circle cx="32" cy="32" r="22" fill="none" stroke="#3D0E22" stroke-width="0.6" opacity="0.5"/>\n                <g transform="translate(32 32)" stroke="#F4ECDC" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.92">\n                  <line x1="0" y1="-9" x2="0" y2="9"/>\n                  <line x1="-9" y1="0" x2="9" y2="0"/>\n                  <line x1="-6.5" y1="-6.5" x2="6.5" y2="6.5"/>\n                  <line x1="6.5" y1="-6.5" x2="-6.5" y2="6.5"/>\n                </g>\n              </svg>\n            </div>\n            <div class="seal-half right">\n              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">\n                <circle cx="32" cy="32" r="26" fill="url(#wax)" />\n                <circle cx="32" cy="32" r="22" fill="none" stroke="#3D0E22" stroke-width="0.6" opacity="0.5"/>\n                <g transform="translate(32 32)" stroke="#F4ECDC" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.92">\n                  <line x1="0" y1="-9" x2="0" y2="9"/>\n                  <line x1="-9" y1="0" x2="9" y2="0"/>\n                  <line x1="-6.5" y1="-6.5" x2="6.5" y2="6.5"/>\n                  <line x1="6.5" y1="-6.5" x2="-6.5" y2="6.5"/>\n                </g>\n              </svg>\n            </div>\n          </div>\n          <div class="seal-rule" aria-hidden="true"></div>\n        </div>\n\n        <div class="manifesto-prompt">there is more   scroll on to break the seal.</div>\n\n        <div class="manifesto-fold">\n          <div class="manifesto-body">\n\n            <div class="manifesto-pull">\n              &ldquo;Photographs are not what is most you. The way you read is.&rdquo;\n            </div>\n\n            <p>\n              So we built an app where words come first. Each morning, you receive one reader   chosen not for their photograph but for the way they think. An excerpt. A note in the margin. A book on their bedside. If something stays with you, you write back. If nothing stays with you, you close the page. There are no streaks to maintain, no fires to keep alive, no anxiety pinging through the day.\n            </p>\n            <p>\n              The photograph comes, eventually. It clarifies a little with each letter. By the fifth, you know what they look like. By then, you also know whether they re&#8209;read books they have already finished, and whether they think Murakami is a draft of a feeling or the final one.\n            </p>\n            <p>\n              We have built every part of this slowly, in the hope that it will be used slowly. We trust the people who find it. We hope it finds <em class="accent">you.</em>\n            </p>\n            <div class="manifesto-sign">  the editors</div>\n          </div>\n        </div>\n      </article>\n    </section>\n\n    <div class="crux" data-reveal aria-hidden="true">\n      <span class="line"></span>\n      <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">\n        <path d="M7 0 C7 4.2 4.2 7 0 7 C4.2 7 7 9.8 7 14 C7 9.8 9.8 7 14 7 C9.8 7 7 4.2 7 0 Z"/>\n      </svg>\n      <span class="line"></span>\n    </div>\n\n    <!-- ===== COLOPHON / SIGNUP ===== -->\n    <section class="colophon" id="register" data-reveal>\n      <span class="section-label">Colophon</span>\n      <h2><span class="em">Reserve</span> a card.</h2>\n      <p class="lede">The beta opens in batches of fifty. We will write to you when your seat is ready   no sooner, no louder.</p>\n\n      <span class="scrawl-colophon">(finally.)</span>\n\n      <div class="sticky sticky-colophon">\n        <span class="lab">a reader asks</span>\n        &larr; how often<br/>will they<br/>actually write?\n      </div>\n\n      <form id="signup" novalidate>\n        <div class="field">\n          <label for="name">Your name, written legibly</label>\n          <input id="name" name="name" type="text" placeholder="how you would sign a letter" autocomplete="name" />\n        </div>\n        <div class="field">\n          <label for="email">Where to write to you</label>\n          <input id="email" name="email" type="email" required placeholder="email" autocomplete="email" />\n        </div>\n        <div class="field">\n          <label for="book">The book you re-read</label>\n          <input id="book" name="book" type="text" placeholder="a title, and an author" />\n        </div>\n\n        <button type="submit" class="submit">\n          <span>Send for an invitation</span>\n          <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">\n            <line x1="0" y1="5" x2="19" y2="5"/>\n            <polyline points="14,1 19,5 14,9"/>\n          </svg>\n        </button>\n      </form>\n\n      <p class="micro">\n        By invitation <span class="dot">&middot;</span>\n        Silent until your seat opens\n      </p>\n\n      <div class="confirm" id="confirm" role="status" aria-live="polite">\n        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">\n          <circle cx="22" cy="22" r="20"/>\n          <path d="M12 16 L22 24 L32 16" stroke-linecap="round" stroke-linejoin="round"/>\n          <path d="M12 16 L12 30 L32 30 L32 16" stroke-linecap="round" stroke-linejoin="round"/>\n        </svg>\n        <h3>Your card is reserved.</h3>\n        <p>A confirmation is on its way. When the next batch of fifty opens, you will hear from us   once.</p>\n      </div>\n    </section>\n\n    <footer class="footnote">\n      <span class="rule" aria-hidden="true"></span>\n      <span class="colo">Set in Cormorant, Caslon, and Jost.</span>\n      <span class="legal">&copy; Asterix Editions <span style="color:var(--gold)">&middot;</span> All correspondence private</span>\n    </footer>\n  </main>' }} />
    </>
  );
}
