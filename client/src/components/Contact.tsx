import { ArrowUpRight, Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-cyan-300 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">Start the conversation</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Let’s find the AI opportunity worth pursuing.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Share the challenge, workflow, or idea you are exploring. We’ll begin with your business goals and determine the clearest next step.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="mailto:Dtaplin21@gmail.com?subject=AI%20Strategy%20Consultation"
              className="flex items-center justify-between rounded-2xl bg-slate-950 p-5 text-white transition-transform hover:-translate-y-1"
            >
              <span className="flex items-center gap-3">
                <Mail size={19} className="text-cyan-300" />
                <span>
                  <span className="block text-xs text-slate-400">Email</span>
                  <span className="font-medium">Dtaplin21@gmail.com</span>
                </span>
              </span>
              <ArrowUpRight size={20} />
            </a>
            <a
              href="tel:+15103261121"
              className="flex items-center justify-between rounded-2xl border border-slate-900/20 bg-white/40 p-5 text-slate-950 transition-colors hover:bg-white/60"
            >
              <span className="flex items-center gap-3">
                <Phone size={19} />
                <span>
                  <span className="block text-xs text-slate-700">Call</span>
                  <span className="font-medium">(510) 326-1121</span>
                </span>
              </span>
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}