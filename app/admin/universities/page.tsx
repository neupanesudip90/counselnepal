'use client'
import { useState } from 'react'
import { universities as initialData } from '../../data'
import { Search, Plus, Edit2, Trash2, X, Trophy } from 'lucide-react'
import Link from 'next/link'

export default function AdminUniversitiesPage() {
  const [data, setData] = useState(initialData)
  const [search, setSearch] = useState('')
  const [filterCountry, setFilterCountry] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const countries = Array.from(new Set(data.map((u) => u.country)))
  const filtered = data.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase())
    const matchCountry = !filterCountry || u.country === filterCountry
    return matchSearch && matchCountry
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display font-extrabold text-dark text-2xl mb-1">Universities</h1><p className="text-slate text-sm">{data.length} universities across {countries.length} countries</p></div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700"><Plus className="w-4 h-4" /> Add University</button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
          <input type="text" placeholder="Search universities..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
        </div>
        <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} className="px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white text-slate">
          <option value="">All Countries</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-surface">{['University', 'Country', 'Ranking', 'Tuition/yr', 'IELTS', 'Scholarship', 'Actions'].map((h) => <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase tracking-wide">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-surface">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={u.image} alt="" className="w-10 h-8 rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
                      <div><p className="text-sm font-semibold text-dark">{u.name}</p><p className="text-xs text-slate">{u.location}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate">{u.flag} {u.country}</td>
                  <td className="px-5 py-4"><span className="text-sm font-bold text-dark">#{u.ranking}</span></td>
                  <td className="px-5 py-4 text-sm text-slate">{u.tuitionMin === 0 ? '🆓 Free' : `${u.currency} ${(u.tuitionMin/1000).toFixed(0)}K+`}</td>
                  <td className="px-5 py-4 text-sm text-slate">{u.ieltsOverall === 0 ? 'Not req.' : u.ieltsOverall}</td>
                  <td className="px-5 py-4">{u.scholarship ? <span className="flex items-center gap-1 text-xs text-amber-700 font-semibold bg-amber-100 px-2 py-0.5 rounded-full"><Trophy className="w-3 h-3" /> Yes</span> : <span className="text-xs text-slate">No</span>}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/universities/${u.id}`} target="_blank" className="p-1.5 rounded-lg hover:bg-primary/10 text-slate hover:text-primary"><Edit2 className="w-3.5 h-3.5" /></Link>
                      <button onClick={() => setDeleteId(u.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
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
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center"><X className="w-4 h-4 text-slate" /></button>
            <h2 className="font-display font-bold text-dark text-xl mb-6">Add University</h2>
            <div className="space-y-4">
              <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">University Name *</label><input type="text" placeholder="e.g. University of Melbourne" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Country *</label><input type="text" placeholder="e.g. Australia" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">World Ranking</label><input type="number" placeholder="e.g. 33" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Tuition Min</label><input type="number" placeholder="0 if free" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Currency</label><select className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white"><option>AUD</option><option>CAD</option><option>GBP</option><option>USD</option><option>EUR</option><option>JPY</option><option>KRW</option><option>NZD</option></select></div>
              </div>
              <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">IELTS Overall Required</label><input type="number" step="0.5" placeholder="e.g. 6.5 (0 if not required)" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Popular Courses</label><input type="text" placeholder="e.g. Engineering, MBA, Computer Science" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
              <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">About</label><textarea rows={3} placeholder="Brief description of the university..." className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary resize-none" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" id="scholarship" className="accent-primary" /><label htmlFor="scholarship" className="text-sm text-dark">Scholarship available</label></div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 border border-border text-slate py-3 rounded-xl text-sm font-semibold">Cancel</button>
                <button onClick={() => setShowModal(false)} className="flex-1 bg-primary text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-700">Add University</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-7 max-w-sm w-full text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h3 className="font-display font-bold text-dark text-lg mb-2">Delete University?</h3>
            <p className="text-slate text-sm mb-5">This will remove the university from the platform.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-border text-slate py-2.5 rounded-xl text-sm font-semibold">Cancel</button>
              <button onClick={() => { setData((d) => d.filter((u) => u.id !== deleteId)); setDeleteId(null) }} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
