import './App.css';
import FadeInSection from './components/FadeInSection';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SECTIONS = [
  { id: 'mission', label: 'Mission' },
  { id: 'approach', label: 'Approach' },
  { id: 'principles', label: 'Values' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  const nav = document.querySelector('.top-nav') as HTMLElement;
  if (el && nav) {
    // 查找section下的h2
    const h2 = el.querySelector('h2') || el;
    const navHeight = nav.offsetHeight;
    const h2Height = h2.offsetHeight;
    const rect = h2.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // 目标：h2顶部距离视口顶部 = navHeight + h2Height - 6
    const targetY = rect.top + scrollTop - navHeight - h2Height + 6;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  } else if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  // 统一用state管理bling和glow
  const [blingNavIdx, setBlingNavIdx] = useState<number | null>(null);
  const [glowNavIdx, setGlowNavIdx] = useState<number | null>(0);
  const [blingH2Idx, setBlingH2Idx] = useState<number | null>(null);
  const [glowH2Idx, setGlowH2Idx] = useState<number | null>(0);
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const h2Refs = useRef<(HTMLHeadingElement | null)[]>([]);
  const lastBlingIdx = useRef<number>(-1);
  const [manualNavTargetIdx, setManualNavTargetIdx] = useState<number | null>(null);

  // GSAP极致bling动画
  const BLING_MS = 420;
  const OFFSET_MS = 30;
  function blingPair(idx: number) {
    setBlingNavIdx(idx);
    setTimeout(() => setBlingNavIdx(current => (current === idx ? null : current)), BLING_MS);
    setTimeout(() => {
      setBlingH2Idx(idx);
      setTimeout(() => setBlingH2Idx(current => (current === idx ? null : current)), BLING_MS);
    }, OFFSET_MS);
    // 只对span做动画，苹果风格
    const navSpan = navRefs.current[idx]?.querySelector('span');
    if (navSpan) {
      gsap.set(navSpan, {
        filter: "drop-shadow(0 0 0px #fff0ff) drop-shadow(0 0 0px #b983ff)",
        textShadow: "0 0 0px #fff0ff, 0 0 0px #b983ff",
        scale: 1,
      });
      gsap.to(navSpan, {
        filter: "drop-shadow(0 0 8px #fff0ff) drop-shadow(0 0 12px #b983ff)",
        textShadow: "0 0 4px #fff0ff, 0 0 8px #b983ff",
        scale: 1.02,
        duration: 0.1,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(navSpan, {
            filter: "drop-shadow(0 0 0px #fff0ff) drop-shadow(0 0 0px #b983ff)",
            textShadow: "0 0 0px #fff0ff, 0 0 0px #b983ff",
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });
    }
    setTimeout(() => {
      if (h2Refs.current[idx]) {
        gsap.fromTo(h2Refs.current[idx],
          { opacity: 0.7, scale: 1.00 },
          { opacity: 1, scale: 1.018, duration: BLING_MS/1000 * 0.6, ease: 'power1.inOut',
            onComplete: () => { gsap.to(h2Refs.current[idx], { scale: 1.00, duration: BLING_MS/1000 * 0.4, ease: 'power1.inOut' }); return undefined; }
          }
        );
      }
    }, OFFSET_MS);
    lastBlingIdx.current = idx;
  }

  // 滚动监听，精准判定h2位置
  useEffect(() => {
    function onScroll() {
      const nav = document.querySelector('.top-nav') as HTMLElement;
      const navHeight = nav ? nav.offsetHeight : 64;
      let bestIdx = -1;
      let bestDist = Infinity;
      h2Refs.current.forEach((el, i) => {
        if (!el) return;
        const h2Height = el.offsetHeight;
        const rect = el.getBoundingClientRect();
        const delta = rect.top - navHeight;
        // 激活区间上边缘限制在距离导航下边缘1倍h2高度处，下边缘向上缩短1.5倍h2高度
        const min = h2Height;
        const max = h2Height + 6 + 3.5 * h2Height;
        if (delta >= min && delta <= max) {
          const dist = Math.abs(delta - h2Height);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        }
      });
      if (manualNavTargetIdx !== null) {
        // 主动跳转中，只允许目标idx高亮和bling
        setGlowNavIdx(manualNavTargetIdx);
        setGlowH2Idx(manualNavTargetIdx);
        setActiveSection(SECTIONS[manualNavTargetIdx].id);
        if (bestIdx === manualNavTargetIdx) {
          blingPair(manualNavTargetIdx);
          setManualNavTargetIdx(null); // 滚动到目标后恢复正常
        }
        return;
      }
      setGlowNavIdx(bestIdx !== -1 ? bestIdx : null);
      setGlowH2Idx(bestIdx !== -1 ? bestIdx : null);
      if (bestIdx !== -1) {
        setActiveSection(SECTIONS[bestIdx].id);
        if (lastBlingIdx.current !== bestIdx) {
          blingPair(bestIdx);
          lastBlingIdx.current = bestIdx;
        }
      } else {
        lastBlingIdx.current = -1;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    setTimeout(onScroll, 100);
    return () => window.removeEventListener('scroll', onScroll);
  }, [manualNavTargetIdx]);

  function handleNavClick(id: string, idx: number) {
    setActiveSection(id); // 横线立即移动
    setManualNavTargetIdx(idx);
    scrollToSection(id);
  }

  return (
    <div className="main-wrapper">
      <nav className="top-nav">
        <div className="top-logo">Bestsale</div>
        <ul>
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <button
                ref={el => { navRefs.current[i] = el; }}
                onClick={() => handleNavClick(s.id, i)}
              >
                <span
                  className={[
                    glowNavIdx === i ? 'glow-static' : '',
                    blingNavIdx === i ? 'bling-now' : ''
                  ].filter(Boolean).join(' ')}
                >{s.label}</span>
                {activeSection === s.id && (
                  <span className="nav-underline" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-anim" />
        <h1>Empowering intelligent decisions through collective knowledge.</h1>
        <p className="hero-sub">Bestsale is pioneering AI solutions that turn expert knowledge into actionable insight, helping people and organizations make their best decisions.</p>
      </section>
      {/* Mission */}
      <FadeInSection className="section" id="mission">
        <h2
          ref={el => { h2Refs.current[0] = el; }}
          className={[
            glowH2Idx === 0 ? 'glow-static' : '',
            blingH2Idx === 0 ? 'bling-now' : ''
          ].filter(Boolean).join(' ')}
        >Our Mission</h2>
        <p>We founded Bestsale to rethink how the world accesses expertise. In a time of endless information, <b>our mission is to identify and deliver the <i>right</i> knowledge at the right time</b>—so that every decision can be informed by the best insight available. We are driven by the belief that <b>better knowledge leads to better outcomes</b>, whether it's a business strategy or a personal choice. To that end, we're <b>building AI that learns from the brightest minds</b> and shares their wisdom widely, <b>amplifying human expertise</b> rather than replacing it.</p>
      </FadeInSection>
      {/* Approach */}
      <FadeInSection className="section" id="approach">
        <h2
          ref={el => { h2Refs.current[1] = el; }}
          className={[
            glowH2Idx === 1 ? 'glow-static' : '',
            blingH2Idx === 1 ? 'bling-now' : ''
          ].filter(Boolean).join(' ')}
        >Our Approach</h2>
        <div className="approach-cards">
          <div className="approach-card">
            <h3>Learning from the best</h3>
            <p>Bestsale's research is focused on developing an AI platform that can learn directly from domain experts—think of it as training a curator that absorbs the know-how of industry veterans, researchers, and specialists. We combine advanced natural language AI with trusted knowledge bases to create a system that <b>understands context, asks clarifying questions, and cites its sources</b>.</p>
          </div>
          <div className="approach-card">
            <h3>Knowledge, not just data</h3>
            <p>Rather than trawling the entire internet for unverified facts, our approach emphasizes quality over quantity. We're prototyping methods for the AI to validate information and explain its reasoning. The goal is an assistant that doesn't just answer "What's the cheapest solution?" but can also tell you "Here's why, according to proven research and experts."</p>
          </div>
          <div className="approach-card">
            <h3>Human in the loop</h3>
            <p>We know AI is strongest when working <i>with</i> people. Bestsale's early experiments involve professionals teaching and correcting the AI in their field. Each correction makes the system smarter and more aligned with what real users need. <b>By designing with humans in the loop from day one, we ensure our technology remains reliable, humble, and helpful.</b> Our platform is still in development, but this collaborative philosophy guides every step of its evolution.</p>
          </div>
        </div>
        <p className="approach-note">(Note: Bestsale's technology is currently in the R&D phase. We are exploring these innovations in closed testing and will share updates on our progress. We do not have a commercial product or live service yet—our focus is on getting the science and experience right, hand-in-hand with expert partners.)</p>
      </FadeInSection>
      {/* Principles */}
      <FadeInSection className="section" id="principles">
        <h2
          ref={el => { h2Refs.current[2] = el; }}
          className={[
            glowH2Idx === 2 ? 'glow-static' : '',
            blingH2Idx === 2 ? 'bling-now' : ''
          ].filter(Boolean).join(' ')}
        >Our Principles</h2>
        <div className="principles-list">
          <div className="principle">
            <h4>Knowledge Integrity</h4>
            <p><i>Truth matters.</i> We prioritize accuracy and honesty in every result. If our AI doesn't know something, it will not fabricate an answer—it will say so or seek guidance. Trust is earned through transparency, so we design our system to <b>provide evidence and context</b> for all its outputs.</p>
          </div>
          <div className="principle">
            <h4>Human-Centered Design</h4>
            <p><i>People first, always.</i> Our AI is being built to augment human decision-making, not automate it away. We keep the user in control: you can trace why a recommendation was made, and you have the final say. Your feedback isn't just welcome—it's essential. <b>Bestsale learns with you</b> to become a smarter ally over time.</p>
          </div>
          <div className="principle">
            <h4>Continuous Learning & Improvement</h4>
            <p><i>Stay curious, stay humble.</i> We approach our mission as lifelong learners. Every challenge or mistake is an opportunity to improve our models. We run rigorous tests, invite critique, and iterate quickly. In an emerging field like AI, <b>no one has all the answers upfront</b>—so we embrace a mindset of constant innovation grounded in scientific rigor.</p>
          </div>
          <div className="principle">
            <h4>Collaborative Innovation</h4>
            <p><i>Building with the community.</i> We believe solving knowledge problems benefits everyone, so we aim to collaborate openly. This means partnering with academics on research, integrating feedback from early adopters, and sharing our findings responsibly. We thrive on <b>partnership and diverse perspectives</b>, because big problems are best tackled together.</p>
          </div>
        </div>
      </FadeInSection>
      {/* Who We Are */}
      <FadeInSection className="section" id="team">
        <h2
          ref={el => { h2Refs.current[3] = el; }}
          className={[
            glowH2Idx === 3 ? 'glow-static' : '',
            blingH2Idx === 3 ? 'bling-now' : ''
          ].filter(Boolean).join(' ')}
        >Who We Are</h2>
        <p>Bestsale is a small team with big aspirations, originally formed at NYU. We are AI researchers, engineers, and strategists who have previously built knowledge systems and enterprise platforms. Frustrated by how often critical expertise gets lost or siloed, we joined forces to create a solution. Our team members have contributed to advances in machine learning and have seen firsthand how AI can transform decision-making when it's applied thoughtfully. We're united by a passion for bridging the gap between what experts know and what the rest of us can access. Though we're at the start of this journey, we bring a wealth of experience in AI and a shared commitment to use technology for meaningful, positive impact.</p>
      </FadeInSection>
      {/* Get Involved */}
      <FadeInSection className="section contact-section" id="contact">
        <h2
          ref={el => { h2Refs.current[4] = el; }}
          className={[
            glowH2Idx === 4 ? 'glow-static' : '',
            blingH2Idx === 4 ? 'bling-now' : ''
          ].filter(Boolean).join(' ')}
        >Get Involved</h2>
        <p>We're in the <b>visionary stage</b> of Bestsale's development—and this is the perfect time to connect with those who share our excitement. If our mission resonates with you, let's start a conversation:</p>
        <ul className="contact-list">
          <li><b>Potential collaborators & advisors:</b> Are you an expert or organization with knowledge to share, or a researcher working on AI and knowledge management? We'd love to explore how we might work together or learn from your experience.</li>
          <li><b>Early enthusiasts & future users:</b> If you face knowledge gaps in your decisions and are curious about what we're building, reach out. Your perspective can help shape Bestsale's direction, and we can keep you in the loop as we hit new milestones.</li>
          <li><b>Talent & co-builders:</b> We are always interested in meeting like-minded innovators. Even if we don't have formal roles listed, if you're passionate about this space, let's talk. Building a transformative technology takes a village, and we welcome fellow pioneers.</li>
        </ul>
        <a className="contact-btn" href="mailto:gy2220@nyu.edu">Contact us</a>
        <span className="contact-info">gy2220@nyu.edu  |  funder-GY Yang</span>
        <p className="contact-note">Bestsale is currently a research-stage project. We have no commercial offerings at this time—our website and content are for sharing our vision and fostering connections. We commit to updating our community as we progress. Thank you for your interest and support as we build something new, step by step.</p>
      </FadeInSection>
      {/* Footer */}
      <footer className="footer">
        <div>Bestsale © {new Date().getFullYear()}</div>
        <div className="footer-tagline">Empowering intelligent decisions through collective knowledge.</div>
      </footer>
    </div>
  );
}
