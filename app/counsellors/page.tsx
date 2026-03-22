'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CounsellorCard from '../../components/CounsellorCard'
import { counsellors, consultancies, countries } from '../data'
import { Search, SlidersHorizontal, X } from 'lucide-react'

export default function CounsellorsPage() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedConsultancy, setSelectedConsultancy] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = counsellors.filter((c) => {
    const matchCountry = !selectedCountry || c.countries.includes(selectedCountry)
    const matchConsultancy = !selectedConsultancy || c.consultancy === selectedConsultancy
    const matchSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCountry && matchConsultancy && matchSearch
  })

  const clearFilters = () => {
    setSelectedCountry('')
    setSelectedConsultancy('')
    setSearchQuery('')
  }

  const hasFilters = selectedCountry || selectedConsultancy || searchQuery

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page header */}
      <div className="pt-24 pb-8 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">Find Your Expert</p>
          <h1 className="font-display font-extrabold text-dark text-3xl mb-2">
            {selectedCountry ? `Counsellors for ${selectedCountry}` : 'Browse All Counsellors'}
          </h1>
          <p className="text-slate text-sm">{filtered.length} counsellors found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white border border-border rounded-2xl p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-semibold text-dark">Filters</h3>
                {hasFilters && (
                  <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate" />
                  <input
                    type="text"
                    placeholder="Counsellor name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Destination country */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-2 block">Destination Country</label>
                <div className="space-y-1">
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setSelectedCountry(selectedCountry === c.name ? '' : c.name)}
                      className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                        selectedCountry === c.name
                          ? 'bg-primary text-white'
                          : 'text-slate hover:bg-surface hover:text-dark'
                      }`}
                    >
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                      <span className="ml-auto text-xs opacity-60">{c.counsellors}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Consultancy */}
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-2 block">Consultancy</label>
                <div className="space-y-1">
                  {consultancies.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedConsultancy(selectedConsultancy === c.name ? '' : c.name)}
                      className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                        selectedConsultancy === c.name
                          ? 'bg-primary text-white'
                          : 'text-slate hover:bg-surface hover:text-dark'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: c.color }}
                      >
                        {c.logo[0]}
                      </div>
                      <span className="truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filter bar */}
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                <input
                  type="text"
                  placeholder="Search counsellor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-slate hover:border-primary hover:text-primary transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedCountry && (
                  <span className="flex items-center gap-1 bg-primary text-white text-xs px-3 py-1.5 rounded-full">
                    {selectedCountry}
                    <button onClick={() => setSelectedCountry('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedConsultancy && (
                  <span className="flex items-center gap-1 bg-primary text-white text-xs px-3 py-1.5 rounded-full">
                    {selectedConsultancy}
                    <button onClick={() => setSelectedConsultancy('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((c) => (
                  <CounsellorCard key={c.id} counsellor={c} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display font-bold text-dark text-lg mb-2">No counsellors found</h3>
                <p className="text-slate text-sm mb-4">Try adjusting your filters</p>
                <button onClick={clearFilters} className="text-sm text-primary font-medium hover:underline">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
