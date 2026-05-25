'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, Info } from 'lucide-react'
import {
  loadDistributorIntelligenceData,
  DISTRIBUTOR_TABLE_CONFIG,
  type DistributorIntelligenceData,
  type DistributorIntelligenceRow,
  type TableColumn,
} from '@/lib/utility-distributor-intelligence-data'

interface AccordionSectionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function AccordionSection({ title, isOpen, onToggle, children }: AccordionSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span className="text-lg font-semibold text-black">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="px-2 pb-4 bg-white rounded-b-lg">{children}</div>}
    </div>
  )
}

function renderCellValue(value: string, column: TableColumn) {
  if (!value || value === 'xx') return value || '—'

  if (column.isLink === 'email' && value.includes('@')) {
    return (
      <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
        {value}
      </a>
    )
  }

  if (column.isLink === 'url' && value !== 'xx') {
    const href = value.startsWith('http') ? value : `https://${value}`
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
        {value}
      </a>
    )
  }

  return value
}

function DistributorTable({ rows }: { rows: DistributorIntelligenceRow[] }) {
  const config = DISTRIBUTOR_TABLE_CONFIG

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th
              rowSpan={2}
              className="bg-[#FFF8DC] border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black min-w-[60px]"
            >
              S.No.
            </th>
            {config.groups.map((group) => (
              <th
                key={group.label}
                colSpan={group.colSpan}
                className={`border border-gray-300 px-3 py-2 text-center text-sm font-semibold ${group.headerClass}`}
              >
                {group.label}
              </th>
            ))}
          </tr>
          <tr>
            {config.columns.map((column) => (
              <th
                key={column.key}
                className={`border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black ${column.headerClass}`}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.sNo}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="border border-gray-300 px-3 py-2 text-sm text-black text-center">{row.sNo}</td>
              {config.columns.map((column) => (
                <td key={column.key} className="border border-gray-300 px-3 py-2 text-sm text-black">
                  {renderCellValue(String(row[column.key] ?? ''), column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface DistributorIntelligenceDatabaseProps {
  title?: string
  height?: number
}

export default function DistributorIntelligenceDatabase({ title }: DistributorIntelligenceDatabaseProps) {
  const [data, setData] = useState<DistributorIntelligenceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isTableOpen, setIsTableOpen] = useState(true)

  useEffect(() => {
    loadDistributorIntelligenceData()
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load data'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#34A0A4]" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        {error || 'Distributor intelligence data unavailable'}
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-black mb-2">{title || data.marketTitle}</h2>
        <p className="text-sm text-gray-700">{data.subtitle}</p>
        {data.entityNote ? <p className="text-xs text-gray-600 mt-1">{data.entityNote}</p> : null}
      </div>

      <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
        <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-900">
          <span className="font-semibold">NOTE:</span> All the data in the dashboard is demo data. No real-world data is related to this.
        </p>
      </div>

      <AccordionSection
        title="Distributor Directory"
        isOpen={isTableOpen}
        onToggle={() => setIsTableOpen((open) => !open)}
      >
        <DistributorTable rows={data.rows} />
      </AccordionSection>
    </div>
  )
}
