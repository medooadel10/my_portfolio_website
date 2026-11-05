const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://mohammed-adel-flutter-portfolio.sleek-dill-8708.chatgpt.site";
export const siteOrigin = configuredOrigin ? new URL(configuredOrigin).origin : undefined;
export function absoluteUrl(path: string) { return siteOrigin ? new URL(path, siteOrigin).href : undefined; }
