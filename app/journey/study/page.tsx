'use client'
import { useState } from 'react'
import Link from 'next/link'
import { extendedUniversities, extendedCourses, counsellors } from '../../data'
import {
  ChevronLeft, ChevronRight, GraduationCap, Globe, BookOpen,
  Calculator, FileText, Languages, Users, Check, ArrowRight,
  Star, BadgeCheck, MessageCircle, AlertTriangle, CheckCircle2,
  DollarSign, Clock, Briefcase, Shield, Info, X, Heart,
  ChevronDown, ChevronUp, Filter, Search, ExternalLink, MapPin
} from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Purpose', icon: GraduationCap },
  { id: 2, label: 'Country', icon: Globe },
  { id: 3, label: 'Course & University', icon: BookOpen },
  { id: 4, label: 'Budget', icon: Calculator },
  { id: 5, label: 'Documents', icon: FileText },
  { id: 6, label: 'Language', icon: Languages },
  { id: 7, label: 'Counsellor', icon: Users },
]

const studyCountries = [
  { name: 'Australia', flag: '🇦🇺', color: '#2563EB', visaRate: '87%', living: 'AUD 1,500–2,000/mo', partTime: '48 hrs/fortnight', intake: 'Feb, Jul', ielts: '6.0–6.5', tuition: 'AUD 25K–45K/yr', postStudy: '2–4 years', jobMarket: 'High', pr: 'Possible after 2yr', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' },
  { name: 'Canada', flag: '🇨🇦', color: '#DC2626', visaRate: '82%', living: 'CAD 1,200–1,800/mo', partTime: '20 hrs/week', intake: 'Jan, May, Sep', ielts: '6.0–6.5', tuition: 'CAD 15K–45K/yr', postStudy: '1–3 years (PGWP)', jobMarket: 'High', pr: 'Express Entry possible', image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80' },
  { name: 'UK', flag: '🇬🇧', color: '#7C3AED', visaRate: '79%', living: 'GBP 900–1,400/mo', partTime: '20 hrs/week', intake: 'Sep, Jan', ielts: '5.5–6.5', tuition: 'GBP 12K–30K/yr', postStudy: '2 years Graduate visa', jobMarket: 'Medium', pr: 'ILR after 5yr', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80' },
  { name: 'USA', flag: '🇺🇸', color: '#059669', visaRate: '75%', living: 'USD 1,200–2,500/mo', partTime: '20hrs/week on campus', intake: 'Aug, Jan', ielts: '6.5–7.0', tuition: 'USD 20K–55K/yr', postStudy: '1–3 years OPT/STEM', jobMarket: 'Very High', pr: 'H1B lottery', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80' },
  { name: 'Japan', flag: '🇯🇵', color: '#D97706', visaRate: '91%', living: 'JPY 80K–130K/mo', partTime: '28 hrs/week', intake: 'Apr, Oct', ielts: 'JLPT N4–N2', tuition: 'JPY 500K–1.8M/yr', postStudy: 'Job search visa', jobMarket: 'High', pr: 'After 5yr', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80' },
  { name: 'Germany', flag: '🇩🇪', color: '#0891B2', visaRate: '85%', living: 'EUR 800–1,200/mo', partTime: '120 days/yr', intake: 'Oct, Apr', ielts: 'IELTS 6.5 / B2 German', tuition: 'FREE + EUR 350/sem', postStudy: '18 months job seeker', jobMarket: 'Very High', pr: 'After 5yr', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80' },
  { name: 'New Zealand', flag: '🇳🇿', color: '#BE185D', visaRate: '88%', living: 'NZD 1,200–1,800/mo', partTime: '20 hrs/week', intake: 'Feb, Jul', ielts: '6.0–6.5', tuition: 'NZD 22K–35K/yr', postStudy: '1–3 years', jobMarket: 'Medium', pr: 'After 2yr', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80' },
  { name: 'South Korea', flag: '🇰🇷', color: '#16A34A', visaRate: '89%', living: 'KRW 600K–1M/mo', partTime: '20 hrs/week', intake: 'Mar, Sep', ielts: 'TOPIK 2+', tuition: 'KRW 3M–8M/yr', postStudy: 'D-10 job search', jobMarket: 'Medium', pr: 'Points system', image: 'https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?w=800&q=80' },
]

const purposeOptions = [
  { id: 'degree', label: 'Bachelor Degree', desc: 'Undergraduate 3–4 year program', icon: '🎓' },
  { id: 'master', label: 'Master / Postgraduate', desc: 'Advanced degree 1–2 years', icon: '📚' },
  { id: 'diploma', label: 'Diploma / Certificate', desc: 'Vocational 1–2 year program', icon: '📜' },
  { id: 'language', label: 'Language School', desc: 'Learn language before university', icon: '🗣️' },
  { id: 'pr', label: 'Study → PR pathway', desc: 'Study with goal of permanent residency', icon: '🏠' },
]

const documentList = [
  { id: 'passport', label: 'Valid Passport', required: true, warning: 'Must have 6+ months validity' },
  { id: 'see', label: 'SEE / Class 10 Certificate', required: true, warning: null },
  { id: 'plus2', label: '+2 / Class 12 Certificate', required: true, warning: null },
  { id: 'bachelor', label: "Bachelor's Degree (if applicable)", required: false, warning: null },
  { id: 'transcripts', label: 'Academic Transcripts (all years)', required: true, warning: 'Must be certified official copies' },
  { id: 'ielts', label: 'IELTS / PTE / TOEFL Score', required: true, warning: 'Must be within 2 years validity' },
  { id: 'sop', label: 'Statement of Purpose (SOP)', required: true, warning: 'Never copy-paste — embassy detects it' },
  { id: 'bank', label: 'Bank Statement (6 months)', required: true, warning: 'No sudden large deposits' },
  { id: 'bank_cert', label: 'Bank Balance Certificate', required: true, warning: null },
  { id: 'sponsor', label: 'Sponsor Letter', required: false, warning: null },
  { id: 'income', label: 'Income Source Proof of Sponsor', required: false, warning: null },
  { id: 'lor', label: 'Letter of Recommendation (LOR)', required: false, warning: 'Strongly recommended for top unis' },
  { id: 'cv', label: 'CV / Resume', required: false, warning: null },
  { id: 'gap', label: 'Gap Explanation Letter', required: false, warning: 'Required if you have a study gap' },
]

const cityLivingCosts: Record<string, number> = {
  'Sydney (AU)': 2000, 'Melbourne (AU)': 1800, 'Brisbane (AU)': 1600,
  'Toronto (CA)': 1800, 'Vancouver (CA)': 2000, 'Montreal (CA)': 1400,
  'London (UK)': 1800, 'Manchester (UK)': 1200,
  'New York (USA)': 2500, 'Austin (USA)': 1500,
  'Tokyo (JP)': 1100, 'Osaka (JP)': 900,
  'Munich (DE)': 1200, 'Berlin (DE)': 1000,
  'Auckland (NZ)': 1500, 'Seoul (KR)': 900,
}

const visaCostMap: Record<string, number> = {
  'Australia': 710, 'Canada': 350, 'UK': 490, 'USA': 350,
  'Japan': 100, 'Germany': 75, 'New Zealand': 350, 'South Korea': 90,
}

export default function StudyJourneyPage() {
  const [step, setStep] = useState(1)
  const [purpose, setPurpose] = useState('')
  const [country, setCountry] = useState<typeof studyCountries[0] | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<typeof extendedCourses[0] | null>(null)
  const [selectedUni, setSelectedUni] = useState<number | null>(null)
  const [expandedUni, setExpandedUni] = useState<number | null>(null)
  const [savedUnis, setSavedUnis] = useState<number[]>([])
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({})
  const [ieltsScore, setIeltsScore] = useState(6.0)
  const [budgetCity, setBudgetCity] = useState('Sydney (AU)')
  const [budgetDuration, setBudgetDuration] = useState(2)
  const [budgetTuition, setBudgetTuition] = useState(30000)
  const [budgetScholarship, setBudgetScholarship] = useState(0)
  const [showConnect, setShowConnect] = useState(false)
  const [connectForm, setConnectForm] = useState({ name: '', phone: '' })
  const [connected, setConnected] = useState(false)
  const [showMoreCourses, setShowMoreCourses] = useState(false)
  // University filters
  const [filterScholarship, setFilterScholarship] = useState(false)
  const [filterMaxFee, setFilterMaxFee] = useState(0)
  const [filterMaxIelts, setFilterMaxIelts] = useState(0)
  const [filterCity, setFilterCity] = useState('')
  const [uniSearch, setUniSearch] = useState('')
  const [showMoreUnis, setShowMoreUnis] = useState(false)

  const livingCost = cityLivingCosts[budgetCity] || 1500
  const visaCost = country ? (visaCostMap[country.name] || 300) : 300
  const totalTuition = (budgetTuition * budgetDuration) - budgetScholarship
  const totalLiving = livingCost * 12 * budgetDuration
  const totalVisa = visaCost + 85 + 600
  const grandTotal = totalTuition + totalLiving + totalVisa
  const nprEstimate = country?.name === 'Australia' ? grandTotal * 88 : country?.name === 'Canada' ? grandTotal * 80 : country?.name === 'UK' ? grandTotal * 108 : country?.name === 'Germany' ? grandTotal * 120 : country?.name === 'Japan' ? grandTotal * 0.72 : grandTotal * 90
  const docProgress = documentList.filter(d => checkedDocs[d.id]).length
  const requiredMissing = documentList.filter(d => d.required && !checkedDocs[d.id])
  const matchedCounsellors = counsellors.filter(c => country && c.countries.some(cn => cn === country.name || country.name.includes(cn)))

  // Courses for selected country
  const availableCourses = extendedCourses.filter(c =>
    c.category === 'study' && (!country || c.countries.includes(country.name))
  )
  const visibleCourses = showMoreCourses ? availableCourses : availableCourses.slice(0, 6)

  // Universities for selected country + course + filters
  const countryUnis = extendedUniversities.filter(u => {
    if (!country) return false
    const matchCountry = u.country === country.name
    const matchSearch = !uniSearch || u.name.toLowerCase().includes(uniSearch.toLowerCase()) || u.city.toLowerCase().includes(uniSearch.toLowerCase())
    const matchScholarship = !filterScholarship || u.scholarship
    const matchFee = !filterMaxFee || u.tuitionMin <= filterMaxFee
    const matchIelts = !filterMaxIelts || u.ieltsOverall <= filterMaxIelts || u.ieltsOverall === 0
    const matchCity = !filterCity || u.city.toLowerCase().includes(filterCity.toLowerCase())
    return matchCountry && matchSearch && matchScholarship && matchFee && matchIelts && matchCity
  })
  const visibleUnis = showMoreUnis ? countryUnis : countryUnis.slice(0, 4)
  const cities = Array.from(new Set(extendedUniversities.filter(u => country && u.country === country.name).map(u => u.city)))

  const ieltsEligible = studyCountries.filter(c => {
    if (c.name === 'Japan' || c.name === 'South Korea') return true
    if (c.name === 'Germany' && ieltsScore >= 6.5) return true
    if (['Australia', 'Canada', 'New Zealand'].includes(c.name) && ieltsScore >= 6.0) return true
    if (c.name === 'UK' && ieltsScore >= 5.5) return true
    if (c.name === 'USA' && ieltsScore >= 6.5) return true
    return false
  })

  const handleConnect = () => {
    if (!connectForm.name || !connectForm.phone) return
    setConnected(true)
    const counsellor = matchedCounsellors[0] || counsellors[0]
    const msg = encodeURIComponent(`Hi, I am ${connectForm.name}. I want to study in ${country?.name}. Course: ${selectedCourse?.name || 'Not selected'}. University: ${selectedUni ? extendedUniversities.find(u => u.id === selectedUni)?.name : 'Not selected'}. Phone: ${connectForm.phone}. Found you on CounselNepal.`)
    setTimeout(() => {
      window.open(`https://wa.me/${counsellor.whatsapp}?text=${msg}`, '_blank')
      setShowConnect(false)
      setConnected(false)
    }, 1500)
  }

  const canProceed = () => {
    if (step === 1) return !!purpose
    if (step === 2) return !!country
    if (step === 3) return !!selectedCourse
    return true
  }

  const formatTuition = (u: typeof extendedUniversities[0]) => {
    if (u.tuitionMin === 0) return `Free + ${u.currency} ${u.tuitionMax}/sem`
    return `${u.currency} ${(u.tuitionMin / 1000).toFixed(0)}K–${(u.tuitionMax / 1000).toFixed(0)}K/yr`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-slate hover:text-dark text-sm"><ChevronLeft className="w-4 h-4" /> Home</Link>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs text-slate font-medium">Study Abroad Journey</p>
              <p className="text-xs text-slate">Step {step} of {STEPS.length}</p>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(step / STEPS.length) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto">
          {STEPS.map((s) => {
            const Icon = s.icon
            const done = s.id < step
            const active = s.id === step
            return (
              <button key={s.id} onClick={() => s.id < step && setStep(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${active ? 'bg-primary text-white' : done ? 'bg-primary/10 text-primary cursor-pointer hover:bg-primary/20' : 'bg-surface text-slate cursor-not-allowed'}`}>
                {done ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}{s.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="pt-32 pb-24 max-w-5xl mx-auto px-4">

        {/* STEP 1: PURPOSE */}
        {step === 1 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><GraduationCap className="w-8 h-8 text-primary" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Why Do You Want to Study Abroad?</h1>
              <p className="text-slate">Your purpose determines the best country, course and visa pathway</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {purposeOptions.map((opt) => (
                <button key={opt.id} onClick={() => setPurpose(opt.id)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all card-hover ${purpose === opt.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-border bg-white hover:border-primary/40'}`}>
                  <div className="text-3xl mb-3">{opt.icon}</div>
                  <h3 className="font-display font-bold text-dark text-base mb-1">{opt.label}</h3>
                  <p className="text-slate text-sm">{opt.desc}</p>
                  {purpose === opt.id && <div className="mt-3 flex items-center gap-1 text-primary text-xs font-semibold"><Check className="w-3.5 h-3.5" /> Selected</div>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: COUNTRY */}
        {step === 2 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-cyan-600" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Select Destination Country</h1>
              <p className="text-slate">Compare countries — visa rate, living cost, job opportunity and more</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {studyCountries.map((c) => (
                <button key={c.name} onClick={() => setCountry(c)}
                  className={`text-left rounded-2xl border-2 overflow-hidden transition-all ${country?.name === c.name ? 'border-primary shadow-xl shadow-primary/15' : 'border-border hover:border-primary/40'}`}>
                  <div className="relative h-28 overflow-hidden">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="text-2xl">{c.flag}</span>
                      <h3 className="font-display font-bold text-white text-xl">{c.name}</h3>
                    </div>
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Visa {c.visaRate}</div>
                    {country?.name === c.name && <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1"><Check className="w-3 h-3" /> Selected</div>}
                  </div>
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-3 gap-2">
                      {[['Living/mo', c.living], ['Part-time', c.partTime], ['IELTS', c.ielts], ['Tuition', c.tuition], ['Post-study', c.postStudy], ['PR', c.pr]].map(([label, val]) => (
                        <div key={label} className="bg-surface rounded-lg p-2">
                          <p className="text-xs text-slate">{label}</p>
                          <p className="text-xs font-semibold text-dark mt-0.5 leading-tight">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: COURSE + UNIVERSITY */}
        {step === 3 && (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4"><BookOpen className="w-8 h-8 text-violet-600" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Choose Course & University</h1>
              <p className="text-slate">Select your course first, then explore universities in {country?.name}</p>
            </div>

            {/* ── COURSES ── */}
            <div className="mb-10">
              <h2 className="font-display font-bold text-dark text-xl mb-1">Step 3a — Select Your Course</h2>
              <p className="text-slate text-sm mb-5">Available courses in {country?.name} with job demand, salary and PR chances</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {visibleCourses.map((course) => (
                  <button key={course.id} onClick={() => setSelectedCourse(selectedCourse?.id === course.id ? null : course)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all ${selectedCourse?.id === course.id ? 'border-violet-500 bg-violet-50 shadow-lg' : 'border-border bg-white hover:border-violet-300'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-3xl block mb-2">{course.icon}</span>
                        <h3 className="font-display font-bold text-dark text-sm">{course.name}</h3>
                        <p className="text-slate text-xs mt-0.5">{course.desc}</p>
                      </div>
                      {selectedCourse?.id === course.id && <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0"><Check className="w-3.5 h-3.5 text-white" /></div>}
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 mb-2">
                      <div className="bg-surface rounded-lg p-1.5 text-center">
                        <p className="text-xs text-slate">Demand</p>
                        <p className="text-xs font-bold mt-0.5" style={{ color: course.demand.includes('Very') ? '#059669' : '#2563EB' }}>{course.demand}</p>
                      </div>
                      <div className="bg-surface rounded-lg p-1.5 text-center">
                        <p className="text-xs text-slate">Salary</p>
                        <p className="text-xs font-bold text-dark mt-0.5">{course.salary.split('–')[0]}+</p>
                      </div>
                      <div className="bg-surface rounded-lg p-1.5 text-center">
                        <p className="text-xs text-slate">PR</p>
                        <p className="text-xs font-bold mt-0.5" style={{ color: course.prChance.includes('Very') || course.prChance === 'High' ? '#059669' : '#D97706' }}>{course.prChance}</p>
                      </div>
                    </div>
                    {selectedCourse?.id === course.id && (
                      <div className="mt-2 pt-2 border-t border-border">
                        <p className="text-xs text-slate mb-1">Job titles:</p>
                        <div className="flex flex-wrap gap-1">{course.jobTitles.slice(0, 3).map(j => <span key={j} className="text-xs px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full">{j}</span>)}</div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* See more courses */}
              {availableCourses.length > 6 && (
                <button onClick={() => setShowMoreCourses(!showMoreCourses)} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-border rounded-xl text-slate hover:border-violet-400 hover:text-violet-600 transition-all text-sm font-medium">
                  {showMoreCourses ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> See All {availableCourses.length} Courses</>}
                </button>
              )}
            </div>

            {/* ── UNIVERSITIES ── */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display font-bold text-dark text-xl mb-1">Step 3b — Select University</h2>
                  <p className="text-slate text-sm">{countryUnis.length} universities in {country?.name} — click to expand details</p>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-surface rounded-2xl p-4 mb-5 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-slate" />
                  <p className="text-sm font-semibold text-dark">Filter Universities</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate" />
                    <input type="text" placeholder="Search..." value={uniSearch} onChange={e => setUniSearch(e.target.value)} className="w-full pl-8 pr-3 py-2 border border-border rounded-lg text-xs focus:outline-none focus:border-primary bg-white" />
                  </div>
                  <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="py-2 px-3 border border-border rounded-lg text-xs focus:outline-none focus:border-primary bg-white text-slate">
                    <option value="">All Cities</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <select value={filterMaxIelts} onChange={e => setFilterMaxIelts(Number(e.target.value))} className="py-2 px-3 border border-border rounded-lg text-xs focus:outline-none focus:border-primary bg-white text-slate">
                    <option value={0}>Any IELTS</option>
                    <option value={6.0}>IELTS ≤ 6.0</option>
                    <option value={6.5}>IELTS ≤ 6.5</option>
                    <option value={7.0}>IELTS ≤ 7.0</option>
                  </select>
                  <button onClick={() => setFilterScholarship(!filterScholarship)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${filterScholarship ? 'bg-amber-500 text-white border-amber-500' : 'border-border text-slate bg-white hover:border-amber-400'}`}>
                    🏆 Scholarship Only
                  </button>
                </div>
              </div>

              {/* University cards */}
              <div className="space-y-4">
                {visibleUnis.map((u) => {
                  const isExpanded = expandedUni === u.id
                  const isSelected = selectedUni === u.id
                  const isSaved = savedUnis.includes(u.id)

                  return (
                    <div key={u.id} className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${isSelected ? 'border-primary shadow-xl shadow-primary/10' : 'border-border hover:border-primary/30'}`}>
                      {/* Collapsed header */}
                      <div className="flex items-center gap-4 p-4 cursor-pointer bg-white" onClick={() => setExpandedUni(isExpanded ? null : u.id)}>
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={u.image} alt={u.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-display font-bold text-dark text-base">{u.name}</h3>
                            {u.scholarship && <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">🏆 Scholarship</span>}
                            {u.ranking > 0 && <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">#{u.ranking}</span>}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate flex-wrap">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{u.city}</span>
                            <span>{u.flag} {u.country}</span>
                            <span className="font-medium text-dark">{formatTuition(u)}</span>
                            <span>IELTS: {u.ieltsOverall === 0 ? 'Not req.' : u.ieltsOverall + '+'}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {u.courses.slice(0, 3).map(c => <span key={c} className="text-xs px-2 py-0.5 bg-surface rounded-full text-slate">{c}</span>)}
                            {u.courses.length > 3 && <span className="text-xs px-2 py-0.5 bg-surface rounded-full text-slate">+{u.courses.length - 3} more</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={(e) => { e.stopPropagation(); setSavedUnis(s => s.includes(u.id) ? s.filter(i => i !== u.id) : [...s, u.id]) }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isSaved ? 'bg-red-100' : 'bg-surface hover:bg-red-50'}`}>
                            <Heart className={`w-4 h-4 ${isSaved ? 'text-red-500 fill-red-500' : 'text-slate'}`} />
                          </button>
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-slate" /> : <ChevronDown className="w-5 h-5 text-slate" />}
                        </div>
                      </div>

                      {/* Expanded details — PDF Slide 5 */}
                      {isExpanded && (
                        <div className="border-t border-border bg-surface p-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">

                            {/* Courses Available */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <p className="text-xs font-semibold text-dark uppercase tracking-wide mb-2">📚 Courses Available</p>
                              <div className="flex flex-wrap gap-1">
                                {u.courses.map(c => <span key={c} className="text-xs px-2.5 py-1 bg-violet-100 text-violet-700 rounded-full">{c}</span>)}
                              </div>
                              <p className="text-xs text-slate mt-2">Duration: {u.duration}</p>
                            </div>

                            {/* Tuition Fee */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <p className="text-xs font-semibold text-dark uppercase tracking-wide mb-2">💰 Tuition Fee</p>
                              <p className="text-lg font-display font-bold text-dark">{formatTuition(u)}</p>
                              {u.scholarship && (
                                <div className="mt-2 bg-amber-50 rounded-lg p-2">
                                  <p className="text-xs font-semibold text-amber-800">🏆 {u.scholarshipName}</p>
                                  <p className="text-xs text-amber-700">{u.scholarshipAmount}</p>
                                </div>
                              )}
                            </div>

                            {/* Admission Requirements */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <p className="text-xs font-semibold text-dark uppercase tracking-wide mb-2">📋 Admission Requirements</p>
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs"><span className="text-slate">GPA Min</span><span className="font-semibold text-dark">{u.gpaMin}/4.0</span></div>
                                <div className="flex justify-between text-xs"><span className="text-slate">IELTS Overall</span><span className="font-semibold text-dark">{u.ieltsOverall === 0 ? 'Not required' : u.ieltsOverall + '+'}</span></div>
                                <div className="flex justify-between text-xs"><span className="text-slate">IELTS Min band</span><span className="font-semibold text-dark">{u.ieltsMin === 0 ? 'N/A' : u.ieltsMin + '+'}</span></div>
                                <div className="flex justify-between text-xs"><span className="text-slate">SOP Required</span><span className={`font-semibold ${u.sopRequired ? 'text-red-600' : 'text-green-600'}`}>{u.sopRequired ? 'Yes' : 'No'}</span></div>
                                <div className="flex justify-between text-xs"><span className="text-slate">LOR Required</span><span className={`font-semibold ${u.lorRequired ? 'text-red-600' : 'text-green-600'}`}>{u.lorRequired ? 'Yes' : 'No'}</span></div>
                              </div>
                            </div>

                            {/* Living Info */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <p className="text-xs font-semibold text-dark uppercase tracking-wide mb-2">🏠 Living Information</p>
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs"><span className="text-slate">Accommodation</span><span className="font-semibold text-dark">{u.accommodationCost}</span></div>
                                <div className="flex justify-between text-xs"><span className="text-slate">Monthly Living</span><span className="font-semibold text-dark">{u.livingCost}</span></div>
                                <div className="flex justify-between text-xs"><span className="text-slate">On-campus Housing</span><span className={`font-semibold ${u.onCampus ? 'text-green-600' : 'text-slate'}`}>{u.onCampus ? 'Available' : 'Off-campus only'}</span></div>
                              </div>
                            </div>

                            {/* Work Opportunity */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <p className="text-xs font-semibold text-dark uppercase tracking-wide mb-2">💼 Work Opportunity</p>
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-xs"><span className="text-slate">Part-time Work</span><span className="font-semibold text-dark">{u.partTimeHours}</span></div>
                                <div className="flex justify-between text-xs"><span className="text-slate">Post-study Visa</span><span className="font-semibold text-dark">{u.postStudyVisa}</span></div>
                                <div className="flex justify-between text-xs"><span className="text-slate">Job Market</span><span className="font-bold" style={{ color: u.jobMarket === 'Very High' || u.jobMarket === 'High' ? '#059669' : '#D97706' }}>{u.jobMarket}</span></div>
                              </div>
                            </div>

                            {/* Intake + Extra */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                              <p className="text-xs font-semibold text-dark uppercase tracking-wide mb-2">📅 Intake & Info</p>
                              <div className="space-y-1.5 mb-3">
                                <div className="flex justify-between text-xs"><span className="text-slate">Intakes</span><span className="font-semibold text-dark">{u.intakes.join(', ')}</span></div>
                                <div className="flex justify-between text-xs"><span className="text-slate">Type</span><span className="font-semibold text-dark">{u.type}</span></div>
                                <div className="flex justify-between text-xs"><span className="text-slate">Established</span><span className="font-semibold text-dark">{u.established}</span></div>
                              </div>
                              <a href={`https://${u.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                                <ExternalLink className="w-3 h-3" /> {u.website}
                              </a>
                            </div>
                          </div>

                          {/* About */}
                          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                            <p className="text-xs font-semibold text-dark uppercase tracking-wide mb-1">About</p>
                            <p className="text-sm text-slate">{u.about}</p>
                          </div>

                          {/* Action buttons */}
                          <div className="flex flex-wrap gap-3">
                            <button onClick={() => setSelectedUni(isSelected ? null : u.id)}
                              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${isSelected ? 'bg-primary text-white' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}>
                              {isSelected ? <><Check className="w-4 h-4" /> Selected!</> : <>Select This University</>}
                            </button>
                            <button onClick={() => setShowConnect(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-[#25D366] text-white hover:bg-[#1ea855] transition-all">
                              <MessageCircle className="w-4 h-4" /> Chat with Counsellor
                            </button>
                            <a href={`https://${u.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border-2 border-border text-slate hover:border-primary hover:text-primary transition-all">
                              <ExternalLink className="w-4 h-4" /> Apply Now
                            </a>
                            <button onClick={() => setSavedUnis(s => s.includes(u.id) ? s.filter(i => i !== u.id) : [...s, u.id])}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all ${isSaved ? 'border-red-300 bg-red-50 text-red-500' : 'border-border text-slate hover:border-red-300 hover:text-red-500'}`}>
                              <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500' : ''}`} />{isSaved ? 'Saved' : 'Save'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* See more universities */}
              {countryUnis.length > 4 && (
                <button onClick={() => setShowMoreUnis(!showMoreUnis)} className="w-full flex items-center justify-center gap-2 py-4 mt-4 border-2 border-dashed border-border rounded-xl text-slate hover:border-primary hover:text-primary transition-all text-sm font-medium">
                  {showMoreUnis ? <><ChevronUp className="w-4 h-4" /> Show Less Universities</> : <><ChevronDown className="w-4 h-4" /> See All {countryUnis.length} Universities in {country?.name}</>}
                </button>
              )}

              {countryUnis.length === 0 && (
                <div className="text-center py-10 bg-surface rounded-2xl border border-border">
                  <p className="text-4xl mb-3">🔍</p>
                  <p className="font-semibold text-dark">No universities match your filters</p>
                  <button onClick={() => { setFilterScholarship(false); setFilterMaxFee(0); setFilterMaxIelts(0); setFilterCity(''); setUniSearch('') }} className="mt-3 text-sm text-primary hover:underline">Clear all filters</button>
                </div>
              )}

              {/* Saved universities summary */}
              {savedUnis.length > 0 && (
                <div className="mt-5 bg-red-50 border border-red-200 rounded-2xl p-4">
                  <p className="text-sm font-semibold text-dark mb-2">❤️ Saved Universities ({savedUnis.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {savedUnis.map(id => {
                      const u = extendedUniversities.find(u => u.id === id)
                      return u ? <span key={id} className="text-xs bg-white border border-red-200 text-dark px-3 py-1.5 rounded-full font-medium">{u.name}</span> : null
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: BUDGET */}
        {step === 4 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4"><Calculator className="w-8 h-8 text-green-600" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Budget Calculator</h1>
              <p className="text-slate">Calculate your complete cost to study in {country?.name}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">City</label>
                <select value={budgetCity} onChange={e => setBudgetCity(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white">
                  {Object.keys(cityLivingCosts).map(city => <option key={city}>{city}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Course Duration</label>
                <select value={budgetDuration} onChange={e => setBudgetDuration(Number(e.target.value))} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white">
                  {[1,2,3,4].map(d => <option key={d} value={d}>{d} year{d > 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Tuition/yr</label>
                <input type="number" value={budgetTuition} onChange={e => setBudgetTuition(Number(e.target.value))} step="1000" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Scholarship: {budgetScholarship.toLocaleString()}</label>
                <input type="range" min="0" max="50000" step="1000" value={budgetScholarship} onChange={e => setBudgetScholarship(Number(e.target.value))} className="w-full mt-3 accent-green-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Tuition Fee', val: totalTuition, note: `${budgetDuration}yr total`, color: '#2563EB', bg: '#EFF6FF', icon: GraduationCap },
                { label: 'Living Cost', val: totalLiving, note: `${budgetDuration * 12}mo × ${livingCost}/mo`, color: '#7C3AED', bg: '#F5F3FF', icon: DollarSign },
                { label: 'Visa + Processing', val: totalVisa, note: 'visa + biometrics + insurance', color: '#D97706', bg: '#FFFBEB', icon: Shield },
                { label: 'Monthly Expense', val: Math.round(livingCost + budgetTuition/12), note: 'living + tuition/mo', color: '#059669', bg: '#ECFDF5', icon: Clock },
              ].map(({ label, val, note, color, bg, icon: Icon }) => (
                <div key={label} className="rounded-2xl p-4 border-l-4" style={{ background: bg, borderColor: color }}>
                  <Icon className="w-5 h-5 mb-2" style={{ color }} />
                  <p className="text-xs text-slate mb-1">{label}</p>
                  <p className="font-display font-bold text-dark text-lg">{val.toLocaleString()}</p>
                  <p className="text-xs text-slate mt-0.5">{note}</p>
                </div>
              ))}
            </div>
            <div className="bg-dark rounded-2xl p-6 mb-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-white/50 text-sm mb-1">Grand Total ({budgetDuration} year course in {country?.name})</p>
                  <p className="font-display font-extrabold text-white text-4xl">{grandTotal.toLocaleString()}</p>
                  <p className="text-cyan text-sm mt-1 font-semibold">≈ NPR {Math.round(nprEstimate / 100000)} Lakhs</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-sm">
                  <p className="text-white/60 text-xs mb-2">Monthly breakdown:</p>
                  <p className="text-white text-xs">Rent: {Math.round(livingCost * 0.5).toLocaleString()}/mo</p>
                  <p className="text-white text-xs">Food: {Math.round(livingCost * 0.25).toLocaleString()}/mo</p>
                  <p className="text-white text-xs">Transport: {Math.round(livingCost * 0.1).toLocaleString()}/mo</p>
                  <p className="text-white text-xs">Misc: {Math.round(livingCost * 0.15).toLocaleString()}/mo</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-800 text-sm">Budget Tip</p>
                <p className="text-blue-600 text-sm mt-1">
                  {nprEstimate / 100000 < 20 ? 'Germany वा Japan best — free/low tuition, affordable living' :
                   nprEstimate / 100000 < 40 ? 'Canada वा UK good value — strong PR pathway' :
                   'Australia वा USA — premium education, high job opportunities'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: DOCUMENTS */}
        {step === 5 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-red-600" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Document Checklist</h1>
              <p className="text-slate">सानो mistake ले visa reject हुन सक्छ। Check गर्नुहोस्।</p>
            </div>
            <div className="bg-surface rounded-2xl p-5 mb-6 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2"><span className="font-semibold text-dark">Documents Ready</span><span className="text-slate">{docProgress} / {documentList.length}</span></div>
                <div className="h-3 bg-border rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${(docProgress / documentList.length) * 100}%`, background: docProgress === documentList.length ? '#059669' : '#2563EB' }} /></div>
              </div>
              <div className="text-center bg-white rounded-xl p-3 shadow-sm"><p className="font-display font-bold text-dark text-2xl">{Math.round((docProgress / documentList.length) * 100)}%</p><p className="text-slate text-xs">Complete</p></div>
            </div>
            <div className="space-y-2 mb-6">
              {documentList.map((doc) => {
                const checked = checkedDocs[doc.id]
                return (
                  <button key={doc.id} onClick={() => setCheckedDocs({ ...checkedDocs, [doc.id]: !checked })}
                    className={`w-full flex items-start gap-3 text-left p-4 rounded-xl border-2 transition-all ${checked ? 'bg-green-50 border-green-300' : 'bg-white border-border hover:border-primary/30'}`}>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${checked ? 'bg-green-500' : 'border-2 border-border'}`}>{checked && <Check className="w-3.5 h-3.5 text-white" />}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-sm font-medium ${checked ? 'line-through text-green-700' : 'text-dark'}`}>{doc.label}</p>
                        {doc.required && <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-600">Required</span>}
                        {checked && <span className="text-xs text-green-600 font-medium">✓ Ready</span>}
                      </div>
                      {doc.warning && !checked && <p className="text-xs text-amber-600 mt-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{doc.warning}</p>}
                    </div>
                  </button>
                )
              })}
            </div>
            {requiredMissing.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800">Missing Required Documents!</p>
                  <p className="text-red-600 text-sm mt-1">{requiredMissing.slice(0, 3).map(d => d.label).join(', ')}{requiredMissing.length > 3 ? ` + ${requiredMissing.length - 3} more` : ''}</p>
                </div>
              </div>
            )}
            {requiredMissing.length === 0 && docProgress > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <p className="font-semibold text-green-800">All required documents ready! 🎉</p>
              </div>
            )}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
              <p className="font-semibold text-dark mb-3">📋 Consultancy Services</p>
              <div className="flex flex-wrap gap-2">
                {['Free Document Review', 'SOP Writing Help', 'Visa File Checking', 'Error Detection'].map(s => <span key={s} className="text-xs px-3 py-1.5 bg-primary text-white rounded-full font-medium">{s}</span>)}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: LANGUAGE */}
        {step === 6 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4"><Languages className="w-8 h-8 text-amber-600" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Language Requirement</h1>
              <p className="text-slate">Check if your IELTS score is enough for {country?.name}</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <div className="bg-white border border-border rounded-2xl p-6 mb-4">
                  <h3 className="font-display font-bold text-dark mb-4">Your IELTS Score</h3>
                  <div className="text-center mb-4"><span className="font-display font-extrabold text-dark text-6xl">{ieltsScore}</span><span className="text-slate text-lg ml-1">/ 9.0</span></div>
                  <input type="range" min="4" max="9" step="0.5" value={ieltsScore} onChange={e => setIeltsScore(Number(e.target.value))} className="w-full accent-amber-500 mb-2" />
                  <div className="flex justify-between text-xs text-slate"><span>4.0</span><span>6.0</span><span>9.0</span></div>
                  <div className="mt-4 p-3 rounded-xl text-sm font-medium" style={{ background: ieltsScore >= 7 ? '#ECFDF5' : ieltsScore >= 6 ? '#EFF6FF' : '#FFFBEB', color: ieltsScore >= 7 ? '#166534' : ieltsScore >= 6 ? '#1e40af' : '#92400e' }}>
                    {ieltsScore >= 7 ? '🎉 Excellent! All countries available' : ieltsScore >= 6.5 ? '✅ Very Good! Australia, Canada, UK, Germany' : ieltsScore >= 6 ? '✅ Good! Australia, Canada, NZ, UK' : ieltsScore >= 5.5 ? '⚠️ Average — UK some colleges, foundation programs' : '❌ Low — Japan/Korea language programs or improve score'}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                  <h3 className="font-display font-bold text-dark mb-3">🎯 IELTS बिना Option:</h3>
                  <div className="space-y-2">
                    {[{ c: '🇯🇵 Japan', t: 'JLPT N4/N5', n: 'Language school first' }, { c: '🇰🇷 Korea', t: 'TOPIK Level 2', n: 'GKS scholarship available' }, { c: '🇩🇪 Germany', t: 'B2 German', n: 'Free tuition' }, { c: '🇬🇧 UK', t: 'Internal test', n: 'Some colleges' }].map(({ c, t, n }) => (
                      <div key={c} className="flex items-start gap-2 bg-white rounded-lg p-2.5">
                        <span className="text-base">{c.split(' ')[0]}</span>
                        <div><p className="text-xs font-semibold text-dark">{c.split(' ').slice(1).join(' ')}</p><p className="text-xs text-slate">{t} · {n}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white border border-border rounded-2xl p-5">
                <h3 className="font-display font-bold text-dark mb-4">Countries You Qualify For</h3>
                <div className="space-y-2">
                  {studyCountries.map(c => {
                    const ok = ieltsEligible.some(e => e.name === c.name)
                    return (
                      <div key={c.name} className={`flex items-center justify-between p-3 rounded-xl ${ok ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-100'}`}>
                        <div className="flex items-center gap-2"><span className="text-lg">{c.flag}</span><div><p className="text-sm font-semibold text-dark">{c.name}</p><p className="text-xs text-slate">{c.ielts}</p></div></div>
                        {ok ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-400" />}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: COUNSELLOR */}
        {step === 7 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4"><Users className="w-8 h-8 text-green-600" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Find Your Counsellor</h1>
              <p className="text-slate">Journey complete! Connect with a verified expert</p>
            </div>
            <div className="bg-surface rounded-2xl p-5 mb-8 border border-border">
              <h3 className="font-display font-bold text-dark mb-4">Your Journey Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Purpose', val: purposeOptions.find(p => p.id === purpose)?.label || '—' },
                  { label: 'Country', val: country ? `${country.flag} ${country.name}` : '—' },
                  { label: 'Course', val: selectedCourse?.name || '—' },
                  { label: 'University', val: selectedUni ? (extendedUniversities.find(u => u.id === selectedUni)?.name || '—') : '—' },
                  { label: 'Budget (NPR)', val: `~${Math.round(nprEstimate / 100000)}L` },
                  { label: 'IELTS', val: String(ieltsScore) },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-white rounded-xl p-3 shadow-sm"><p className="text-xs text-slate">{label}</p><p className="text-sm font-bold text-dark mt-0.5 truncate">{val}</p></div>
                ))}
              </div>
            </div>
            <h3 className="font-display font-bold text-dark text-xl mb-4">Counsellors for {country?.name || 'Study Abroad'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {(matchedCounsellors.length > 0 ? matchedCounsellors : counsellors).slice(0, 3).map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-border p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <img src={c.photo} alt={c.name} className="w-14 h-14 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      {c.verified && <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center"><BadgeCheck className="w-3 h-3 text-white" /></div>}
                    </div>
                    <div>
                      <p className="font-display font-bold text-dark">{c.name}</p>
                      <p className="text-xs text-slate">{c.consultancy}</p>
                      <div className="flex items-center gap-1 mt-0.5"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-xs font-bold">{c.rating}</span><span className="text-xs text-slate">({c.reviews})</span></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">{c.countries.map(cn => <span key={cn} className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">{cn}</span>)}</div>
                  <p className="text-xs text-slate mb-3">{c.experience}yr exp · {c.students}+ students</p>
                  <button onClick={() => setShowConnect(true)} className="w-full bg-[#25D366] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#1ea855] transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Connect via WhatsApp
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/counsellors" className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold py-3.5 rounded-xl hover:bg-primary hover:text-white transition-all">View All Counsellors <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/consultancies" className="flex-1 flex items-center justify-center gap-2 border-2 border-border text-dark font-bold py-3.5 rounded-xl hover:border-primary hover:text-primary transition-all">Browse Consultancies</Link>
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-6 py-3 border-2 border-border rounded-xl font-semibold text-sm text-slate hover:border-primary hover:text-primary transition-all">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2 px-6 py-3 border-2 border-border rounded-xl font-semibold text-sm text-slate hover:border-primary hover:text-primary transition-all">
              <ChevronLeft className="w-4 h-4" /> Home
            </Link>
          )}
          <div className="text-center">
            <p className="text-xs text-slate">{STEPS[step - 1]?.label}</p>
            <p className="text-xs text-primary font-medium">{step} of {STEPS.length}</p>
          </div>
          {step < STEPS.length ? (
            <button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              {step === 3 ? 'Calculate Budget' : step === 6 ? 'Find Counsellor' : 'Continue'} <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={() => setShowConnect(true)} className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold text-sm hover:bg-[#1ea855]">
              <MessageCircle className="w-4 h-4" /> Connect Now
            </button>
          )}
        </div>
      </div>

      {/* Connect modal */}
      {showConnect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => setShowConnect(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
            <button onClick={() => setShowConnect(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center"><X className="w-4 h-4 text-slate" /></button>
            {connected ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-3" />
                <h3 className="font-display font-bold text-dark text-xl mb-2">Opening WhatsApp!</h3>
                <p className="text-slate text-sm">Connecting you with a counsellor...</p>
              </div>
            ) : (
              <>
                <h3 className="font-display font-bold text-dark text-xl mb-2">Connect with Counsellor</h3>
                <p className="text-slate text-sm mb-1">Country: <strong>{country?.name || 'Not selected'}</strong></p>
                <p className="text-slate text-sm mb-6">Course: <strong>{selectedCourse?.name || 'Not selected'}</strong></p>
                <div className="space-y-4 mb-5">
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Your Full Name *</label><input type="text" placeholder="e.g. Ram Prasad Sharma" value={connectForm.name} onChange={e => setConnectForm({ ...connectForm, name: e.target.value })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Your Phone *</label><input type="tel" placeholder="+977 98XXXXXXXX" value={connectForm.phone} onChange={e => setConnectForm({ ...connectForm, phone: e.target.value })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                </div>
                <button onClick={handleConnect} disabled={!connectForm.name || !connectForm.phone} className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl hover:bg-[#1ea855] transition-colors flex items-center justify-center gap-2 disabled:opacity-40">
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
