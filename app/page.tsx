'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { countries, consultancies, counsellors, successStories, events } from './data'
import {
  ArrowRight, Star, BadgeCheck, Search, ChevronLeft, ChevronRight,
  TrendingUp, Play, Calendar, MapPin, Users, X, Heart, MessageCircle,
  Send, ChevronUp, ChevronDown, GraduationCap, Briefcase, Shield, Quote
} from 'lucide-react'

const reelComments = [
  { id: 1, user: 'Ram Sharma', text: 'Inspiring! Australia dream 🇦🇺', time: '2h' },
  { id: 2, user: 'Sita KC', text: 'Which consultancy bro?', time: '1h' },
  { id: 3, user: 'Bikash T.', text: 'Congratulations! 🎉', time: '45m' },
  { id: 4, user: 'Priya M.', text: 'IELTS score kati thiyo?', time: '30m' },
  { id: 5, user: 'Anil R.', text: 'Motivation milyo! 🙏', time: '15m' },
]

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [reelsOpen, setReelsOpen] = useState(false)
  const [reelIndex, setReelIndex] = useState(0)
  const [reelLikes, setReelLikes] = useState<Record<number, boolean>>({})
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(reelComments)

  const heroConsultancies = consultancies.filter((c) => c.heroBanner)
  const featuredConsultancies = consultancies.filter((c) => c.featured)
  const videoStories = successStories.filter((s) => s.type === 'video')
  const heroBgs = ['from-blue-950 via-blue-900 to-slate-900', 'from-cyan-950 via-teal-900 to-slate-900', 'from-violet-950 via-purple-900 to-slate-900']

  const goTo = (i: number) => { setAnimating(true); setTimeout(() => { setHeroIndex(i); setAnimating(false) }, 350) }
  useEffect(() => { const t = setInterval(() => goTo((heroIndex + 1) % heroConsultancies.length), 5000); return () => clearInterval(t) }, [heroIndex])
  useEffect(() => { const t = setInterval(() => setCardIndex(i => (i + 1) % featuredConsultancies.length), 3000); return () => clearInterval(t) }, [])

  const hero = heroConsultancies[heroIndex]
  const sendComment = () => { if (!comment.trim()) return; setComments([...comments, { id: Date.now(), user: 'You', text: comment, time: 'now' }]); setComment('') }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className={`relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br ${heroBgs[heroIndex % heroBgs.length]} transition-colors duration-700`}>
        <div className="absolute inset-0 dots-pattern opacity-10" />
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-3xl opacity-20" style={{ background: hero?.color }} />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-10" style={{ background: hero?.color }} />
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-8 w-full pt-24 pb-28 transition-all duration-350 ${animating ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: hero?.color }}>{hero?.logo}</div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                  <span className="text-white/90 text-sm font-semibold">{hero?.name}</span>
                  {hero?.verified && <BadgeCheck className="w-4 h-4 text-cyan-400" />}
                </div>
              </div>
              <h1 className="font-display font-extrabold text-white leading-[1.05] mb-5" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
                {heroIndex === 0 && <><span style={{ color: hero?.color, filter: 'brightness(1.5)' }}>Australia & Canada</span><br />Your Dream,<br />Our Expertise</>}
                {heroIndex === 1 && <>USA & Canada<br /><span style={{ color: hero?.color, filter: 'brightness(1.5)' }}>Scholarships</span><br />Within Reach</>}
                {heroIndex === 2 && <>Japan, Korea & Germany<br /><span style={{ color: hero?.color, filter: 'brightness(1.5)' }}>Asia Awaits You</span></>}
              </h1>
              <p className="text-white/60 text-lg max-w-lg mb-10 leading-relaxed">{hero?.tagline}</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mb-12">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <select className="w-full pl-11 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-sm appearance-none focus:outline-none focus:border-white/40">
                    <option value="" className="bg-slate-900">Select destination country</option>
                    {countries.map((c) => <option key={c.code} value={c.name} className="bg-slate-900">{c.flag} {c.name}</option>)}
                  </select>
                </div>
                <Link href="/counsellors" className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg" style={{ background: hero?.color }}>
                  Find Counsellors <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-8">
                {[{ val: '1,400+', label: 'Students placed' }, { val: '4.8★', label: 'Rating' }, { val: '25+', label: 'Consultancies' }, { val: '8', label: 'Countries' }].map(({ val, label }) => (
                  <div key={label} className="border-l-2 border-white/20 pl-4">
                    <p className="font-display font-extrabold text-white text-2xl">{val}</p>
                    <p className="text-white/40 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {hero?.countries.map((cn: string, i: number) => {
                const country = countries.find((c) => c.name === cn || c.name.includes(cn))
                return (
                  <div key={cn} className={`relative rounded-2xl overflow-hidden h-40 group ${i === 0 ? 'col-span-2' : ''}`}>
                    {country?.image && <img src={country.image} alt={cn} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                    <div className="absolute bottom-4 left-4"><p className="text-white font-display font-bold text-lg">{cn}</p><p className="text-white/60 text-xs">{country?.counsellors} counsellors</p></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <button onClick={() => goTo((heroIndex - 1 + heroConsultancies.length) % heroConsultancies.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20"><ChevronLeft className="w-5 h-5" /></button>
        <button onClick={() => goTo((heroIndex + 1) % heroConsultancies.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20"><ChevronRight className="w-5 h-5" /></button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
          {heroConsultancies.map((c, i) => (
            <button key={i} onClick={() => goTo(i)} className="flex flex-col items-center gap-2">
              <span className={`text-xs font-bold ${i === heroIndex ? 'text-white' : 'text-white/30'}`}>{c.logo}</span>
              <div className="h-1 rounded-full transition-all duration-500" style={i === heroIndex ? { width: '2.5rem', background: hero?.color } : { width: '0.75rem', background: 'rgba(255,255,255,0.2)' }} />
            </button>
          ))}
        </div>
        <div className="absolute top-24 right-6 text-white/30 text-xs font-mono">{String(heroIndex + 1).padStart(2, '0')} / {String(heroConsultancies.length).padStart(2, '0')}</div>
      </section>

      {/* ── 3 JOURNEY CIRCLE CARDS ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
        {/* Bg effects */}
        <div className="absolute inset-0 dots-pattern opacity-10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: '#2563EB' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: '#7C3AED' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">Start Your Journey</p>
            <h2 className="font-display font-extrabold text-white text-4xl sm:text-5xl mb-4">
              What Are You Looking For?
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">Select your goal — we'll guide you step by step through everything you need to know</p>
          </div>

          {/* 3 Circle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

            {/* Circle 1 — Study Abroad */}
            <Link href="/journey/study" className="group relative flex flex-col items-center">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700" style={{ background: '#2563EB', transform: 'scale(0.8)' }} />
              {/* Circle */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full flex flex-col items-center justify-center text-center p-8 transition-all duration-500 group-hover:scale-105 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #2563EB 50%, #3b82f6 100%)',
                  boxShadow: '0 0 0 4px rgba(37,99,235,0.2), 0 0 0 8px rgba(37,99,235,0.1), 0 32px 80px rgba(37,99,235,0.4)',
                }}>
                {/* Inner ring decoration */}
                <div className="absolute inset-3 rounded-full border border-white/10" />
                <div className="absolute inset-6 rounded-full border border-white/5" />
                <GraduationCap className="w-14 h-14 text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-display font-extrabold text-white text-xl leading-tight mb-2">Study<br />Abroad</h3>
                <p className="text-blue-200 text-xs leading-relaxed">Find universities, courses & scholarships</p>
              </div>
              {/* Label below */}
              <div className="mt-6 flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                Start Study Journey <ArrowRight className="w-4 h-4" />
              </div>
              {/* Stats */}
              <div className="mt-3 flex gap-4 text-center">
                <div><p className="text-white font-bold text-sm">1,200+</p><p className="text-white/40 text-xs">Students</p></div>
                <div><p className="text-white font-bold text-sm">8</p><p className="text-white/40 text-xs">Countries</p></div>
                <div><p className="text-white font-bold text-sm">50+</p><p className="text-white/40 text-xs">Universities</p></div>
              </div>
            </Link>

            {/* Center decoration — connecting element */}
            <div className="hidden md:flex flex-col items-center justify-center gap-4 py-8">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-white/40 text-xs font-bold">OR</span>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </div>

            {/* Circle 2 — Work Abroad */}
            <Link href="/journey/work" className="group relative flex flex-col items-center">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700" style={{ background: '#059669', transform: 'scale(0.8)' }} />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full flex flex-col items-center justify-center text-center p-8 transition-all duration-500 group-hover:scale-105 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)',
                  boxShadow: '0 0 0 4px rgba(5,150,105,0.2), 0 0 0 8px rgba(5,150,105,0.1), 0 32px 80px rgba(5,150,105,0.4)',
                }}>
                <div className="absolute inset-3 rounded-full border border-white/10" />
                <div className="absolute inset-6 rounded-full border border-white/5" />
                <Briefcase className="w-14 h-14 text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-display font-extrabold text-white text-xl leading-tight mb-2">Work<br />Abroad</h3>
                <p className="text-green-200 text-xs leading-relaxed">Find jobs, visas & work opportunities</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-green-400 font-semibold text-sm group-hover:gap-3 transition-all">
                Start Work Journey <ArrowRight className="w-4 h-4" />
              </div>
              <div className="mt-3 flex gap-4 text-center">
                <div><p className="text-white font-bold text-sm">200+</p><p className="text-white/40 text-xs">Placed</p></div>
                <div><p className="text-white font-bold text-sm">6</p><p className="text-white/40 text-xs">Countries</p></div>
                <div><p className="text-white font-bold text-sm">20+</p><p className="text-white/40 text-xs">Job Types</p></div>
              </div>
            </Link>
          </div>

          {/* Circle 3 — Visa Risk — centered below */}
          <div className="flex justify-center mt-12">
            <Link href="/journey/visa-risk" className="group relative flex flex-col items-center">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-700" style={{ background: '#DC2626', transform: 'scale(0.8)' }} />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full flex flex-col items-center justify-center text-center p-8 transition-all duration-500 group-hover:scale-105 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #b91c1c 0%, #DC2626 50%, #ef4444 100%)',
                  boxShadow: '0 0 0 4px rgba(220,38,38,0.2), 0 0 0 8px rgba(220,38,38,0.1), 0 32px 80px rgba(220,38,38,0.35)',
                }}>
                <div className="absolute inset-3 rounded-full border border-white/10" />
                <div className="absolute inset-6 rounded-full border border-white/5" />
                <Shield className="w-12 h-12 text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-display font-extrabold text-white text-lg leading-tight mb-1">Visa Risk<br />Guide</h3>
                <p className="text-red-200 text-xs leading-relaxed">Know risks before applying</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-red-400 font-semibold text-sm group-hover:gap-3 transition-all">
                Check Visa Risks <ArrowRight className="w-4 h-4" />
              </div>
              <p className="mt-2 text-white/30 text-xs">Avoid rejection — understand what embassy looks for</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED CONSULTANCIES ── */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">Featured Partners</p>
              <h2 className="font-display font-bold text-dark text-2xl">Top Consultancies</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <button onClick={() => setCardIndex(i => (i - 1 + featuredConsultancies.length) % featuredConsultancies.length)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={() => setCardIndex(i => (i + 1) % featuredConsultancies.length)} className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-blue-700 transition-colors"><ChevronRight className="w-4 h-4" /></button>
              </div>
              <Link href="/consultancies" className="text-sm text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredConsultancies.map((c, i) => {
              const isActive = i === cardIndex % featuredConsultancies.length
              return (
                <div key={c.id} className={`bg-white rounded-2xl p-6 border-2 transition-all duration-500 card-hover ${isActive ? 'border-primary shadow-lg shadow-primary/10' : 'border-border'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: c.color }}>{c.logo}</div>
                    {c.verified && <span className="flex items-center gap-1 text-xs text-primary font-medium bg-primary/8 px-2 py-0.5 rounded-full"><BadgeCheck className="w-3 h-3" /> Verified</span>}
                  </div>
                  <h3 className="font-display font-bold text-dark mb-1">{c.name}</h3>
                  <p className="text-slate text-xs mb-3">{c.location} · {c.counsellors} counsellors</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">{[1,2,3,4,5].map((s) => <Star key={s} className={`w-3 h-3 ${s <= Math.floor(c.rating) ? 'text-amber-400 fill-amber-400' : 'text-border'}`} />)}</div>
                    <span className="text-xs text-slate">{c.rating} ({c.reviews})</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">{c.countries.map((cn) => <span key={cn} className="px-2 py-0.5 bg-surface text-slate text-xs rounded-full">{cn}</span>)}</div>
                  <Link href={`/consultancies/${c.id}`} className="block text-center text-sm font-semibold text-primary border border-primary/20 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">View Profile</Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── COUNTRY CARDS ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Destinations</p>
            <h2 className="font-display font-bold text-dark text-3xl">Where Do You Want to Study?</h2>
            <p className="text-slate mt-2">Select a country to find specialized counsellors</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {countries.map((c) => (
              <Link key={c.code} href={`/counsellors?country=${c.name}`} className="group relative overflow-hidden rounded-2xl card-hover h-56 block">
                <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="text-3xl mb-2">{c.flag}</div>
                  <h3 className="font-display font-bold text-white text-base">{c.name}</h3>
                  <p className="text-white/60 text-xs mt-0.5">{c.counsellors} counsellors</p>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all"><span className="text-xs text-white bg-primary px-2.5 py-1 rounded-full font-medium">Explore →</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES REELS ── */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-cyan text-xs font-semibold uppercase tracking-widest mb-2">Real Stories</p>
            <h2 className="font-display font-bold text-white text-3xl">Students Who Made It</h2>
            <p className="text-white/40 text-sm mt-2">Click to watch — scroll like reels, comment like social media</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoStories.map((s, i) => (
              <Link key={s.id} href="/reels" className="group cursor-pointer block">
                <div className="relative rounded-2xl overflow-hidden h-72">
                  <img src={s.thumbnail} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">{s.country}</div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-display font-bold">{s.name}</p>
                    <p className="text-cyan text-xs">{s.university}</p>
                    <p className="text-white/60 text-xs mt-1 line-clamp-1 italic">"{s.quote}"</p>
                    <div className="flex items-center gap-4 mt-2 text-white/60 text-xs">
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {120 + i * 37}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {comments.length}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/reels" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all">Watch All Success Stories →</Link>
          </div>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div><p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">What's On</p><h2 className="font-display font-bold text-dark text-2xl">Upcoming Events</h2></div>
            <Link href="/events" className="text-sm text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {events.slice(0, 3).map((e) => (
              <div key={e.id} className="bg-white rounded-2xl border border-border overflow-hidden card-hover group">
                <div className="relative h-40 overflow-hidden">
                  <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: e.color }}>{e.type}</span>
                    {e.free && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500 text-white">Free</span>}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-dark text-sm mb-2">{e.title}</h3>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate"><Calendar className="w-3.5 h-3.5 text-primary" />{new Date(e.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} · {e.time}</div>
                    <div className="flex items-center gap-2 text-xs text-slate"><MapPin className="w-3.5 h-3.5 text-primary" />{e.location}</div>
                    <div className="flex items-center gap-2 text-xs text-slate"><Users className="w-3.5 h-3.5 text-primary" />{e.registered}/{e.seats} registered</div>
                  </div>
                  <div className="w-full bg-border rounded-full h-1.5 mb-4"><div className="h-1.5 rounded-full" style={{ width: `${(e.registered / e.seats) * 100}%`, background: e.color }} /></div>
                  <Link href="/events" className="block text-center text-sm font-semibold text-primary border border-primary/20 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">Register Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/8 px-3 py-1.5 rounded-full mb-6"><TrendingUp className="w-3.5 h-3.5 text-primary" /><span className="text-primary text-xs font-semibold">1,400+ students connected this year</span></div>
          <h2 className="font-display font-extrabold text-dark text-4xl mb-4">Ready to Start Your<br /><span className="text-primary">International Journey?</span></h2>
          <p className="text-slate mb-8">Join thousands of Nepali students who found their path through CounselNepal.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center">Get Started Free <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/counsellors" className="border border-border text-dark px-8 py-3.5 rounded-xl font-semibold hover:border-primary hover:text-primary transition-colors">Browse Counsellors</Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── REELS MODAL ── */}
      {reelsOpen && (
        <div className="fixed inset-0 z-50 bg-black flex">
          <button onClick={() => setReelsOpen(false)} className="absolute top-4 left-4 z-50 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><X className="w-5 h-5" /></button>
          <div className="flex-1 flex flex-col items-center justify-center relative bg-black">
            <button onClick={() => setReelIndex(i => Math.max(0, i - 1))} disabled={reelIndex === 0} className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/20"><ChevronUp className="w-5 h-5" /></button>
            <div className="relative w-full max-w-sm mx-auto h-[80vh]">
              <img src={videoStories[reelIndex]?.thumbnail} alt="" className="w-full h-full object-cover rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center"><Play className="w-6 h-6 text-white fill-white ml-0.5" /></div>
              </div>
              <div className="absolute bottom-6 left-4 right-16">
                <p className="text-white font-display font-bold text-lg">{videoStories[reelIndex]?.name}</p>
                <p className="text-cyan text-sm">{videoStories[reelIndex]?.university}</p>
                <p className="text-white/70 text-sm mt-1 italic">"{videoStories[reelIndex]?.quote}"</p>
              </div>
              <div className="absolute right-4 bottom-24 flex flex-col gap-5 items-center">
                <button onClick={() => setReelLikes({ ...reelLikes, [reelIndex]: !reelLikes[reelIndex] })} className="flex flex-col items-center gap-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${reelLikes[reelIndex] ? 'bg-red-500' : 'bg-white/20'} backdrop-blur-sm transition-all`}>
                    <Heart className={`w-5 h-5 ${reelLikes[reelIndex] ? 'text-white fill-white' : 'text-white'}`} />
                  </div>
                  <span className="text-white text-xs">{reelLikes[reelIndex] ? '156' : '155'}</span>
                </button>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"><MessageCircle className="w-5 h-5 text-white" /></div>
                  <span className="text-white text-xs">{comments.length}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full font-mono">{reelIndex + 1} / {videoStories.length}</div>
            </div>
            <button onClick={() => setReelIndex(i => Math.min(videoStories.length - 1, i + 1))} disabled={reelIndex === videoStories.length - 1} className="absolute bottom-8 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/20"><ChevronDown className="w-5 h-5" /></button>
          </div>
          <div className="w-80 bg-white flex-col hidden md:flex">
            <div className="p-4 border-b border-border"><p className="font-display font-bold text-dark">Comments</p><p className="text-slate text-xs">{comments.length} comments</p></div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">{c.user[0]}</div>
                  <div className="flex-1">
                    <div className="bg-surface rounded-xl px-3 py-2"><p className="text-xs font-bold text-dark">{c.user}</p><p className="text-sm text-dark mt-0.5">{c.text}</p></div>
                    <p className="text-xs text-slate mt-1 ml-2">{c.time} · Like · Reply</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">Y</div>
                <div className="flex-1 flex items-center gap-2 bg-surface rounded-full px-4 py-2">
                  <input type="text" placeholder="Write a comment..." value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendComment()} className="flex-1 bg-transparent text-sm focus:outline-none text-dark" />
                  <button onClick={sendComment} className="text-primary hover:text-blue-700"><Send className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
