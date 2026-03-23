'use client'
import { useState } from 'react'
import { promos as initialPromos, promoTopics } from '../../data'
import { Search, Eye, Trash2, ExternalLink, Filter } from 'lucide-react'
import Link from 'next/link'

export default function AdminPromosPage() {
  const [promos, setPromos] = useState(initialPromos)
  const [search, setSearch] = useState('')
  const [filterTopic, setFilterTopic] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const filtered = promos.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.consultancy.toLowerCase().includes(search.toLowerCase())
    const matchTopic = !filterTopic || p.topic === filterTopic
    return matchSearch && matchTopic
  })

  const handleDelete = (id: number) => {
    setPromos((p) => p.filter((pr) => pr.id !== id))
    setDeleteId(null)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-dark text-2xl mb-1">Promo Guides</h1>
        <p className="text-slate text-sm">All guides published by consultancies. Remove any that violate platform guidelines.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{ label: 'Total Promos', val: promos.length }, { label: 'Total Views', val: promos.reduce((a, p) => a + p.views, 0).toLocaleString() }, { label: 'Total Likes', val: promos.reduce((a, p) => a + p.likes, 0) }].map(({ label, val }) => (
          <div key={label} className="bg-white rounded-2xl border border-border p-5 text-center">
            <p className="font-display font-bold text-dark text-2xl">{val}</p>
            <p className="text-slate text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
          <input type="text" placeholder="Search promos..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
          <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)} className="pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white text-slate appearance-none">
            <option value="">All Topics</option>
            {promoTopics.map((t) => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border bg-surface">{['Promo', 'Topic', 'Consultancy', 'Author', 'Views', 'Likes', 'Date', 'Actions'].map((h) => <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase tracking-wide">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-border">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-surface">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.thumbnail} alt="" className="w-12 h-9 rounded-lg object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
                    <p className="text-sm font-medium text-dark line-clamp-1 max-w-[200px]">{p.title}</p>
                  </div>
                </td>
                <td className="px-5 py-4"><span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: p.consultancyColor }}>{p.topicLabel}</span></td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold" style={{ background: p.consultancyColor }}>{p.consultancyLogo}</div>
                    <span className="text-sm text-slate">{p.consultancy}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate">{p.author}</td>
                <td className="px-5 py-4"><span className="flex items-center gap-1 text-sm text-slate"><Eye className="w-3.5 h-3.5" />{p.views}</span></td>
                <td className="px-5 py-4 text-sm text-slate">{p.likes}</td>
                <td className="px-5 py-4 text-xs text-slate">{p.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/resources/${p.id}`} target="_blank" className="p-1.5 rounded-lg hover:bg-primary/10 text-slate hover:text-primary transition-colors"><ExternalLink className="w-3.5 h-3.5" /></Link>
                    <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-10 text-slate text-sm">No promos found</div>}
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-7 max-w-sm w-full text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h3 className="font-display font-bold text-dark text-lg mb-2">Remove Promo?</h3>
            <p className="text-slate text-sm mb-5">This promo will be removed from the platform permanently.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-border text-slate py-2.5 rounded-xl text-sm font-semibold">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-600">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
