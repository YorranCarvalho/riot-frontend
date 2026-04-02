import { getProfileIconUrl } from "../../constants/game";

interface Props {
  info: {
    name: string;
    tag: string;
    profileIconId: number;
    level: number;
  };
}

export default function ProfileHeader({ info }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-primary-blue p-6 shadow-xl">
      <div className="flex flex-col items-center text-center">
        <img
          src={getProfileIconUrl(info.profileIconId)}
          alt={info.name}
          className="h-28 w-28 rounded-2xl border-4 border-primary-blood shadow-lg"
        />

        <h2 className="mt-4 text-3xl font-bold text-white">{info.name}</h2>
        <p className="mt-1 text-secondary-text/70">#{info.tag}</p>
        <p className="mt-3 rounded-full bg-primary-blood/15 px-4 py-1 text-sm font-medium text-primary-blood">
          Level {info.level}
        </p>
      </div>
    </div>
  );
}