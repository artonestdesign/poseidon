type SystemVisualProps = {
  variant:
    | "memory"
    | "agents"
    | "modalities"
    | "graph"
    | "predict";
};

export function SystemVisual({ variant }: SystemVisualProps) {
  return (
    <div className={`system-visual system-visual-${variant}`} aria-hidden="true">
      {variant === "memory" ? <MemoryVisual /> : null}
      {variant === "agents" ? <AgentsVisual /> : null}
      {variant === "modalities" ? <ModalitiesVisual /> : null}
      {variant === "graph" ? <GraphVisual /> : null}
      {variant === "predict" ? <PredictVisual /> : null}
    </div>
  );
}

function MemoryVisual() {
  const left = [
    { y: 38, label: "interests" },
    { y: 86, label: "goals" },
    { y: 134, label: "accounts" },
  ];
  const right = [
    { y: 38, label: "memory" },
    { y: 86, label: "context" },
    { y: 134, label: "preferences" },
  ];

  return (
    <svg viewBox="0 0 560 170" className="system-svg" fill="none">
      <circle className="sv-glow" cx="280" cy="86" r="48" />
      <circle className="sv-ring sv-ring-a" cx="280" cy="86" r="46" />
      <circle className="sv-ring sv-ring-b" cx="280" cy="86" r="30" />
      <circle className="sv-core" cx="280" cy="86" r="14" />
      <text className="sv-label-center sv-core-label" x="280" y="90">
        user
      </text>

      <g className="sv-orbit-group">
        <circle className="sv-orbit-dot" cx="280" cy="40" r="4" />
        <circle className="sv-orbit-dot" cx="326" cy="86" r="4" />
        <circle className="sv-orbit-dot" cx="280" cy="132" r="4" />
        <circle className="sv-orbit-dot" cx="234" cy="86" r="4" />
      </g>

      {left.map((item, index) => (
        <g key={item.label} className={`sv-feed sv-delay-${index}`}>
          <rect
            className="sv-pill"
            x="28"
            y={item.y - 12}
            width="96"
            height="24"
            rx="12"
          />
          <text className="sv-label-center" x="76" y={item.y + 4}>
            {item.label}
          </text>
          <path
            className="sv-feed-line"
            d={`M124 ${item.y} C168 ${item.y}, 214 86, 250 86`}
          />
          <circle className="sv-orbit-dot" cx="124" cy={item.y} r="3" />
        </g>
      ))}

      {right.map((item, index) => (
        <g key={item.label} className={`sv-feed sv-delay-${index + 1}`}>
          <rect
            className="sv-pill"
            x="436"
            y={item.y - 12}
            width="96"
            height="24"
            rx="12"
          />
          <text className="sv-label-center" x="484" y={item.y + 4}>
            {item.label}
          </text>
          <path
            className="sv-feed-line"
            d={`M436 ${item.y} C392 ${item.y}, 346 86, 310 86`}
          />
          <circle className="sv-orbit-dot" cx="436" cy={item.y} r="3" />
        </g>
      ))}
    </svg>
  );
}

function AgentsVisual() {
  const agents = [
    { x: 160, y: 28, label: "route" },
    { x: 56, y: 58, label: "find" },
    { x: 264, y: 58, label: "parse" },
    { x: 72, y: 128, label: "prove" },
    { x: 248, y: 128, label: "synth" },
  ];

  return (
    <svg viewBox="0 0 320 170" className="system-svg" fill="none">
      <circle className="sv-glow" cx="160" cy="86" r="36" />

      {agents.map((agent) => (
        <path
          key={`link-${agent.label}`}
          className="sv-link"
          d={`M160 86 L${agent.x} ${agent.y}`}
        />
      ))}

      <path
        className="sv-link sv-link-active"
        d="M160 86 L56 58 M160 86 L248 128"
      />

      <circle className="sv-hub" cx="160" cy="86" r="20" />
      <text className="sv-label-center sv-core-label" x="160" y="90">
        coord
      </text>

      {agents.map((agent, index) => (
        <g
          key={agent.label}
          className={`sv-agent-node sv-delay-${index}`}
          transform={`translate(${agent.x} ${agent.y})`}
        >
          <circle className="sv-agent-disc" r="11" />
          <text className="sv-label-center" y="22">
            {agent.label}
          </text>
        </g>
      ))}

      <circle className="sv-packet" r="3.5" />
    </svg>
  );
}

function ModalitiesVisual() {
  const rows = [
    { y: 26, label: "audio", kind: "wave" as const },
    { y: 54, label: "transcript", kind: "text" as const },
    { y: 82, label: "slides", kind: "blocks" as const },
    { y: 110, label: "docs", kind: "lines" as const },
    { y: 138, label: "metadata", kind: "dots" as const },
  ];

  return (
    <svg viewBox="0 0 320 170" className="system-svg" fill="none">
      <text className="sv-label" x="16" y="12">
        inputs
      </text>
      <text className="sv-label" x="168" y="12">
        align
      </text>
      <text className="sv-label" x="250" y="12">
        recover
      </text>

      {rows.map((row, index) => (
        <g key={row.label} className={`sv-modality sv-delay-${index}`}>
          <rect className="sv-pill" x="12" y={row.y - 10} width="70" height="20" rx="10" />
          <text className="sv-label-center" x="47" y={row.y + 3}>
            {row.label}
          </text>

          {row.kind === "wave" ? (
            <path
              className="sv-accent-stroke"
              d={`M92 ${row.y} c8 -8 12 8 20 0 s12 8 20 0 s12 8 20 0`}
            />
          ) : null}
          {row.kind === "text" ? (
            <>
              <rect className="sv-chip" x="92" y={row.y - 4} width="40" height="8" rx="3" />
              <rect className="sv-chip soft" x="136" y={row.y - 4} width="24" height="8" rx="3" />
            </>
          ) : null}
          {row.kind === "blocks" ? (
            <>
              <rect className="sv-chip" x="92" y={row.y - 7} width="16" height="14" rx="2" />
              <rect className="sv-chip soft" x="112" y={row.y - 7} width="16" height="14" rx="2" />
              <rect className="sv-chip" x="132" y={row.y - 7} width="16" height="14" rx="2" />
            </>
          ) : null}
          {row.kind === "lines" ? (
            <path className="sv-dash" d={`M92 ${row.y - 4} H160 M92 ${row.y + 3} H144`} />
          ) : null}
          {row.kind === "dots" ? (
            <>
              <circle className="sv-mini" cx="98" cy={row.y} r="2.5" />
              <circle className="sv-mini soft" cx="114" cy={row.y} r="2.5" />
              <circle className="sv-mini" cx="130" cy={row.y} r="2.5" />
              <circle className="sv-mini soft" cx="146" cy={row.y} r="2.5" />
            </>
          ) : null}

          <path
            className="sv-feed-line"
            d={`M168 ${row.y} C188 ${row.y}, 198 82, 214 82`}
          />
        </g>
      ))}

      <rect className="sv-fuse" x="214" y="58" width="28" height="48" rx="8" />
      <text className="sv-label-center" x="228" y="78">
        entity
      </text>
      <text className="sv-label-center" x="228" y="90">
        claim
      </text>

      <path className="sv-link sv-link-active" d="M242 82 H258" />
      <circle className="sv-glow" cx="286" cy="82" r="22" />
      <circle className="sv-core" cx="286" cy="82" r="16" />
      <text className="sv-label-center sv-core-label" x="286" y="80">
        semantic
      </text>
      <text className="sv-label-center" x="286" y="92">
        space
      </text>
    </svg>
  );
}

function GraphVisual() {
  const nodes = [
    { x: 48, y: 108, label: "co", r: 12 },
    { x: 108, y: 48, label: "ppl", r: 12 },
    { x: 168, y: 92, label: "prod", r: 11 },
    { x: 118, y: 126, label: "comp", r: 10 },
    { x: 228, y: 58, label: "evt", r: 12 },
    { x: 278, y: 108, label: "opp", r: 13, accent: true },
  ];

  return (
    <svg viewBox="0 0 320 170" className="system-svg" fill="none">
      <text className="sv-label" x="16" y="14">
        entities
      </text>
      <text className="sv-label" x="210" y="14">
        bi-temporal edge
      </text>

      <path className="sv-edge soft" d="M48 108 L108 48 L168 92 L118 126 L48 108" />
      <path className="sv-edge" d="M108 48 L228 58 L168 92" />
      <path className="sv-edge accent" d="M228 58 L278 108" />
      <path className="sv-edge soft" d="M168 92 L278 108" />

      {/* dual time markers on accent edge = bi-temporal */}
      <circle className="sv-mini soft" cx="242" cy="70" r="2.5" />
      <circle className="sv-mini" cx="258" cy="86" r="2.5" />
      <text className="sv-label" x="246" y="64">
        valid
      </text>
      <text className="sv-label" x="262" y="100">
        txn
      </text>

      {nodes.map((node, index) => (
        <g
          key={node.label}
          className={`sv-entity ${node.accent ? "accent" : ""} sv-delay-${index % 5}`}
          transform={`translate(${node.x} ${node.y})`}
        >
          {node.accent ? <circle className="sv-glow" r="20" /> : null}
          <circle r={node.r} />
          <text y="3">{node.label}</text>
        </g>
      ))}

      <path className="sv-time-axis" d="M24 152 H296" />
      <circle className="sv-orbit-dot" cx="48" cy="152" r="2.5" />
      <circle className="sv-orbit-dot" cx="168" cy="152" r="2.5" />
      <circle className="sv-orbit-dot" cx="278" cy="152" r="2.5" />
      <text className="sv-label" x="42" y="166">
        t0
      </text>
      <text className="sv-label" x="160" y="166">
        t1
      </text>
      <text className="sv-label" x="270" y="166">
        t2
      </text>
      <path className="sv-feed-line" d="M48 120 V152 M168 103 V152 M278 121 V152" />
    </svg>
  );
}

function PredictVisual() {
  const stages = [
    { x: 36, label: "signal", score: 0.42 },
    { x: 96, label: "fit", score: 0.68 },
    { x: 156, label: "conf", score: 0.81 },
  ];

  return (
    <svg viewBox="0 0 320 170" className="system-svg" fill="none">
      <text className="sv-label" x="16" y="14">
        score vs user model
      </text>
      <text className="sv-label" x="236" y="14">
        next action
      </text>

      {stages.map((stage, index) => {
        const h = 28 + stage.score * 70;
        return (
          <g key={stage.label} className={`sv-bar sv-delay-${index}`}>
            <rect className="sv-meter-track" x={stage.x} y="28" width="40" height="100" rx="10" />
            <rect
              className={`sv-bar-fill ${index === 2 ? "accent" : ""}`}
              x={stage.x + 6}
              y={128 - h}
              width="28"
              height={h}
              rx="8"
            />
            <text className="sv-label-center" x={stage.x + 20} y="144">
              {stage.label}
            </text>
            <text className="sv-label-center sv-score" x={stage.x + 20} y={128 - h - 8}>
              {Math.round(stage.score * 100)}
            </text>
          </g>
        );
      })}

      <path className="sv-link sv-link-active" d="M196 78 H228" />
      <path
        className="sv-accent-stroke"
        d="M220 78 L228 78 L224 74 M228 78 L224 82"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect className="sv-rank-card" x="232" y="48" width="72" height="60" rx="12" />
      <text className="sv-label-center" x="268" y="68">
        rank #1
      </text>
      <circle className="sv-glow" cx="268" cy="92" r="16" />
      <circle className="sv-core" cx="268" cy="92" r="12" />
      <text className="sv-label-center sv-core-label" x="268" y="95">
        act
      </text>

      <text className="sv-label" x="232" y="156">
        P(action | signal)
      </text>
    </svg>
  );
}
