'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { events, consultancies } from '../data'
import { Calendar, MapPin, Users, Search, Filter, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function EventsPage() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterFree, setFilterFree] = useState(false)

  const types = [...new Set(events.map((e) => e.type))]

  const filtered = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.consultancy.toLowerCase().includes(search.toLowerCase())
    const matchType = !filterType || e.type === filterType
    const matchFree = !filterFree || e.free
    return matchSearch && matchType && matchFree
  })

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-10 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">What's On</p>
          <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Upcoming Events</h1>
          <p className="text-slate text-sm">Education fairs, seminars and workshops organized by top consultancies</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
            <input type="text" placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
          </div>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white text-slate">
            <option value="">All Types</option>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button onClick={() => setFilterFree(!filterFree)} className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${filterFree ? 'bg-green-500 text-white border-green-500' : 'border-border text-slate hover:border-primary'}`}>
            Free Only
          </button>
        </div>

        {/* Featured event — first one large */}
        {filtered.length > 0 && (
          <div className="relative rounded-3xl overflow-hidden mb-8 h-72 group cursor-pointer">
            <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end max-w-2xl">
              <div className="flex gap-2 mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: filtered[0].color }}>{filtered[0].type}</span>
                {filtered[0].free && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500 text-white">Free Entry</span>}
              </div>
              <h2 className="font-display font-extrabold text-white text-2xl mb-2">{filtered[0].title}</h2>
              <p className="text-white/70 text-sm mb-4">{filtered[0].description.slice(0, 100)}...</p>
              <div className="flex flex-wrap gap-4 text-xs text-white/70 mb-5">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(filtered[0].date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {filtered[0].time}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {filtered[0].location}</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {filtered[0].registered}/{filtered[0].seats} registered</span>
              </div>
              <button className="self-start bg-white text-dark font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                Register Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(1).map((e) => (
            <div key={e.id} className="bg-white rounded-2xl border border-border overflow-hidden card-hover group">
              <div className="relative h-44 overflow-hidden">
                <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: e.color }}>{e.type}</span>
                  {e.free && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500 text-white">Free</span>}
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-slate mb-1">{e.consultancy}</p>
                <h3 className="font-display font-bold text-dark text-sm mb-3 leading-snug">{e.title}</h3>
                <p className="text-slate text-xs leading-relaxed mb-4 line-clamp-2">{e.description}</p>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate"><Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />{new Date(e.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} · {e.time}</div>
                  <div className="flex items-center gap-2 text-xs text-slate"><MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />{e.location}</div>
                  <div className="flex items-center gap-2 text-xs text-slate"><Users className="w-3.5 h-3.5 text-primary flex-shrink-0" />{e.registered}/{e.seats} registered</div>
                </div>
                <div className="w-full bg-border rounded-full h-1.5 mb-4">
                  <div className="h-1.5 rounded-full" style={{ width: `${(e.registered / e.seats) * 100}%`, background: e.color }} />
                </div>
                <button className="w-full text-center text-sm font-semibold text-primary border border-primary/20 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">Register Now</button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="font-display font-bold text-dark text-lg mb-2">No events found</h3>
            <p className="text-slate text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
