const fs = require('fs');
const path = require('path');

const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];

const TOP_GEO = 'Global';

// Top-level regions (By Region)
const REGIONS = [
  'North America',
  'Latin America',
  'Europe',
  'Asia Pacific (excluding India)',
  'Middle East',
  'Africa',
  'India',
];

const regionShares = {
  'North America': 0.28,
  'Latin America': 0.08,
  Europe: 0.24,
  'Asia Pacific (excluding India)': 0.22,
  'Middle East': 0.06,
  Africa: 0.05,
  India: 0.07,
};

// India 3-level hierarchy: India -> sub-region -> state/area
const indiaHierarchy = {
  'North India': {
    Punjab: 0.28,
    Haryana: 0.22,
    Rajasthan: 0.26,
    'Rest of North India': 0.24,
  },
  'South India': {
    'Andhra Pradesh': 0.14,
    Telangana: 0.12,
    'Tamil Nadu': 0.18,
    Kerala: 0.16,
    Karnataka: 0.2,
    'Rest of South India': 0.2,
  },
  'East India': {
    'West Bengal': 0.55,
    Odisha: 0.45,
  },
  Assam: {
    Jharkhand: 0.45,
    'Rest of East India': 0.55,
  },
  West: {
    Maharashtra: 0.35,
    Gujarat: 0.28,
    'Madhya Pradesh': 0.2,
    'Rest of West India': 0.17,
  },
};

const indiaSubRegionShares = {
  'North India': 0.28,
  'South India': 0.32,
  'East India': 0.12,
  Assam: 0.08,
  West: 0.2,
};

// Oleoresins market segment definitions (flat segments)
const segmentTypes = {
  'By Source': {
    hierarchical: false,
    segments: {
      Olive: 0.12,
      Ginger: 0.14,
      Turmeric: 0.16,
      'Patchouli (Pacholi)': 0.06,
      Cardamom: 0.1,
      'Black Pepper': 0.12,
      Clove: 0.08,
      Cinnamon: 0.09,
      Cumin: 0.07,
      'Other Spices & Herbs': 0.06,
    },
  },
  'By Product Form': {
    hierarchical: false,
    segments: {
      'Concentrated Extract': 0.42,
      'Powdered Extract (Spray Dried / Microencapsulated)': 0.35,
      'Liquid / Oil Extract': 0.23,
    },
  },
  'By Extraction Method': {
    hierarchical: false,
    segments: {
      'Solvent Extraction': 0.38,
      'Cold Pressed / Mechanical Extraction': 0.22,
      'Supercritical Fluid Extraction': 0.18,
      'Steam Distillation': 0.14,
      'Enzyme-Assisted Extraction': 0.08,
    },
  },
  'By End-Use Industry': {
    hierarchical: false,
    segments: {
      'Food & Beverages': 0.32,
      'Nutraceuticals & Dietary Supplements': 0.22,
      Pharmaceuticals: 0.14,
      'Cosmetics & Personal Care': 0.16,
      'Animal Feed & Pet Food': 0.06,
      'Fragrance & Perfumery': 0.05,
      'Other Industry': 0.05,
    },
  },
  'By Distribution Channel': {
    hierarchical: false,
    segments: {
      Direct: 0.38,
      'Indirect (Distributors, etc.)': 0.62,
    },
  },
};

const globalBaseValue = 2850; // US$ Mn
const regionGrowthRate = 0.092;
const volumePerMillionUSD = 420; // Tons per US$ Mn

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

function generateSegmentTypeData(baseValue, segmentConfig, roundFn) {
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
  const byRegion = {};

  for (const region of REGIONS) {
    const regionBase = globalBaseValue * regionShares[region] * multiplier;
    const regionGrowth = regionGrowthRate * (0.9 + seededRandom() * 0.2);

    if (region === 'India') {
      const indiaTotal = generateTimeSeries(regionBase, regionGrowth, roundFn);
      byRegion[region] = { ...indiaTotal };

      for (const [subRegion, states] of Object.entries(indiaHierarchy)) {
        const subBase =
          regionBase * indiaSubRegionShares[subRegion] * (1 + (seededRandom() - 0.5) * 0.05);
        const subGrowth = regionGrowthRate * (0.88 + seededRandom() * 0.22);
        const subTotal = generateTimeSeries(subBase, subGrowth, roundFn);
        byRegion[region][subRegion] = { ...subTotal };

        for (const [state, stateShare] of Object.entries(states)) {
          const stateBase = subBase * stateShare * (1 + (seededRandom() - 0.5) * 0.06);
          const stateGrowth = regionGrowthRate * (0.85 + seededRandom() * 0.28);
          byRegion[region][subRegion][state] = generateTimeSeries(stateBase, stateGrowth, roundFn);
        }
      }
    } else {
      byRegion[region] = generateTimeSeries(regionBase, regionGrowth, roundFn);
    }
  }

  return byRegion;
}

function getAllGeographies() {
  const geos = [TOP_GEO, ...REGIONS];
  for (const [subRegion, states] of Object.entries(indiaHierarchy)) {
    geos.push(subRegion);
    geos.push(...Object.keys(states));
  }
  return geos;
}

function generateData(isVolume) {
  const data = {};
  const allGeos = getAllGeographies();

  for (const geo of allGeos) {
    let baseValue;
    if (geo === TOP_GEO) {
      baseValue = globalBaseValue;
    } else if (REGIONS.includes(geo)) {
      baseValue = globalBaseValue * regionShares[geo];
    } else if (Object.keys(indiaSubRegionShares).includes(geo)) {
      baseValue = globalBaseValue * regionShares.India * indiaSubRegionShares[geo];
    } else {
      // India state
      for (const [subRegion, states] of Object.entries(indiaHierarchy)) {
        if (states[geo] !== undefined) {
          baseValue =
            globalBaseValue *
            regionShares.India *
            indiaSubRegionShares[subRegion] *
            states[geo];
          break;
        }
      }
      if (!baseValue) baseValue = globalBaseValue * 0.01;
    }

    data[geo] = generateGeographyData(baseValue, isVolume);
    if (geo === TOP_GEO) {
      data[geo]['By Region'] = buildByRegionData(isVolume);
    }
  }

  return data;
}

function buildEmptyStructure(node) {
  const result = {};
  for (const segName of Object.keys(node.segments)) {
    result[segName] = {};
  }
  return result;
}

function buildIndiaByRegionStructure() {
  const india = {};
  for (const [subRegion, states] of Object.entries(indiaHierarchy)) {
    india[subRegion] = Object.fromEntries(Object.keys(states).map((s) => [s, {}]));
  }
  return india;
}

function buildSegmentationAnalysis() {
  const analysis = {};
  const allGeos = getAllGeographies();

  const byRegionStructure = Object.fromEntries(
    REGIONS.map((r) => {
      if (r === 'India') {
        return [r, buildIndiaByRegionStructure()];
      }
      return [r, {}];
    })
  );

  for (const geo of allGeos) {
    const geoStructure = {};
    for (const [segType, config] of Object.entries(segmentTypes)) {
      geoStructure[segType] = buildEmptyStructure(config);
    }
    if (geo === TOP_GEO) {
      geoStructure['By Region'] = byRegionStructure;
    }
    analysis[geo] = geoStructure;
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
fs.writeFileSync(
  path.join(outDir, 'segmentation_analysis.json'),
  JSON.stringify(segmentationAnalysis, null, 2)
);

console.log('Generated value.json, volume.json, and segmentation_analysis.json successfully');
console.log('Geographies:', Object.keys(valueData));
console.log('Segment types:', Object.keys(valueData[TOP_GEO]).filter((k) => k !== 'By Region'));
console.log(
  'Sample - Global, By Source:',
  JSON.stringify(valueData[TOP_GEO]['By Source'], null, 2).slice(0, 400)
);
