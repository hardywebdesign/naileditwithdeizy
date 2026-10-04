import { config, fields, singleton } from "@keystatic/core";
import { palettes, paletteNames } from "./src/lib/palettes";

/**
 * The admin editor Deizy uses at /admin.
 *
 * Locally (npm run dev) edits are saved straight to the files in /content
 * and /public/images. In production, set NEXT_PUBLIC_KEYSTATIC_PROJECT to
 * the Keystatic Cloud project ("team-name/project-name"): Deizy signs in
 * with her email, each save commits to GitHub, and Vercel redeploys the
 * site in about a minute.
 */
const cloudProject = process.env.NEXT_PUBLIC_KEYSTATIC_PROJECT;

const hex = (label: string, description: string) =>
  fields.text({
    label,
    description,
    validation: {
      isRequired: true,
      pattern: { regex: /^#[0-9a-fA-F]{6}$/, message: "Use a 6-digit color code, like #9a4416" },
    },
  });

const photo = (label: string, folder: string, description?: string) =>
  fields.image({
    label,
    description,
    directory: `public/images/${folder}`,
    publicPath: `/images/${folder}/`,
  });

export default config({
  storage: cloudProject ? { kind: "cloud" } : { kind: "local" },
  ...(cloudProject ? { cloud: { project: cloudProject } } : {}),

  ui: {
    brand: { name: "Nailed It With Deizy" },
    navigation: {
      "Look and feel": ["theme", "home"],
      Photos: ["gallery"],
      Pages: ["about", "services", "pricing", "sizing", "faq", "policies", "reviews"],
      Settings: ["business"],
    },
  },

  singletons: {
    theme: singleton({
      label: "Theme and colors",
      path: "content/theme",
      format: { data: "yaml" },
      schema: {
        palette: fields.conditional(
          fields.select({
            label: "Color theme",
            description:
              "Pick a seasonal look, or choose Custom to set your own colors. Text colors adjust automatically so everything stays readable.",
            options: [
              ...paletteNames.map((name) => ({ label: palettes[name].label, value: name })),
              { label: "Custom colors", value: "custom" },
            ],
            defaultValue: "fall",
          }),
          {
            fall: fields.empty(),
            spooky: fields.empty(),
            winter: fields.empty(),
            valentine: fields.empty(),
            spring: fields.empty(),
            summer: fields.empty(),
            classic: fields.empty(),
            custom: fields.object({
              main: hex("Main color", "Buttons, headings and the top of the home page"),
              soft: hex("Soft color", "Backgrounds behind some sections"),
              background: hex("Page background", "The main background of every page"),
              text: hex("Text color", "Body text"),
            }),
          },
        ),
        announcement: fields.text({
          label: "Announcement bar",
          description:
            'Short message across the top of every page, like "Fall sets are here!" Leave empty to hide it.',
        }),
      },
    }),

    home: singleton({
      label: "Home page",
      path: "content/home",
      format: { data: "yaml" },
      schema: {
        headline: fields.text({ label: "Big headline", validation: { isRequired: true } }),
        intro: fields.text({ label: "Text under the headline", multiline: true }),
        heroPhotos: fields.array(
          fields.object({
            image: photo("Photo", "hero"),
            alt: fields.text({
              label: "Describe the photo",
              description: "For people using screen readers, e.g. 'Orange press-ons with black spiders'",
            }),
          }),
          {
            label: "Top photos (up to 3)",
            description: "The first photo shows largest. Swap these each season.",
            itemLabel: (props) => props.fields.alt.value || "Photo",
            validation: { length: { max: 3 } },
          },
        ),
      },
    }),

    gallery: singleton({
      label: "Gallery",
      path: "content/gallery",
      format: { data: "yaml" },
      schema: {
        photos: fields.array(
          fields.object({
            image: photo("Photo", "gallery"),
            title: fields.text({ label: "Name of the set", validation: { isRequired: true } }),
            style: fields.select({
              label: "Section",
              options: [
                { label: "Spooky", value: "Spooky" },
                { label: "Fall", value: "Fall" },
                { label: "Glam and chrome", value: "Glam and chrome" },
                { label: "Soft and pretty", value: "Soft and pretty" },
                { label: "Holiday", value: "Holiday" },
                { label: "Specialty", value: "Specialty" },
              ],
              defaultValue: "Glam and chrome",
            }),
            featured: fields.checkbox({
              label: "Feature on the home page",
              description: "Shown under Featured sets on the home page (the first 6 are used).",
            }),
          }),
          {
            label: "Photos",
            description: "Drag to reorder. Photos show on the Gallery page grouped by section.",
            itemLabel: (props) => props.fields.title.value || "Untitled set",
          },
        ),
      },
    }),

    about: singleton({
      label: "About page",
      path: "content/about",
      format: { data: "yaml" },
      schema: {
        heading: fields.text({ label: "Heading", validation: { isRequired: true } }),
        intro: fields.text({ label: "Opening line", multiline: true }),
        story: fields.array(fields.text({ label: "Paragraph", multiline: true }), {
          label: "Your story",
          itemLabel: (props) => props.value.slice(0, 60) || "Paragraph",
        }),
        photo: photo("Photo", "about", "A photo of you or your work"),
        photoAlt: fields.text({ label: "Describe the photo" }),
      },
    }),

    services: singleton({
      label: "Services",
      path: "content/services",
      format: { data: "yaml" },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: "Name", validation: { isRequired: true } }),
            summary: fields.text({ label: "Short description", multiline: true }),
            details: fields.array(fields.text({ label: "Point" }), {
              label: "Bullet points",
              itemLabel: (props) => props.value || "Point",
            }),
            photo: photo("Photo", "gallery"),
            buttonLabel: fields.text({ label: "Button text" }),
            buttonLink: fields.text({
              label: "Button link",
              description: "A page on your site, like /shop or /contact?topic=custom",
            }),
          }),
          { label: "Services", itemLabel: (props) => props.fields.name.value || "Service" },
        ),
      },
    }),

    pricing: singleton({
      label: "Pricing page",
      path: "content/pricing",
      format: { data: "yaml" },
      schema: {
        startingPrice: fields.text({
          label: "Starting price",
          description: 'Shown big on the page, e.g. "$20". Exact prices come from Square.',
        }),
        note: fields.text({ label: "Note under the price", multiline: true }),
        kitIncludes: fields.array(fields.text({ label: "Item" }), {
          label: "Every set includes",
          itemLabel: (props) => props.value || "Item",
        }),
      },
    }),

    sizing: singleton({
      label: "Sizing & care",
      path: "content/sizing",
      format: { data: "yaml" },
      schema: {
        intro: fields.text({ label: "Intro", multiline: true }),
        guideImage: photo("Photo sizing guide image", "sizing"),
        guidePdf: fields.file({
          label: "Downloadable sizing guide (PDF)",
          directory: "public/downloads",
          publicPath: "/downloads/",
        }),
        shapes: fields.array(fields.text({ label: "Shape" }), {
          label: "Shapes you offer",
          itemLabel: (props) => props.value || "Shape",
        }),
        lengths: fields.array(fields.text({ label: "Length" }), {
          label: "Lengths you offer",
          itemLabel: (props) => props.value || "Length",
        }),
        sections: fields.array(
          fields.object({
            title: fields.text({ label: "Title", validation: { isRequired: true } }),
            steps: fields.array(fields.text({ label: "Step", multiline: true }), {
              label: "Steps",
              itemLabel: (props) => props.value.slice(0, 60) || "Step",
            }),
          }),
          { label: "How-to sections", itemLabel: (props) => props.fields.title.value || "Section" },
        ),
      },
    }),

    faq: singleton({
      label: "FAQ",
      path: "content/faq",
      format: { data: "yaml" },
      schema: {
        questions: fields.array(
          fields.object({
            question: fields.text({ label: "Question", validation: { isRequired: true } }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          { label: "Questions", itemLabel: (props) => props.fields.question.value || "Question" },
        ),
      },
    }),

    policies: singleton({
      label: "Policies",
      path: "content/policies",
      format: { data: "yaml" },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: "Title", validation: { isRequired: true } }),
            body: fields.text({ label: "Policy", multiline: true }),
          }),
          { label: "Policies", itemLabel: (props) => props.fields.title.value || "Policy" },
        ),
      },
    }),

    reviews: singleton({
      label: "Reviews",
      path: "content/reviews",
      format: { data: "yaml" },
      schema: {
        items: fields.array(
          fields.object({
            quote: fields.text({ label: "What they said", multiline: true, validation: { isRequired: true } }),
            name: fields.text({ label: "First name", validation: { isRequired: true } }),
          }),
          { label: "Reviews", itemLabel: (props) => props.fields.name.value || "Review" },
        ),
      },
    }),

    business: singleton({
      label: "Business info and links",
      path: "content/business",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Business name", validation: { isRequired: true } }),
        tagline: fields.text({ label: "Tagline" }),
        email: fields.text({ label: "Email", validation: { isRequired: true } }),
        phone: fields.text({ label: "Phone" }),
        tiktok: fields.url({ label: "TikTok link" }),
        facebook: fields.url({ label: "Facebook link" }),
        instagram: fields.url({ label: "Instagram link" }),
        bookingUrl: fields.url({
          label: "Square booking link",
          description: "Square Dashboard > Appointments > Online booking > copy your booking site link",
        }),
        tipUrl: fields.url({
          label: "Square tip link",
          description: "Your Square payment link for tips",
        }),
        bookingInfo: fields.array(fields.text({ label: "Line", multiline: true }), {
          label: "Book page: how appointments work",
          itemLabel: (props) => props.value.slice(0, 60) || "Line",
        }),
      },
    }),
  },
});
