import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SpeedInsights } from '@vercel/speed-insights/react';

const ORANGE = "#FF6B00";

/* ─── responsive helper ─── */
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

/* ─── background ─── */
function OrbField() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #0d1a2a 0%, #060a10 60%, #030508 100%)",
        }}
      />
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
            cx={`${(i * 137.5) % 100}%`}
            cy={`${(i * 97.3) % 100}%`}
            r={i % 7 === 0 ? 1.2 : 0.6}
            fill="white"
            opacity={0.2 + (i % 5) * 0.07}
          />
        ))}
      </svg>
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
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(30px,-40px) scale(1.08); }
        }
      `}</style>
    </div>
  );
}

/* ─── card ─── */
function ScanCard({ children, style = {} }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,107,0,0.18)",
        borderRadius: 16,
        overflow: "hidden",
        ...style,
      }}>
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

/* ─── section heading ─── */
function SectionHeading({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: "2.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 8,
        }}>
        <div
          style={{
            width: 28,
            height: 2,
            background: "linear-gradient(90deg, #FF6B00, transparent)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 10,
            letterSpacing: "0.22em",
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
          fontSize: "clamp(24px, 6vw, 44px)",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "0.03em",
          lineHeight: 1.15,
        }}>
        {children}
      </h2>
    </motion.div>
  );
}

/* ─── navbar ─── */
function Navbar() {
  const isMobile = useIsMobile();
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

  // close menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const logos = [
    { src: "/logos/rvce.png", invert: true },
    { src: "/logos/aicte.png" },
    { src: "/logos/idealab.png" },
    { src: "/logos/boeing.png" },
  ];

  const NAV_ITEMS = ["about", "facilities", "vision", "contact"];

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
        padding: "10px 16px 0",
        boxSizing: "border-box",
      }}>
      {/* bar */}
      <div
        style={{
          background: "rgba(6,10,16,0.9)",
          backdropFilter: "blur(20px)",
          borderRadius: menuOpen ? "14px 14px 0 0" : 14,
          border: "1px solid rgba(255,107,0,0.2)",
          borderBottom: menuOpen ? "1px solid rgba(255,107,0,0.08)" : undefined,
          boxShadow: "0 4px 40px rgba(255,107,0,0.1)",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "border-radius 0.2s",
        }}>
        {/* logos — fewer on mobile */}
        <div
          style={{
            display: "flex",
            gap: isMobile ? 8 : 14,
            alignItems: "center",
          }}>
          {logos.slice(0, isMobile ? 2 : 4).map((l, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 7,
                padding: "3px 6px",
              }}>
              <img
                src={l.src}
                alt=""
                style={{
                  height: isMobile ? 24 : 30,
                  objectFit: "contain",
                  filter: l.invert ? "invert(1) brightness(2)" : "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* desktop links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: 32 }}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: 10,
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
        )}

        {/* hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <motion.div
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              style={{
                width: 22,
                height: 2,
                background: ORANGE,
                borderRadius: 1,
                transformOrigin: "center",
              }}
            />
            <motion.div
              animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{
                width: 22,
                height: 2,
                background: ORANGE,
                borderRadius: 1,
              }}
            />
            <motion.div
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              style={{
                width: 22,
                height: 2,
                background: ORANGE,
                borderRadius: 1,
                transformOrigin: "center",
              }}
            />
          </button>
        )}
      </div>

      {/* mobile dropdown */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}>
            <div
              style={{
                background: "rgba(6,10,16,0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: "0 0 14px 14px",
                border: "1px solid rgba(255,107,0,0.15)",
                borderTop: "none",
                padding: "8px 20px 20px",
                display: "flex",
                flexDirection: "column",
              }}>
              {NAV_ITEMS.map((item, i) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: active === item ? ORANGE : "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    padding: "14px 0",
                    borderBottom:
                      i < NAV_ITEMS.length - 1
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}>
                  {active === item && (
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: ORANGE,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── hero ─── */
function Hero() {
  const isMobile = useIsMobile();
  const words = ["BUILD.", "INNOVATE.", "LAUNCH."];
  const [wIdx, setWIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWIdx((p) => (p + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: isMobile ? "80px 20px 60px" : "0 24px",
      }}>
      {/* badge */}
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
          padding: isMobile ? "5px 14px" : "6px 18px",
          marginBottom: isMobile ? 20 : 28,
          fontFamily: "'Orbitron', monospace",
          fontSize: isMobile ? 8 : 10,
          letterSpacing: "0.18em",
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
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        BOEING · RVCE · AICTE
      </motion.div>

      {/* title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
        <h1
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isMobile
              ? "clamp(52px, 18vw, 80px)"
              : "clamp(56px, 10vw, 110px)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            color: "#fff",
            margin: 0,
          }}>
          IDEA
        </h1>
        <h1
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isMobile
              ? "clamp(52px, 18vw, 80px)"
              : "clamp(56px, 10vw, 110px)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "0.04em",
            color: ORANGE,
            textShadow: `0 0 60px rgba(255,107,0,0.4), 0 0 120px rgba(255,107,0,0.2)`,
            margin: 0,
          }}>
          LAB
        </h1>
      </motion.div>

      {/* tagline */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          marginTop: isMobile ? 20 : 28,
          fontFamily: "'Space Mono', monospace",
          fontSize: isMobile ? 10 : "clamp(13px, 1.5vw, 17px)",
          color: "rgba(255,255,255,0.45)",
          letterSpacing: isMobile ? "0.08em" : "0.12em",
          textTransform: "uppercase",
          maxWidth: isMobile ? 260 : "none",
          lineHeight: 1.7,
        }}>
        Igniting Innovation · Engineering Excellence
      </motion.p>

      {/* word ticker */}
      <div
        style={{
          marginTop: 10,
          fontFamily: "'Orbitron', monospace",
          fontSize: isMobile ? 20 : "clamp(18px, 3vw, 28px)",
          fontWeight: 700,
          color: ORANGE,
          height: isMobile ? 32 : 40,
          overflow: "hidden",
        }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={wIdx}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -28, opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ display: "block" }}>
            {words[wIdx]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        style={{
          marginTop: isMobile ? 32 : 44,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 12,
          width: isMobile ? "100%" : "auto",
          maxWidth: isMobile ? 320 : "none",
          alignItems: "stretch",
        }}>
        <motion.a
          href="#about"
          whileTap={{ scale: 0.96 }}
          style={{
            display: "block",
            padding: "15px 32px",
            background: ORANGE,
            color: "#000",
            fontFamily: "'Orbitron', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: 8,
            textAlign: "center",
            boxShadow: `0 0 30px rgba(255,107,0,0.4)`,
          }}>
          Explore Lab
        </motion.a>
        <motion.a
          href="#contact"
          whileTap={{ scale: 0.96 }}
          style={{
            display: "block",
            padding: "15px 32px",
            background: "transparent",
            color: ORANGE,
            fontFamily: "'Orbitron', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: 8,
            textAlign: "center",
            border: `1px solid rgba(255,107,0,0.4)`,
          }}>
          Get Started
        </motion.a>
      </motion.div>

      {/* scroll cue — hide on mobile to save space */}
      {!isMobile && (
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
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}

/* ─── about ─── */
function About() {
  const isMobile = useIsMobile();
  const features = [
    "Proof of Concept Development",
    "3D Printing & Rapid Prototyping",
    "Simulation & Virtual Testing",
    "Electronics & IoT Integration",
    "Product Testing & Validation",
  ];

  return (
    <section
      id="about"
      style={{
        position: "relative",
        zIndex: 10,
        padding: isMobile ? "72px 20px" : "120px clamp(24px, 8vw, 120px)",
      }}>
      <SectionHeading>About IDEA Lab</SectionHeading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(280px, 1fr))",
          gap: isMobile ? 36 : 60,
          alignItems: "start",
        }}>
        {/* text + stats */}
        <div>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.9,
              fontSize: isMobile ? 13 : 14,
              borderLeft: `2px solid rgba(255,107,0,0.3)`,
              paddingLeft: 18,
            }}>
            Boeing–RVCE–AICTE IDEA Lab is a collaborative initiative established
            to foster innovation, creativity, and entrepreneurship. Supported by
            Boeing India and AICTE, hosted at RV College of Engineering,
            Bengaluru.
          </p>
          <div
            style={{ display: "flex", gap: isMobile ? 24 : 32, marginTop: 32 }}>
            {[
              { n: "500+", label: "Students" },
              { n: "3", label: "Partners" },
              { n: "∞", label: "Ideas" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: isMobile ? 26 : 32,
                    fontWeight: 900,
                    color: ORANGE,
                    textShadow: `0 0 20px rgba(255,107,0,0.4)`,
                  }}>
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 9,
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

        {/* feature list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}>
              <ScanCard
                style={{
                  padding: "13px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}>
                <span
                  style={{
                    color: ORANGE,
                    fontSize: 14,
                    opacity: 0.8,
                    flexShrink: 0,
                  }}>
                  ◈
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: isMobile ? 11.5 : 13,
                    color: "rgba(255,255,255,0.75)",
                  }}>
                  {f}
                </span>
              </ScanCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── facilities ─── */
function Facilities() {
  const isMobile = useIsMobile();
  const items = [
    {
      title: "Workshops",
      desc: "Hands-on mentorship sessions and full access to professional-grade fabrication tools.",
      tag: "ACTIVE",
    },
    {
      title: "Prototyping",
      desc: "Rapid development systems including SLA/FDM printers and CNC workstations.",
      tag: "24/7",
    },
    {
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
        padding: isMobile ? "72px 20px" : "120px clamp(24px, 8vw, 120px)",
        background:
          "linear-gradient(180deg, transparent, rgba(255,107,0,0.03), transparent)",
      }}>
      <SectionHeading>Facilities</SectionHeading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: isMobile ? 0 : i * 0.1 }}>
            <ScanCard style={{ padding: isMobile ? "24px 20px" : "32px 28px" }}>
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
                  marginBottom: 16,
                }}>
                {item.tag}
              </div>
              <h3
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: isMobile ? 15 : 17,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 10,
                  letterSpacing: "0.04em",
                }}>
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: isMobile ? 11.5 : 12,
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

/* ─── vision ─── */
function Vision() {
  const isMobile = useIsMobile();
  return (
    <section
      id="vision"
      style={{
        position: "relative",
        zIndex: 10,
        padding: isMobile ? "72px 20px" : "120px clamp(24px, 8vw, 120px)",
      }}>
      <SectionHeading>Vision & Mission</SectionHeading>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <ScanCard style={{ padding: isMobile ? "28px 22px" : "36px 32px" }}>
            <div
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 10,
                letterSpacing: "0.25em",
                color: ORANGE,
                textTransform: "uppercase",
                marginBottom: 14,
                opacity: 0.7,
              }}>
              / Vision
            </div>
            <h3
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: isMobile ? 17 : 20,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 14,
                letterSpacing: "0.03em",
              }}>
              Innovation Ecosystem
            </h3>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: isMobile ? 12 : 12.5,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.9,
              }}>
              A state-of-the-art innovation ecosystem that nurtures creativity
              and transforms ideas into tangible products, supporting the
              mission of Atmanirbhar Bharat.
            </p>
          </ScanCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: isMobile ? 0 : 0.1 }}>
          <ScanCard style={{ padding: isMobile ? "28px 22px" : "36px 32px" }}>
            <div
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 10,
                letterSpacing: "0.25em",
                color: ORANGE,
                textTransform: "uppercase",
                marginBottom: 14,
                opacity: 0.7,
              }}>
              / Mission
            </div>
            <h3
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: isMobile ? 17 : 20,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 18,
                letterSpacing: "0.03em",
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
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: ORANGE,
                      boxShadow: `0 0 6px ${ORANGE}`,
                      flexShrink: 0,
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: isMobile ? 11.5 : 12.5,
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

/* ─── CTA ─── */
function CTA() {
  const isMobile = useIsMobile();
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 10,
        padding: isMobile ? "80px 20px" : "120px 24px",
        textAlign: "center",
      }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: isMobile ? "100%" : 600,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(255,107,0,0.1), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
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
            marginBottom: 18,
            opacity: 0.7,
          }}>
          — Join Us —
        </div>

        <h2
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isMobile
              ? "clamp(26px, 8vw, 42px)"
              : "clamp(32px, 6vw, 64px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "0.03em",
            marginBottom: 12,
            lineHeight: 1.1,
          }}>
          Build. Innovate. Launch.
        </h2>

        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.08em",
            marginBottom: 36,
          }}>
          Join IDEA Lab and create the future.
        </p>

        <motion.a
          href="mailto:idealab@rvce.edu.in"
          whileTap={{ scale: 0.96 }}
          style={{
            display: "inline-block",
            padding: isMobile ? "15px 40px" : "16px 52px",
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

/* ─── footer ─── */
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        borderTop: "1px solid rgba(255,107,0,0.1)",
        padding: isMobile ? "24px 20px" : "32px 48px",
        display: "flex",
        alignItems: "center",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        gap: 8,
        textAlign: isMobile ? "center" : "left",
      }}>
      <span
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 8,
          letterSpacing: "0.16em",
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

/* ─── root ─── */
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #060a10; color: #fff;
          font-family: 'Space Mono', monospace;
          overflow-x: hidden; -webkit-font-smoothing: antialiased;
        }
        /* prevent iOS tap highlight */
        a, button { -webkit-tap-highlight-color: transparent; }
        /* smooth momentum scroll on iOS */
        html { -webkit-overflow-scrolling: touch; }
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
      <SpeedInsights />
    </>
  );
}
