import type { NewTourConfig } from "@/lib/newTourPages";
import catalog from "@/data/popular-tour-pages.json";
import { absoluteSiteUrl } from "@/lib/absoluteSiteUrl";
import { attachProductToTourGraph, serializeStructuredData } from "@/lib/tourProductSchema";

export const popularTours = catalog as Record<string, NewTourConfig>;
export function popularTourJsonLd(tour: NewTourConfig) {
  const url = absoluteSiteUrl(`/tour/${tour.slug}/`);
  const image = absoluteSiteUrl(tour.image);
  const graph = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: tour.title, description: tour.description, primaryImageOfPage: { "@type":"ImageObject", url: image }, inLanguage: "en", isPartOf: { "@id": "https://moorishtour.com/#website" } },
    { "@type": "TouristTrip", "@id": `${url}#trip`, url, name: tour.title, description: tour.description, image,
      provider: { "@id": "https://moorishtour.com/#organization" },
      touristType: "Travelers looking for private tours and organized experiences in Morocco",
      itinerary: { "@type": "ItemList", itemListElement: tour.days.map((day, i) => ({ "@type": "ListItem", position: i + 1, name: `Day ${i+1}: ${tour.dayTitles[i]}`, description: day })) }
    },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
      { "@type":"ListItem", position:1, name:"Home", item:absoluteSiteUrl("/") },
      { "@type":"ListItem", position:2, name:"Morocco Tours", item:absoluteSiteUrl("/tour/") },
      { "@type":"ListItem", position:3, name:tour.title, item:url },
    ] },
    { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: tour.faqs.map(([name, answer]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
  // Market-research planning prices are excluded from the Google Offer schema
  // until Moorish Tour confirms a bookable price. No invented ratings.
  return serializeStructuredData(attachProductToTourGraph(graph, { url, name: tour.title, description: tour.description, image }));
}
