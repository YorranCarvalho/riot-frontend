import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  defaultName?: string;
  defaultTag?: string;
}

export default function SummonerSearchBar({
  defaultName = "",
  defaultTag = "",
}: Props) {
  const navigate = useNavigate();
  const [name, setName] = useState(defaultName);
  const [tag, setTag] = useState(defaultTag);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedTag = tag.trim();

    if (!trimmedName || !trimmedTag) return;

    navigate(`/summoner/${encodeURIComponent(trimmedName)}/${encodeURIComponent(trimmedTag)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-primary-wine rounded-xl border border-secondary-peach/30 p-4 shadow-md"
    >
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Nome do invocador"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-lg bg-[#11162a] border border-white/10 px-4 py-3 text-white outline-none focus:border-primary-blood"
        />

        <input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full md:w-40 rounded-lg bg-[#11162a] border border-white/10 px-4 py-3 text-white outline-none focus:border-primary-blood"
        />

        <button
          type="submit"
          className="rounded-lg bg-primary-blood px-6 py-3 font-semibold text-white hover:opacity-90 transition"
        >
          Pesquisar
        </button>
      </div>
    </form>
  );
}