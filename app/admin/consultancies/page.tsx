'use client'
import { useState } from 'react'
import { consultancies as initialData } from '../../data'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  BadgeCheck,
  Star,
  Building2,
  X,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'

export default function AdminConsultanciesPage() {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const filtered = data.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const toggleFeatured = (id: number) => {
    setData((d) => d.map((c) => c.id === id ? { ...c, featured: !c.featured } : c))
  }

  const toggleHero = (id: number) => {
    setData((d) => d.map((c) => c.id === id ? { ...c, heroBanner: !c.heroBanner } : c))
  }

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
          <h1 className="font-display font-extrabold text-dark text-2xl mb-1">Consultancies</h1>
          <p className="text-slate text-sm">{data.length} total consultancies on platform</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Consultancy
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total', value: data.length, icon: Building2, color: 'text-primary bg-primary/10' },
          { label: 'Featured (Card)', value: data.filter((c) => c.featured).length, icon: Star, color: 'text-amber-600 bg-amber-100' },
          { label: 'Hero Banner', value: data.filter((c) => c.heroBanner).length, icon: BadgeCheck, color: 'text-violet-600 bg-violet-100' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-border p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <p className="font-display font-bold text-dark text-xl">{value}</p>
            <p className="text-slate text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-5">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
          <input
            type="text"
            placeholder="Search consultancies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface">
                {['Consultancy', 'Location', 'Counsellors', 'Rating', 'Hero Banner', 'Card Featured', 'Verified', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ background: c.color }}
                      >
                        {c.logo}
                      </div>
                      <div>
                        <p className="font-semibold text-dark text-sm">{c.name}</p>
                        <p className="text-xs text-slate">{c.countries.join(', ')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate">{c.location}</td>
                  <td className="px-5 py-4 text-sm text-dark font-medium">{c.counsellors}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-dark">{c.rating}</span>
                      <span className="text-xs text-slate">({c.reviews})</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleHero(c.id)} className="transition-colors">
                      {c.heroBanner
                        ? <ToggleRight className="w-7 h-7 text-primary" />
                        : <ToggleLeft className="w-7 h-7 text-slate" />}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleFeatured(c.id)} className="transition-colors">
                      {c.featured
                        ? <ToggleRight className="w-7 h-7 text-amber-500" />
                        : <ToggleLeft className="w-7 h-7 text-slate" />}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleVerified(c.id)} className="transition-colors">
                      {c.verified
                        ? <ToggleRight className="w-7 h-7 text-green-500" />
                        : <ToggleLeft className="w-7 h-7 text-slate" />}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center">
              <X className="w-4 h-4 text-slate" />
            </button>
            <h2 className="font-display font-bold text-dark text-xl mb-6">Add New Consultancy</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Consultancy Name *</label>
                <input type="text" placeholder="e.g. Global Reach Education" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Location</label>
                  <input type="text" placeholder="e.g. Kathmandu" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Logo Initials</label>
                  <input type="text" placeholder="e.g. GR" maxLength={2} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Tagline</label>
                <input type="text" placeholder="e.g. Your gateway to world-class education" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Countries Covered</label>
                <input type="text" placeholder="e.g. Australia, Canada, UK" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 border border-border text-slate py-3 rounded-xl text-sm font-semibold hover:bg-surface transition-colors">
                  Cancel
                </button>
                <button onClick={() => setShowModal(false)} className="flex-1 bg-primary text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
                  Add Consultancy
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
            <h3 className="font-display font-bold text-dark text-lg mb-2">Delete Consultancy?</h3>
            <p className="text-slate text-sm mb-5">This will also remove all associated counsellors. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-border text-slate py-2.5 rounded-xl text-sm font-semibold hover:bg-surface">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
