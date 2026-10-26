import Link from "next/link";
import Image from "next/image";
import featured from "@/data/popular-tour-index.json";
export default function PopularTourCollection() {
  return <section id="new-morocco-tours" className="mx-auto max-w-7xl px-5 py-14 sm:px-8" aria-labelledby="new-morocco-tour-title">
    <p className="font-semibold uppercase tracking-widest text-amber-800">More places to discover</p>
    <h2 id="new-morocco-tour-title" className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">20 More Morocco Tours &amp; Desert Experiences</h2>
    <p className="mt-4 max-w-3xl leading-8 text-slate-700">Compare private Morocco itineraries, Sahara experiences and day trips from Marrakech, Casablanca, Fes, Tangier and Erfoud. These are proposed travel plans with indicative prices; contact us for a confirmed quotation.</p>
    <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{featured.map(tour=><article key={tour.slug} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl">
      <Link href={`/tour/${tour.slug}/`} className="relative block aspect-[4/3] overflow-hidden"><Image src={tour.image} alt={tour.imageAlt} fill loading="lazy" quality={55} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 280px" className="object-cover transition-transform duration-300 group-hover:scale-105" /></Link>
      <div className="flex flex-1 flex-col p-5"><p className="text-xs font-bold uppercase tracking-wide text-amber-800">{tour.duration} · {tour.start}</p><h3 className="mt-2 text-lg font-bold leading-7 text-slate-900"><Link href={`/tour/${tour.slug}/`} className="hover:text-amber-800">{tour.title}</Link></h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-700">{tour.subtitle}</p><div className="mt-auto pt-5"><p className="border-t border-slate-100 pt-3 font-semibold text-amber-800">Suggested from €{tour.suggestedPriceEUR} <span className="text-xs font-normal text-slate-600">/ person · estimate</span></p><Link href={`/tour/${tour.slug}/`} className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-amber-700 px-4 font-semibold text-white hover:bg-amber-800">Explore itinerary →</Link></div></div>
    </article>)}</div>
  </section>;
}
