const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const EXCEL_FILE =
  'Sample Framework_Customer Database_Central Africa Online Booking System Market.xlsx';
const OUTPUT_FILE = path.join(__dirname, 'public', 'data', 'customer-intelligence.json');

const PROP1_COLS = [
  'customerCompanyName',
  'typeOfBusiness',
  'primaryApplicationType',
  'platformType',
  'numberOfPropertiesManaged',
  'numberOfBookingsProcessed',
  'keyContactPerson',
  'designationRole',
  'emailAddress',
  'phoneWhatsappNumber',
  'linkedInProfile',
  'websiteUrl',
];

const PROP2_EXTRA = [
  'annualOnlineBookingSoftwareBudget',
  'preferredBookingModel',
  'averageImplementationTimeline',
  'currentBookingSoftwareUsageDuration',
  'keyPurchaseDrivers',
];

const PROP3_EXTRA = [
  'annualOnlineBookingSoftwareBudget',
  'preferredBookingModel',
  'averageImplementationTimeline',
  'currentBookingSoftwareUsageDuration',
  'keyPurchaseDrivers',
  'levelOfBookingAutomation',
  'percentageOfOnlineVsOfflineBookings',
  'useOfAiOrDynamicPricingTools',
  'integrationWithPaymentGatewaysPmsCrmOta',
  'mobileAppBookingCapability',
  'plannedExpansionOfBookingCapabilities',
  'expectedBookingVolumeGrowth',
  'newFeaturesPlanned',
  'customerSegmentsServed',
  'additionalCommentsNotesByCmiTeam',
];

function parseSheet(wb, sheetName, extraColsAfterBase = []) {
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  const titleRaw = String(rows[0][0] || '');
  const titleLines = titleRaw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  const allCols = [...PROP1_COLS, ...extraColsAfterBase];
  const dataRows = [];

  for (let i = 6; i < rows.length; i++) {
    const row = rows[i];
    if (!row[0] && !row[1]) continue;
    const record = { sNo: row[0] };
    allCols.forEach((key, idx) => {
      record[key] = String(row[idx + 1] ?? '').trim();
    });
    dataRows.push(record);
  }

  return { titleLines, rows: dataRows };
}

function main() {
  const wb = XLSX.readFile(EXCEL_FILE);

  const output = {
    marketTitle: 'Central Africa Online Booking System Market - Customer Database',
    subtitle: 'Verified directory and insight on customers',
    entityNote: '',
    proposition1: {
      id: 'proposition-1',
      label: 'Proposition 1 - Standard',
      ...parseSheet(wb, 'Proposition 1 - Standard'),
    },
    proposition2: {
      id: 'proposition-2',
      label: 'Proposition 2 - Advance',
      ...parseSheet(wb, 'Proposition 2 - Advance', PROP2_EXTRA),
    },
    proposition3: {
      id: 'proposition-3',
      label: 'Proposition 3 - Premium',
      ...parseSheet(wb, 'Proposition 3 - Premium', PROP3_EXTRA),
    },
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log('Written', OUTPUT_FILE);
  console.log('P1 rows:', output.proposition1.rows.length);
  console.log('P2 rows:', output.proposition2.rows.length);
  console.log('P3 rows:', output.proposition3.rows.length);
}

main();
