import type { GlobalConfig } from "payload";

const HomepageHero: GlobalConfig = {
  slug: "homepage-hero",
  label: "Homepage Hero",
  admin: {
    description: "Controls the two‑column hero on the homepage. Changes reflect immediately.",
  },
  fields: [
    // ── Existing fields ──────────────────────────────────────────
    {
      name: "headline",
      type: "text",
      label: "Headline",
      required: true,
      defaultValue: "Recrutez des talents grâce à la vidéo marque employeur",
      admin: { description: "Large display text. Mix regular and italic using <i> tags." },
    },
    {
      name: "subheadline",
      type: "textarea",
      label: "Subheadline",
      defaultValue:
        "Nous aidons les entreprises à attirer les meilleurs talents en racontant leur réalité à travers la vidéo.",
      admin: { rows: 3 },
    },
    {
      name: "tag",
      type: "text",
      label: "Tag / Breadcrumb",
      defaultValue: "RH & Entreprises",
      admin: { description: "Small pill above the headline." },
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "Hero Image (right side)",
      required: false,
      admin: {
        description: "Recommended size: 800×600px, portrait or square.",
      },
    },
    {
      name: "socialProof",
      type: "group",
      label: "Social Proof",
      fields: [
        {
          name: "avatars",
          type: "array",
          label: "Avatar Images",
          minRows: 2,
          maxRows: 4,
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
            },
          ],
          admin: { description: "Add 2–3 small circular photos." },
        },
        {
          name: "text",
          type: "text",
          label: "Trust Text",
          defaultValue: "Ils nous font déjà confiance",
        },
      ],
    },
    {
      name: "primaryCta",
      type: "group",
      label: "Primary Button",
      fields: [
        { name: "label", type: "text", label: "Label", defaultValue: "Prendre RDV" },
        { name: "href",  type: "text", label: "URL",   defaultValue: "/contact" },
      ],
    },
    // ── Keep existing fields (badge, backgroundType, etc.) for fallback ──
    // but we won't use them in the new design. They can be removed later.
    // For now, we keep them to avoid breaking existing code that might expect them.
    // We'll set them to hidden or ignore them.
    {
      name: "backgroundType",
      type: "select",
      label: "Background Type (deprecated)",
      defaultValue: "gradient",
      options: [
        { label: "Gradient", value: "gradient" },
        { label: "Image",    value: "image"    },
        { label: "Video",    value: "video"    },
      ],
      admin: { hidden: true },
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      admin: { hidden: true },
    },
    {
      name: "backgroundVideo",
      type: "upload",
      relationTo: "media",
      admin: { hidden: true },
    },
    {
      name: "overlayOpacity",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "gradientColorsTopRight",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "gradientColorsBottomLeft",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "gradientColorsMidLeft",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "gradientColorsBottomRight",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "badge",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "primaryCtaLabel",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "primaryCtaHref",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "secondaryCtaLabel",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "secondaryCtaHref",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "scrollLabel",
      type: "text",
      admin: { hidden: true },
    },
  ],
};

export default HomepageHero;