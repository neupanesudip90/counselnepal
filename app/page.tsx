'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CounsellorCard from '../components/CounsellorCard'
import { countries, consultancies, counsellors, successStories, events } from './data'
import { ArrowRight, Star, BadgeCheck, Search, ChevronLeft, ChevronRight, TrendingUp, Shield, Zap, Play, Calendar, MapPin, Users, X, Quote } from 'lucide-react'

const heroBgs = [
  { bg: 'from-blue-950 via-blue-900 to-slate-900', accent: '#2563EB' },
  { bg: 'from-cyan-950 via-teal-900 to-slate-900', accent: '#06B6D4' },
  { bg: 'from-violet-950 via-purple-900 to-slate-900', accent: '#7C3AED' },
]

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [playingVideo, setPlayingVideo] = useState<null | typeof successStories[0]>(null)
  const heroConsultancies = consultancies.filter((c) => c.heroBanner)
  const featuredConsultancies = consultancies.filter((c) => c.featured)
  const videoStories = successStories.filter((s) => s.type === 'video')
  const textStories = successStories.filter((s) => s.type === 'text')

  const goTo = (i: number) => {
    setAnimating(true)
    setTimeout(() => { setHeroIndex(i); setAnimating(false) }, 350)
  }

  useEffect(() => {
    const t = setInterval(() => goTo((heroIndex + 1) % heroConsultancies.length), 5000)
    return () => clearInterval(t)
  }, [heroIndex, heroConsultancies.length])

  useEffect(() => {
    const t = setInterval(() => setCardIndex((i) => (i + 1) % featuredConsultancies.length), 3000)
    return () => clearInterval(t)
  }, [featuredConsultancies.length])

  const hero = heroConsultancies[heroIndex]
  const { bg, accent } = heroBgs[heroIndex % heroBgs.length]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── FULL SCREEN HERO BANNER CAROUSEL ── */}
      <section className={`relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br ${bg} transition-colors duration-700`}>
        <div className="absolute inset-0 dots-pattern opacity-10" />
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-3xl opacity-20 transition-all duration-1000" style={{ background: accent }} />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 transition-all duration-1000" style={{ background: accent }} />

        {/* Slide content */}
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-8 w-full pt-24 pb-28 transition-all duration-350 ${animating ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              {/* Consultancy badge */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg" style={{ background: hero?.color }}>{hero?.logo}</div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                  <span className="text-white/90 text-sm font-semibold">{hero?.name}</span>
                  {hero?.verified && <BadgeCheck className="w-4 h-4 text-cyan-400" />}
                </div>
              </div>

              {/* Big headline — different per slide */}
              <h1 className="font-display font-extrabold text-white leading-[1.05] mb-5" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
                {heroIndex === 0 && <><span style={{ color: accent, filter: 'brightness(1.5)' }}>Australia & Canada</span><br />Your Dream,<br />Our Expertise</>}
                {heroIndex === 1 && <>USA & Canada<br /><span style={{ color: accent, filter: 'brightness(1.5)' }}>Scholarships</span><br />Within Reach</>}
                {heroIndex === 2 && <>Japan, Korea<br />& Germany —<br /><span style={{ color: accent, filter: 'brightness(1.5)' }}>Asia Awaits You</span></>}
              </h1>

              <p className="text-white/60 text-lg max-w-lg mb-3 leading-relaxed">
                {hero?.tagline}
              </p>
              <p className="text-white/40 text-sm max-w-md mb-10 leading-relaxed">
                {heroIndex === 0 && 'Connect with verified counsellors specializing in Australian and Canadian university admissions, PR pathways and scholarships.'}
                {heroIndex === 1 && 'Expert guidance for top US and Canadian universities. Our counsellors have placed 300+ students with scholarships worth millions.'}
                {heroIndex === 2 && 'Specialized in Japan language schools, Korean universities and German free education. Your Asian dream starts here.'}
              </p>

              {/* Search */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mb-10">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <select className="w-full pl-11 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-sm appearance-none focus:outline-none focus:border-white/40 transition-colors">
                    <option value="" className="bg-slate-900">Select destination country</option>
                    {countries.map((c) => <option key={c.code} value={c.name} className="bg-slate-900">{c.flag} {c.name} — {c.counsellors} counsellors</option>)}
                  </select>
                </div>
                <Link href="/counsellors" className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity shadow-lg" style={{ background: hero?.color }}>
                  Find Counsellors <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                {[{ val: hero?.students + '+', label: 'Students placed' }, { val: hero?.rating + '★', label: 'Rating' }, { val: hero?.counsellors + '', label: 'Counsellors' }].map(({ val, label }) => (
                  <div key={label} className="border-l-2 border-white/20 pl-4">
                    <p className="font-display font-extrabold text-white text-2xl">{val}</p>
                    <p className="text-white/40 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — countries this consultancy covers */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {hero?.countries.map((cn, i) => {
                const country = countries.find((c) => c.name === cn || c.name.includes(cn))
                return (
                  <div key={cn} className={`relative rounded-2xl overflow-hidden h-40 group cursor-pointer ${i === 0 ? 'col-span-2' : ''}`}>
                    {country?.image && <img src={country.image} alt={cn} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white font-display font-bold text-lg">{cn}</p>
                      <p className="text-white/60 text-xs">{country?.counsellors} counsellors</p>
                    </div>
                    <Link href={`/counsellors?country=${cn}`} className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Explore →</Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <button onClick={() => goTo((heroIndex - 1 + heroConsultancies.length) % heroConsultancies.length)} className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => goTo((heroIndex + 1) % heroConsultancies.length)} className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          {heroConsultancies.map((c, i) => (
            <button key={i} onClick={() => goTo(i)} className="flex flex-col items-center gap-2 group">
              <span className={`text-xs font-bold transition-all ${i === heroIndex ? 'text-white' : 'text-white/30'}`}>{c.logo}</span>
              <div className="h-1 rounded-full transition-all duration-500" style={i === heroIndex ? { width: '2.5rem', background: hero?.color } : { width: '0.75rem', background: 'rgba(255,255,255,0.2)' }} />
            </button>
          ))}
        </div>

        {/* Slide number */}
        <div className="absolute top-24 right-6 text-white/30 text-xs font-mono">
          {String(heroIndex + 1).padStart(2, '0')} / {String(heroConsultancies.length).padStart(2, '0')}
        </div>
      </section>

      {/* ── FEATURED CONSULTANCY CAROUSEL ── */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">Featured Partners</p>
              <h2 className="font-display font-bold text-dark text-2xl">Top Consultancies</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <button onClick={() => setCardIndex((i) => (i - 1 + featuredConsultancies.length) % featuredConsultancies.length)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                <button onClick={() => setCardIndex((i) => (i + 1) % featuredConsultancies.length)} className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-blue-700 transition-colors"><ChevronRight className="w-4 h-4" /></button>
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

      {/* ── COUNTRY SELECTOR — bigger with images ── */}
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
                  <h3 className="font-display font-bold text-white text-base leading-tight">{c.name}</h3>
                  <p className="text-white/60 text-xs mt-0.5">{c.counsellors} counsellors</p>
                  <p className="text-white/40 text-xs mt-1 hidden group-hover:block transition-all">{c.desc}</p>
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all">
                    <span className="text-xs text-white bg-primary px-2.5 py-1 rounded-full font-medium">Explore →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES — Video + Text ── */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-cyan text-xs font-semibold uppercase tracking-widest mb-2">Real Stories</p>
            <h2 className="font-display font-bold text-white text-3xl">Students Who Made It</h2>
            <p className="text-white/40 text-sm mt-2">Watch their journey or read their experience</p>
          </div>

          {/* Video stories */}
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5 flex items-center gap-2"><Play className="w-3.5 h-3.5" /> Video Stories</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {videoStories.map((s) => (
              <div key={s.id} className="group cursor-pointer" onClick={() => setPlayingVideo(s)}>
                <div className="relative rounded-2xl overflow-hidden mb-4 h-48">
                  <img src={s.thumbnail} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-dark/50 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">{s.country}</div>
                </div>
                <h3 className="font-display font-semibold text-white">{s.name}</h3>
                <p className="text-cyan text-xs mb-1">{s.university} · {s.course}</p>
                <p className="text-white/40 text-xs">via {s.counsellor}</p>
                <p className="text-white/60 text-sm mt-2 italic line-clamp-2">"{s.quote}"</p>
              </div>
            ))}
          </div>

          {/* Text stories */}
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-5 flex items-center gap-2"><Quote className="w-3.5 h-3.5" /> Written Testimonials</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {textStories.map((s) => (
              <div key={s.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <Quote className="w-5 h-5 text-cyan mb-4 opacity-50" />
                <p className="text-white/75 text-sm leading-relaxed mb-5 italic">"{s.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img src={s.thumbnail} alt={s.name} className="w-10 h-10 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  <div>
                    <p className="text-white font-semibold text-sm">{s.name}</p>
                    <p className="text-white/40 text-xs">{s.university}</p>
                    <p className="text-cyan text-xs">{s.country} · via {s.counsellor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">What's On</p>
              <h2 className="font-display font-bold text-dark text-2xl">Upcoming Events</h2>
            </div>
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
                  <h3 className="font-display font-bold text-dark text-sm mb-2 leading-tight">{e.title}</h3>
                  <p className="text-xs text-slate mb-3">{e.consultancy}</p>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate"><Calendar className="w-3.5 h-3.5 text-primary" />{new Date(e.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} · {e.time}</div>
                    <div className="flex items-center gap-2 text-xs text-slate"><MapPin className="w-3.5 h-3.5 text-primary" />{e.location}</div>
                    <div className="flex items-center gap-2 text-xs text-slate"><Users className="w-3.5 h-3.5 text-primary" />{e.registered}/{e.seats} registered</div>
                  </div>
                  <div className="w-full bg-border rounded-full h-1.5 mb-4">
                    <div className="h-1.5 rounded-full" style={{ width: `${(e.registered / e.seats) * 100}%`, background: e.color }} />
                  </div>
                  <Link href="/events" className="block text-center text-sm font-semibold text-primary border border-primary/20 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">Register Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="font-display font-bold text-dark text-3xl">How CounselNepal Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            {[
              { step: '01', icon: Search, title: 'Choose Your Destination', desc: 'Select the country where you want to study and explore verified counsellors specialized in that region.' },
              { step: '02', icon: Shield, title: 'View Counsellor Profiles', desc: 'Login to access detailed profiles, experience, success stories, and student reviews before connecting.' },
              { step: '03', icon: Zap, title: 'Connect via WhatsApp', desc: 'Submit your details and instantly connect with your chosen counsellor through WhatsApp.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="text-center relative">
                <div className="w-20 h-20 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-5 relative">
                  <Icon className="w-8 h-8 text-primary" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"><span className="text-white text-xs font-bold">{step.slice(1)}</span></div>
                </div>
                <h3 className="font-display font-bold text-dark text-lg mb-2">{title}</h3>
                <p className="text-slate text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/8 px-3 py-1.5 rounded-full mb-6">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-semibold">1,000+ students connected this year</span>
          </div>
          <h2 className="font-display font-extrabold text-dark text-4xl mb-4">Ready to Start Your<br /><span className="text-primary">International Journey?</span></h2>
          <p className="text-slate mb-8">Join thousands of Nepali students who found their path through CounselNepal.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center">Get Started Free <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/counsellors" className="border border-border text-dark px-8 py-3.5 rounded-xl font-semibold hover:border-primary hover:text-primary transition-colors">Browse Counsellors</Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* VIDEO MODAL */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm">
          <div className="relative bg-dark rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl">
            <button onClick={() => setPlayingVideo(null)} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><X className="w-4 h-4 text-white" /></button>
            <video src={playingVideo.video!} controls autoPlay className="w-full aspect-video" />
            <div className="p-5">
              <h3 className="font-display font-bold text-white text-lg">{playingVideo.name}</h3>
              <p className="text-cyan text-sm">{playingVideo.university} · {playingVideo.country}</p>
              <p className="text-white/50 text-sm mt-2 italic">"{playingVideo.quote}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
