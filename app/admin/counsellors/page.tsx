'use client'
import { useState } from 'react'
import { counsellors as initialData, consultancies } from '../../data'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  BadgeCheck,
  Star,
  X,
  Filter,
  MessageCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'

export default function AdminCounsellorsPage() {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState('')
  const [filterConsultancy, setFilterConsultancy] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})

  const filtered = data.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchConsultancy = !filterConsultancy || c.consultancy === filterConsultancy
    return matchSearch && matchConsultancy
  })

  const toggleVerified = (id: number) => {
    setData((d) => d.map((c) => c.id === id ? { ...c, verified: !c.verified } : c))
  }

  const handleDelete = (id: number) => {
    setData((d) => d.filter((c) => c.id !== id))
    setDeleteId(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-extrabold text-dark text-2xl mb-1">Counsellors</h1>
          <p className="text-slate text-sm">{data.length} total counsellors across all consultancies</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Counsellor
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
          <input
            type="text"
            placeholder="Search counsellors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
          <select
            value={filterConsultancy}
            onChange={(e) => setFilterConsultancy(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white appearance-none text-slate"
          >
            <option value="">All Consultancies</option>
            {consultancies.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-border p-5 hover:border-primary/30 transition-all group">
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {!imgErrors[c.id] ? (
                    <img
                      src={c.photo}
                      alt={c.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={() => setImgErrors((e) => ({ ...e, [c.id]: true }))}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {c.name[0]}
                    </div>
                  )}
                  {c.verified && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <BadgeCheck className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-display font-semibold text-dark text-sm">{c.name}</p>
                  <p className="text-xs text-slate truncate max-w-[140px]">{c.consultancy}</p>
                </div>
              </div>
              {/* Actions */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-lg hover:bg-primary/10 text-slate hover:text-primary transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteId(c.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-slate hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Countries */}
            <div className="flex flex-wrap gap-1 mb-3">
              {c.countries.map((cn) => (
                <span key={cn} className="px-2 py-0.5 bg-primary/8 text-primary text-xs rounded-full">
                  {cn}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-between text-xs text-slate py-3 border-y border-border mb-3">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                {c.rating} ({c.reviews})
              </span>
              <span>{c.students}+ students</span>
              <span>{c.experience}y exp</span>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-slate">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                {c.whatsapp}
              </span>
              <button
                onClick={() => toggleVerified(c.id)}
                className="flex items-center gap-1 text-xs transition-colors"
              >
                {c.verified ? (
                  <>
                    <ToggleRight className="w-6 h-6 text-green-500" />
                    <span className="text-green-600 font-medium">Verified</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-6 h-6 text-slate" />
                    <span className="text-slate">Unverified</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-border">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-display font-bold text-dark">No counsellors found</p>
          <p className="text-slate text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Add Counsellor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center"
            >
              <X className="w-4 h-4 text-slate" />
            </button>
            <h2 className="font-display font-bold text-dark text-xl mb-6">Add New Counsellor</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Full Name *</label>
                  <input type="text" placeholder="e.g. Priya Sharma" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Consultancy *</label>
                  <select className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white">
                    <option value="">Select...</option>
                    {consultancies.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">WhatsApp Number *</label>
                <input type="tel" placeholder="e.g. 9779841234567" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Experience (years)</label>
                  <input type="number" placeholder="e.g. 5" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Photo URL</label>
                  <input type="url" placeholder="https://..." className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Destination Countries</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Australia', 'Canada', 'UK', 'USA', 'Japan', 'Germany', 'New Zealand', 'South Korea'].map((cn) => (
                    <label key={cn} className="flex items-center gap-2 text-sm text-slate cursor-pointer hover:text-dark transition-colors">
                      <input type="checkbox" className="accent-primary" />
                      {cn}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Languages Spoken</label>
                <input type="text" placeholder="e.g. Nepali, English, Hindi" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Bio</label>
                <textarea
                  rows={3}
                  placeholder="Brief description about the counsellor..."
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-border text-slate py-3 rounded-xl text-sm font-semibold hover:bg-surface transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-primary text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  Add Counsellor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-7 max-w-sm w-full text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-display font-bold text-dark text-lg mb-2">Delete Counsellor?</h3>
            <p className="text-slate text-sm mb-5">This counsellor and all their leads will be removed permanently.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-border text-slate py-2.5 rounded-xl text-sm font-semibold hover:bg-surface"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
