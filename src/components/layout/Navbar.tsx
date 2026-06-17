import { getPayload } from "payload";
import config from "@payload-config";
import NavbarClient from "./NavbarClient";

// Fallback data matching the new design
const FALLBACK = {
  logo: "Redeemed Creations",
  links: [
    { label: "Vidéos & Événements", href: "/videos", openInNewTab: false },
    { label: "Cas clients",          href: "/cas-clients", openInNewTab: false },
    { label: "À propos",             href: "/about", openInNewTab: false },
    { label: "Blog",                 href: "/blog", openInNewTab: false },
    { label: "Contact",              href: "/contact", openInNewTab: false },
  ],
  cta: { label: "Prendre RDV", href: "/contact" },
};

async function getNavigation() {
  try {
    const payload = await getPayload({ config });
    const nav = await payload.findGlobal({ slug: "navigation" });

    return {
      logo:  nav.logo  || FALLBACK.logo,
      links: (nav.links && nav.links.length > 0) ? nav.links : FALLBACK.links,
      cta: {
        label: nav.cta?.label || FALLBACK.cta.label,
        href:  nav.cta?.href  || FALLBACK.cta.href,
      },
    };
  } catch (err) {
    console.warn("[Navbar] Could not fetch navigation global, using fallback.", err);
    return FALLBACK;
  }
}

export default async function Navbar() {
  const { logo, links, cta } = await getNavigation();

  return (
    <NavbarClient
      logo={logo}
      links={links as { label: string; href: string; openInNewTab?: boolean }[]}
      cta={cta}
    />
  );
}