'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { consultancies, countries } from '../data'
import { Star, BadgeCheck, Search, Users, MapPin, ArrowRight, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function ConsultanciesPage() {
  const [search, setSearch] = useState('')
  const [filterCountry, setFilterCountry] = useState('')

  const filtered = consultancies.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase())
    const matchCountry = !filterCountry || c.countries.includes(filterCountry)
    return matchSearch && matchCountry
  })

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-24 pb-10 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">Browse</p>
          <h1 className="font-display font-extrabold text-dark text-3xl mb-2">All Consultancies</h1>
          <p className="text-slate text-sm">{consultancies.length} verified consultancies across Nepal</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
            <input type="text" placeholder="Search consultancies..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
          </div>
          <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} className="px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white text-slate">
            <option value="">All Destinations</option>
            {countries.map((c) => <option key={c.code} value={c.name}>{c.flag} {c.name}</option>)}
          </select>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { val: consultancies.length, label: 'Total Consultancies', icon: Building2 },
            { val: consultancies.filter((c) => c.verified).length, label: 'Verified', icon: BadgeCheck },
            { val: consultancies.reduce((a, c) => a + c.students, 0) + '+', label: 'Students Placed', icon: Users },
          ].map(({ val, label, icon: Icon }) => (
            <div key={label} className="bg-surface rounded-2xl border border-border p-5 text-center">
              <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="font-display font-bold text-dark text-xl">{val}</p>
              <p className="text-slate text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-border overflow-hidden card-hover group">
              {/* Color header */}
              <div className="h-20 relative" style={{ background: `linear-gradient(135deg, ${c.color}20, ${c.color}10)` }}>
                <div className="absolute inset-0 flex items-center px-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg" style={{ background: c.color }}>{c.logo}</div>
                </div>
                {c.verified && (
                  <div className="absolute top-3 right-4 flex items-center gap-1 bg-white text-primary text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    <BadgeCheck className="w-3 h-3" /> Verified
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-dark text-lg mb-1">{c.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate mb-1">
                  <MapPin className="w-3 h-3" /> {c.location}
                </div>
                <p className="text-xs text-slate mb-3">Est. {c.established} · {c.counsellors} counsellors</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">{[1,2,3,4,5].map((s) => <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.floor(c.rating) ? 'text-amber-400 fill-amber-400' : 'text-border'}`} />)}</div>
                  <span className="text-sm font-semibold text-dark">{c.rating}</span>
                  <span className="text-xs text-slate">({c.reviews} reviews)</span>
                </div>

                <p className="text-slate text-sm leading-relaxed mb-4 line-clamp-2">{c.about}</p>

                <div className="flex flex-wrap gap-1 mb-5">
                  {c.countries.map((cn) => <span key={cn} className="px-2.5 py-1 bg-surface text-slate text-xs rounded-full border border-border">{cn}</span>)}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-slate flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {c.students}+ students placed</span>
                  <Link href={`/consultancies/${c.id}`} className="flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                    View Profile <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏢</div>
            <h3 className="font-display font-bold text-dark text-lg mb-2">No consultancies found</h3>
            <p className="text-slate text-sm">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
