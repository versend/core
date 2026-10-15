const destinations = [
  "Discord",
  "Telegram",
  "Slack",
  "ntfy",
  "Gotify",
] as const;

const stages = ["verify signature", "apply filters", "rate limit", "deliver"];

const box = "fill-fd-background stroke-fd-foreground/70";
const text = "fill-fd-foreground font-sans";
const muted = "fill-fd-muted-foreground font-mono";
const wire = "fill-none stroke-fd-foreground/45";
const flow = "fill-none stroke-fd-foreground/80 pen-flow";

const destinationY = (index: number) => 24 + index * 48;
const stageY = (index: number) => 108.5 + index * 28;

/**
 * Schematic of the relay, drawn with single hairline strokes.
 *
 * @returns The SVG drawing.
 */
export const PipelineDrawing = () => (
  <svg
    aria-labelledby="pipeline-title"
    className="w-full"
    viewBox="0 0 760 280"
  >
    <title id="pipeline-title">
      Vercel posts a webhook to Versend, which verifies, filters and delivers it
      to Discord, Telegram, Slack, ntfy and Gotify.
    </title>

    {/* Vercel */}
    <rect className={box} height="64" width="160" x="20.5" y="108.5" />
    <path className="fill-fd-foreground" d="M48 128 L62 152 L34 152 Z" />
    <text className={text} fontSize="14" x="74" y="134">
      Vercel
    </text>
    <text className={muted} fontSize="9" x="74" y="152">
      POST /hooks/vercel
    </text>

    {/* Vercel → Versend */}
    <line className={wire} x1="180.5" x2="300.5" y1="140.5" y2="140.5" />
    <line className={flow} x1="180.5" x2="300.5" y1="140.5" y2="140.5" />
    <text className={muted} fontSize="9" textAnchor="middle" x="240" y="130">
      x-vercel-signature
    </text>

    {/* Versend */}
    <rect className={box} height="152" width="180" x="300.5" y="64.5" />
    <line
      className="stroke-fd-foreground/70"
      x1="300.5"
      x2="480.5"
      y1="92.5"
      y2="92.5"
    />
    <rect
      className="fill-fd-foreground"
      height="10"
      width="10"
      x="312"
      y="73"
    />
    <text className={text} fontSize="13" x="330" y="83">
      Versend
    </text>
    <text className={muted} fontSize="9" textAnchor="end" x="470" y="83">
      :3000
    </text>
    {stages.map((label, index) => (
      <g key={label}>
        <rect
          className="stroke-fd-foreground/50 fill-none"
          height="8"
          width="8"
          x="316.5"
          y={stageY(index)}
        />
        <text
          className="fill-fd-foreground font-mono"
          fontSize="10"
          x="332"
          y={stageY(index) + 7.5}
        >
          {label}
        </text>
      </g>
    ))}

    {/* Versend → destinations (orthogonal wires) */}
    {destinations.map((name, index) => {
      const y = destinationY(index) + 16.5;
      const d = `M480.5 140.5 H540.5 V${y} H600.5`;
      return (
        <g key={name}>
          <path className={wire} d={d} />
          <path className={flow} d={d} />
          <rect
            className={box}
            height="33"
            width="140"
            x="600.5"
            y={destinationY(index) + 0.5}
          />
          <text
            className={text}
            fontSize="12"
            x="616"
            y={destinationY(index) + 21}
          >
            {name}
          </text>
          <circle
            className="fill-fd-success"
            cx="726"
            cy={destinationY(index) + 17}
            r="2.5"
          />
        </g>
      );
    })}

    {/* Drafting marks */}
    <g className="stroke-fd-foreground/40">
      <path d="M8 0.5 H0.5 V8" fill="none" />
      <path d="M752 0.5 H759.5 V8" fill="none" />
      <path d="M8 279.5 H0.5 V272" fill="none" />
      <path d="M752 279.5 H759.5 V272" fill="none" />
    </g>
  </svg>
);
