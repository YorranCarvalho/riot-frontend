import type { TftQueueKey } from "../../types/tft";

interface Props {
  value: TftQueueKey;
  onChange: (queue: TftQueueKey) => void;
}

const options: Array<{ label: string; value: TftQueueKey }> = [
  { label: "Ranked", value: "ranked" },
  { label: "Normal", value: "normal" },
  { label: "Hyper Roll", value: "hyper_roll" },
  { label: "Double Up", value: "double_up" },
  { label: "All", value: "all" },
];

export const TftQueueTabs = ({ value, onChange }: Props) => {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const active = value === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
              active
                ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.12)]"
                : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:bg-white/[0.05]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};