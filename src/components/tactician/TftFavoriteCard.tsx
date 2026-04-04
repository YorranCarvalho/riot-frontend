interface Props {
  title: string;
  image?: string;
  label: string;
  subtitle?: string;
}

export const TftFavoriteCard = ({ title, image, label, subtitle }: Props) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
        {title}
      </p>

      <div className="mt-4 flex items-center gap-3">
        {image ? (
          <img
            src={image}
            alt={label}
            className="h-14 w-14 rounded-xl border border-white/10 object-cover"
          />
        ) : (
          <div className="h-14 w-14 rounded-xl border border-white/10 bg-white/[0.03]" />
        )}

        <div>
          <p className="font-semibold text-white">{label}</p>
          {subtitle ? <p className="text-sm text-white/55">{subtitle}</p> : null}
        </div>
      </div>
    </div>
  );
};