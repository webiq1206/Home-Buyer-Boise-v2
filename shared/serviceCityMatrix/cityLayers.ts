import type { CityLayer } from "./types";

export const CITY_LAYERS: Record<string, CityLayer> = {
  boise: {
    slug: "boise",
    name: "Boise",
    county: "Ada",
    marketAngle:
      "Boise's market spans historic North End bungalows, Bench mid-century ranches, and newer Harris Ranch developments — each with different buyer expectations and repair costs.",
    titleCompany: "Ada County title companies near downtown Boise",
    neighborhoodFocus: "North End, Bench, Southeast Boise, Harris Ranch",
    cityFaqs: [
      {
        question: "Do you buy downtown Boise condos and townhomes?",
        answer:
          "Yes. We purchase condos, townhomes, and single-family homes across Boise including downtown units and Bench-area properties. HOA documentation and special assessments are factored into our offer.",
      },
      {
        question: "How do Boise foothills properties affect your offer?",
        answer:
          "Foothills homes near Table Rock or Bogus Basin often have unique access, slope, or view considerations. We evaluate these against comparable Boise sales rather than applying a flat discount.",
      },
    ],
  },
  meridian: {
    slug: "meridian",
    name: "Meridian",
    county: "Ada",
    marketAngle:
      "Meridian's explosive growth means many homes are newer HOA communities near The Village at Meridian — sellers often need speed before their next relocation closes.",
    titleCompany: "Ada County title partners familiar with Meridian HOA communities",
    neighborhoodFocus: "Paramount, Lochsa Falls, Tuscany, Meridian Ranch",
    cityFaqs: [
      {
        question: "Can you buy a Meridian home still under builder warranty?",
        answer:
          "Yes. We purchase newer Meridian construction and factor remaining builder warranties and HOA transfer fees into our cash offer and closing timeline.",
      },
      {
        question: "Do Meridian HOA rules complicate a fast sale?",
        answer:
          "We work with Meridian HOA communities regularly. We handle resale certificate requests and outstanding assessment disclosures as part of closing.",
      },
    ],
  },
  eagle: {
    slug: "eagle",
    name: "Eagle",
    county: "Ada",
    marketAngle:
      "Eagle's premium market includes golf-course estates, custom builds, and gated communities where discretion and accurate luxury comps matter.",
    titleCompany: "Ada County title companies experienced with Eagle luxury transfers",
    neighborhoodFocus: "Eagle Hills, Banbury, Lakemoor, Floating Feather",
    cityFaqs: [
      {
        question: "Do you purchase Eagle luxury and estate properties?",
        answer:
          "Yes. We evaluate Eagle estates, golf properties, and custom homes using luxury comparables — not generic Treasure Valley averages.",
      },
      {
        question: "Can you close discreetly on an Eagle property?",
        answer:
          "We offer private, off-market closings for Eagle sellers who prefer no yard sign, no open houses, and minimal neighborhood visibility.",
      },
    ],
  },
  kuna: {
    slug: "kuna",
    name: "Kuna",
    county: "Ada",
    marketAngle:
      "Kuna blends established neighborhoods near Indian Creek with newer Crimson Point subdivisions — many sellers are first-time homeowners facing their first urgent sale.",
    titleCompany: "Ada County title companies serving Kuna and south Ada County",
    neighborhoodFocus: "Crimson Point, Indian Creek, Swan Falls, Teed Farms",
    cityFaqs: [
      {
        question: "Do you buy Kuna homes on larger quarter-acre lots?",
        answer:
          "Yes. Kuna's larger lots, outbuildings, and horse privileges are common in our purchases. We factor acreage and accessory structures into the offer.",
      },
      {
        question: "How fast can you close if I'm relocating from Kuna to Boise?",
        answer:
          "Many Kuna sellers move to Boise or Meridian for work. We can close in 7–14 days so you can secure your next lease or purchase without carrying two mortgages.",
      },
    ],
  },
  star: {
    slug: "star",
    name: "Star",
    county: "Ada",
    marketAngle:
      "Star offers a mix of rural acreage properties and newer suburban pockets near the Boise River — sellers often need buyers comfortable with well/septic or larger lots.",
    titleCompany: "Ada County title partners handling Star rural and suburban closings",
    neighborhoodFocus: "Hunter's Creek, Star River Ranch, downtown Star",
    cityFaqs: [
      {
        question: "Do you buy Star properties on acreage with well and septic?",
        answer:
          "Yes. Star's rural properties are a regular part of our portfolio. We account for well tests, septic inspections, and acreage in our evaluation.",
      },
      {
        question: "Can you buy a Star home if I'm moving out of state?",
        answer:
          "Absolutely. Many Star sellers relocate out of Idaho. We coordinate remote closings with mobile notary or mail-away documents.",
      },
    ],
  },
  middleton: {
    slug: "middleton",
    name: "Middleton",
    county: "Canyon",
    marketAngle:
      "Middleton provides affordable Canyon County options with river-access pockets and newer Purple Sage developments — ideal for value-conscious sellers needing certainty.",
    titleCompany: "Canyon County title companies near Middleton and Caldwell",
    neighborhoodFocus: "Purple Sage, Middleton Place, river-access areas",
    cityFaqs: [
      {
        question: "Do you serve Middleton sellers in Canyon County?",
        answer:
          "Yes. We close Middleton transactions through Canyon County recorder and title partners familiar with local parcel splits and river-access properties.",
      },
      {
        question: "Are Middleton home values different from Boise offers?",
        answer:
          "Our Middleton offers reflect Canyon County comparables — not Boise metro averages — so you receive a fair price grounded in local sales data.",
      },
    ],
  },
  nampa: {
    slug: "nampa",
    name: "Nampa",
    county: "Canyon",
    marketAngle:
      "Nampa is Canyon County's largest city with affordable starter homes, rentals, and multi-family inventory — common for landlord exits and financial resets.",
    titleCompany: "Canyon County title companies in downtown Nampa",
    neighborhoodFocus: "Lake Lowell, Centennial, downtown Nampa, Greenhurst",
    cityFaqs: [
      {
        question: "Do you buy Nampa rental properties with tenants?",
        answer:
          "Yes. We purchase tenant-occupied Nampa rentals and handle lease assignments or vacant delivery depending on your situation.",
      },
      {
        question: "How do Nampa's affordable price points affect cash offers?",
        answer:
          "We use Nampa-specific comps including Lake Lowell and Centennial sales — not inflated Boise benchmarks — so offers match real neighborhood values.",
      },
    ],
  },
  caldwell: {
    slug: "caldwell",
    name: "Caldwell",
    county: "Canyon",
    marketAngle:
      "Caldwell combines historic downtown homes with newer Indian Creek subdivisions and agricultural parcels — sellers range from estate settlements to first-time distress sales.",
    titleCompany: "Canyon County title partners serving Caldwell and Indian Creek",
    neighborhoodFocus: "Indian Creek, downtown Caldwell, Cleveland Blvd corridor",
    cityFaqs: [
      {
        question: "Do you buy older Caldwell homes near downtown?",
        answer:
          "Yes. Historic Caldwell properties and newer Indian Creek builds are both in our purchase range. Age, foundation, and roof condition are priced into the as-is offer.",
      },
      {
        question: "Can you help with a Caldwell inherited property from out of state?",
        answer:
          "We regularly help out-of-state heirs sell Caldwell homes without travel — handling cleanout, keys, and Canyon County probate coordination.",
      },
    ],
  },
};
