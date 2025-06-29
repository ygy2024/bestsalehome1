import './App.css';

const SECTIONS = [
  { id: 'mission', label: 'Our Mission' },
  { id: 'approach', label: 'Our Approach' },
  { id: 'principles', label: 'Our Principles' },
  { id: 'team', label: 'Who We Are' },
  { id: 'contact', label: 'Get Involved' },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function App() {
  return (
    <div className="main-wrapper">
      {/* Navigation */}
      <nav className="nav">
        <div className="logo">Bestsale</div>
        <ul>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button onClick={() => scrollToSection(s.id)}>{s.label}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-anim" />
        <h1>Empowering intelligent decisions through collective knowledge.</h1>
        <p className="hero-sub">Bestsale is pioneering AI solutions that turn expert knowledge into actionable insight, helping people and organizations make their best decisions.</p>
        <div className="hero-cta">
          <button onClick={() => scrollToSection('contact')}>Get Involved</button>
          <button onClick={() => scrollToSection('mission')}>Our Mission</button>
        </div>
      </section>

      {/* Mission */}
      <section className="section" id="mission">
        <h2>Our Mission</h2>
        <p>We founded Bestsale to rethink how the world accesses expertise. In a time of endless information, <b>our mission is to identify and deliver the <i>right</i> knowledge at the right time</b>—so that every decision can be informed by the best insight available. We are driven by the belief that <b>better knowledge leads to better outcomes</b>, whether it's a business strategy or a personal choice. To that end, we're <b>building AI that learns from the brightest minds</b> and shares their wisdom widely, <b>amplifying human expertise</b> rather than replacing it.</p>
      </section>

      {/* Approach */}
      <section className="section" id="approach">
        <h2>Our Approach</h2>
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
      </section>

      {/* Principles */}
      <section className="section" id="principles">
        <h2>Our Principles</h2>
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
      </section>

      {/* Who We Are */}
      <section className="section" id="team">
        <h2>Who We Are</h2>
        <p>Bestsale is a small team with big aspirations. We are AI researchers, engineers, and strategists who have previously built knowledge systems and enterprise platforms. Frustrated by how often critical expertise gets lost or siloed, we joined forces to create a solution. Our team members have contributed to advances in machine learning and have seen firsthand how AI can transform decision-making when it's applied thoughtfully. We're united by a passion for bridging the gap between what experts know and what the rest of us can access. Though we're at the start of this journey, we bring a wealth of experience in AI and a shared commitment to use technology for meaningful, positive impact.</p>
      </section>

      {/* Get Involved */}
      <section className="section contact-section" id="contact">
        <h2>Get Involved</h2>
        <p>We're in the <b>visionary stage</b> of Bestsale's development—and this is the perfect time to connect with those who share our excitement. If our mission resonates with you, let's start a conversation:</p>
        <ul className="contact-list">
          <li><b>Potential collaborators & advisors:</b> Are you an expert or organization with knowledge to share, or a researcher working on AI and knowledge management? We'd love to explore how we might work together or learn from your experience.</li>
          <li><b>Early enthusiasts & future users:</b> If you face knowledge gaps in your decisions and are curious about what we're building, reach out. Your perspective can help shape Bestsale's direction, and we can keep you in the loop as we hit new milestones.</li>
          <li><b>Talent & co-builders:</b> We are always interested in meeting like-minded innovators. Even if we don't have formal roles listed, if you're passionate about this space, let's talk. Building a transformative technology takes a village, and we welcome fellow pioneers.</li>
        </ul>
        <a className="contact-btn" href="mailto:hello@bestsale.ai">Contact us</a>
        <span className="contact-info">gy2220@nyu.edu &nbsp;|&nbsp; GY Yang</span>
        <p className="contact-note">Bestsale is currently a research-stage project. We have no commercial offerings at this time—our website and content are for sharing our vision and fostering connections. We commit to updating our community as we progress. Thank you for your interest and support as we build something new, step by step.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div>Bestsale © {new Date().getFullYear()}</div>
        <div className="footer-tagline">Empowering intelligent decisions through collective knowledge.</div>
      </footer>
    </div>
  );
}
