import { Braces, Database, Workflow } from "lucide-react";

export default function Portfolio() {
  return (
    <section id="work" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 border-b border-slate-200 pb-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="section-kicker">Selected client work</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Built systems, not slide decks.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end">
            AI consulting that connects strategy with implementation—from workflow automation and custom AI systems to adoption and measurable business value.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <article className="flex min-h-[430px] flex-col justify-between rounded-3xl bg-blue-700 p-8 text-white lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                AI consulting experience
              </p>
              <p className="mt-8 text-7xl font-semibold tracking-tight sm:text-8xl">10+</p>
              <h3 className="mt-4 text-2xl font-semibold">Companies supported</h3>
            </div>
            <div>
              <p className="text-lg leading-8 text-blue-100">
                Over the past three years, we have helped more than 10 companies introduce automation into their operations.
              </p>
              <p className="mt-4 text-sm leading-6 text-blue-200">
                Experience includes AI strategy consulting, business process automation, workflow optimization, AI implementation, and custom automation systems.
              </p>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl bg-violet-600 p-7 text-white sm:col-span-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Workflow size={24} />
              </div>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-violet-200">
                End-to-end integration
              </p>
              <h3 className="mt-3 text-2xl font-semibold">
                Systems designed around your workflow
              </h3>
              <p className="mt-3 max-w-2xl leading-7 text-violet-100">
                We design connected front-end and back-end systems that integrate with existing business workflows, tools, data, and automation processes.
              </p>
            </article>

            <article className="rounded-3xl bg-amber-300 p-7 text-slate-950">
              <Braces size={27} />
              <h3 className="mt-12 text-xl font-semibold">Front-end systems</h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Clear, responsive interfaces that make AI tools and automated workflows easy for teams to use.
              </p>
            </article>

            <article className="rounded-3xl bg-emerald-500 p-7 text-slate-950">
              <Database size={27} />
              <h3 className="mt-12 text-xl font-semibold">Back-end systems</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-950/80">
                Secure APIs, databases, business logic, and integrations that power reliable AI automation.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
