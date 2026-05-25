export interface CustomerIntelligenceRow {
  sNo: number | string
  customerCompanyName: string
  typeOfBusiness: string
  primaryApplicationType: string
  platformType: string
  numberOfPropertiesManaged: string
  numberOfBookingsProcessed: string
  keyContactPerson: string
  designationRole: string
  emailAddress: string
  phoneWhatsappNumber: string
  linkedInProfile: string
  websiteUrl: string
  annualOnlineBookingSoftwareBudget?: string
  preferredBookingModel?: string
  averageImplementationTimeline?: string
  currentBookingSoftwareUsageDuration?: string
  keyPurchaseDrivers?: string
  levelOfRenderingAutomation?: string
  percentageOfProjectsUsingCloudRendering?: string
  useOfAiOrGenerativeRenderingTools?: string
  renderingWorkflowOptimizationToolsAdoption?: string
  remoteCollaborationCloudRenderingCapability?: string
  plannedRenderingCapacityExpansion?: string
  expectedNewRenderingProjects?: string
  newApplicationAreasPlanned?: string
  newStudioOfficeExpansionPlanned?: string
  customerBenchmarkingSummary?: string
  additionalCommentsNotesByCmiTeam?: string
  levelOfBookingAutomation?: string
  percentageOfOnlineVsOfflineBookings?: string
  useOfAiOrDynamicPricingTools?: string
  integrationWithPaymentGatewaysPmsCrmOta?: string
  mobileAppBookingCapability?: string
  plannedExpansionOfBookingCapabilities?: string
  expectedBookingVolumeGrowth?: string
  newFeaturesPlanned?: string
  customerSegmentsServed?: string
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
  { key: 'customerCompanyName', label: 'Customer Name/Company Name', headerClass: 'bg-[#FFF8DC]', minWidth: '180px' },
  { key: 'typeOfBusiness', label: 'Type of Business', headerClass: 'bg-[#FFF8DC]', minWidth: '150px' },
  { key: 'primaryApplicationType', label: 'Primary Application Type', headerClass: 'bg-[#FFF8DC]', minWidth: '170px' },
  { key: 'platformType', label: 'Platform Type', headerClass: 'bg-[#FFF8DC]', minWidth: '130px' },
  {
    key: 'numberOfPropertiesManaged',
    label: 'Number of Properties/Hotels/Travel Services Managed',
    headerClass: 'bg-[#FFF8DC]',
    minWidth: '220px',
  },
  {
    key: 'numberOfBookingsProcessed',
    label: 'Number of Daily/Monthly Bookings Processed',
    headerClass: 'bg-[#FFF8DC]',
    minWidth: '220px',
  },
]

export const CONTACT_COLUMNS: TableColumn[] = [
  { key: 'keyContactPerson', label: 'Key Contact Person', headerClass: 'bg-[#B0E0E6]', minWidth: '130px' },
  { key: 'designationRole', label: 'Designation/Role', headerClass: 'bg-[#B0E0E6]', minWidth: '150px' },
  { key: 'emailAddress', label: 'Email Address', headerClass: 'bg-[#B0E0E6]', minWidth: '150px', isLink: 'email' },
  { key: 'phoneWhatsappNumber', label: 'Phone/WhatsApp Number', headerClass: 'bg-[#B0E0E6]', minWidth: '150px' },
  { key: 'linkedInProfile', label: 'LinkedIn Profile', headerClass: 'bg-[#B0E0E6]', minWidth: '150px', isLink: 'url' },
  { key: 'websiteUrl', label: 'Website URL', headerClass: 'bg-[#B0E0E6]', minWidth: '130px', isLink: 'url' },
]

export const PROCUREMENT_COLUMNS: TableColumn[] = [
  {
    key: 'annualOnlineBookingSoftwareBudget',
    label: 'Annual Online Booking Software Budget (US$)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '220px',
  },
  {
    key: 'preferredBookingModel',
    label: 'Preferred Booking Model (Cloud-Based / On-Premise / Hybrid)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '260px',
  },
  {
    key: 'averageImplementationTimeline',
    label: 'Average Implementation Timeline (Weeks)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '200px',
  },
  {
    key: 'currentBookingSoftwareUsageDuration',
    label: 'Current Booking Software & Usage Duration (Years)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '240px',
  },
  {
    key: 'keyPurchaseDrivers',
    label: 'Key Purchase Drivers (Automation, Customer Experience, Mobile Booking, Channel Integration, AI Features)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '280px',
  },
]

export const DIGITAL_ADOPTION_P3_COLUMNS: TableColumn[] = [
  {
    key: 'levelOfBookingAutomation',
    label: 'Level of Booking Automation (Manual / Semi-Automated / Fully Automated)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '240px',
  },
  {
    key: 'percentageOfOnlineVsOfflineBookings',
    label: 'Percentage of Online vs Offline Bookings',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '200px',
  },
  {
    key: 'useOfAiOrDynamicPricingTools',
    label: 'Use of AI or Dynamic Pricing Tools (Yes or No)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '220px',
  },
  {
    key: 'integrationWithPaymentGatewaysPmsCrmOta',
    label: 'Integration with Payment Gateways / PMS / CRM / OTA Platforms',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '260px',
  },
  {
    key: 'mobileAppBookingCapability',
    label: 'Mobile App Booking Capability (Yes or No)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '200px',
  },
]

export const FUTURE_DEMAND_P3_COLUMNS: TableColumn[] = [
  {
    key: 'plannedExpansionOfBookingCapabilities',
    label: 'Planned Expansion of Booking Capabilities in Next 3 Years (%)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '260px',
  },
  {
    key: 'expectedBookingVolumeGrowth',
    label: 'Expected Booking Volume Growth in Next 3 Years',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '220px',
  },
  {
    key: 'newFeaturesPlanned',
    label: 'New Features Planned (AI Chatbot, Dynamic Packaging, Loyalty Programs, Multi-Language Support)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '280px',
  },
  {
    key: 'customerSegmentsServed',
    label: 'Customer Segments Served (Leisure, Corporate, Group Travel, Medical Tourism, etc.)',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '260px',
  },
]

export const CMI_INSIGHTS_P3_COLUMNS: TableColumn[] = [
  {
    key: 'additionalCommentsNotesByCmiTeam',
    label: 'Additional Comments/Notes by CMI Team',
    headerClass: 'bg-[#B0E0E6]',
    minWidth: '220px',
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
      { label: 'Procurement & Purchase Metrics', colSpan: 5, headerClass: 'bg-[#87CEEB]' },
    ],
    columns: [...CUSTOMER_INFO_COLUMNS, ...CONTACT_COLUMNS, ...PROCUREMENT_COLUMNS],
  },
  proposition3: {
    groups: [
      { label: 'Customer Information', colSpan: 6, headerClass: 'bg-[#E8C4A0]' },
      { label: 'Contact Details', colSpan: 6, headerClass: 'bg-[#87CEEB]' },
      { label: 'Procurement & Purchase Metrics', colSpan: 5, headerClass: 'bg-[#87CEEB]' },
      { label: 'Digital & Technology Adoption Metrics', colSpan: 5, headerClass: 'bg-[#87CEEB]' },
      { label: 'Future Demand & Expansion Metrics', colSpan: 4, headerClass: 'bg-[#87CEEB]' },
      { label: 'CMI Insights', colSpan: 1, headerClass: 'bg-[#87CEEB]' },
    ],
    columns: [
      ...CUSTOMER_INFO_COLUMNS,
      ...CONTACT_COLUMNS,
      ...PROCUREMENT_COLUMNS,
      ...DIGITAL_ADOPTION_P3_COLUMNS,
      ...FUTURE_DEMAND_P3_COLUMNS,
      ...CMI_INSIGHTS_P3_COLUMNS,
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
