import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import places from "@/data/places.json";

/** Server-rendered inline destination previews. One link per place mention.
 * The preview is keyboard accessible and needs no JS event listeners. */
const aliases: Record<string, keyof typeof places> = {
  "Aït Ben Haddou": "ait-ben-haddou", "Ait Ben Haddou": "ait-ben-haddou",
  "Erg Chebbi": "erg-chebbi",
  "Agafay Desert": "agafay-desert", "Atlas Mountains": "high-atlas-mountains",
  "High Atlas": "high-atlas-mountains", "Middle Atlas": "azrou",
  "Blue City": "chefchaouen", "Fez": "fes",
};
const mentions: Array<[string, keyof typeof places]> = [
  ...Object.entries(places).map(([key, v]) => [v.title, key as keyof typeof places] as [string, keyof typeof places]),
  ...Object.entries(aliases).map(([label, key]) => [label, key] as [string, keyof typeof places]),
].sort((a, b) => b[0].length - a[0].length);
const escaped = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pattern = new RegExp(`\\b(${mentions.map(([name]) => escaped(name)).join("|")})\\b`, "gi");
const lookup = new Map(mentions.map(([name, key]) => [name.toLowerCase(), key]));

export default function InlinePlaceLinks({ text }: { text: string }): ReactNode {
  if (!text) return null;
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const key = lookup.get(part.toLowerCase());
    if (!key) return <span key={i}>{part}</span>;
    const item = places[key];
    return <span key={i} className="group/placelink relative inline-block align-baseline">
      <Link href={item.href} prefetch={false} className="rounded-sm font-semibold text-amber-800 underline decoration-amber-300 decoration-dotted underline-offset-4 hover:text-amber-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700" aria-label={`Explore ${item.title}, Morocco`}>{part}</Link>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 hidden w-60 max-w-[85vw] -translate-x-1/2 overflow-hidden rounded-xl border border-amber-200 bg-white shadow-2xl group-hover/placelink:block group-focus-within/placelink:block">
        <span className="relative block h-28 w-full overflow-hidden bg-slate-200"><Image src={item.image} alt="" fill sizes="240px" quality={45} loading="lazy" className="object-cover" /></span>
        <span className="block p-3"><span className="block text-sm font-bold text-slate-900">{item.title}</span><span className="mt-1 block text-xs leading-5 text-slate-600">{item.description}</span></span>
      </span>
    </span>;
  });
}
