import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  BarChart3,
  ClipboardCheck,
  FlaskConical,
  Lightbulb,
  Search,
  TrendingUp,
} from "lucide-react";

// Neon accent pairs as "r g b" so CSS can apply alpha: rgb(var(--neon-a) / .5)
const steps = [
  {
    number: "01",
    title: "Understand the ambition",
    description: "Clarify what you want AI to improve, the business constraints, and what success should look like.",
    icon: Lightbulb,
    accent: ["34 211 238", "56 189 248"], // cyan -> sky
  },
  {
    number: "02",
    title: "Audit systems & workflows",
    description: "Map current tools, data, processes, risks, and team readiness to identify practical opportunities.",
    icon: Search,
    accent: ["56 189 248", "129 140 248"], // sky -> indigo
  },
  {
    number: "03",
    title: "Create the AI manifesto",
    description: "Define guiding principles, priority use cases, governance boundaries, and a focused implementation plan.",
    icon: ClipboardCheck,
    accent: ["167 139 250", "232 121 249"], // violet -> fuchsia
  },
  {
    number: "04",
    title: "Develop & test pilots",
    description: "Build small, useful pilots and validate them with the people who will use them in real workflows.",
    icon: FlaskConical,
    accent: ["232 121 249", "244 114 182"], // fuchsia -> pink
  },
  {
    number: "05",
    title: "Deploy & scale",
    description: "Move successful pilots into production, support adoption, and create a responsible path to expansion.",
    icon: TrendingUp,
    accent: ["52 211 153", "163 230 53"], // emerald -> lime
  },
  {
    number: "06",
    title: "Track ROI",
    description: "Measure time saved, quality, revenue impact, adoption, and operating cost against agreed baselines.",
    icon: BarChart3,
    accent: ["250 204 21", "251 146 60"], // yellow -> orange
  },
];

const STEP_MS = 2200;
const HOLD_MS = 3200; // pause with every card lit before restarting
const RESET_MS = 700;

function Words({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="neon-word" style={{ "--i": i + offset } as CSSProperties}>
            {word}
          </span>{" "}
        </span>
      ))}
    </>
  );
}

export default function Approach() {
  // Index of the card currently "firing"; cards before it stay softly lit. -1 = all dark.
  const [current, setCurrent] = useState(-1);
  const [hovered, setHovered] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sequential light-up: 01 -> 06, hold, reset, repeat. Pauses while a card is hovered/focused.
  useEffect(() => {
    if (reducedMotion) {
      setCurrent(steps.length - 1);
      return;
    }
    if (!inView || hovered !== null) return;

    const last = steps.length - 1;
    const delay = current === -1 ? RESET_MS : current === last ? HOLD_MS : STEP_MS;
    const timer = window.setTimeout(() => {
      setCurrent((c) => (c === last ? -1 : c + 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [current, hovered, inView, reducedMotion]);

  const stateFor = (index: number) => {
    if (hovered === index) return "active";
    if (hovered === null && current === index && !reducedMotion) return "active";
    if (index <= current) return "lit";
    return "off";
  };

  return (
    <section id="approach" className="bg-slate-950 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="section-kicker section-kicker-dark">The engagement model</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            From first question to measurable value.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            A structured, evidence-led process keeps the work focused on the systems your organization needs—not AI for its own sake.
          </p>
        </div>

        <div ref={gridRef} className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ number, title, description, icon: Icon, accent }, index) => (
            <article
              key={number}
              tabIndex={0}
              data-state={stateFor(index)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              className="neon-card p-7 lg:p-8"
              style={{ "--neon-a": accent[0], "--neon-b": accent[1] } as CSSProperties}
            >
              <div className="flex items-center justify-between">
                <span className="neon-num font-mono text-xs">{number}</span>
                <div className="neon-icon flex h-10 w-10 items-center justify-center rounded-xl">
                  <Icon size={19} />
                </div>
              </div>
              <h3 className="neon-title mt-10 text-xl font-semibold">
                <Words text={title} />
              </h3>
              <p className="neon-desc mt-3 text-sm leading-6">
                <Words text={description} offset={title.split(" ").length} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
