const fs = require('fs');
const path = require('path');

const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];

const REGION = 'Central Africa';
const COUNTRIES = [
  'Cameroon',
  'Gabon',
  'Equatorial Guinea',
  'Chad',
  'Central African Republic',
  'Republic of the Congo',
  'Angola',
  'Rest of Central Africa',
];

const countryShares = {
  Cameroon: 0.22,
  Gabon: 0.12,
  'Equatorial Guinea': 0.06,
  Chad: 0.1,
  'Central African Republic': 0.08,
  'Republic of the Congo': 0.14,
  Angola: 0.2,
  'Rest of Central Africa': 0.08,
};

// Segment definitions: flat { name: share } or hierarchical { parent: { share, children: { child: share } } }
const segmentTypes = {
  'By Offering': {
    hierarchical: true,
    segments: {
      Software: {
        share: 0.58,
        children: {
          'Reservation & Booking Management Software': 0.28,
          'Operations & Inventory Management Software': 0.24,
          'Revenue & Commercial Management Software': 0.26,
          'Analytics & Intelligence Software': 0.22,
        },
      },
      Services: {
        share: 0.42,
        children: {
          'Professional & Implementation Services': 0.35,
          'Managed & Support Services': 0.38,
          'Consulting & Advisory Services': 0.27,
        },
      },
    },
  },
  'By Deployment Model': {
    hierarchical: false,
    segments: {
      'Cloud-based': 0.68,
      'On-premise': 0.32,
    },
  },
  'By Booking Channel': {
    hierarchical: false,
    segments: {
      'Direct Booking Channels': 0.42,
      'Third-party Aggregator Channels': 0.38,
      'API & Partner Distribution Channels': 0.2,
    },
  },
  'By Revenue Model': {
    hierarchical: false,
    segments: {
      'Commission-Based Model': 0.28,
      'Subscription-Based Model': 0.32,
      'Transaction Fee Model': 0.18,
      'Freemium Model': 0.12,
      'Enterprise Licensing Model': 0.1,
    },
  },
  'By Organization Size': {
    hierarchical: false,
    segments: {
      'Small Businesses': 0.34,
      'Medium-sized Businesses': 0.38,
      'Large Enterprises': 0.28,
    },
  },
  'By Booking Type': {
    hierarchical: true,
    segments: {
      'Accommodation Booking': {
        share: 0.22,
        children: {
          'Hotel Room Booking': 0.32,
          'Resort Booking': 0.18,
          'Vacation Rental Booking': 0.24,
          'Hostel & Guesthouse Booking': 0.12,
          'Others (Serviced Apartment Booking, etc.)': 0.14,
        },
      },
      'Food Service Booking': {
        share: 0.14,
        children: {
          'Restaurant Table Reservation Booking': 0.45,
          'Café Reservation Booking': 0.28,
          'Others (Banquet & Dining Reservation Booking, etc.)': 0.27,
        },
      },
      'Travel & Transportation Booking': {
        share: 0.2,
        children: {
          'Airline Ticket Booking': 0.35,
          'Tour & Activity Booking': 0.28,
          'Cruise Booking': 0.15,
          'Others (Vehicle Rental Booking, etc.)': 0.22,
        },
      },
      'Healthcare & Wellness Booking': {
        share: 0.12,
        children: {
          'Diagnostic Appointment Booking': 0.4,
          'Spa & Wellness Booking': 0.35,
          'Others (Fitness Session Booking, etc.)': 0.25,
        },
      },
      'Entertainment & Event Booking': {
        share: 0.18,
        children: {
          'Event Ticket Booking': 0.32,
          'Cinema & Theatre Booking': 0.28,
          'Theme Park Booking': 0.22,
          'Others (Venue Reservation Booking, etc.)': 0.18,
        },
      },
      'Others (Sports & Recreation Booking, Commercial & Professional Booking, etc.)': {
        share: 0.14,
        children: null,
      },
    },
  },
};

const regionBaseValue = 420;
const regionGrowthRate = 0.115;
const volumePerMillionUSD = 1850;

let seed = 42;
function seededRandom() {
  seed = (seed * 16807 + 0) % 2147483647;
  return (seed - 1) / 2147483646;
}

function addNoise(value, noiseLevel = 0.03) {
  return value * (1 + (seededRandom() - 0.5) * 2 * noiseLevel);
}

function roundTo1(val) {
  return Math.round(val * 10) / 10;
}

function roundToInt(val) {
  return Math.round(val);
}

function generateTimeSeries(baseValue, growthRate, roundFn) {
  const series = {};
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const rawValue = baseValue * Math.pow(1 + growthRate, i);
    series[year] = roundFn(addNoise(rawValue));
  }
  return series;
}

function generateFlatSegments(baseValue, segments, roundFn) {
  const result = {};
  for (const [name, share] of Object.entries(segments)) {
    const segGrowth = regionGrowthRate * (0.88 + seededRandom() * 0.24);
    const shareVariation = 1 + (seededRandom() - 0.5) * 0.08;
    const segBase = baseValue * share * shareVariation;
    result[name] = generateTimeSeries(segBase, segGrowth, roundFn);
  }
  return result;
}

function generateHierarchicalSegments(baseValue, segments, roundFn) {
  const result = {};
  for (const [parentName, config] of Object.entries(segments)) {
    const parentShare = config.share;
    const parentGrowth = regionGrowthRate * (0.9 + seededRandom() * 0.2);
    const parentBase = baseValue * parentShare * (1 + (seededRandom() - 0.5) * 0.06);
    const parentSeries = generateTimeSeries(parentBase, parentGrowth, roundFn);

    if (!config.children) {
      result[parentName] = parentSeries;
      continue;
    }

    result[parentName] = { ...parentSeries };
    for (const [childName, childShare] of Object.entries(config.children)) {
      const childGrowth = regionGrowthRate * (0.85 + seededRandom() * 0.28);
      const childBase = parentBase * childShare * (1 + (seededRandom() - 0.5) * 0.06);
      result[parentName][childName] = generateTimeSeries(childBase, childGrowth, roundFn);
    }
  }
  return result;
}

function generateSegmentTypeData(baseValue, segmentConfig, roundFn) {
  if (segmentConfig.hierarchical) {
    return generateHierarchicalSegments(baseValue, segmentConfig.segments, roundFn);
  }
  return generateFlatSegments(baseValue, segmentConfig.segments, roundFn);
}

function generateGeographyData(geoBaseValue, isVolume) {
  const roundFn = isVolume ? roundToInt : roundTo1;
  const multiplier = isVolume ? volumePerMillionUSD : 1;
  const baseValue = geoBaseValue * multiplier;
  const geoData = {};

  for (const [segType, config] of Object.entries(segmentTypes)) {
    geoData[segType] = generateSegmentTypeData(baseValue, config, roundFn);
  }

  return geoData;
}

function buildByRegionData(isVolume) {
  const roundFn = isVolume ? roundToInt : roundTo1;
  const multiplier = isVolume ? volumePerMillionUSD : 1;
  const regionTotal = generateTimeSeries(regionBaseValue * multiplier, regionGrowthRate, roundFn);
  const byRegion = { ...regionTotal };

  for (const country of COUNTRIES) {
    const countryBase = regionBaseValue * countryShares[country] * multiplier;
    const countryGrowth = regionGrowthRate * (0.92 + seededRandom() * 0.18);
    byRegion[country] = generateTimeSeries(countryBase, countryGrowth, roundFn);
  }

  return { [REGION]: byRegion };
}

function generateData(isVolume) {
  const data = {};

  data[REGION] = generateGeographyData(regionBaseValue, isVolume);
  data[REGION]['By Region'] = buildByRegionData(isVolume);

  for (const country of COUNTRIES) {
    const countryBase = regionBaseValue * countryShares[country];
    data[country] = generateGeographyData(countryBase, isVolume);
  }

  return data;
}

function buildEmptyStructure(node) {
  if (node.hierarchical) {
    const result = {};
    for (const [parentName, config] of Object.entries(node.segments)) {
      if (!config.children) {
        result[parentName] = {};
      } else {
        result[parentName] = {};
        for (const childName of Object.keys(config.children)) {
          result[parentName][childName] = {};
        }
      }
    }
    return result;
  }

  const result = {};
  for (const segName of Object.keys(node.segments)) {
    result[segName] = {};
  }
  return result;
}

function buildSegmentationAnalysis() {
  const analysis = {};

  const regionStructure = {};
  for (const [segType, config] of Object.entries(segmentTypes)) {
    regionStructure[segType] = buildEmptyStructure(config);
  }

  regionStructure['By Region'] = {
    [REGION]: Object.fromEntries(COUNTRIES.map((country) => [country, {}])),
  };

  analysis[REGION] = regionStructure;

  for (const country of COUNTRIES) {
    analysis[country] = {};
    for (const [segType, config] of Object.entries(segmentTypes)) {
      analysis[country][segType] = buildEmptyStructure(config);
    }
  }

  return analysis;
}

seed = 42;
const valueData = generateData(false);
seed = 7777;
const volumeData = generateData(true);
const segmentationAnalysis = buildSegmentationAnalysis();

const outDir = path.join(__dirname, 'public', 'data');
fs.writeFileSync(path.join(outDir, 'value.json'), JSON.stringify(valueData, null, 2));
fs.writeFileSync(path.join(outDir, 'volume.json'), JSON.stringify(volumeData, null, 2));
fs.writeFileSync(path.join(outDir, 'segmentation_analysis.json'), JSON.stringify(segmentationAnalysis, null, 2));

console.log('Generated value.json, volume.json, and segmentation_analysis.json successfully');
console.log('Geographies:', Object.keys(valueData));
console.log('Segment types:', Object.keys(valueData[REGION]).filter((k) => k !== 'By Region'));
console.log(
  'Sample - Central Africa, By Offering:',
  JSON.stringify(valueData[REGION]['By Offering'], null, 2).slice(0, 500)
);
