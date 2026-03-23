'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CounsellorCard from '../components/CounsellorCard'
import { countries, consultancies, counsellors, reviews } from './data'
import {
  ArrowRight, Star, BadgeCheck, Search, ChevronLeft, ChevronRight,
  Quote, TrendingUp, Shield, Zap,
} from 'lucide-react'

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [cardIndex, setCardIndex] = useState(0)
  const heroConsultancies = consultancies.slice(0, 3)
  const featuredConsultancies = consultancies.filter((c) => c.featured)

  useEffect(() => {
    const t = setInterval(() => setHeroIndex((i) => (i + 1) % heroConsultancies.length), 4000)
    return () => clearInterval(t)
  }, [heroConsultancies.length])

  useEffect(() => {
    const t = setInterval(() => setCardIndex((i) => (i + 1) % featuredConsultancies.length), 3000)
    return () => clearInterval(t)
  }, [featuredConsultancies.length])

  const hero = heroConsultancies[heroIndex]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO BANNER CAROUSEL */}
      <section className="relative pt-16 min-h-[92vh] flex items-center overflow-hidden geo-bg">
        <div className="absolute inset-0 dots-pattern opacity-40" />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 transition-all duration-1000"
          style={{ background: hero?.color || '#2563EB' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/8 rounded-full mb-6">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold transition-all duration-500"
                  style={{ background: hero?.color }}
                >
                  {hero?.logo}
                </div>
                <span className="text-primary text-xs font-semibold">{hero?.name}</span>
                <BadgeCheck className="w-3.5 h-3.5 text-primary" />
              </div>

              <h1 className="font-display text-5xl lg:text-6xl font-extrabold text-dark leading-tight mb-4">
                Your Future<br />
                <span className="text-primary">Starts With</span><br />
                The Right Guide
              </h1>

              <p className="text-slate text-lg leading-relaxed mb-8 max-w-md">
                Connect with Nepal's most trusted study abroad counsellors. Find verified experts for your dream destination.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
                  <select className="w-full pl-9 pr-4 py-3 border border-border rounded-xl text-sm text-dark bg-white appearance-none focus:outline-none focus:border-primary transition-colors">
                    <option value="">Select destination country</option>
                    {countries.map((c) => (
                      <option key={c.code} value={c.name}>{c.flag} {c.name} — {c.counsellors} counsellors</option>
                    ))}
                  </select>
                </div>
                <Link href="/counsellors" className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center">
                  Find Counsellors <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center gap-6">
                {[{ val: '500+', label: 'Students helped' }, { val: '4.8★', label: 'Average rating' }, { val: '25+', label: 'Consultancies' }].map(({ val, label }) => (
                  <div key={label}>
                    <p className="font-display font-bold text-dark text-xl">{val}</p>
                    <p className="text-slate text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Sliding consultancy cards */}
            <div className="hidden lg:block relative">

              {/* Cards stack */}
              <div className="relative h-80">
                {heroConsultancies.map((c, i) => {
                  const offset = (i - heroIndex + heroConsultancies.length) % heroConsultancies.length
                  const isActive = offset === 0
                  const isNext = offset === 1
                  const isPrev = offset === 2

                  return (
                    <div
                      key={c.id}
                      className="absolute inset-0 glass rounded-3xl p-7 shadow-2xl transition-all duration-700"
                      style={{
                        borderTop: `4px solid ${c.color}`,
                        opacity: isActive ? 1 : isNext ? 0.5 : 0.25,
                        transform: isActive
                          ? 'translateX(0) scale(1)'
                          : isNext
                          ? 'translateX(40px) scale(0.95)'
                          : 'translateX(80px) scale(0.9)',
                        zIndex: isActive ? 3 : isNext ? 2 : 1,
                      }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold"
                          style={{ background: c.color }}
                        >
                          {c.logo}
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-dark">{c.name}</h3>
                          <p className="text-slate text-sm">{c.location}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-xs font-semibold">{c.rating}</span>
                            <span className="text-xs text-slate">({c.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate text-sm italic mb-4">"{c.tagline}"</p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {c.countries.map((cn) => (
                          <span key={cn} className="px-2.5 py-1 bg-surface text-slate text-xs rounded-full border border-border">{cn}</span>
                        ))}
                      </div>

                      <Link
                        href="/counsellors"
                        className="block text-center font-semibold text-sm py-2.5 rounded-xl transition-colors text-white"
                        style={{ background: c.color }}
                      >
                        View Counsellors
                      </Link>
                    </div>
                  )
                })}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-6 px-2">
                <div className="flex gap-2">
                  {heroConsultancies.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${i === heroIndex ? 'w-6 bg-primary' : 'w-1.5 bg-border'}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setHeroIndex((i) => (i - 1 + heroConsultancies.length) % heroConsultancies.length)}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setHeroIndex((i) => (i + 1) % heroConsultancies.length)}
                    className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Verified badge */}
              <div className="absolute -top-4 -right-4 glass rounded-xl p-3 shadow-lg flex items-center gap-2 z-10">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <BadgeCheck className="w-3.5 h-3.5 text-green-600" />
                </div>
                <span className="text-xs font-semibold text-dark">Verified Counsellors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CARD CAROUSEL */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">Featured Partners</p>
              <h2 className="font-display font-bold text-dark text-2xl">Top Consultancies</h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setCardIndex((i) => (i - 1 + featuredConsultancies.length) % featuredConsultancies.length)} className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setCardIndex((i) => (i + 1) % featuredConsultancies.length)} className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
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
                  <Link href="/counsellors" className="block text-center text-sm font-semibold text-primary border border-primary/20 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">View Counsellors</Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* COUNTRY SELECTOR */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-2">Destinations</p>
            <h2 className="font-display font-bold text-dark text-3xl">Where Do You Want to Study?</h2>
            <p className="text-slate mt-2">Select a country to find specialized counsellors</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {countries.map((c) => (
              <Link key={c.code} href={`/counsellors?country=${c.name}`} className="group bg-surface border border-border rounded-2xl p-5 text-center hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all card-hover">
                <div className="text-4xl mb-3">{c.flag}</div>
                <h3 className="font-display font-semibold text-dark text-sm mb-1">{c.name}</h3>
                <p className="text-xs text-slate">{c.counsellors} counsellors</p>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-xs text-primary font-medium">Explore →</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOP COUNSELLORS */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">Our Experts</p>
              <h2 className="font-display font-bold text-dark text-2xl">Top Rated Counsellors</h2>
            </div>
            <Link href="/counsellors" className="text-sm text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {counsellors.slice(0, 3).map((c) => <CounsellorCard key={c.id} counsellor={c} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
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
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{step.slice(1)}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-dark text-lg mb-2">{title}</h3>
                <p className="text-slate text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-cyan text-xs font-semibold uppercase tracking-widest mb-2">Success Stories</p>
            <h2 className="font-display font-bold text-white text-3xl">Students Who Made It</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <Quote className="w-6 h-6 text-cyan mb-4 opacity-60" />
                <p className="text-white/80 text-sm leading-relaxed mb-5">"{r.text}"</p>
                <div className="flex items-center gap-1 mb-4">{[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}</div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{r.student}</p>
                    <p className="text-slate text-xs">{r.university}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-cyan font-medium">{r.country}</p>
                    <p className="text-xs text-slate">via {r.counsellor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/8 px-3 py-1.5 rounded-full mb-6">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-semibold">1,000+ students connected this year</span>
          </div>
          <h2 className="font-display font-extrabold text-dark text-4xl mb-4">Ready to Start Your<br /><span className="text-primary">International Journey?</span></h2>
          <p className="text-slate mb-8">Join thousands of Nepali students who found their path through CounselNepal.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/counsellors" className="border border-border text-dark px-8 py-3.5 rounded-xl font-semibold hover:border-primary hover:text-primary transition-colors">
              Browse Counsellors
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
