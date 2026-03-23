'use client'
import { useState } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { universities, counsellors } from '../../data'
import Link from 'next/link'
import { ChevronLeft, MapPin, Trophy, Calendar, Globe, MessageCircle, X, CheckCircle2, DollarSign, Languages, BookOpen } from 'lucide-react'

export default function UniversityDetail({ params }: { params: { id: string } }) {
  const university = universities.find((u) => u.id === Number(params.id)) || universities[0]
  const relatedCounsellors = counsellors.filter((c) => c.countries.some((cn) => university.country.includes(cn) || cn.includes(university.country.split(' ')[0]))).slice(0, 3)
  const relatedUniversities = universities.filter((u) => u.id !== university.id && u.country === university.country).slice(0, 3)
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', course: '' })

  const formatTuition = () => {
    if (university.tuitionMin === 0) return 'Free (semester fee only ~€350)'
    if (university.tuitionMin === university.tuitionMax) return `${university.currency} ${university.tuitionMin.toLocaleString()}/year`
    return `${university.currency} ${university.tuitionMin.toLocaleString()} – ${university.tuitionMax.toLocaleString()}/year`
  }

  const handleConnect = () => {
    if (!form.name || !form.course) return
    setSubmitted(true)
    setTimeout(() => {
      const msg = encodeURIComponent(`Hi, I am ${form.name}. I am interested in studying ${form.course} at ${university.name}, ${university.country}. I found this on CounselNepal.`)
      window.open(`https://wa.me/9779841234567?text=${msg}`, '_blank')
      setShowModal(false)
      setSubmitted(false)
      setForm({ name: '', course: '' })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/universities" className="inline-flex items-center gap-1 text-slate text-sm mb-6 hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to universities
        </Link>

        {/* Hero */}
        <div className="relative h-64 rounded-3xl overflow-hidden mb-8">
          <img src={university.image} alt={university.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{university.flag}</span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">#{university.ranking} World Ranking</span>
              {university.scholarship && <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Scholarship Available</span>}
            </div>
            <h1 className="font-display font-extrabold text-white text-3xl">{university.name}</h1>
            <p className="text-white/70 text-sm flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5" />{university.location} · {university.type} · Est. {university.established}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white border border-border rounded-2xl p-6">
              <h2 className="font-display font-bold text-dark text-lg mb-3">About</h2>
              <p className="text-slate leading-relaxed">{university.about}</p>
            </div>

            {/* Key info grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: DollarSign, label: 'Tuition Fee', value: formatTuition(), color: 'text-green-600 bg-green-100' },
                { icon: Languages, label: 'IELTS Required', value: university.ieltsOverall === 0 ? 'Not Required' : `Min ${university.ieltsOverall} overall (${university.ieltsMin} per band)`, color: 'text-primary bg-primary/10' },
                { icon: Globe, label: 'Country', value: university.country, color: 'text-violet-600 bg-violet-100' },
                { icon: Trophy, label: 'World Ranking', value: `#${university.ranking}`, color: 'text-amber-600 bg-amber-100' },
                { icon: BookOpen, label: 'Type', value: university.type + ' University', color: 'text-cyan bg-cyan/10' },
                { icon: Calendar, label: 'Established', value: university.established, color: 'text-slate bg-surface' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="bg-white border border-border rounded-xl p-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${color}`}><Icon className="w-4 h-4" /></div>
                  <p className="text-xs text-slate mb-1">{label}</p>
                  <p className="text-sm font-semibold text-dark">{value}</p>
                </div>
              ))}
            </div>

            {/* Application deadlines */}
            <div className="bg-white border border-border rounded-2xl p-6">
              <h2 className="font-display font-bold text-dark text-lg mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> Application Deadlines</h2>
              <div className="space-y-2">
                {university.deadlines.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-slate text-sm">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular courses */}
            <div className="bg-white border border-border rounded-2xl p-6">
              <h2 className="font-display font-bold text-dark text-lg mb-4">Popular Courses</h2>
              <div className="flex flex-wrap gap-2">
                {university.popularCourses.map((c) => (
                  <span key={c} className="px-3 py-1.5 bg-primary/8 text-primary text-sm font-medium rounded-full">{c}</span>
                ))}
              </div>
            </div>

            {/* Scholarship */}
            {university.scholarship && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h2 className="font-display font-bold text-dark text-lg mb-3 flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-500" /> Scholarship Available</h2>
                <p className="font-semibold text-dark mb-1">{university.scholarshipName}</p>
                <p className="text-amber-700 text-sm font-medium">{university.scholarshipAmount}</p>
                <p className="text-slate text-sm mt-2">Contact a counsellor to get help applying for this scholarship.</p>
              </div>
            )}

            {/* Related universities */}
            {relatedUniversities.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-dark text-lg mb-4">More Universities in {university.country}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedUniversities.map((u) => (
                    <Link key={u.id} href={`/universities/${u.id}`} className="group bg-white border border-border rounded-xl overflow-hidden card-hover block">
                      <div className="h-28 overflow-hidden relative">
                        <img src={u.image} alt={u.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-2 left-2 bg-dark/60 text-white text-xs font-bold px-2 py-0.5 rounded-full">#{u.ranking}</div>
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-dark text-xs group-hover:text-primary transition-colors leading-snug">{u.name}</p>
                        <p className="text-slate text-xs mt-0.5">{u.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* CTA */}
            <div className="bg-white border-2 border-primary/20 rounded-2xl p-5 sticky top-24">
              <h3 className="font-display font-bold text-dark text-base mb-2">Interested in {university.name}?</h3>
              <p className="text-slate text-sm mb-4">Talk to a verified counsellor who specializes in {university.country} admissions.</p>
              <button onClick={() => setShowModal(true)} className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-[#1ea855] transition-colors text-sm mb-2">
                <MessageCircle className="w-4 h-4" /> Connect via WhatsApp
              </button>
              <Link href="/counsellors" className="block text-center text-sm text-primary font-medium hover:underline">Browse all counsellors →</Link>
            </div>

            {/* Counsellors */}
            {relatedCounsellors.length > 0 && (
              <div className="bg-white border border-border rounded-2xl p-5">
                <h3 className="font-display font-bold text-dark text-sm mb-4">{university.country} Specialists</h3>
                <div className="space-y-3">
                  {relatedCounsellors.map((c) => (
                    <Link key={c.id} href={`/counsellors/${c.id}`} className="flex items-center gap-3 group">
                      <img src={c.photo} alt={c.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors truncate">{c.name}</p>
                        <p className="text-xs text-slate truncate">{c.consultancy}</p>
                        <p className="text-xs text-slate">{c.experience}y exp · ⭐ {c.rating}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick facts */}
            <div className="bg-surface border border-border rounded-2xl p-5">
              <h3 className="font-display font-bold text-dark text-sm mb-3">Quick Facts</h3>
              <div className="space-y-2 text-xs text-slate">
                <div className="flex justify-between"><span>Website</span><a href={`https://${university.website}`} target="_blank" rel="noopener" className="text-primary font-medium hover:underline">{university.website}</a></div>
                <div className="flex justify-between"><span>Country</span><span className="text-dark font-medium">{university.flag} {university.country}</span></div>
                <div className="flex justify-between"><span>Ranking</span><span className="text-dark font-medium">#{university.ranking} globally</span></div>
                <div className="flex justify-between"><span>University type</span><span className="text-dark font-medium">{university.type}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center"><X className="w-4 h-4 text-slate" /></button>
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-display font-bold text-dark text-xl mb-2">Opening WhatsApp!</h3>
              </div>
            ) : (
              <>
                <h3 className="font-display font-bold text-dark text-xl mb-2">Connect with a Counsellor</h3>
                <p className="text-slate text-sm mb-2">Interested in: <strong>{university.name}</strong></p>
                <p className="text-slate text-xs mb-6">Your details will be shared with a {university.country} specialist.</p>
                <div className="space-y-4 mb-5">
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Your Name *</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Course You Want *</label><select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white"><option value="">Select course</option>{university.popularCourses.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                </div>
                <button onClick={handleConnect} disabled={!form.name || !form.course} className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl hover:bg-[#1ea855] transition-colors flex items-center justify-center gap-2 disabled:opacity-40">
                  <MessageCircle className="w-5 h-5" /> Submit & Open WhatsApp
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
