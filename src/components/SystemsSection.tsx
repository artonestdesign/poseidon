import { systems } from "@/data/systems";
import { SystemVisual } from "@/components/SystemVisual";
import { Reveal } from "@/components/Reveal";

export function SystemsSection() {
  return (
    <section className="page-shell py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 pb-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="label-mono mb-7">
              Poseidon Research / Systems Paper 001
            </p>
            <h2 className="max-w-[650px] text-[2.25rem] leading-[1.08] font-light tracking-[-0.035em] sm:text-[3rem]">
              Intelligence that compounds with every signal.
            </h2>
          </Reveal>
          <Reveal delayMs={120} className="flex items-end lg:justify-end">
            <p className="body-copy max-w-[560px] text-lg leading-7">
              Poseidon is a persistent intelligence architecture—not a
              stateless assistant. Five interoperable systems transform
              fragmented industry activity into a continuously refined model of
              what matters next.
            </p>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-12">
          {systems.map((system, index) => (
            <Reveal
              key={system.id}
              as="article"
              delayMs={80 + index * 70}
              className={`research-card ${system.spanClass}`}
            >
              <div className="flex items-start justify-between gap-5">
                <p className="label-mono text-black/40">{system.id}</p>
                <p className="font-mono text-[11px] text-black/40">
                  {system.meta}
                </p>
              </div>

              <SystemVisual variant={system.visual} />

              <div className="flex flex-1 flex-col">
                <h3 className="text-2xl font-light tracking-[-0.025em]">
                  {system.title}
                </h3>
                <p className="body-copy mt-3 max-w-[680px] text-[15px] leading-6">
                  {system.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {system.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delayMs={120}
          className="mt-8 flex flex-col justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.1em] text-black/35 sm:flex-row"
        >
          <p>Architecture preview · Subject to active research</p>
          <p>Memory → Reasoning → Evidence → Graph → Action</p>
        </Reveal>
      </div>
    </section>
  );
}
