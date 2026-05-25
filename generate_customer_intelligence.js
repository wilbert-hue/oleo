const fs = require('fs');
const path = require('path');

const MARKETS = [
  'Food & Beverages',
  'Nutraceuticals & Dietary Supplements',
  'Pharmaceuticals',
  'Cosmetics & Personal Care',
  'Animal Feed & Pet Food',
  'Fragrance & Perfumery',
  'Other Industry',
];

function createPlaceholderRow(sNo, customerName) {
  const placeholder = 'xx';
  return {
    sNo,
    customerCompanyName: customerName,
    headquartersLocation: placeholder,
    manufacturingProcessProfile: placeholder,
    keyPersonEmail: placeholder,
    tel: placeholder,
    mobile: placeholder,
    website: placeholder,
    linkedIn: placeholder,
    productTypesConsumed: placeholder,
    supplyModeAndSourcing: placeholder,
    estimatedVolumeDemand: placeholder,
    estimatedPurchaseValue: placeholder,
    productWiseDemandSplit: placeholder,
    procurementPattern: placeholder,
  };
}

const EXTRA_ROWS = 20;

function buildMarketRows(marketLabel) {
  if (marketLabel === 'Food & Beverages') {
    const total = 4 + EXTRA_ROWS; // 24 rows: Customer 1* through Customer 24
    return Array.from({ length: total }, (_, i) => {
      const n = i + 1;
      const name = n === 1 ? 'Customer 1*' : `Customer ${n}`;
      return createPlaceholderRow(n, name);
    });
  }
  const total = 3 + EXTRA_ROWS; // 23 rows per other market
  return Array.from({ length: total }, (_, i) => {
    const n = i + 1;
    return createPlaceholderRow(n, `Customer ${n}`);
  });
}

const output = {
  marketTitle: 'Oleoresins Market - Customer Database',
  subtitle: 'Verified directory and insight on customers by end-use industry',
  entityNote: '',
  markets: MARKETS.map((label, index) => ({
    id: `market-${index + 1}`,
    label,
    rows: buildMarketRows(label),
  })),
};

const outPath = path.join(__dirname, 'public', 'data', 'customer-intelligence.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log('Written', outPath);
console.log(
  'Markets:',
  output.markets.map((m) => `${m.label} (${m.rows.length} rows)`).join(', ')
);
