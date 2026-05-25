import { useState, useEffect, useRef } from "react";
import "./app.css";
import rosangelaImg from "./assets/img/rosangelaImg.png";
import whatsappIcon from "./assets/whats-app.png";
import instagramIcon from "./assets/instagram.png";

// ========== CONSTANTES ==========
const WA_NUMBER = "557999611186";
const IG_HANDLE = "corretorarosangelaribeiro";

function makeWaLink(msg = "Olá Rosângela! Vi seu site e gostaria de informações."): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function openWa(msg?: string) {
  window.open(makeWaLink(msg), "_blank");
}

function openIg() {
  window.open(`https://instagram.com/${IG_HANDLE}`, "_blank");
}

function scrollToContato() {
  document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
}

// ========== ÍCONES ==========
interface IconProps {
  size?: number;
  variant?: "dark" | "white" | "gold";
  style?: React.CSSProperties;
}

const FILTERS: Record<string, string> = {
  dark:  "brightness(0)",
  white: "brightness(0) invert(1)",
  gold:  "invert(68%) sepia(48%) saturate(500%) hue-rotate(5deg) brightness(0.9)",
};

function WaIcon({ size = 18, variant = "dark", style }: IconProps) {
  return (
    <img src={whatsappIcon} alt="" aria-hidden="true"
      style={{ width: size, height: size, verticalAlign: "middle", marginRight: 8, filter: FILTERS[variant ?? "dark"], ...style }} />
  );
}

function IgIcon({ size = 18, variant = "white", style }: IconProps) {
  return (
    <img src={instagramIcon} alt="" aria-hidden="true"
      style={{ width: size, height: size, verticalAlign: "middle", marginRight: 8, filter: FILTERS[variant ?? "white"], ...style }} />
  );
}

// ========== REVEAL ==========
// Wrapper que anima suavemente (fade + subida) quando entra na tela.
// delay em segundos — útil para escalonar itens de uma lista.

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

function Reveal({ children, delay = 0, className = "", style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
    >
      {children}
    </div>
  );
}

// ========== NAV ==========
function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <nav className="nav-wrapper" style={{ boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.06)" : "none" }}>
      <div className="nav-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="nav-logo-circle jost">RR</div>
          <div>
            <div className="nav-name">Rosângela Ribeiro</div>
            <div className="nav-sub">Corretora de Imóveis</div>
          </div>
        </div>
        <button className="btn-gold" style={{ padding: "12px 28px", fontSize: 11 }} onClick={() => openWa()}>
          <WaIcon size={16} variant="dark" />
          WhatsApp
        </button>
      </div>
    </nav>
  );
}

// ========== HERO ==========
function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-pattern" />
      <div className="hero-line-left" />
      <div className="hero-line-bottom" />

      <div className="hero-grid">
        {/* Texto entra primeiro */}
        <Reveal>
          <div className="tag">Corretora · CRECI 1572-2008</div>
          <h1 className="hero-title">
            Encontre<br />
            <span>o seu</span><br />
            lar ideal
          </h1>
          <p className="hero-desc">
            Há mais de <strong>15 anos</strong> transformando casas em lares.
            Aracaju e região com dedicação, cuidado e a transparência que você merece.
          </p>
          <div className="hero-cta-row">
            <button className="btn-gold" onClick={() => openWa("Olá Rosângela! Quero encontrar meu lar!")}>
              Quero meu lar →
            </button>
            <button className="btn-outline" onClick={scrollToContato}>
              Ver contato
            </button>
          </div>
        </Reveal>

        {/* Foto entra levemente depois */}
        <Reveal delay={0.2} className="hero-photo-wrap">
          <div className="hero-photo-frame">
            <div className="frame-corner-tl" />
            <div className="frame-corner-br" />
            <img src={rosangelaImg} alt="Rosângela Ribeiro — Corretora de Imóveis" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ========== STATS ==========
const STATS = [
  { num: "15+", label: "Anos de experiência" },
  { num: "16K+", label: "Seguidores no Instagram" },
  { num: "446", label: "Publicações" },
];

function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.15} className="stat-item">
            <div className="stat-number">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ========== SOBRE ==========
const FEATURES = [
  { icon: "🏠", title: "Residencial", desc: "Casas, apartamentos e condomínios em Aracaju" },
  { icon: "🔑", title: "Compra & Venda", desc: "Negociação segura e transparente" },
  { icon: "📋", title: "Minha Casa", desc: "Especialista em programas habitacionais" },
  { icon: "💛", title: "Atendimento VIP", desc: "Atenção exclusiva para cada cliente" },
];

function Sobre() {
  return (
    <section className="sobre-section">
      <div className="sobre-grid">
        <Reveal>
          <div className="tag">Quem sou eu</div>
          <h2 className="sobre-title">Rosângela<br />Ribeiro</h2>
          <div className="gold-line" />
          <p className="sobre-text">
            Corretora de Imóveis registrada no CRECI 1572-2008, atuando em Aracaju e região há
            mais de 15 anos, ajudando famílias a realizarem o sonho da casa própria.
          </p>
          <p className="sobre-text" style={{ marginBottom: 32 }}>
            Minha missão é simples: transformar casas em lares — com dedicação,
            honestidade e o cuidado que cada família merece.
          </p>
          <button className="btn-gold" onClick={() => openWa("Olá! Quero saber mais sobre imóveis.")}>
            <WaIcon size={16} variant="dark" />
            Falar agora
          </button>
        </Reveal>

        <div className="sobre-features">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1} className="feat-card">
              <div className="feat-card-icon">{f.icon}</div>
              <div className="feat-card-title">{f.title}</div>
              <div className="feat-card-desc">{f.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== CTA BANNER ==========
function CtaBanner() {
  return (
    <section className="cta-section">
      <div className="cta-pattern" />
      <Reveal className="cta-inner">
        <div className="tag">Pronto para começar?</div>
        <h2 className="cta-title">
          Seu próximo lar está<br />
          <span>esperando por você</span>
        </h2>
        <p className="cta-desc">
          Entre em contato agora e dê o primeiro passo para realizar o seu sonho.
        </p>
        <button
          className="btn-gold"
          style={{ padding: "18px 54px", fontSize: 14 }}
          onClick={() => openWa("Olá Rosângela! Quero encontrar meu lar!")}
        >
          <WaIcon size={18} variant="dark" />
          Chamar no WhatsApp
        </button>
      </Reveal>
    </section>
  );
}

// ========== CONTATO ==========
interface InfoItem {
  icon: string;
  label: string;
  value: string;
  action: (() => void) | null;
}

const INFO_ITEMS: InfoItem[] = [
  { icon: "📱", label: "WhatsApp", value: "(79) 99611-186", action: () => openWa() },
  { icon: "📸", label: "Instagram", value: `@${IG_HANDLE}`, action: openIg },
  { icon: "📋", label: "CRECI", value: "1572 — 2008", action: null },
  { icon: "📍", label: "Cidade", value: "Aracaju — SE", action: null },
];

function Contato() {
  return (
    <section className="contato-section" id="contato">
      <Reveal className="contato-header">
        <div className="tag">Localização & Contato</div>
        <h2 className="contato-title">Entre em Contato</h2>
        <div className="gold-line" style={{ margin: "14px auto 0" }} />
      </Reveal>

      <div className="contato-grid">
        <Reveal>
          <div className="map-card">
            <iframe
              title="Localização Aracaju"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d489.70842951162456!2d-37.07149856618456!3d-10.912859218951487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x71ab308b1b50c35%3A0x96dda902df19e9a8!2sR.%20Sergipe%2C%20825%20-%20Siqueira%20Campos%2C%20Aracaju%20-%20SE%2C%2049075-540!5e0!3m2!1spt-BR!2sbr!4v1779159358168!5m2!1spt-BR!2sbr"
              width="100%"
              height={280}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
            <div className="map-footer">
              <span style={{ fontSize: 18 }}>📍</span>
              <div>
                <div className="info-label">Localização</div>
                <div className="info-value">R. Sergipe, 825 - Siqueira Campos, Aracaju — Sergipe, Brasil</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="info-card">
            <div className="info-card-header">
              <div className="tag">Informações</div>
              <h3 className="info-card-title">Fale Comigo</h3>
              <div className="gold-line" />
            </div>

            {INFO_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`info-row${item.action ? " clickable" : ""}`}
                onClick={item.action ?? undefined}
              >
                <span className="info-row-icon">{item.icon}</span>
                <div>
                  <div className="info-label">{item.label}</div>
                  <div className="info-value">{item.value}</div>
                </div>
              </div>
            ))}

            <button
              className="btn-gold"
              style={{ marginTop: 16, width: "100%" }}
              onClick={() => openWa("Olá Rosângela! Vi seu site e gostaria de informações!")}
            >
              <WaIcon size={16} variant="dark" />
              Enviar mensagem
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ========== FOOTER ==========
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Reveal className="footer-top">
          <div>
            <div className="footer-name">Rosângela Ribeiro</div>
            <div className="footer-creci">Corretora de Imóveis · CRECI 1572-2008</div>
          </div>
          <div className="footer-btns">
            <button className="footer-btn-gold" onClick={() => openWa()}>
              <WaIcon size={15} variant="gold" />
              WhatsApp
            </button>
            <button className="footer-btn-ghost" onClick={openIg}>
              <IgIcon size={15} variant="white" />
              Instagram
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="footer-bottom">
          <span className="footer-copy">© 2026 Rosângela Ribeiro — Todos os direitos reservados</span>
          <span className="footer-copy">
            Desenvolvido por{" "}
            <a
              href="https://heverecstudiocode.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#C9A84C", textDecoration: "none", fontWeight: 500 }}
            >
              Heverec Studio Code
            </a>
          </span>
        </Reveal>
      </div>
    </footer>
  );
}

// ========== APP ==========
export default function RosangelaRibeiro() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <>
      <Nav scrolled={scrolled} />
      <main>
        <Hero />
        <Stats />
        <Sobre />
        <CtaBanner />
        <Contato />
      </main>
      <Footer />
    </>
  );
}