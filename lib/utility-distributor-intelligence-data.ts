export interface DistributorIntelligenceRow {
  sNo: number | string
  distributorName: string
  headquartersLocation: string
  distributionCapacity: string
  existingBrands: string
  productPortfolio: string
  distributionChannels: string
  formPreference: string
  procurementModel: string
  geographicalReach: string
  priceSensitivity: string
  contactEmail: string
  contactTel: string
}

export interface DistributorIntelligenceData {
  marketTitle: string
  subtitle: string
  entityNote: string
  rows: DistributorIntelligenceRow[]
}

export interface TableColumnGroup {
  label: string
  colSpan: number
  headerClass: string
}

export interface TableColumn {
  key: keyof DistributorIntelligenceRow
  label: string
  headerClass: string
  minWidth?: string
  isLink?: 'email' | 'url'
}

export const DISTRIBUTOR_INFO_COLUMNS: TableColumn[] = [
  {
    key: 'distributorName',
    label: 'Distributor Name',
    headerClass: 'bg-[#FFF8DC]',
    minWidth: '200px',
  },
]

export const COMPANY_CAPACITY_COLUMNS: TableColumn[] = [
  {
    key: 'headquartersLocation',
    label: "Headquarter's Location",
    headerClass: 'bg-[#FFF8DC]',
    minWidth: '180px',
  },
  {
    key: 'distributionCapacity',
    label: 'Distribution Capacity (Tons per year)',
    headerClass: 'bg-[#FFF8DC]',
    minWidth: '220px',
  },
]

export const PORTFOLIO_COLUMNS: TableColumn[] = [
  {
    key: 'existingBrands',
    label: 'Existing Brands (on Best Effort basis*)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '240px',
  },
  {
    key: 'productPortfolio',
    label: 'Product Portfolio',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '180px',
  },
  {
    key: 'distributionChannels',
    label: 'Distribution Channels (direct, indirect)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '240px',
  },
  {
    key: 'formPreference',
    label: 'Form Preference (Powders, Oleoresin, Oil, Extracts)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '280px',
  },
]

export const COMMERCIAL_COLUMNS: TableColumn[] = [
  {
    key: 'procurementModel',
    label: 'Procurement Model (Direct sourcing, Distribution partnerships, or Agency-based)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '320px',
  },
  {
    key: 'geographicalReach',
    label: 'Geographical Reach (Countries/Regions served)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '260px',
  },
  {
    key: 'priceSensitivity',
    label: 'Price Sensitivity (High / Medium / Low)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '220px',
  },
]

export const CONTACT_COLUMNS: TableColumn[] = [
  {
    key: 'contactEmail',
    label: 'Email',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '160px',
    isLink: 'email',
  },
  { key: 'contactTel', label: 'Tel.', headerClass: 'bg-[#B0E0E6]', minWidth: '130px' },
]

export type DistributorTableConfig = {
  groups: TableColumnGroup[]
  columns: TableColumn[]
}

export const DISTRIBUTOR_TABLE_CONFIG: DistributorTableConfig = {
  groups: [
    { label: 'Distributor Information', colSpan: 1, headerClass: 'bg-[#E8C4A0]' },
    { label: 'Company & Capacity', colSpan: 2, headerClass: 'bg-[#E8C4A0]' },
    { label: 'Portfolio & Channels', colSpan: 4, headerClass: 'bg-[#87CEEB]' },
    { label: 'Commercial Profile', colSpan: 3, headerClass: 'bg-[#87CEEB]' },
    { label: 'Contact Details', colSpan: 2, headerClass: 'bg-[#87CEEB]' },
  ],
  columns: [
    ...DISTRIBUTOR_INFO_COLUMNS,
    ...COMPANY_CAPACITY_COLUMNS,
    ...PORTFOLIO_COLUMNS,
    ...COMMERCIAL_COLUMNS,
    ...CONTACT_COLUMNS,
  ],
}

export function createPlaceholderDistributorRow(
  sNo: number | string,
  distributorName: string
): DistributorIntelligenceRow {
  const placeholder = 'xx'
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
  }
}

export async function loadDistributorIntelligenceData(): Promise<DistributorIntelligenceData> {
  const response = await fetch('/data/distributor-intelligence.json')
  if (!response.ok) {
    throw new Error('Failed to load distributor intelligence data')
  }
  return response.json()
}
