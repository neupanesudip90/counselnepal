'use client'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import CounsellorCard from '../../../components/CounsellorCard'
import { counsellors, reviews } from '../../data'
import {
  Star,
  BadgeCheck,
  Globe,
  MessageCircle,
  Phone,
  ChevronLeft,
  X,
  CheckCircle2,
  User,
  BookOpen,
  MapPin,
  ThumbsUp,
} from 'lucide-react'

export default function CounsellorProfile({ params }: { params: { id: string } }) {
  const counsellor = counsellors.find((c) => c.id === Number(params.id)) || counsellors[0]
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', destination: '', course: '' })
  const related = counsellors.filter((c) => c.id !== counsellor.id && c.consultancy === counsellor.consultancy).slice(0, 3)

  const handleSubmit = () => {
    if (!form.name || !form.destination || !form.course) return
    // In real app: save to DB, notify admin, open WhatsApp
    const msg = encodeURIComponent(
      `Hi, I am ${form.name}. I want to study in ${form.destination}. Course: ${form.course}. I found you on CounselNepal.`
    )
    setSubmitted(true)
    setTimeout(() => {
      window.open(`https://wa.me/${counsellor.whatsapp}?text=${msg}`, '_blank')
      setShowModal(false)
      setSubmitted(false)
      setForm({ name: '', destination: '', course: '' })
    }, 1500)
  }

  const counsellorReviews = reviews.filter((r) => r.counsellor === counsellor.name)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <Link href="/counsellors" className="inline-flex items-center gap-1 text-slate text-sm mb-6 hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to counsellors
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main profile */}
          <div className="lg:col-span-2">
            {/* Profile header */}
            <div className="bg-surface rounded-2xl p-6 border border-border mb-6">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="relative flex-shrink-0">
                  <img
                    src={counsellor.photo}
                    alt={counsellor.name}
                    className="w-24 h-24 rounded-2xl object-cover"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement
                      t.style.display = 'none'
                    }}
                  />
                  {counsellor.verified && (
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
                      <BadgeCheck className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h1 className="font-display font-extrabold text-dark text-2xl">{counsellor.name}</h1>
                      <p className="text-slate text-sm">{counsellor.consultancy}</p>
                    </div>
                    {counsellor.verified && (
                      <span className="flex items-center gap-1 bg-primary/8 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                        <BadgeCheck className="w-3 h-3" /> Verified Counsellor
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <strong className="text-dark">{counsellor.rating}</strong> ({counsellor.reviews} reviews)
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {counsellor.students}+ students helped
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {counsellor.experience} years experience
                    </span>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-2">
                    {counsellor.languages.map((l) => (
                      <span key={l} className="flex items-center gap-1 px-2.5 py-1 bg-white border border-border rounded-full text-xs text-slate">
                        <Globe className="w-3 h-3" /> {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-6">
              <h2 className="font-display font-bold text-dark text-lg mb-3">About</h2>
              <p className="text-slate leading-relaxed">{counsellor.bio}</p>
            </div>

            {/* Destinations */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-6">
              <h2 className="font-display font-bold text-dark text-lg mb-4">Specializes In</h2>
              <div className="flex flex-wrap gap-3">
                {counsellor.countries.map((c) => (
                  <div key={c} className="flex items-center gap-2 px-4 py-2 bg-primary/8 rounded-xl">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span className="text-primary font-medium text-sm">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-6">
              <h2 className="font-display font-bold text-dark text-lg mb-5">Student Reviews</h2>

              {counsellorReviews.length > 0 ? (
                <div className="space-y-4">
                  {counsellorReviews.map((r) => (
                    <div key={r.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {r.student[0]}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-dark">{r.student}</p>
                            <p className="text-xs text-slate">{r.university} · {r.country}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-border'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate text-sm mb-3">"{r.text}"</p>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1 text-xs">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${r.willVisit ? 'text-green-500' : 'text-slate'}`} />
                          <span className={r.willVisit ? 'text-green-600 font-medium' : 'text-slate'}>
                            {r.willVisit ? 'Would visit again' : 'Would not visit again'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <ThumbsUp className={`w-3.5 h-3.5 ${r.wasHelpful ? 'text-primary' : 'text-slate'}`} />
                          <span className={r.wasHelpful ? 'text-primary font-medium' : 'text-slate'}>
                            {r.wasHelpful ? 'Found helpful' : 'Not helpful'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate text-sm">No reviews yet for this counsellor.</p>
              )}
            </div>

            {/* More from consultancy */}
            {related.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-dark text-lg mb-4">More from {counsellor.consultancy}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((c) => (
                    <CounsellorCard key={c.id} counsellor={c} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky contact card */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-border rounded-2xl p-6 sticky top-24 shadow-xl shadow-slate/5">
              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border">
                <img src={counsellor.photo} alt="" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-display font-bold text-dark text-sm">{counsellor.name}</p>
                  <p className="text-xs text-slate">{counsellor.consultancy}</p>
                </div>
              </div>

              <p className="text-slate text-sm text-center mb-5">
                Connect with {counsellor.name.split(' ')[0]} to start your study abroad journey
              </p>

              {/* WhatsApp CTA */}
              <button
                onClick={() => setShowModal(true)}
                className="whatsapp-btn relative w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl hover:bg-[#1ea855] transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                Connect via WhatsApp
              </button>

              <button className="w-full border border-border text-dark font-semibold py-3 rounded-xl hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                Call Counsellor
              </button>

              <p className="text-xs text-slate text-center mt-4">
                You'll need to provide brief details before connecting
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── LEAD MODAL ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-up">
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center hover:bg-border transition-colors"
            >
              <X className="w-4 h-4 text-slate" />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-display font-bold text-dark text-xl mb-2">Opening WhatsApp!</h3>
                <p className="text-slate text-sm">Connecting you with {counsellor.name}...</p>
              </div>
            ) : (
              <>
                {/* Counsellor info */}
                <div className="flex items-center gap-3 mb-6">
                  <img src={counsellor.photo} alt="" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h3 className="font-display font-bold text-dark">Connect with {counsellor.name}</h3>
                    <p className="text-xs text-slate">{counsellor.consultancy}</p>
                  </div>
                </div>

                <p className="text-slate text-sm mb-6">
                  Share your details and we'll send them directly to the counsellor before opening WhatsApp.
                </p>

                {/* Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Your Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ram Prasad Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Destination Country *</label>
                    <select
                      value={form.destination}
                      onChange={(e) => setForm({ ...form, destination: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors bg-white"
                    >
                      <option value="">Select country</option>
                      {counsellor.countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Course / Field of Study *</label>
                    <input
                      type="text"
                      placeholder="e.g. Bachelor in Computer Science"
                      value={form.course}
                      onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Preview message */}
                {form.name && form.destination && form.course && (
                  <div className="bg-[#25D366]/8 border border-[#25D366]/20 rounded-xl p-3 mb-5 text-xs text-slate">
                    <p className="font-semibold text-dark mb-1">Message preview:</p>
                    "Hi, I am {form.name}. I want to study in {form.destination}. Course: {form.course}. I found you on CounselNepal."
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!form.name || !form.destination || !form.course}
                  className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl hover:bg-[#1ea855] transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-5 h-5" />
                  Submit & Open WhatsApp
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
