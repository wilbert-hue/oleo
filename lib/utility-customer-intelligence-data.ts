export interface CustomerIntelligenceRow {
  sNo: number | string
  customerCompanyName: string
  businessOverview: string
  customerTypeAndNetworkResponsibility: string
  compositePoleApplicationUseCase: string
  annualRevenueOrNetworkBudgetSignal: string
  sizeOperatingScale: string
  keyContactPerson: string
  designationDecisionMakerRole: string
  emailAddress: string
  telephoneWhatsappNumber: string
  linkedInProfile: string
  website: string
  compositePolePurchaseCriteria?: string
  networkPainPoints?: string
  gridComplianceAndOperationalIssues?: string
  digitalMaturity?: string
  riskExposure?: string
  assetRenewalCycleAndBuyingTriggers?: string
  budgetOwner?: string
  procurementModel?: string
  vendorSelectionCriteria?: string
  preferredEngagementMode?: string
  preferredDeploymentServiceContract?: string
  preferredSolutionType?: string
  integrationTechnicalServiceRequirement?: string
  potentialCustomerDetails?: string
  additionalCmiNotes?: string
}

export interface CustomerIntelligenceProposition {
  id: string
  label: string
  titleLines: string[]
  rows: CustomerIntelligenceRow[]
}

export interface CustomerIntelligenceData {
  marketTitle: string
  subtitle: string
  entityNote: string
  proposition1: CustomerIntelligenceProposition
  proposition2: CustomerIntelligenceProposition
  proposition3: CustomerIntelligenceProposition
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
  { key: 'customerCompanyName', label: 'Customer / Company Name', headerClass: 'bg-[#FFF8DC]', minWidth: '180px' },
  { key: 'businessOverview', label: 'Business Overview', headerClass: 'bg-[#FFF8DC]', minWidth: '150px' },
  {
    key: 'customerTypeAndNetworkResponsibility',
    label: 'Customer Type and Network Responsibility',
    headerClass: 'bg-[#FFF8DC]',
    minWidth: '200px',
  },
  {
    key: 'compositePoleApplicationUseCase',
    label: 'Composite Pole Application/Use Case',
    headerClass: 'bg-[#FFF8DC]',
    minWidth: '180px',
  },
  {
    key: 'annualRevenueOrNetworkBudgetSignal',
    label: 'Annual Revenue in US$ Million/Network Budget Signal',
    headerClass: 'bg-[#FFF8DC]',
    minWidth: '200px',
  },
  { key: 'sizeOperatingScale', label: 'Size / Operating Scale', headerClass: 'bg-[#FFF8DC]', minWidth: '150px' },
]

export const CONTACT_COLUMNS: TableColumn[] = [
  { key: 'keyContactPerson', label: 'Key Contact Person', headerClass: 'bg-[#B0E0E6]', minWidth: '130px' },
  {
    key: 'designationDecisionMakerRole',
    label: 'Designation / Decision-Maker Role',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '170px',
  },
  { key: 'emailAddress', label: 'Email Address', headerClass: 'bg-[#B0E0E6]', minWidth: '150px', isLink: 'email' },
  {
    key: 'telephoneWhatsappNumber',
    label: 'Telephone / WhatsApp Number',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '150px',
  },
  { key: 'linkedInProfile', label: 'LinkedIn Profile', headerClass: 'bg-[#B0E0E6]', minWidth: '150px', isLink: 'url' },
  { key: 'website', label: 'Website', headerClass: 'bg-[#B0E0E6]', minWidth: '130px', isLink: 'url' },
]

export const BUYING_DRIVERS_COLUMNS: TableColumn[] = [
  {
    key: 'compositePolePurchaseCriteria',
    label: 'Composite Pole Purchase Criteria',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '180px',
  },
  { key: 'networkPainPoints', label: 'Network Pain Points', headerClass: 'bg-[#B0E0E6]', minWidth: '160px' },
  {
    key: 'gridComplianceAndOperationalIssues',
    label: 'Grid Compliance and Operational Issues',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '200px',
  },
  { key: 'digitalMaturity', label: 'Digital Maturity', headerClass: 'bg-[#B0E0E6]', minWidth: '130px' },
  { key: 'riskExposure', label: 'Risk Exposure', headerClass: 'bg-[#B0E0E6]', minWidth: '130px' },
]

export const PURCHASING_BEHAVIOUR_COLUMNS: TableColumn[] = [
  {
    key: 'assetRenewalCycleAndBuyingTriggers',
    label: 'Asset Renewal Cycle and Buying Triggers',
    headerClass: 'bg-[#DDA0DD]',
    minWidth: '200px',
  },
  { key: 'budgetOwner', label: 'Budget Owner', headerClass: 'bg-[#DDA0DD]', minWidth: '130px' },
  { key: 'procurementModel', label: 'Procurement Model', headerClass: 'bg-[#DDA0DD]', minWidth: '150px' },
  {
    key: 'vendorSelectionCriteria',
    label: 'Vendor Selection Criteria',
    headerClass: 'bg-[#DDA0DD]',
    minWidth: '170px',
  },
]

export const SOLUTION_REQUIREMENTS_COLUMNS: TableColumn[] = [
  {
    key: 'preferredEngagementMode',
    label: 'Preferred Engagement Mode',
    headerClass: 'bg-[#DEB887]',
    minWidth: '170px',
  },
  {
    key: 'preferredDeploymentServiceContract',
    label: 'Preferred Deployment / Service Contract',
    headerClass: 'bg-[#DEB887]',
    minWidth: '200px',
  },
  {
    key: 'preferredSolutionType',
    label: 'Preferred Solution Type',
    headerClass: 'bg-[#DEB887]',
    minWidth: '170px',
  },
  {
    key: 'integrationTechnicalServiceRequirement',
    label: 'Integration / Technical / Service Requirement',
    headerClass: 'bg-[#DEB887]',
    minWidth: '220px',
  },
]

export const CMI_INSIGHTS_COLUMNS: TableColumn[] = [
  {
    key: 'potentialCustomerDetails',
    label: 'Potential Customer  Details',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '180px',
  },
  {
    key: 'additionalCmiNotes',
    label: 'Additional CMI Notes',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '180px',
  },
]

export type PropositionTableConfig = {
  groups: TableColumnGroup[]
  columns: TableColumn[]
}

export const PROPOSITION_TABLE_CONFIG: Record<'proposition1' | 'proposition2' | 'proposition3', PropositionTableConfig> = {
  proposition1: {
    groups: [
      { label: 'Customer Information', colSpan: 6, headerClass: 'bg-[#E8C4A0]' },
      { label: 'Contact Details', colSpan: 6, headerClass: 'bg-[#87CEEB]' },
    ],
    columns: [...CUSTOMER_INFO_COLUMNS, ...CONTACT_COLUMNS],
  },
  proposition2: {
    groups: [
      { label: 'Customer Information', colSpan: 6, headerClass: 'bg-[#E8C4A0]' },
      { label: 'Contact Details', colSpan: 6, headerClass: 'bg-[#87CEEB]' },
      { label: 'Buying Drivers', colSpan: 5, headerClass: 'bg-[#87CEEB]' },
    ],
    columns: [...CUSTOMER_INFO_COLUMNS, ...CONTACT_COLUMNS, ...BUYING_DRIVERS_COLUMNS],
  },
  proposition3: {
    groups: [
      { label: 'Customer Information', colSpan: 6, headerClass: 'bg-[#E8C4A0]' },
      { label: 'Contact Details', colSpan: 6, headerClass: 'bg-[#87CEEB]' },
      { label: 'Buying Drivers', colSpan: 5, headerClass: 'bg-[#87CEEB]' },
      { label: 'Purchasing Behaviour Metrics', colSpan: 4, headerClass: 'bg-[#9370DB] text-white' },
      { label: 'Solution Requirements', colSpan: 4, headerClass: 'bg-[#D4A574]' },
      { label: 'CMI Insights', colSpan: 2, headerClass: 'bg-[#87CEEB]' },
    ],
    columns: [
      ...CUSTOMER_INFO_COLUMNS,
      ...CONTACT_COLUMNS,
      ...BUYING_DRIVERS_COLUMNS,
      ...PURCHASING_BEHAVIOUR_COLUMNS,
      ...SOLUTION_REQUIREMENTS_COLUMNS,
      ...CMI_INSIGHTS_COLUMNS,
    ],
  },
}

export async function loadCustomerIntelligenceData(): Promise<CustomerIntelligenceData> {
  const response = await fetch('/data/customer-intelligence.json')
  if (!response.ok) {
    throw new Error('Failed to load customer intelligence data')
  }
  return response.json()
}
