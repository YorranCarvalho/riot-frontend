import React from "react";

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
}

export const TftOverviewStatCard = ({ title, value, subtitle }: Props) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(15,29,51,0.96),rgba(8,16,30,0.92))] p-4 shadow-[0_10px_25px_rgba(0,0,0,0.25)]">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
        {title}
      </p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      {subtitle ? <p className="mt-1 text-sm text-white/55">{subtitle}</p> : null}
    </div>
  );
};