import { useEffect, useRef, useState } from "react";

/* ─── Shared hook: fires once when element enters viewport ─── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─── Micro-demo: ATS keyword scanner ─── */
function ATSDemo() {
  const keywords = ["React", "TypeScript", "REST API", "Node.js", "Git"];
  const [step, setStep] = useState(0);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => {
      setScanning(true);
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setStep(i);
        if (i >= keywords.length) { clearInterval(iv); setScanning(false); }
      }, 420);
      return () => clearInterval(iv);
    }, 600);
    return () => clearTimeout(start);
  }, []);

  return (
    <div className="mt-4 bg-[#1a1a1a] rounded-lg p-4 border border-[#2f2f2f] select-none">
      {/* Fake ATS header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
        <span className="text-[10px] text-[#6a6a64] tracking-widest uppercase">ATS Parser</span>
        {scanning && (
          <span className="ml-auto text-[10px] text-[#4ade80] animate-pulse">Scanning...</span>
        )}
        {!scanning && step > 0 && (
          <span className="ml-auto text-[10px] text-[#4ade80]">{step}/{keywords.length} kalit so'z topildi</span>
        )}
      </div>

      {/* Resume text block with keywords lighting up */}
      <p className="text-[11px] text-[#6a6a64] leading-relaxed">
        Tajribali{" "}
        {keywords.map((kw, i) => (
          <span key={kw}>
            <span
              className="transition-all duration-300 px-1 py-0.5 rounded"
              style={{
                color: i < step ? "#4ade80" : "#6a6a64",
                background: i < step ? "rgba(74,222,128,0.1)" : "transparent",
                fontWeight: i < step ? 600 : 400,
              }}
            >
              {kw}
            </span>
            {i < keywords.length - 1 ? ", " : ""}
          </span>
        ))}
        {" "}ishlab chiquvchi.
      </p>

      {/* Score bar */}
      <div className="mt-3">
        <div className="flex justify-between mb-1">
          <span className="text-[10px] text-[#6a6a64]">ATS Mos kelish darajasi</span>
          <span className="text-[10px] font-semibold text-[#4ade80]">{Math.round((step / keywords.length) * 100)}%</span>
        </div>
        <div className="w-full h-1 bg-[#2f2f2f] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4ade80] rounded-full transition-all duration-400"
            style={{ width: `${(step / keywords.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Micro-demo: Auto pagination ─── */
function PaginationDemo() {
  const [pageBreakVisible, setPageBreakVisible] = useState(false);
  const [overflowVisible, setOverflowVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOverflowVisible(true), 400);
    const t2 = setTimeout(() => setPageBreakVisible(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="mt-4 select-none space-y-2">
      {/* Page 1 */}
      <div className="bg-[#f5f5f0] rounded p-3 text-[#1a1a1a] relative overflow-hidden">
        <div className="text-[9px] font-semibold text-[#888882] uppercase tracking-widest mb-2">1-sahifa</div>
        <div className="space-y-1">
          {["Shaxsiy ma'lumotlar", "Tajriba", "Ta'lim"].map((row) => (
            <div key={row} className="h-2 rounded bg-[#d0d0c8]" style={{ width: row === "Ta'lim" ? "60%" : "100%" }} />
          ))}
        </div>
        {/* Overflow content trying to squeeze in */}
        <div
          className="mt-2 transition-all duration-500"
          style={{ opacity: overflowVisible ? 1 : 0 }}
        >
          <div className="h-2 rounded bg-[#d0d0c8] w-full mb-1" />
          <div className="h-2 rounded bg-[#d0d0c8] w-4/5" />
        </div>
      </div>

      {/* Page break indicator */}
      <div
        className="flex items-center gap-2 transition-all duration-500"
        style={{
          opacity: pageBreakVisible ? 1 : 0,
          transform: pageBreakVisible ? "scaleX(1)" : "scaleX(0.6)",
        }}
      >
        <div className="flex-1 border-t border-dashed border-[#4ade80]/50" />
        <span className="text-[9px] text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded tracking-wide">Sahifa uzilishi — avtomatik</span>
        <div className="flex-1 border-t border-dashed border-[#4ade80]/50" />
      </div>

      {/* Page 2 */}
      <div
        className="bg-[#f5f5f0] rounded p-3 text-[#1a1a1a] transition-all duration-500"
        style={{
          opacity: pageBreakVisible ? 1 : 0.3,
          transform: pageBreakVisible ? "translateY(0)" : "translateY(6px)",
        }}
      >
        <div className="text-[9px] font-semibold text-[#888882] uppercase tracking-widest mb-2">2-sahifa</div>
        <div className="space-y-1">
          <div className="h-2 rounded bg-[#d0d0c8] w-full" />
          <div className="h-2 rounded bg-[#d0d0c8] w-3/4" />
        </div>
      </div>
    </div>
  );
}

/* ─── Micro-demo: AI rewriting a bullet point ─── */
const WEAK = "Worked on React projects";
const STRONG = "Delivered 3 production React apps, reducing load time by 40%";

function AIDemo() {
  const [phase, setPhase] = useState("weak"); // weak | erasing | typing | done
  const [text, setText] = useState(WEAK);
  const [charIdx, setCharIdx] = useState(STRONG.length);

  useEffect(() => {
    // Phase 1: show weak text, then start erasing
    const t1 = setTimeout(() => setPhase("erasing"), 900);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase === "erasing") {
      let len = WEAK.length;
      const iv = setInterval(() => {
        len--;
        setText(WEAK.slice(0, len));
        if (len <= 0) { clearInterval(iv); setPhase("typing"); setCharIdx(0); setText(""); }
      }, 40);
      return () => clearInterval(iv);
    }
    if (phase === "typing") {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setText(STRONG.slice(0, i));
        setCharIdx(i);
        if (i >= STRONG.length) { clearInterval(iv); setPhase("done"); }
      }, 38);
      return () => clearInterval(iv);
    }
  }, [phase]);

  return (
    <div className="mt-4 bg-[#1a1a1a] rounded-lg p-4 border border-[#2f2f2f] select-none">
      {/* AI badge */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-[10px] bg-[#4ade80]/10 text-[#4ade80] px-2 py-0.5 rounded-full border border-[#4ade80]/20">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5z" fill="#4ade80" />
          </svg>
          AI yordamchi
        </div>
        <span className="text-[10px] text-[#6a6a64] ml-1">
          {phase === "weak" && "Zaif so'zlar aniqlandi"}
          {phase === "erasing" && "O'chirilmoqda..."}
          {phase === "typing" && "Yaxshilanmoqda..."}
          {phase === "done" && "Tayyorlandi ✓"}
        </span>
      </div>

      {/* Before label (only during weak phase) */}
      {phase === "weak" && (
        <div className="text-[9px] text-[#555550] uppercase tracking-widest mb-1">Oldin</div>
      )}

      {/* The text being rewritten */}
      <div
        className="text-xs leading-relaxed rounded px-2 py-1.5 border transition-all duration-300"
        style={{
          color: phase === "done" ? "#e0e0d8" : phase === "weak" ? "#888882" : "#e0e0d8",
          borderColor: phase === "done" ? "rgba(74,222,128,0.3)" : "#2f2f2f",
          background: phase === "done" ? "rgba(74,222,128,0.04)" : "transparent",
          textDecoration: phase === "weak" ? "line-through" : "none",
        }}
      >
        {text || "\u00A0"}
        {(phase === "typing") && (
          <span
            className="inline-block w-[1.5px] h-3 bg-[#4ade80] ml-[1px] align-middle animate-pulse"
          />
        )}
      </div>

      {/* "After" label */}
      {phase === "done" && (
        <div className="mt-2 text-[9px] text-[#4ade80] uppercase tracking-widest">
          +62% kuchliroq
        </div>
      )}
    </div>
  );
}

/* ─── Individual feature card ─── */
function FeatureCard({ eyebrow, title, description, demo, delay = 0, visible, large = false } : {eyebrow: string, title: string, description: string, demo: React.ReactNode, delay?: number, visible: boolean, large?: boolean}) {
  return (
    <div
      className={`bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-6 transition-all duration-700 hover:border-[#333330] group ${large ? "md:col-span-2" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="inline-block text-[10px] font-semibold tracking-widest text-[#4ade80] uppercase mb-3">
        {eyebrow}
      </span>
      <h3 className="text-[#f5f5f0] font-semibold text-lg leading-snug mb-2">{title}</h3>
      <p className="text-[#6a6a64] text-sm leading-relaxed">{description}</p>
      {demo}
    </div>
  );
}

/* ─── Main export ─── */
export default function FeaturesSection() {
  const { ref, visible } = useScrollReveal(0.12);

  const features = [
    {
      eyebrow: "ATS Optimizatsiyasi",
      title: "Rezyumengiz robot filtridan o'tadi — kafolat bilan",
      description:
        "Yirik kompaniyalar CV'larni birinchi navbatda dastur orqali o'qiydi. Bizning shablonlarimiz toza, mashinabop formatda — hech qanday matn buzilishi yo'q. Kalit so'zlar to'g'ri joylashgan, sarlavhalar standartlashgan.",
      demo: <ATSDemo />,
      delay: 0,
      large: true,
    },
    {
      eyebrow: "Aqlli Formatlash",
      title: "Word'ning marginlari bilan kurashish tugadi",
      description:
        "Kontent sahifadan chiqib ketsa — builder avtomatik tuzatadi. Siz mazmun bilan shug'ullaning, biz sahifa uzilishini boshqaramiz.",
      demo: <PaginationDemo />,
      delay: 100,
    },
    {
      eyebrow: "AI Yordamchi",
      title: "Yozishda qotib qoldingizmi? AI yordamga keladi",
      description:
        "Tajribangizni qanday tasvirlashni bilmayapsizmi? AI zaif iboralarni aniqlaydi va aniq, ta'sirchan jumlalarga aylantiradi.",
      demo: <AIDemo />,
      delay: 200,
    },
  ];

  return (
    <section
      ref={ref}
      className="bg-[#1a1a1a] px-6 py-24 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#f5f5f0 1px, transparent 1px), linear-gradient(90deg, #f5f5f0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Subtle divider glow from hero */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 opacity-20"
        style={{
          background: "linear-gradient(to bottom, #4ade80, transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <span className="inline-block text-[11px] font-semibold tracking-widest text-[#4ade80] uppercase mb-4">
            Nima uchun resume.uz?
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#f5f5f0] leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ish qidirishning uchta eng katta{" "}
            <span className="text-[#4ade80]">og'riq nuqtasi</span> — hal qilindi
          </h2>
          <p className="text-[#6a6a64] text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Boshqa CV builderlar shablon beradi. Biz muammolaringizni yechamiz.
          </p>
        </div>

        {/* Features grid: 1 large on top, 2 below */}
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((f) => (
            <FeatureCard key={f.eyebrow} {...f} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
