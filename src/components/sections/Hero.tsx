import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────
interface HeroData {
  tag: string;
  headline: string;
  subheadline: string;
  heroImage?: { url?: string; alt?: string } | null;
  socialProof: {
    avatars: { image: { url?: string; alt?: string } }[];
    text: string;
  };
  primaryCta: { label: string; href: string };
}

// ── Fallback data that matches the design ────────────────────
const FALLBACK: HeroData = {
  tag: "RH & Entreprises",
  headline: 'Recrutez des talents grâce à la <i>vidéo marque employeur</i>',
  subheadline:
    "Nous aidons les entreprises à attirer les meilleurs talents en racontant leur réalité à travers la vidéo.",
  heroImage: {
    url: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop&crop=center",
    alt: "Femme en casque et gilet de chantier",
  },
  socialProof: {
    avatars: [
      { image: { url: "https://i.pravatar.cc/80?img=1", alt: "Avatar" } },
      { image: { url: "https://i.pravatar.cc/80?img=2", alt: "Avatar" } },
      { image: { url: "https://i.pravatar.cc/80?img=3", alt: "Avatar" } },
    ],
    text: "Ils nous font déjà confiance",
  },
  primaryCta: { label: "Prendre RDV", href: "/contact" },
};

async function getHeroData(): Promise<HeroData> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({
      slug: "homepage-hero",
      depth: 2,
    });

    return {
      tag: data.tag || FALLBACK.tag,
      headline: data.headline || FALLBACK.headline,
      subheadline: data.subheadline || FALLBACK.subheadline,
      heroImage: data.heroImage || FALLBACK.heroImage,
      socialProof: {
        avatars: (data.socialProof?.avatars || []).map((item: any) => ({
          image: item.image || {},
        })) as any,
        text: data.socialProof?.text || FALLBACK.socialProof.text,
      },
      primaryCta: {
        label: data.primaryCta?.label || FALLBACK.primaryCta.label,
        href: data.primaryCta?.href || FALLBACK.primaryCta.href,
      },
    };
  } catch (err) {
    console.warn("[Hero] Could not fetch homepage-hero global, using fallback.", err);
    return FALLBACK;
  }
}

export default async function Hero() {
  const data = await getHeroData();

  const imageUrl = data.heroImage?.url ?? FALLBACK.heroImage?.url;
  const imageAlt = data.heroImage?.alt ?? "Hero image";

  return (
    <section className="relative overflow-hidden bg-[#FDE8D8] pt-24 pb-12 md:pt-32 md:pb-20">
      {/* ── Decorative blobs ──────────────────────────────────── */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-300/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-300/30 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ── Left column: Text ────────────────────────────── */}
          <div className="space-y-6">
            {/* Tag / Pill */}
            {data.tag && (
              <span className="inline-block bg-white/60 backdrop-blur-sm text-gray-600 text-xs font-medium uppercase tracking-wider px-4 py-1.5 rounded-full">
                {data.tag}
              </span>
            )}

            {/* Headline (supports italic via <i> tags) */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-[#1A1A2E] leading-tight"
              dangerouslySetInnerHTML={{ __html: data.headline }}
            />

            {/* Subheadline */}
            {data.subheadline && (
              <p className="text-base md:text-lg text-gray-600 max-w-md">
                {data.subheadline}
              </p>
            )}

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-3">
                {data.socialProof.avatars.slice(0, 4).map((avatar, idx) => (
                  <div
                    key={idx}
                    className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm"
                  >
                    {avatar.image?.url ? (
                      <Image
                        src={avatar.image.url}
                        alt={avatar.image.alt || "Avatar"}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300" />
                    )}
                  </div>
                ))}
              </div>
              {data.socialProof.text && (
                <span className="text-sm text-gray-600 font-body">
                  {data.socialProof.text}
                </span>
              )}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href={data.primaryCta.href}
                className="inline-block bg-[#3B5BFF] text-white px-6 py-3 rounded-full text-sm font-body font-medium hover:bg-[#2a4adf] transition-colors shadow-sm"
              >
                {data.primaryCta.label}
              </Link>
            </div>
          </div>

          {/* ── Right column: Image ───────────────────────────── */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 30vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <span>Image placeholder</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}