export interface ServiceCityMatrixEntry {
  citySpecificIntro: string;
  localConsiderations: string;
  whyChooseLocal: string[];
  localProcessNotes: string;
  localSuccessStory: {
    title: string;
    neighborhood: string;
    situation: string;
    solution: string;
    quote: string;
    timeline: string;
  };
  cityFaqs: Array<{ question: string; answer: string }>;
  relatedLinks?: Array<string | { url: string; anchor?: string }>;
}

export interface ServiceLayer {
  slug: string;
  opener: string;
  sellerSituations: string[];
  processAngle: string;
  serviceFaqs: Array<{ question: string; answer: string }>;
  successSituation: string;
}

export interface CityLayer {
  slug: string;
  name: string;
  county: string;
  marketAngle: string;
  titleCompany: string;
  neighborhoodFocus: string;
  cityFaqs: Array<{ question: string; answer: string }>;
}
