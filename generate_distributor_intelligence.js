const fs = require('fs');
const path = require('path');

function createPlaceholderRow(sNo, distributorName) {
  const placeholder = 'xx';
  return {
    sNo,
    distributorName,
    headquartersLocation: placeholder,
    distributionCapacity: placeholder,
    existingBrands: placeholder,
    productPortfolio: placeholder,
    distributionChannels: placeholder,
    formPreference: placeholder,
    procurementModel: placeholder,
    geographicalReach: placeholder,
    priceSensitivity: placeholder,
    contactEmail: placeholder,
    contactTel: placeholder,
  };
}

const EXTRA_ROWS = 20;
const BASE_ROWS = 5;
const rows = Array.from({ length: BASE_ROWS + EXTRA_ROWS }, (_, i) => {
  const n = i + 1;
  return createPlaceholderRow(n, `Distributor Name ${n}`);
});

const output = {
  marketTitle: 'Oleoresins Market - Distributor Database',
  subtitle: 'Verified directory and insight on distributors',
  entityNote: '',
  rows,
};

const outPath = path.join(__dirname, 'public', 'data', 'distributor-intelligence.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log('Written', outPath);
console.log('Distributors:', rows.length);
