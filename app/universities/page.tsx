'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { universities, countries } from '../data'
import Link from 'next/link'
import { Search, Trophy, GraduationCap, DollarSign, Globe } from 'lucide-react'

export default function UniversitiesPage() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [search, setSearch] = useState('')
  const [scholarshipOnly, setScholarshipOnly] = useState(false)

  const filtered = universities.filter((u) => {
    const matchCountry = !selectedCountry || u.country === selectedCountry || u.country.includes(selectedCountry)
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.location.toLowerCase().includes(search.toLowerCase())
    const matchScholarship = !scholarshipOnly || u.scholarship
    return matchCountry && matchSearch && matchScholarship
  })

  const countryGroups = Array.from(new Set(universities.map((u) => u.country)))

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-10 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">Explore</p>
          <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Universities</h1>
          <p className="text-slate text-sm">{universities.length} top universities across {countryGroups.length} countries</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
            <input type="text" placeholder="Search universities..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
          </div>
          <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white text-slate">
            <option value="">All Countries</option>
            {countryGroups.map((c) => {
              const country = countries.find((cc) => cc.name === c || c.includes(cc.name.split(' ')[0]))
              return <option key={c} value={c}>{country?.flag || ''} {c}</option>
            })}
          </select>
          <button onClick={() => setScholarshipOnly(!scholarshipOnly)} className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${scholarshipOnly ? 'bg-amber-500 text-white border-amber-500' : 'border-border text-slate hover:border-primary'}`}>
            🎓 Scholarship Available
          </button>
        </div>

        {/* Country tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setSelectedCountry('')} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${!selectedCountry ? 'bg-primary text-white border-primary' : 'border-border text-slate hover:border-primary'}`}>All</button>
          {countryGroups.map((c) => {
            const country = countries.find((cc) => cc.name === c || c.includes(cc.name.split(' ')[0]))
            return (
              <button key={c} onClick={() => setSelectedCountry(selectedCountry === c ? '' : c)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedCountry === c ? 'bg-primary text-white border-primary' : 'border-border text-slate hover:border-primary'}`}>
                {country?.flag} {c}
              </button>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Universities', val: filtered.length, icon: GraduationCap, color: 'text-primary bg-primary/10' },
            { label: 'With Scholarships', val: filtered.filter((u) => u.scholarship).length, icon: Trophy, color: 'text-amber-600 bg-amber-100' },
            { label: 'Free Tuition', val: filtered.filter((u) => u.tuitionMin === 0).length, icon: DollarSign, color: 'text-green-600 bg-green-100' },
            { label: 'Countries', val: [...new Set(filtered.map((u) => u.country))].length, icon: Globe, color: 'text-violet-600 bg-violet-100' },
          ].map(({ label, val, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-border p-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${color}`}><Icon className="w-4 h-4" /></div>
              <p className="font-display font-bold text-dark text-xl">{val}</p>
              <p className="text-slate text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* University grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((u) => (
            <Link key={u.id} href={`/universities/${u.id}`} className="group bg-white border border-border rounded-2xl overflow-hidden card-hover block">
              <div className="relative h-44 overflow-hidden">
                <img src={u.image} alt={u.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-xs font-bold text-white bg-dark/50 backdrop-blur-sm px-2.5 py-1 rounded-full">#{u.ranking} Ranked</span>
                </div>
                {u.scholarship && <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">Scholarship</div>}
                <div className="absolute bottom-3 left-3">
                  <p className="text-white text-xl">{u.flag}</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-dark text-base mb-1 group-hover:text-primary transition-colors leading-snug">{u.name}</h3>
                <p className="text-slate text-xs mb-3">{u.location} · {u.type} · Est. {u.established}</p>
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="bg-surface rounded-lg p-2">
                    <p className="text-slate">Tuition/yr</p>
                    <p className="font-semibold text-dark">
                      {u.tuitionMin === 0 ? '🆓 Free' : `${u.currency} ${(u.tuitionMin / 1000).toFixed(0)}K+`}
                    </p>
                  </div>
                  <div className="bg-surface rounded-lg p-2">
                    <p className="text-slate">IELTS</p>
                    <p className="font-semibold text-dark">{u.ieltsOverall === 0 ? 'Not required' : u.ieltsOverall + '+'}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {u.popularCourses.slice(0, 3).map((c) => <span key={c} className="px-2 py-0.5 bg-primary/8 text-primary text-xs rounded-full">{c}</span>)}
                  {u.popularCourses.length > 3 && <span className="px-2 py-0.5 bg-surface text-slate text-xs rounded-full">+{u.popularCourses.length - 3}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="font-display font-bold text-dark text-lg mb-2">No universities found</h3>
            <p className="text-slate text-sm">Try different filters</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
