import type { MetadataRoute } from "next";
import { projects } from "@/content/portfolio";
import { siteOrigin } from "@/lib/site";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  return [{ url: `${siteOrigin}/`, priority: 1 }, ...projects.map(({ slug }) => ({ url: `${siteOrigin}/work/${slug}/`, priority: 0.8 }))];
}
