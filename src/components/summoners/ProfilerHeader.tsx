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
    <div className="bg-primary-wine p-6 rounded-xl flex items-center gap-6 shadow-md border border-secondary-peach/30 text-secondary-peach">
      <img
        src={getProfileIconUrl(info.profileIconId)}
        alt={info.name}
        className="w-24 h-24 rounded-xl border-2 border-primary-blood"
      />

      <div>
        <h2 className="text-3xl font-bold">{info.name}</h2>
        <p className="text-secondary-peach/70">#{info.tag}</p>
        <p className="text-primary-blood mt-2">Level {info.level}</p>
      </div>
    </div>
  );
}