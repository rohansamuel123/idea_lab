import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useCallback, useState, useRef } from "react";

const ORANGE = "#FF6B00";
const ORANGE_GLOW = "rgba(255,107,0,0.18)";

// Floating orb background
function OrbField() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep space base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #0d1a2a 0%, #060a10 60%, #030508 100%)",
        }}
      />
      {/* Orbs */}
      {[
        {
          top: "8%",
          left: "15%",
          size: 420,
          color: "rgba(255,107,0,0.07)",
          delay: "0s",
          dur: "18s",
        },
        {
          top: "55%",
          left: "72%",
          size: 320,
          color: "rgba(0,140,255,0.06)",
          delay: "3s",
          dur: "22s",
        },
        {
          top: "75%",
          left: "20%",
          size: 260,
          color: "rgba(255,107,0,0.05)",
          delay: "6s",
          dur: "15s",
        },
        {
          top: "30%",
          left: "80%",
          size: 200,
          color: "rgba(255,180,60,0.05)",
          delay: "9s",
          dur: "20s",
        },
      ].map((o, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: o.top,
            left: o.left,
            width: o.size,
            height: o.size,
            borderRadius: "50%",
            background: o.color,
            filter: "blur(80px)",
            animation: `orbFloat ${o.dur} ${o.delay} ease-in-out infinite alternate`,
          }}
        />
      ))}
      {/* Star field */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.5,
        }}>
        {Array.from({ length: 80 }).map((_, i) => (
          <circle
            key={i}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r={Math.random() < 0.15 ? 1.2 : 0.6}
            fill="white"
            opacity={0.2 + Math.random() * 0.5}
          />
        ))}
      </svg>
      {/* Thin grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,107,0,0.04) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,107,0,0.04) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <style>{`
        @keyframes orbFloat {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -40px) scale(1.08); }
        }
      `}</style>
    </div>
  );
}

// Scanline shimmer on a card
function ScanCard({ children, className = "", style = {} }) {
  return (
    <motion.div
      whileHover={{ scale: 1.025, borderColor: ORANGE }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,107,0,0.18)",
        borderRadius: 16,
        overflow: "hidden",
        ...style,
      }}
      className={className}>
      {/* top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,107,0,0.6), transparent)",
        }}
      />
      {children}
    </motion.div>
  );
}

// Section heading with orange line
function SectionHeading({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: "3rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 8,
        }}>
        <div
          style={{
            width: 36,
            height: 2,
            background: "linear-gradient(90deg, #FF6B00, transparent)",
          }}
        />
        <span
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 11,
            letterSpacing: "0.25em",
            color: ORANGE,
            textTransform: "uppercase",
            opacity: 0.8,
          }}>
          Section
        </span>
      </div>
      <h2
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.04em",
          lineHeight: 1.1,
        }}>
        {children}
      </h2>
    </motion.div>
  );
}

// Navbar
function Navbar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80);
      ["about", "facilities", "vision", "contact"].forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) setActive(id);
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logos = [
    { src: "/logos/rvce.png", invert: true },
    { src: "/logos/aicte.png" },
    { src: "/logos/idealab.png" },
    { src: "/logos/boeing.png" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: visible ? 0 : -80 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        padding: "12px 24px 0",
      }}>
      <div
        style={{
          background: "rgba(6,10,16,0.85)",
          backdropFilter: "blur(20px)",
          borderRadius: 14,
          border: "1px solid rgba(255,107,0,0.2)",
          boxShadow: "0 4px 40px rgba(255,107,0,0.1)",
          padding: "10px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        {/* Logos */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {logos.map((l, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 8,
                padding: "4px 8px",
              }}>
              <img
                src={l.src}
                alt=""
                style={{
                  height: 32,
                  objectFit: "contain",
                  filter: l.invert ? "invert(1) brightness(2)" : "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 36 }}>
          {["about", "facilities", "vision", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: active === item ? ORANGE : "rgba(255,255,255,0.5)",
                textDecoration: "none",
                transition: "color 0.2s",
                position: "relative",
              }}>
              {item}
              {active === item && (
                <motion.span
                  layoutId="nav-underline"
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: -4,
                    width: "100%",
                    height: 1.5,
                    background: `linear-gradient(90deg, ${ORANGE}, rgba(255,107,0,0.3))`,
                    borderRadius: 2,
                    boxShadow: `0 0 8px ${ORANGE}`,
                  }}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

// Hero
function Hero() {
  const words = ["BUILD.", "INNOVATE.", "LAUNCH."];
  const [wIdx, setWIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWIdx((p) => (p + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
      }}>
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,107,0,0.08)",
          border: "1px solid rgba(255,107,0,0.25)",
          borderRadius: 100,
          padding: "6px 18px",
          marginBottom: 28,
          fontFamily: "'Orbitron', monospace",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: ORANGE,
        }}>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: ORANGE,
            boxShadow: `0 0 8px ${ORANGE}`,
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        BOEING · RVCE · AICTE
      </motion.div>

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
        <h1
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(56px, 10vw, 110px)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            color: "#fff",
            marginBottom: 0,
          }}>
          IDEA
        </h1>
        <h1
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(56px, 10vw, 110px)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "0.04em",
            color: ORANGE,
            textShadow: `0 0 60px rgba(255,107,0,0.4), 0 0 120px rgba(255,107,0,0.2)`,
            marginBottom: 0,
          }}>
          LAB
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          marginTop: 28,
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(13px, 1.5vw, 17px)",
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
        Igniting Innovation · Engineering Excellence
      </motion.p>

      {/* Animated word */}
      <div
        style={{
          marginTop: 12,
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(18px, 3vw, 28px)",
          fontWeight: 700,
          color: ORANGE,
          height: 40,
          overflow: "hidden",
        }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={wIdx}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: "block" }}>
            {words[wIdx]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={{
          marginTop: 44,
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
        <motion.a
          href="#about"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-block",
            padding: "14px 36px",
            background: ORANGE,
            color: "#000",
            fontFamily: "'Orbitron', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: 8,
            boxShadow: `0 0 30px rgba(255,107,0,0.4)`,
          }}>
          Explore Lab
        </motion.a>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-block",
            padding: "14px 36px",
            background: "transparent",
            color: ORANGE,
            fontFamily: "'Orbitron', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: 8,
            border: `1px solid rgba(255,107,0,0.4)`,
          }}>
          Get Started
        </motion.a>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}>
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(255,107,0,0.6), transparent)",
          }}
        />
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
          }}>
          scroll
        </span>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}

// About
function About() {
  const features = [
    { icon: "◈", label: "Proof of Concept Development" },
    { icon: "◈", label: "3D Printing & Rapid Prototyping" },
    { icon: "◈", label: "Simulation & Virtual Testing" },
    { icon: "◈", label: "Electronics & IoT Integration" },
    { icon: "◈", label: "Product Testing & Validation" },
  ];

  return (
    <section
      id="about"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "120px clamp(24px, 8vw, 120px)",
      }}>
      <SectionHeading>About IDEA Lab</SectionHeading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "start",
        }}>
        <div>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.9,
              fontSize: 14,
              borderLeft: `2px solid rgba(255,107,0,0.3)`,
              paddingLeft: 20,
            }}>
            Boeing–RVCE–AICTE IDEA Lab is a collaborative initiative established
            to foster innovation, creativity, and entrepreneurship. Supported by
            Boeing India and AICTE, hosted at RV College of Engineering,
            Bengaluru.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
            {[
              { n: "500+", label: "Students" },
              { n: "3", label: "Partners" },
              { n: "∞", label: "Ideas" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: 32,
                    fontWeight: 900,
                    color: ORANGE,
                    textShadow: `0 0 20px rgba(255,107,0,0.4)`,
                  }}>
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.35)",
                    textTransform: "uppercase",
                  }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}>
              <ScanCard
                style={{
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}>
                <span style={{ color: ORANGE, fontSize: 16, opacity: 0.8 }}>
                  {f.icon}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.75)",
                  }}>
                  {f.label}
                </span>
              </ScanCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Facilities
function Facilities() {
  const items = [
    {
      icon: "⬡",
      title: "Workshops",
      desc: "Hands-on mentorship sessions and full access to professional-grade fabrication tools.",
      tag: "ACTIVE",
    },
    {
      icon: "⬡",
      title: "Prototyping",
      desc: "Rapid development systems including SLA/FDM printers and CNC workstations.",
      tag: "24/7",
    },
    {
      icon: "⬡",
      title: "Innovation Hub",
      desc: "Dedicated R&D space for live industry projects and interdisciplinary research.",
      tag: "LIVE",
    },
  ];

  return (
    <section
      id="facilities"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "120px clamp(24px, 8vw, 120px)",
        background:
          "linear-gradient(180deg, transparent, rgba(255,107,0,0.03), transparent)",
      }}>
      <SectionHeading>Facilities</SectionHeading>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
        }}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}>
            <ScanCard style={{ padding: "32px 28px", height: "100%" }}>
              {/* Tag */}
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(255,107,0,0.1)",
                  border: "1px solid rgba(255,107,0,0.2)",
                  borderRadius: 100,
                  padding: "3px 12px",
                  fontFamily: "'Orbitron', monospace",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: ORANGE,
                  marginBottom: 20,
                }}>
                {item.tag}
              </div>

              <div
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: 28,
                  color: ORANGE,
                  marginBottom: 12,
                  opacity: 0.7,
                }}>
                {item.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 12,
                  letterSpacing: "0.05em",
                }}>
                {item.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.8,
                }}>
                {item.desc}
              </p>
            </ScanCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Vision
function Vision() {
  return (
    <section
      id="vision"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "120px clamp(24px, 8vw, 120px)",
      }}>
      <SectionHeading>Vision & Mission</SectionHeading>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <ScanCard style={{ padding: "36px 32px", height: "100%" }}>
            <div
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 10,
                letterSpacing: "0.25em",
                color: ORANGE,
                textTransform: "uppercase",
                marginBottom: 16,
                opacity: 0.7,
              }}>
              / Vision
            </div>
            <h3
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 16,
                letterSpacing: "0.04em",
              }}>
              Innovation Ecosystem
            </h3>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12.5,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.9,
              }}>
              A state-of-the-art innovation ecosystem that nurtures creativity
              and transforms ideas into tangible products, supporting the
              mission of Atmanirbhar Bharat.
            </p>
          </ScanCard>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}>
          <ScanCard style={{ padding: "36px 32px", height: "100%" }}>
            <div
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 10,
                letterSpacing: "0.25em",
                color: ORANGE,
                textTransform: "uppercase",
                marginBottom: 16,
                opacity: 0.7,
              }}>
              / Mission
            </div>
            <h3
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 20,
                letterSpacing: "0.04em",
              }}>
              Our Core Goals
            </h3>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}>
              {[
                "Create national innovation ecosystem",
                "Hands-on skill development",
                "Interdisciplinary collaboration",
                "Startup & product incubation",
                "Innovation-driven education",
              ].map((item, i) => (
                <li
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: ORANGE,
                      boxShadow: `0 0 8px ${ORANGE}`,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 12.5,
                      color: "rgba(255,255,255,0.55)",
                    }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </ScanCard>
        </motion.div>
      </div>
    </section>
  );
}

// CTA
function CTA() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 10,
        padding: "120px 24px",
        textAlign: "center",
      }}>
      {/* Glow behind */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(255,107,0,0.1), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}>
        <div
          style={{
            display: "inline-block",
            fontFamily: "'Orbitron', monospace",
            fontSize: 9,
            letterSpacing: "0.3em",
            color: ORANGE,
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: 0.7,
          }}>
          — Join Us —
        </div>

        <h2
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(32px, 6vw, 64px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "0.04em",
            marginBottom: 12,
          }}>
          Build. Innovate. Launch.
        </h2>

        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.08em",
            marginBottom: 40,
          }}>
          Join IDEA Lab and create the future.
        </p>

        <motion.a
          href="mailto:idealab@rvce.edu.in"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-block",
            padding: "16px 52px",
            background: ORANGE,
            color: "#000",
            fontFamily: "'Orbitron', monospace",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: 8,
            boxShadow: `0 0 40px rgba(255,107,0,0.45), 0 0 80px rgba(255,107,0,0.2)`,
          }}>
          Get Started
        </motion.a>
      </motion.div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid rgba(255,107,0,0.1)",
        padding: "32px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
      <span
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 9,
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.2)",
          textTransform: "uppercase",
        }}>
        © 2026 Boeing–RVCE–AICTE IDEA Lab · Bengaluru
      </span>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          color: "rgba(255,107,0,0.4)",
        }}>
        RVCE_560059
      </span>
    </footer>
  );
}

export default function App() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #060a10;
          color: #fff;
          font-family: 'Space Mono', monospace;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060a10; }
        ::-webkit-scrollbar-thumb { background: rgba(255,107,0,0.4); border-radius: 2px; }
      `}</style>

      <div style={{ position: "relative", minHeight: "100vh" }}>
        <OrbField />
        <Navbar />
        <Hero />
        <About />
        <Facilities />
        <Vision />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
