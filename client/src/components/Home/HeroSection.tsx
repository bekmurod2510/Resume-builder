import { useState, useEffect, useRef } from "react";

const TYPEWRITER_NAME = "Jasur Toshmatov";
const TYPEWRITER_TITLE = "Frontend Developer";

function useTypewriter(text, speed = 60, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function ResumeMockup({ nameTyped, titleTyped, nameDone, titleDone }) {
  const skills = ["React", "TypeScript", "Node.js"];
  const [skillsVisible, setSkillsVisible] = useState(false);

  useEffect(() => {
    if (titleDone) {
      const t = setTimeout(() => setSkillsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [titleDone]);

  return (
    <div className="bg-[#f5f5f0] rounded-lg p-5 text-[#1a1a1a] font-sans shadow-xl w-full text-sm leading-relaxed select-none">
      {/* Header */}
      <div className="border-b border-[#d0d0c8] pb-3 mb-3">
        <div className="h-5 flex items-center">
          {nameTyped ? (
            <span className="font-bold text-base text-[#1a1a1a] tracking-wide">
              {nameTyped}
              {!nameDone && (
                <span className="inline-block w-[2px] h-4 bg-[#4ade80] ml-[1px] animate-pulse align-middle" />
              )}
            </span>
          ) : (
            <span className="inline-block w-28 h-4 bg-[#e0e0d8] rounded animate-pulse" />
          )}
        </div>
        <div className="h-4 mt-1 flex items-center">
          {titleTyped ? (
            <span className="text-xs text-[#555550]">
              {titleTyped}
              {nameDone && !titleDone && (
                <span className="inline-block w-[2px] h-3 bg-[#4ade80] ml-[1px] animate-pulse align-middle" />
              )}
            </span>
          ) : (
            <span className="inline-block w-20 h-3 bg-[#e0e0d8] rounded animate-pulse" />
          )}
        </div>
      </div>

      {/* Experience section */}
      <div className="mb-3">
        <p className="text-[10px] font-semibold tracking-widest text-[#888882] uppercase mb-1.5">Experience</p>
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-xs text-[#1a1a1a]">Senior Developer</p>
            <p className="text-[10px] text-[#666660]">Najot Ta'lim • Tashkent</p>
          </div>
          <p className="text-[10px] text-[#888882]">2021 – hozir</p>
        </div>
      </div>

      {/* Education */}
      <div className="mb-3">
        <p className="text-[10px] font-semibold tracking-widest text-[#888882] uppercase mb-1.5">Ta'lim</p>
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-xs text-[#1a1a1a]">Kompyuter Fanlari</p>
            <p className="text-[10px] text-[#666660]">TATU</p>
          </div>
          <p className="text-[10px] text-[#888882]">2017 – 2021</p>
        </div>
      </div>

      {/* Skills */}
      <div>
        <p className="text-[10px] font-semibold tracking-widest text-[#888882] uppercase mb-1.5">Ko'nikmalar</p>
        <div className="flex flex-wrap gap-1">
          {skills.map((skill, i) => (
            <span
              key={skill}
              className="text-[10px] px-2 py-0.5 bg-[#1a1a1a] text-[#f5f5f0] rounded transition-all duration-500"
              style={{
                opacity: skillsVisible ? 1 : 0,
                transform: skillsVisible ? "translateY(0)" : "translateY(4px)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InputMockup({ nameDone }) {
  const fields = [
    { label: "To'liq ism", value: TYPEWRITER_NAME, icon: "👤", delay: 0 },
    { label: "Lavozim", value: TYPEWRITER_TITLE, icon: "💼", delay: 200 },
    { label: "Email", value: "jasur@mail.uz", icon: "✉️", delay: 600 },
    { label: "Telefon", value: "+998 90 123 45 67", icon: "📞", delay: 900 },
  ];

  const [visible, setVisible] = useState([false, false, false, false]);

  useEffect(() => {
    fields.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 200 + i * 180);
    });
  }, []);

  return (
    <div className="space-y-2.5 w-full">
      <p className="text-[10px] font-semibold tracking-widest text-[#4ade80] uppercase mb-3">
        Shaxsiy ma'lumotlar
      </p>
      {fields.map((field, i) => (
        <div
          key={field.label}
          className="transition-all duration-500"
          style={{
            opacity: visible[i] ? 1 : 0,
            transform: visible[i] ? "translateX(0)" : "translateX(-8px)",
            transitionDelay: `${field.delay}ms`,
          }}
        >
          <p className="text-[10px] text-[#6a6a64] mb-0.5">{field.label}</p>
          <div className="flex items-center gap-2 bg-[#2f2f2f] border border-[#3a3a3a] rounded px-2.5 py-1.5">
            <span className="text-xs">{field.icon}</span>
            <span className="text-xs text-[#e0e0d8]">{field.value}</span>
          </div>
        </div>
      ))}

      <div
        className="mt-3 pt-3 border-t border-[#2f2f2f] transition-all duration-500"
        style={{ opacity: nameDone ? 1 : 0, transitionDelay: "1s" }}
      >
        <p className="text-[10px] font-semibold tracking-widest text-[#4ade80] uppercase mb-2">
          Tajriba
        </p>
        <div className="bg-[#2f2f2f] border border-[#3a3a3a] rounded px-2.5 py-2 space-y-1">
          <div className="flex justify-between">
            <span className="text-xs text-[#e0e0d8]">Senior Developer</span>
            <span className="text-[10px] text-[#4ade80]">✓</span>
          </div>
          <div className="text-[10px] text-[#6a6a64]">Najot Ta'lim • 2021 – hozir</div>
        </div>
      </div>
    </div>
  );
}

function SplitScreenDemo() {
  const { displayed: nameTyped, done: nameDone } = useTypewriter(TYPEWRITER_NAME, 55, 800);
  const { displayed: titleTyped, done: titleDone } = useTypewriter(
    TYPEWRITER_TITLE,
    55,
    nameDone ? 200 : 99999
  );

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-[#333330] bg-[#1a1a1a] shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#242424] border-b border-[#2f2f2f]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[10px] text-[#555550] tracking-wide">resume.uz — yangi rezyume</span>
      </div>

      <div className="grid grid-cols-2 divide-x divide-[#2f2f2f]">
        {/* Left — input panel */}
        <div className="p-4 bg-[#1e1e1e] overflow-hidden">
          <InputMockup nameDone={nameDone} />
        </div>

        {/* Right — preview */}
        <div className="p-4 bg-[#242424] flex flex-col">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            <p className="text-[10px] text-[#4ade80] tracking-wide">Jonli ko'rinish</p>
          </div>
          <ResumeMockup
            nameTyped={nameTyped}
            titleTyped={titleTyped}
            nameDone={nameDone}
            titleDone={titleDone}
          />
        </div>
      </div>
    </div>
  );
}

function FloatingBadge({ text, className, style }) {
  return (
    <div
      className={`absolute hidden lg:flex items-center gap-1.5 bg-[#242424] border border-[#333330] rounded-lg px-3 py-1.5 text-xs text-[#a0a09a] shadow-lg ${className}`}
      style={style}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
      {text}
    </div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center px-6 py-20 overflow-hidden relative">
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#f5f5f0 1px, transparent 1px), linear-gradient(90deg, #f5f5f0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow accent — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(ellipse at center, #4ade80 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-12">
        {/* Badge */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-8px)",
          }}
        >
          <span className="flex items-center gap-2 text-xs text-[#4ade80] border border-[#4ade80]/30 bg-[#4ade80]/5 px-3 py-1.5 rounded-full tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            O'zbek bozori uchun №1 rezyume builder
          </span>
        </div>

        {/* Headline */}
        <div
          className="text-center transition-all duration-700 delay-100"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#f5f5f0] leading-tight tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Rezyumengizni{" "}
            <span className="text-[#4ade80]">bir necha daqiqada</span>
            <br />
            professional darajada yarating
          </h1>
          <p className="text-[#6a6a64] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Ma'lumotlaringizni kiriting — ko'rinish darhol yangilanadi.
            Tayyor bo'lgach, bir bosish bilan yuklab oling.
          </p>
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-200"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <button className="flex items-center gap-2 bg-[#4ade80] hover:bg-[#22c55e] text-[#0a0a0a] font-semibold px-6 py-3 rounded-lg text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#4ade80]/20">
            Bepul boshlash
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="flex items-center gap-2 text-[#a0a09a] hover:text-[#f5f5f0] border border-[#333330] hover:border-[#4a4a48] px-6 py-3 rounded-lg text-sm transition-all duration-200">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6 5.5l5 2.5-5 2.5V5.5z" fill="currentColor" />
            </svg>
            Demo ko'rish
          </button>
        </div>

        {/* Split screen demo */}
        <div
          className="w-full relative transition-all duration-1000 delay-300"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <FloatingBadge
            text="Real vaqtda yangilanadi"
            className="-top-3 right-8"
          />
          <FloatingBadge
            text="50+ shablon"
            className="-bottom-3 left-8"
          />
          <SplitScreenDemo />
        </div>

        {/* Social proof */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 text-[#555550] text-xs transition-all duration-700 delay-500"
          style={{ opacity: mounted ? 1 : 0 }}
        >
          {[
            { n: "12 000+", label: "yaratilgan rezyume" },
            { n: "98%", label: "ish topganlar" },
            { n: "4.9 ★", label: "foydalanuvchi bahosi" },
          ].map(({ n, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[#f5f5f0] font-semibold">{n}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
