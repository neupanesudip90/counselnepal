'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { promos, promoTopics } from '../data'
import Link from 'next/link'
import { Search, Eye, Heart, Clock, ArrowRight, BookOpen } from 'lucide-react'

export default function ResourcesPage() {
  const [activeTopic, setActiveTopic] = useState('')
  const [search, setSearch] = useState('')

  const filtered = promos.filter((p) => {
    const matchTopic = !activeTopic || p.topic === activeTopic
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.summary.toLowerCase().includes(search.toLowerCase())
    return matchTopic && matchSearch
  })

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <div className="pt-24 pb-12 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Free Knowledge</p>
          <h1 className="font-display font-extrabold text-dark text-4xl mb-3">Study Abroad Guide</h1>
          <p className="text-slate max-w-xl mx-auto">Expert tips, visa guides and country information from Nepal's top consultancies — completely free.</p>
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
            <input type="text" placeholder="Search guides..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Topic filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button onClick={() => setActiveTopic('')} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${!activeTopic ? 'bg-primary text-white border-primary' : 'border-border text-slate hover:border-primary hover:text-primary'}`}>
            <BookOpen className="w-3.5 h-3.5" /> All Topics
          </button>
          {promoTopics.map((t) => (
            <button key={t.id} onClick={() => setActiveTopic(activeTopic === t.id ? '' : t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${activeTopic === t.id ? 'bg-primary text-white border-primary' : 'border-border text-slate hover:border-primary hover:text-primary'}`}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Featured — first promo large */}
        {filtered.length > 0 && !search && !activeTopic && (
          <Link href={`/resources/${filtered[0].id}`} className="group block mb-10">
            <div className="relative rounded-3xl overflow-hidden h-72">
              <img src={filtered[0].thumbnail} alt={filtered[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: filtered[0].consultancyColor }}>{filtered[0].topicLabel}</span>
                  <span className="text-white/50 text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {filtered[0].readTime} read</span>
                </div>
                <h2 className="font-display font-extrabold text-white text-2xl mb-2">{filtered[0].title}</h2>
                <p className="text-white/70 text-sm mb-4">{filtered[0].summary}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: filtered[0].consultancyColor }}>{filtered[0].consultancyLogo}</div>
                    <span className="text-white/70 text-xs">{filtered[0].consultancy}</span>
                  </div>
                  <span className="text-white/40 text-xs flex items-center gap-1"><Eye className="w-3 h-3" /> {filtered[0].views} views</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(search || activeTopic ? filtered : filtered.slice(1)).map((p) => (
            <Link key={p.id} href={`/resources/${p.id}`} className="group bg-white border border-border rounded-2xl overflow-hidden card-hover block">
              <div className="relative h-44 overflow-hidden">
                <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: p.consultancyColor }}>{p.topicLabel}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-bold text-dark text-base mb-2 leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-slate text-sm mb-4 line-clamp-2">{p.summary}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold" style={{ background: p.consultancyColor }}>{p.consultancyLogo}</div>
                    <span className="text-xs text-slate truncate max-w-[120px]">{p.consultancy}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{p.views}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{p.likes}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="font-display font-bold text-dark text-lg mb-2">No guides found</h3>
            <p className="text-slate text-sm">Try a different topic or search term</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
