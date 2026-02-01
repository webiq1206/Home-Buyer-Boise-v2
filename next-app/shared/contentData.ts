// City Data for Home Buyer Boise
// This drives area pages and geo-targeted content

export interface CityData {
  slug: string;
  name: string;
  county: 'ada' | 'canyon';
  isPrimary: boolean;
  population?: string;
  zipCodes?: string[];
  neighborhoods?: string[];
  extendedDescription?: string;
  landmarks?: string[];
  serviceConsiderations?: string;
  localFactors: {
    climate: string;
    soil: string;
    commonNeeds: string[];
  };
  facts?: Array<{ label: string; value: string }>;
}

export const CITIES: CityData[] = [
  {
    slug: 'kuna',
    name: 'Kuna',
    county: 'ada',
    isPrimary: true,
    population: '25,000+',
    zipCodes: ['83634'],
    neighborhoods: ['Teed Farms', 'Swan Falls', 'Crimson Point', 'Indian Creek'],
    extendedDescription: 'Kuna, Idaho, known as the "Gateway to the Birds of Prey" conservation area, is a rapidly growing community in Ada County just 20 minutes southwest of Boise.',
    landmarks: ['Kuna Caves', 'Swan Falls Dam', 'Indian Creek Plaza', 'Kuna Aquatic Center'],
    localFactors: {
      climate: 'Semi-arid with cold winters and hot, dry summers',
      soil: 'N/A',
      commonNeeds: ['Fast home sales', 'No-repair sales', 'Inherited property sales']
    },
    facts: [
      { label: 'Population', value: '25,000+' },
      { label: 'Median Home Price', value: '$400,000' },
      { label: 'County', value: 'Ada' },
      { label: 'Distance to Boise', value: '20 miles' }
    ]
  },
  {
    slug: 'boise',
    name: 'Boise',
    county: 'ada',
    isPrimary: false,
    population: '230,000+',
    zipCodes: ['83702', '83703', '83704', '83705', '83706', '83709', '83712', '83713', '83714', '83716'],
    neighborhoods: ['North End', 'Bench', 'Southwest Boise', 'Southeast Boise', 'Harris Ranch', 'Barber Valley'],
    extendedDescription: 'Boise, Idaho\'s capital and largest city with over 230,000 residents, is consistently ranked among America\'s most livable cities.',
    landmarks: ['Idaho State Capitol', 'Boise River Greenbelt', 'Table Rock', 'Hyde Park'],
    localFactors: {
      climate: 'Four distinct seasons with hot summers and cold winters',
      soil: 'N/A',
      commonNeeds: ['Quick job relocation sales', 'Estate property sales', 'As-is home sales']
    },
    facts: [
      { label: 'Population', value: '230,000+' },
      { label: 'Median Home Price', value: '$475,000' },
      { label: 'County', value: 'Ada' },
      { label: 'Major Employers', value: 'Micron, HP, St. Luke\'s' }
    ]
  },
  {
    slug: 'meridian',
    name: 'Meridian',
    county: 'ada',
    isPrimary: false,
    population: '130,000+',
    zipCodes: ['83642', '83646'],
    neighborhoods: ['Meridian Ranch', 'Tuscany', 'Paramount', 'Lochsa Falls', 'Discovery Park'],
    extendedDescription: 'Meridian is Idaho\'s second-largest city with over 130,000 residents and one of the fastest-growing communities in the United States.',
    landmarks: ['The Village at Meridian', 'Kleiner Memorial Park', 'Eagle Island State Park'],
    localFactors: {
      climate: 'Hot, dry summers and cold winters',
      soil: 'N/A',
      commonNeeds: ['Fast relocation sales', 'New construction sales', 'Divorce settlements']
    },
    facts: [
      { label: 'Population', value: '130,000+' },
      { label: 'Median Home Price', value: '$480,000' },
      { label: 'County', value: 'Ada' },
      { label: 'Distance to Boise', value: '10 miles' }
    ]
  },
  {
    slug: 'eagle',
    name: 'Eagle',
    county: 'ada',
    isPrimary: false,
    population: '35,000+',
    zipCodes: ['83616', '83646'],
    neighborhoods: ['Eagle Hills', 'Banbury', 'Silver Wing', 'Floating Feather'],
    extendedDescription: 'Eagle is one of the Treasure Valley\'s most affluent and desirable communities, combining small-town character with upscale amenities.',
    landmarks: ['Eagle Island State Park', 'Eagle Hills Golf Course', 'Heritage Park'],
    localFactors: {
      climate: 'Four seasons with mild winters',
      soil: 'N/A',
      commonNeeds: ['Executive relocation sales', 'Estate property sales', 'Luxury home sales']
    },
    facts: [
      { label: 'Population', value: '35,000+' },
      { label: 'Median Home Price', value: '$575,000+' },
      { label: 'County', value: 'Ada' },
      { label: 'Distance to Boise', value: '12 miles' }
    ]
  },
  {
    slug: 'star',
    name: 'Star',
    county: 'ada',
    isPrimary: false,
    population: '12,000+',
    zipCodes: ['83669'],
    neighborhoods: ['Star Meadows', 'Riverside Village', 'Willow Creek', 'Pearl District'],
    extendedDescription: 'Star, Idaho is a rapidly growing small city in Ada County with over 12,000 residents, known for its rural character and strong sense of community.',
    landmarks: ['Star Town Hall', 'Star Community Park', 'Riverside Park'],
    localFactors: {
      climate: 'Hot, dry summers and cold winters',
      soil: 'N/A',
      commonNeeds: ['Rural property sales', 'Horse property sales', 'Acreage sales']
    },
    facts: [
      { label: 'Population', value: '12,000+' },
      { label: 'Median Home Price', value: '$425,000' },
      { label: 'County', value: 'Ada' },
      { label: 'Distance to Boise', value: '20 miles' }
    ]
  },
  {
    slug: 'middleton',
    name: 'Middleton',
    county: 'canyon',
    isPrimary: false,
    population: '10,000+',
    zipCodes: ['83644'],
    neighborhoods: ['Heights', 'Middleton Mill', 'Ustick Corridor', 'Purple Sage'],
    extendedDescription: 'Middleton, Idaho is a charming small city in Canyon County with over 10,000 residents, offering an appealing blend of rural character and modern amenities.',
    landmarks: ['Middleton Place Park', 'Kleiner Park', 'Boise River Wildlife Management Area'],
    localFactors: {
      climate: 'Hot summers and cold winters',
      soil: 'N/A',
      commonNeeds: ['Affordable quick sales', 'Inherited property sales', 'Rental liquidation']
    },
    facts: [
      { label: 'Population', value: '10,000+' },
      { label: 'Median Home Price', value: '$385,000' },
      { label: 'County', value: 'Canyon' },
      { label: 'Distance to Boise', value: '25 miles' }
    ]
  },
  {
    slug: 'nampa',
    name: 'Nampa',
    county: 'canyon',
    isPrimary: false,
    population: '100,000+',
    zipCodes: ['83651', '83686', '83687'],
    neighborhoods: ['Centennial', 'Southridge', 'Deer Flat', 'Greenhurst', 'Painted Ridge'],
    extendedDescription: 'Nampa is Idaho\'s third-largest city with over 100,000 residents, located in Canyon County just west of Meridian.',
    landmarks: ['Nampa Civic Center', 'Lake Lowell', 'Ford Idaho Center', 'Warhawk Air Museum'],
    localFactors: {
      climate: 'Semi-arid climate',
      soil: 'N/A',
      commonNeeds: ['Affordable home sales', 'Rental property sales', 'First-time seller help']
    },
    facts: [
      { label: 'Population', value: '100,000+' },
      { label: 'Median Home Price', value: '$360,000' },
      { label: 'County', value: 'Canyon' },
      { label: 'Distance to Boise', value: '20 miles' }
    ]
  },
  {
    slug: 'caldwell',
    name: 'Caldwell',
    county: 'canyon',
    isPrimary: false,
    population: '60,000+',
    zipCodes: ['83605', '83606', '83607'],
    neighborhoods: ['Downtown', 'Indian Creek', 'Syringa Valley', 'Lakeshore'],
    extendedDescription: 'Caldwell is a growing city in Canyon County with over 60,000 residents, known for its historic downtown and agricultural heritage.',
    landmarks: ['Indian Creek Plaza', 'Caldwell Train Depot', 'College of Idaho'],
    localFactors: {
      climate: 'Semi-arid with hot summers',
      soil: 'N/A',
      commonNeeds: ['Affordable sales', 'Inherited properties', 'Rental liquidation']
    },
    facts: [
      { label: 'Population', value: '60,000+' },
      { label: 'Median Home Price', value: '$340,000' },
      { label: 'County', value: 'Canyon' },
      { label: 'Distance to Boise', value: '30 miles' }
    ]
  }
];

// Helper function to get a city by slug
export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find(c => c.slug === slug);
}

// Get all city slugs
export function getAllCitySlugs(): string[] {
  return CITIES.map(c => c.slug);
}

// Get all city names
export function getAllCityNames(): string[] {
  return CITIES.map(c => c.name);
}
