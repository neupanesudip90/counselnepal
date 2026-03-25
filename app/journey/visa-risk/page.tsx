'use client'
import { useState } from 'react'
import Link from 'next/link'
import { counsellors } from '../../data'
import { ChevronLeft, AlertTriangle, CheckCircle2, X, Shield, FileText, MessageCircle, BadgeCheck, Star, ArrowRight, Info } from 'lucide-react'

const risks = [
  { id: 'sop', title: 'Weak SOP', severity: 'High', icon: '📝', color: '#DC2626', bg: '#FEF2F2', problem: 'Generic, copy-paste वा unclear SOP embassy ले immediately detect गर्छ।', causes: ['Template देखि copy गर्नु', 'Vague future plans', 'Why this country/course clear नभएको', 'Too long वा too short'], fix: 'Specific, personal, honest SOP लेख्नुहोस्। आफ्नै words मा। Clear purpose + future plan + Nepal return intention देखाउनुहोस्।', stat: '40% of rejections' },
  { id: 'financial', title: 'Low Financial Proof', severity: 'High', icon: '💰', color: '#D97706', bg: '#FFFBEB', problem: 'Bank statement कमजोर वा inconsistent भएमा embassy ले reject गर्छ।', causes: ['Sudden large deposit (red flag)', 'Balance study period लाई cover नगर्ने', 'Fake bank statement', '6 months history नभएको'], fix: 'Genuine funds maintain गर्नुहोस्। 6 months consistent balance। Sudden deposit नगर्नुहोस्। Sponsor income source prove गर्नुहोस्।', stat: '35% of rejections' },
  { id: 'gap', title: 'Study / Work Gap', severity: 'Medium', icon: '📅', color: '#7C3AED', bg: '#F5F3FF', problem: 'Education वा employment gap को proper explanation नभएमा embassy suspicious हुन्छ।', causes: ['Gap mention नगरेको', 'Weak explanation', 'Gap during productive age (22-28)', 'Multiple gaps'], fix: 'Gap explanation letter लेख्नुहोस्। Honest reason दिनुहोस्। Gap period मा productive activity (course, volunteer) देखाउनुहोस्।', stat: '20% of rejections' },
  { id: 'fake', title: 'Fake Documents', severity: 'Critical', icon: '🚫', color: '#DC2626', bg: '#FFF1F2', problem: 'Fake documents = permanent ban from that country। Future visa पनि affect हुन्छ।', causes: ['Fake bank statement', 'Inflated marks/certificates', 'False work experience', 'Fabricated sponsor letter'], fix: 'कहिल्यै fake documents नगर्नुहोस्। Permanent ban risk छ। Genuine documents भएमा मात्र apply गर्नुहोस्।', stat: 'Permanent consequence' },
  { id: 'rejection', title: 'Previous Visa Rejection', severity: 'Medium', icon: '❌', color: '#0891B2', bg: '#ECFEFF', problem: 'Previous rejection hide गर्नु = automatic rejection र potential ban।', causes: ['Previous rejection declare नगर्नु', 'Same weak application resubmit', 'No improvement in application'], fix: 'Honestly declare गर्नुहोस्। Rejection reason address गर्नुहोस्। Strong new application prepare गर्नुहोस्।', stat: 'Honesty is critical' },
  { id: 'incomplete', title: 'Incomplete Documents', severity: 'High', icon: '📋', color: '#059669', bg: '#ECFDF5', problem: 'Missing documents = instant rejection। Simple checklist mistake ले सबै effort बर्बाद हुन्छ।', causes: ['Checklist properly follow नगरेको', 'Expired documents', 'Wrong document format', 'Missing translation'], fix: 'Document checklist twice check गर्नुहोस्। Verified consultancy ले review गराउनुहोस्। All documents official format मा।', stat: '15% of rejections' },
]

const situations = [
  { id: 'gap', label: 'मसँग study gap छ', detail: 'Explain gap with honest letter + productive activities during gap' },
  { id: 'low_bank', label: 'Bank balance कम छ', detail: 'Show genuine source of funds — sponsor letter + income proof + property' },
  { id: 'rejected', label: 'पहिले visa reject भएको छ', detail: 'Declare honestly, address reason, strengthen new application significantly' },
  { id: 'low_ielts', label: 'IELTS score कम छ', detail: 'Improve score or choose IELTS-free countries (Japan, Germany)' },
  { id: 'no_job', label: 'Work experience छैन', detail: 'Volunteer work, internships, freelance projects show गर्नुहोस्' },
  { id: 'fake_consider', label: 'Agent ले fake document suggest गर्यो', detail: '⚠️ NEVER do it. Find a verified consultancy. Permanent ban risk.' },
]

export default function VisaRiskPage() {
  const [selectedSituation, setSelectedSituation] = useState('')
  const [showConnect, setShowConnect] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', situation: '' })
  const [submitted, setSubmitted] = useState(false)

  const selectedSit = situations.find(s => s.id === selectedSituation)

  const handleConnect = () => {
    if (!form.name || !form.phone) return
    setSubmitted(true)
    const counsellor = counsellors[0]
    const msg = encodeURIComponent(`Hi, I am ${form.name}. I need visa risk consultation. My situation: ${selectedSit?.label || form.situation}. Phone: ${form.phone}. I found you on CounselNepal.`)
    setTimeout(() => {
      window.open(`https://wa.me/${counsellor.whatsapp}?text=${msg}`, '_blank')
      setShowConnect(false)
      setSubmitted(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-950 via-red-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-white/70 hover:text-white text-sm"><ChevronLeft className="w-4 h-4" /> Home</Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            <span className="font-semibold text-sm">Visa Risk Guide</span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 pb-12 pt-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-400/30 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="font-display font-extrabold text-4xl mb-3">Visa Risk बुझ्नुहोस्</h1>
          <p className="text-white/60 max-w-lg mx-auto">Reject हुने main कारण थाहा भयो भने approval rate 85%+ हुन सक्छ</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Risk cards */}
        <div className="mb-12">
          <h2 className="font-display font-bold text-dark text-2xl mb-2">Main Rejection Reasons</h2>
          <p className="text-slate text-sm mb-6">यी कारणहरू बुझ्नुहोस् र avoid गर्नुहोस्</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {risks.map((risk) => (
              <div key={risk.id} className="rounded-2xl border-l-4 p-5 shadow-sm" style={{ background: risk.bg, borderColor: risk.color }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{risk.icon}</span>
                    <div>
                      <h3 className="font-display font-bold text-dark">{risk.title}</h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: risk.color + '20', color: risk.color }}>
                        {risk.severity} Risk · {risk.stat}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-dark mb-3">{risk.problem}</p>
                {/* Causes */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-dark uppercase tracking-wide mb-2">Common Causes:</p>
                  <ul className="space-y-1">{risk.causes.map(c => <li key={c} className="flex items-start gap-1.5 text-xs text-slate"><X className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />{c}</li>)}</ul>
                </div>
                {/* Fix */}
                <div className="bg-white/80 rounded-xl p-3">
                  <p className="text-xs font-semibold text-dark mb-1">✅ Solution:</p>
                  <p className="text-xs text-dark">{risk.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Situation checker */}
        <div className="bg-surface rounded-3xl p-8 mb-10 border border-border">
          <h2 className="font-display font-bold text-dark text-2xl mb-2">Your Situation Check</h2>
          <p className="text-slate text-sm mb-6">आफ्नो situation select गर्नुहोस् — specific advice पाउनुहोस्</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {situations.map((sit) => (
              <button key={sit.id} onClick={() => setSelectedSituation(selectedSituation === sit.id ? '' : sit.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${selectedSituation === sit.id ? 'border-primary bg-primary/5' : 'border-border bg-white hover:border-primary/40'}`}>
                <div className="flex items-center gap-2">
                  {selectedSituation === sit.id ? <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-border flex-shrink-0" />}
                  <p className="text-sm font-medium text-dark">{sit.label}</p>
                </div>
              </button>
            ))}
          </div>
          {selectedSit && (
            <div className={`rounded-2xl p-5 border-2 ${selectedSit.id === 'fake_consider' ? 'bg-red-50 border-red-300' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex items-start gap-3">
                {selectedSit.id === 'fake_consider' ? <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> : <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />}
                <div>
                  <p className={`font-semibold text-sm mb-1 ${selectedSit.id === 'fake_consider' ? 'text-red-800' : 'text-blue-800'}`}>Our Advice:</p>
                  <p className={`text-sm ${selectedSit.id === 'fake_consider' ? 'text-red-700' : 'text-blue-700'}`}>{selectedSit.detail}</p>
                  {selectedSit.id !== 'fake_consider' && (
                    <button onClick={() => setShowConnect(true)} className="mt-3 flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline">
                      Get personalized advice from a counsellor <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Success formula */}
        <div className="bg-dark rounded-3xl p-8 mb-10">
          <h2 className="font-display font-bold text-white text-2xl mb-5">✅ High Visa Success Formula</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { factor: 'Strong, Personal SOP', impact: '+25% approval', icon: '📝', color: '#4ade80' },
              { factor: 'Genuine Financial Proof', impact: '+20% approval', icon: '💰', color: '#60a5fa' },
              { factor: 'Complete Documents', impact: '+15% approval', icon: '📋', color: '#f59e0b' },
              { factor: 'Clear Purpose + Return Plan', impact: '+15% approval', icon: '🎯', color: '#a78bfa' },
              { factor: 'No Study/Work Gap', impact: '+10% approval', icon: '✅', color: '#34d399' },
              { factor: 'Verified Consultancy Help', impact: '+10% approval', icon: '🤝', color: '#fb7185' },
            ].map(({ factor, impact, icon, color }) => (
              <div key={factor} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <span className="text-2xl">{icon}</span>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{factor}</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: color + '25', color }}>{impact}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 bg-white/10 rounded-2xl p-4 text-center">
            <p className="text-white font-bold text-xl">All 6 factors = 95%+ Visa Approval Rate</p>
            <p className="text-white/60 text-sm mt-1">Nepal average visa success rate with verified consultancy: 87%</p>
          </div>
        </div>

        {/* Connect CTA */}
        <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-8 text-center">
          <h2 className="font-display font-bold text-white text-2xl mb-3">Still Worried About Your Visa?</h2>
          <p className="text-white/70 mb-6">हाम्रो verified counsellors ले तपाईंको specific situation हेर्छन् र best strategy दिन्छन्</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setShowConnect(true)} className="flex items-center justify-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors">
              <MessageCircle className="w-5 h-5" /> Free Visa Consultation
            </button>
            <Link href="/journey/study" className="flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
              Start Study Journey <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Connect modal */}
      {showConnect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => setShowConnect(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
            <button onClick={() => setShowConnect(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center"><X className="w-4 h-4 text-slate" /></button>
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-3" />
                <h3 className="font-display font-bold text-dark text-xl">Opening WhatsApp!</h3>
              </div>
            ) : (
              <>
                <h3 className="font-display font-bold text-dark text-xl mb-2">Free Visa Consultation</h3>
                <p className="text-slate text-sm mb-6">A verified counsellor will review your situation and give specific advice</p>
                <div className="space-y-4 mb-5">
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Your Name *</label><input type="text" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Phone *</label><input type="tel" placeholder="+977 98XXXXXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Your Situation / Concern</label><textarea rows={3} placeholder="Describe your visa concern..." value={form.situation} onChange={e => setForm({ ...form, situation: e.target.value })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary resize-none" /></div>
                </div>
                <button onClick={handleConnect} disabled={!form.name || !form.phone} className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40">
                  <MessageCircle className="w-5 h-5" /> Submit & Open WhatsApp
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
