'use client'
import { useState } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { promos, counsellors } from '../../data'
import Link from 'next/link'
import { ChevronLeft, Eye, Heart, Clock, MessageCircle, BadgeCheck, ArrowRight, X, CheckCircle2 } from 'lucide-react'

export default function PromoDetail({ params }: { params: { id: string } }) {
  const promo = promos.find((p) => p.id === Number(params.id)) || promos[0]
  const related = promos.filter((p) => p.id !== promo.id && p.topic === promo.topic).slice(0, 3)
  const consultancyCounsellors = counsellors.filter((c) => c.consultancyId === promo.consultancyId).slice(0, 2)
  const [showModal, setShowModal] = useState(false)
  const [liked, setLiked] = useState(false)
  const [form, setForm] = useState({ name: '', destination: '', course: '' })
  const [submitted, setSubmitted] = useState(false)

  // Render simple markdown-like content
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="font-display font-bold text-dark text-2xl mt-8 mb-4">{line.slice(3)}</h2>
      if (line.startsWith('### ')) return <h3 key={i} className="font-display font-bold text-dark text-lg mt-6 mb-3">{line.slice(4)}</h3>
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-semibold text-dark mt-4 mb-2">{line.slice(2, -2)}</p>
      if (line.startsWith('- ')) return <li key={i} className="text-slate ml-4 mb-1 list-disc">{line.slice(2)}</li>
      if (line.match(/^\d\./)) return <li key={i} className="text-slate ml-4 mb-1 list-decimal">{line.slice(2)}</li>
      if (line === '') return <br key={i} />
      return <p key={i} className="text-slate leading-relaxed mb-2">{line}</p>
    })
  }

  const handleConnect = () => {
    if (!form.name || !form.destination || !form.course) return
    setSubmitted(true)
    setTimeout(() => {
      const msg = encodeURIComponent(`Hi, I am ${form.name}. I want to study in ${form.destination}. Course: ${form.course}. I read your guide on CounselNepal.`)
      window.open(`https://wa.me/9779841234567?text=${msg}`, '_blank')
      setShowModal(false)
      setSubmitted(false)
      setForm({ name: '', destination: '', course: '' })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/resources" className="inline-flex items-center gap-1 text-slate text-sm mb-6 hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to guides
        </Link>

        {/* Hero image */}
        <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
          <img src={promo.thumbnail} alt={promo.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
          <div className="absolute bottom-5 left-5">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full text-white" style={{ background: promo.consultancyColor }}>{promo.topicLabel}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="font-display font-extrabold text-dark text-3xl mb-4">{promo.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: promo.consultancyColor }}>{promo.consultancyLogo}</div>
                <div>
                  <p className="text-xs font-semibold text-dark">{promo.author}</p>
                  <p className="text-xs text-slate">{promo.consultancy}</p>
                </div>
              </div>
              <span className="text-slate text-xs flex items-center gap-1"><Clock className="w-3 h-3" />{promo.readTime} read</span>
              <span className="text-slate text-xs flex items-center gap-1"><Eye className="w-3 h-3" />{promo.views} views</span>
              <button onClick={() => setLiked(!liked)} className={`flex items-center gap-1 text-xs font-medium transition-colors ${liked ? 'text-red-500' : 'text-slate hover:text-red-500'}`}>
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-500' : ''}`} />{promo.likes + (liked ? 1 : 0)} likes
              </button>
            </div>

            {/* Content */}
            <div className="prose-sm max-w-none mb-10">
              {renderContent(promo.content)}
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h3 className="font-display font-bold text-dark text-lg mb-4">Related Guides</h3>
                <div className="space-y-3">
                  {related.map((r) => (
                    <Link key={r.id} href={`/resources/${r.id}`} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:border-primary transition-all group">
                      <img src={r.thumbnail} alt={r.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors line-clamp-1">{r.title}</p>
                        <p className="text-xs text-slate line-clamp-1">{r.summary}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate group-hover:text-primary flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Consultancy CTA */}
            <div className="bg-white border-2 rounded-2xl p-5 sticky top-24" style={{ borderColor: promo.consultancyColor + '30' }}>
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: promo.consultancyColor }}>{promo.consultancyLogo}</div>
                <div>
                  <p className="font-display font-bold text-dark text-sm">{promo.consultancy}</p>
                  <p className="text-xs text-slate">Published this guide</p>
                </div>
              </div>
              <p className="text-slate text-sm mb-4">Have questions about this guide? Talk directly to {promo.author}.</p>

              {/* Counsellors from this consultancy */}
              {consultancyCounsellors.map((c) => (
                <div key={c.id} className="flex items-center gap-2 mb-3">
                  <img src={c.photo} alt={c.name} className="w-8 h-8 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-dark truncate">{c.name}</p>
                    <p className="text-xs text-slate truncate">{c.countries.join(', ')}</p>
                  </div>
                  {c.verified && <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />}
                </div>
              ))}

              <button onClick={() => setShowModal(true)} className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-[#1ea855] transition-colors mt-3 text-sm">
                <MessageCircle className="w-4 h-4" /> Connect via WhatsApp
              </button>
              <Link href={`/consultancies/${promo.consultancyId}`} className="block text-center text-sm text-primary font-medium mt-2 hover:underline">
                View full consultancy profile →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Connect Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-up">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center"><X className="w-4 h-4 text-slate" /></button>
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-display font-bold text-dark text-xl mb-2">Opening WhatsApp!</h3>
                <p className="text-slate text-sm">Connecting you with {promo.consultancy}...</p>
              </div>
            ) : (
              <>
                <h3 className="font-display font-bold text-dark text-xl mb-2">Connect with {promo.consultancy}</h3>
                <p className="text-slate text-sm mb-6">Your details will be sent to the counsellor before opening WhatsApp.</p>
                <div className="space-y-4 mb-5">
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Your Name *</label><input type="text" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Destination Country *</label><input type="text" placeholder="e.g. Australia" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Course *</label><input type="text" placeholder="e.g. MBA" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                </div>
                <button onClick={handleConnect} disabled={!form.name || !form.destination || !form.course} className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl hover:bg-[#1ea855] transition-colors flex items-center justify-center gap-2 disabled:opacity-40">
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
