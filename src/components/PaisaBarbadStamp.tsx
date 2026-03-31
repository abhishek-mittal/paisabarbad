export function PaisaBarbadStamp({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dims = {
    sm: { outer: "w-24 h-24", text: "text-[10px]", border: "border-[3px]", inner: "m-1.5" },
    md: { outer: "w-36 h-36", text: "text-sm", border: "border-[4px]", inner: "m-2" },
    lg: { outer: "w-48 h-48", text: "text-base", border: "border-[5px]", inner: "m-2.5" },
  }[size];

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
      <div
        className={`${dims.outer} rotate-[-15deg] rounded-full ${dims.border} border-red-600 flex items-center justify-center bg-red-600/10`}
        style={{ opacity: 0.92 }}
      >
        <div
          className={`${dims.inner} flex-1 rounded-full ${dims.border} border-red-600 flex flex-col items-center justify-center gap-0.5`}
        >
          <span
            className={`font-display font-black text-red-600 uppercase tracking-widest leading-none ${dims.text}`}
          >
            PAISA
          </span>
          <span className="font-mono text-[8px] text-red-600 uppercase tracking-[0.3em] leading-none">
            ✕ ✕ ✕
          </span>
          <span
            className={`font-display font-black text-red-600 uppercase tracking-widest leading-none ${dims.text}`}
          >
            BARBAD
          </span>
        </div>
      </div>
    </div>
  );
}
