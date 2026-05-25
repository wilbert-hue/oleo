export interface CustomerIntelligenceRow {
  sNo: number | string
  customerCompanyName: string
  headquartersLocation: string
  manufacturingProcessProfile: string
  keyPersonEmail: string
  tel: string
  mobile: string
  website: string
  linkedIn: string
  productTypesConsumed: string
  supplyModeAndSourcing: string
  estimatedVolumeDemand: string
  estimatedPurchaseValue: string
  productWiseDemandSplit: string
  procurementPattern: string
}

export interface CustomerIntelligenceMarket {
  id: string
  label: string
  rows: CustomerIntelligenceRow[]
}

export interface CustomerIntelligenceData {
  marketTitle: string
  subtitle: string
  entityNote: string
  markets: CustomerIntelligenceMarket[]
}

/** @deprecated Use markets-based structure */
export interface CustomerIntelligenceProposition {
  id: string
  label: string
  titleLines: string[]
  rows: CustomerIntelligenceRow[]
}

export interface TableColumnGroup {
  label: string
  colSpan: number
  headerClass: string
}

export interface TableColumn {
  key: keyof CustomerIntelligenceRow
  label: string
  headerClass: string
  minWidth?: string
  isLink?: 'email' | 'url'
}

export const CUSTOMER_INFO_COLUMNS: TableColumn[] = [
  {
    key: 'customerCompanyName',
    label: 'Customer Name/Company Name',
    headerClass: 'bg-[#FFF8DC]',
    minWidth: '200px',
  },
]

export const COMPANY_PROFILE_COLUMNS: TableColumn[] = [
  {
    key: 'headquartersLocation',
    label: "Headquarter's Location",
    headerClass: 'bg-[#FFF8DC]',
    minWidth: '180px',
  },
  {
    key: 'manufacturingProcessProfile',
    label: 'Manufacturing / process profile and key product applications',
    headerClass: 'bg-[#FFF8DC]',
    minWidth: '280px',
  },
]

export const CONTACT_COLUMNS: TableColumn[] = [
  {
    key: 'keyPersonEmail',
    label: 'Key Person Email',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '160px',
    isLink: 'email',
  },
  { key: 'tel', label: 'Tel', headerClass: 'bg-[#B0E0E6]', minWidth: '120px' },
  { key: 'mobile', label: 'Mobile', headerClass: 'bg-[#B0E0E6]', minWidth: '120px' },
  { key: 'website', label: 'Website', headerClass: 'bg-[#B0E0E6]', minWidth: '140px', isLink: 'url' },
  { key: 'linkedIn', label: 'LinkedIn', headerClass: 'bg-[#B0E0E6]', minWidth: '140px', isLink: 'url' },
]

export const PRODUCT_PROCUREMENT_COLUMNS: TableColumn[] = [
  {
    key: 'productTypesConsumed',
    label: 'Product types consumed (Oleoresin, Powder, Oil) and source/raw material preference',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '300px',
  },
  {
    key: 'supplyModeAndSourcing',
    label: 'Supply Mode used and current sourcing / supplier pattern',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '260px',
  },
  {
    key: 'estimatedVolumeDemand',
    label: 'Estimated monthly / annual volume demand (Tons/month, Tons/year)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '260px',
  },
  {
    key: 'estimatedPurchaseValue',
    label: 'Estimated monthly / annual purchase value (INR Cr. / US$ Mn)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '260px',
  },
  {
    key: 'productWiseDemandSplit',
    label: 'Product-wise demand split and multi-product consumption profile',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '280px',
  },
  {
    key: 'procurementPattern',
    label: 'Procurement pattern (Direct vs Distributor, Contract vs Spot, Refill cycle & delivery expectation)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '320px',
  },
]

export type PropositionTableConfig = {
  groups: TableColumnGroup[]
  columns: TableColumn[]
}

export const MARKET_TABLE_CONFIG: PropositionTableConfig = {
  groups: [
    { label: 'Customer Information', colSpan: 1, headerClass: 'bg-[#E8C4A0]' },
    { label: 'Company Profile', colSpan: 2, headerClass: 'bg-[#E8C4A0]' },
    { label: 'Contact Details', colSpan: 5, headerClass: 'bg-[#87CEEB]' },
    { label: 'Product & Procurement Intelligence', colSpan: 6, headerClass: 'bg-[#87CEEB]' },
  ],
  columns: [
    ...CUSTOMER_INFO_COLUMNS,
    ...COMPANY_PROFILE_COLUMNS,
    ...CONTACT_COLUMNS,
    ...PRODUCT_PROCUREMENT_COLUMNS,
  ],
}

/** @deprecated Use MARKET_TABLE_CONFIG */
export const PROPOSITION_TABLE_CONFIG: Record<'proposition1' | 'proposition2' | 'proposition3', PropositionTableConfig> = {
  proposition1: MARKET_TABLE_CONFIG,
  proposition2: MARKET_TABLE_CONFIG,
  proposition3: MARKET_TABLE_CONFIG,
}

export const END_USE_MARKETS = [
  'Food & Beverages',
  'Nutraceuticals & Dietary Supplements',
  'Pharmaceuticals',
  'Cosmetics & Personal Care',
  'Animal Feed & Pet Food',
  'Fragrance & Perfumery',
  'Other Industry',
] as const

export function createPlaceholderRow(sNo: number | string, customerName: string): CustomerIntelligenceRow {
  const placeholder = 'xx'
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
  }
}

export async function loadCustomerIntelligenceData(): Promise<CustomerIntelligenceData> {
  const response = await fetch('/data/customer-intelligence.json')
  if (!response.ok) {
    throw new Error('Failed to load customer intelligence data')
  }
  const raw = await response.json()

  // Support legacy proposition-based JSON during migration
  if (raw.markets && Array.isArray(raw.markets)) {
    return raw as CustomerIntelligenceData
  }

  return migrateLegacyCustomerIntelligenceData(raw)
}

function migrateLegacyCustomerIntelligenceData(raw: Record<string, unknown>): CustomerIntelligenceData {
  const legacyRows =
    (raw.proposition1 as { rows?: CustomerIntelligenceRow[] } | undefined)?.rows ?? []
  return {
    marketTitle: String(raw.marketTitle ?? 'Oleoresins Market - Customer Database'),
    subtitle: String(raw.subtitle ?? 'Verified directory and insight on customers'),
    entityNote: String(raw.entityNote ?? ''),
    markets: END_USE_MARKETS.map((label, index) => ({
      id: `market-${index + 1}`,
      label,
      rows:
        index === 0
          ? legacyRows.slice(0, 4).map((row, i) => ({
              ...createPlaceholderRow(row.sNo ?? i + 1, row.customerCompanyName || `Customer ${i + 1}`),
              ...row,
            }))
          : [1, 2, 3].map((n) => createPlaceholderRow(n, `Customer ${n}`)),
    })),
  }
}
