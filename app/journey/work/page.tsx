'use client'
import { useState } from 'react'
import Link from 'next/link'
import { counsellors } from '../../data'
import {
  ChevronLeft, ChevronRight, Briefcase, Globe, Wrench,
  Calculator, FileText, Languages, Users, Check, ArrowRight,
  Star, BadgeCheck, MessageCircle, AlertTriangle, CheckCircle2,
  DollarSign, Clock, Shield, Info, TrendingUp, Award, X
} from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Work Type', icon: Briefcase },
  { id: 2, label: 'Country', icon: Globe },
  { id: 3, label: 'Job / Skill', icon: Wrench },
  { id: 4, label: 'Budget', icon: Calculator },
  { id: 5, label: 'Documents', icon: FileText },
  { id: 6, label: 'Language', icon: Languages },
  { id: 7, label: 'Counsellor', icon: Users },
]

const workTypes = [
  { id: 'skilled', label: 'Skilled Worker', desc: 'IT, Engineering, Healthcare — professional qualification required', icon: '💻' },
  { id: 'trade', label: 'Trade / Vocational', desc: 'Electrician, Plumber, Welder, Carpenter', icon: '🔧' },
  { id: 'healthcare', label: 'Healthcare Worker', desc: 'Nurse, Caregiver, Medical technician', icon: '🏥' },
  { id: 'hospitality', label: 'Hospitality / Service', desc: 'Hotel, Restaurant, Tourism industry', icon: '🍽️' },
  { id: 'construction', label: 'Construction', desc: 'Builder, Mason, Civil work', icon: '🏗️' },
  { id: 'pr', label: 'Work → PR pathway', desc: 'Work with long-term PR goal in mind', icon: '🏠' },
]

const workCountries = [
  { name: 'Australia', flag: '🇦🇺', color: '#2563EB', visaType: 'TSS 482 / Skilled Migration', salaryRange: 'AUD 50K–120K/yr', jobDemand: 'Very High', pr: 'Employer sponsored PR possible', workHours: 'Full time (38hrs)', topJobs: ['IT', 'Nursing', 'Engineering', 'Trades'], image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' },
  { name: 'Canada', flag: '🇨🇦', color: '#DC2626', visaType: 'LMIA / Express Entry', salaryRange: 'CAD 45K–100K/yr', jobDemand: 'High', pr: 'Express Entry after 1 year work', workHours: 'Full time (40hrs)', topJobs: ['IT', 'Nursing', 'Trucking', 'Construction'], image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80' },
  { name: 'UK', flag: '🇬🇧', color: '#7C3AED', visaType: 'Skilled Worker Visa', salaryRange: 'GBP 25K–80K/yr', jobDemand: 'Medium', pr: 'ILR after 5 years', workHours: 'Full time (37.5hrs)', topJobs: ['Healthcare', 'IT', 'Finance', 'Engineering'], image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80' },
  { name: 'Japan', flag: '🇯🇵', color: '#D97706', visaType: 'Specified Skilled Worker (SSW)', salaryRange: 'JPY 150K–350K/mo', jobDemand: 'High', pr: 'After 5yr continuous stay', workHours: '40hrs/week', topJobs: ['Manufacturing', 'Food Service', 'Construction', 'IT'], image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80' },
  { name: 'Germany', flag: '🇩🇪', color: '#0891B2', visaType: 'EU Blue Card / Skilled Worker', salaryRange: 'EUR 2,500–6,000/mo', jobDemand: 'Very High', pr: 'After 5yr or 33mo (Blue Card)', workHours: '38–40hrs/week', topJobs: ['Engineering', 'IT', 'Healthcare', 'Trades'], image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80' },
  { name: 'UAE / Dubai', flag: '🇦🇪', color: '#059669', visaType: 'Employment Visa', salaryRange: 'AED 4K–25K/mo (tax free)', jobDemand: 'Medium', pr: 'No PR — renewable visa', workHours: '40–48hrs/week', topJobs: ['Construction', 'Hospitality', 'IT', 'Finance'], image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80' },
]

const jobSkills = [
  { id: 'it', name: 'IT / Software Developer', category: 'Skilled', demand: 'Very High', salary: 'AUD 80K–130K', certNeeded: 'Degree / Portfolio', ieltsMin: 6.0, countries: ['Australia', 'Canada', 'Germany', 'UK'], upgradeNote: 'Learn cloud (AWS/Azure) for higher salary', icon: '💻' },
  { id: 'nurse', name: 'Registered Nurse', category: 'Healthcare', demand: 'Very High', salary: 'AUD 65K–95K', certNeeded: 'Nursing degree + AHPRA registration', ieltsMin: 7.0, countries: ['Australia', 'Canada', 'UK'], upgradeNote: 'Specialization (ICU, ED) increases pay', icon: '🏥' },
  { id: 'electrician', name: 'Electrician', category: 'Trade', demand: 'Very High', salary: 'AUD 60K–100K', certNeeded: 'Trade cert + local license', ieltsMin: 5.0, countries: ['Australia', 'Canada'], upgradeNote: 'Red Seal (Canada) = national recognition', icon: '⚡' },
  { id: 'chef', name: 'Chef / Cook', category: 'Hospitality', demand: 'High', salary: 'AUD 45K–75K', certNeeded: 'Certificate III Hospitality', ieltsMin: 5.0, countries: ['Australia', 'Canada', 'UK', 'UAE / Dubai'], upgradeNote: 'Head chef experience = faster PR', icon: '👨‍🍳' },
  { id: 'engineer', name: 'Civil / Mechanical Engineer', category: 'Skilled', demand: 'High', salary: 'AUD 70K–110K', certNeeded: 'Engineering degree + Engineers Australia', ieltsMin: 6.0, countries: ['Australia', 'Canada', 'Germany'], upgradeNote: 'PMP certification adds value', icon: '⚙️' },
  { id: 'caregiver', name: 'Aged Care / Disability Worker', category: 'Healthcare', demand: 'Very High', salary: 'AUD 45K–65K', certNeeded: 'Certificate III Individual Support', ieltsMin: 5.0, countries: ['Australia', 'Canada'], upgradeNote: 'Easiest path to Australia PR', icon: '❤️' },
  { id: 'construction', name: 'Construction Worker', category: 'Trade', demand: 'High', salary: 'AUD 50K–85K', certNeeded: 'White Card + trade cert', ieltsMin: 4.5, countries: ['Australia', 'UAE / Dubai'], upgradeNote: 'Site supervisor = salary jump', icon: '🏗️' },
  { id: 'driver', name: 'Truck / Heavy Vehicle Driver', category: 'Trade', demand: 'High', salary: 'CAD 55K–80K', certNeeded: 'Commercial license', ieltsMin: 4.5, countries: ['Canada', 'Australia'], upgradeNote: 'Canada has massive shortage', icon: '🚛' },
]

const workDocuments = [
  { id: 'passport', label: 'Valid Passport (6+ months validity)', required: true, warning: null },
  { id: 'cv', label: 'Updated CV / Resume', required: true, warning: 'Must match destination country format' },
  { id: 'degree', label: 'Educational Certificates', required: true, warning: null },
  { id: 'experience', label: 'Work Experience Letters', required: true, warning: 'Must show job title, duration, responsibilities' },
  { id: 'skill_cert', label: 'Skill / Trade Certification', required: true, warning: 'Must be recognized in destination country' },
  { id: 'police', label: 'Police Clearance Certificate', required: true, warning: 'Must be recent (within 6 months)' },
  { id: 'medical', label: 'Medical Certificate', required: true, warning: 'From approved panel physician' },
  { id: 'ielts', label: 'IELTS / PTE / Language Test', required: false, warning: 'Required for most English-speaking countries' },
  { id: 'job_offer', label: 'Job Offer Letter (if applicable)', required: false, warning: 'Required for sponsored visas' },
  { id: 'reference', label: 'Reference Letters', required: false, warning: 'From previous employers' },
  { id: 'bank', label: 'Bank Statement', required: false, warning: 'Some countries require financial proof' },
]

export default function WorkJourneyPage() {
  const [step, setStep] = useState(1)
  const [workType, setWorkType] = useState('')
  const [country, setCountry] = useState<typeof workCountries[0] | null>(null)
  const [selectedJob, setSelectedJob] = useState<typeof jobSkills[0] | null>(null)
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({})
  const [ieltsScore, setIeltsScore] = useState(5.5)
  const [budgetDuration, setBudgetDuration] = useState(1)
  const [showConnect, setShowConnect] = useState(false)
  const [connectForm, setConnectForm] = useState({ name: '', phone: '', skill: '' })
  const [connected, setConnected] = useState(false)

  const docProgress = workDocuments.filter(d => checkedDocs[d.id]).length
  const requiredMissing = workDocuments.filter(d => d.required && !checkedDocs[d.id])
  const filteredJobs = jobSkills.filter(j => country && j.countries.includes(country.name))
  const matchedCounsellors = counsellors.filter(c => country && c.countries.some(cn => cn === country.name || country.name.includes(cn)))

  // Work budget estimate
  const monthlySaving = country?.name === 'Australia' ? 2000 : country?.name === 'Canada' ? 1500 : country?.name === 'UK' ? 1200 : country?.name === 'Germany' ? 1500 : country?.name === 'Japan' ? 800 : 1200
  const visaCost = country?.name === 'Australia' ? 315 : country?.name === 'Canada' ? 155 : country?.name === 'UK' ? 610 : 200
  const relocationCost = 1500 // air ticket + initial setup

  const handleConnect = () => {
    if (!connectForm.name || !connectForm.phone) return
    setConnected(true)
    const counsellor = matchedCounsellors[0] || counsellors[0]
    const msg = encodeURIComponent(`Hi, I am ${connectForm.name}. I want to work in ${country?.name}. Skill/Job: ${selectedJob?.name || connectForm.skill}. Phone: ${connectForm.phone}. I found you on CounselNepal.`)
    setTimeout(() => {
      window.open(`https://wa.me/${counsellor.whatsapp}?text=${msg}`, '_blank')
      setShowConnect(false)
      setConnected(false)
    }, 1500)
  }

  const canProceed = () => {
    if (step === 1) return !!workType
    if (step === 2) return !!country
    if (step === 3) return !!selectedJob
    return true
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-slate hover:text-dark text-sm"><ChevronLeft className="w-4 h-4" /> Home</Link>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs text-slate font-medium">Work Abroad Journey</p>
              <p className="text-xs text-slate">Step {step} of {STEPS.length}</p>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${(step / STEPS.length) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto">
          {STEPS.map((s) => {
            const Icon = s.icon
            const done = s.id < step
            const active = s.id === step
            return (
              <button key={s.id} onClick={() => s.id < step && setStep(s.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${active ? 'bg-green-600 text-white' : done ? 'bg-green-100 text-green-700 cursor-pointer' : 'bg-surface text-slate cursor-not-allowed'}`}>
                {done ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}{s.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="pt-32 pb-24 max-w-4xl mx-auto px-4">

        {/* STEP 1: WORK TYPE */}
        {step === 1 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4"><Briefcase className="w-8 h-8 text-green-600" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">What Type of Work?</h1>
              <p className="text-slate">Your work type determines which countries and visas are available</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {workTypes.map((opt) => (
                <button key={opt.id} onClick={() => setWorkType(opt.id)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all card-hover ${workType === opt.id ? 'border-green-500 bg-green-50 shadow-lg' : 'border-border bg-white hover:border-green-300'}`}>
                  <div className="text-3xl mb-3">{opt.icon}</div>
                  <h3 className="font-display font-bold text-dark text-base mb-1">{opt.label}</h3>
                  <p className="text-slate text-sm">{opt.desc}</p>
                  {workType === opt.id && <div className="mt-3 flex items-center gap-1 text-green-600 text-xs font-semibold"><Check className="w-3.5 h-3.5" /> Selected</div>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: COUNTRY */}
        {step === 2 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4"><Globe className="w-8 h-8 text-blue-600" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Select Work Destination</h1>
              <p className="text-slate">Compare countries by salary, job demand, visa type and PR pathway</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {workCountries.map((c) => (
                <button key={c.name} onClick={() => setCountry(c)}
                  className={`text-left rounded-2xl border-2 overflow-hidden transition-all ${country?.name === c.name ? 'border-green-500 shadow-xl' : 'border-border hover:border-green-300'}`}>
                  <div className="relative h-24 overflow-hidden">
                    <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="text-2xl">{c.flag}</span>
                      <h3 className="font-display font-bold text-white text-xl">{c.name}</h3>
                    </div>
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{c.jobDemand} Demand</div>
                    {country?.name === c.name && <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><Check className="w-3 h-3" /> Selected</div>}
                  </div>
                  <div className="p-4 bg-white">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {[
                        { label: 'Visa Type', val: c.visaType },
                        { label: 'Salary Range', val: c.salaryRange },
                        { label: 'Work Hours', val: c.workHours },
                        { label: 'PR Pathway', val: c.pr },
                      ].map(({ label, val }) => (
                        <div key={label} className="bg-surface rounded-lg p-2">
                          <p className="text-xs text-slate">{label}</p>
                          <p className="text-xs font-semibold text-dark mt-0.5">{val}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {c.topJobs.map(j => <span key={j} className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">{j}</span>)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: JOB / SKILL */}
        {step === 3 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-4"><Wrench className="w-8 h-8 text-orange-600" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Select Your Job / Skill</h1>
              <p className="text-slate">Available jobs in {country?.name} with salary and certification details</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(filteredJobs.length > 0 ? filteredJobs : jobSkills).map((job) => (
                <button key={job.id} onClick={() => setSelectedJob(job)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all ${selectedJob?.id === job.id ? 'border-orange-500 bg-orange-50 shadow-lg' : 'border-border bg-white hover:border-orange-300'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-3xl block mb-2">{job.icon}</span>
                      <h3 className="font-display font-bold text-dark">{job.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-orange-100 text-orange-700 mt-1 inline-block">{job.category}</span>
                    </div>
                    {selectedJob?.id === job.id && <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-surface rounded-lg p-2">
                      <p className="text-xs text-slate">Job Demand</p>
                      <p className="text-xs font-bold mt-0.5" style={{ color: job.demand.includes('Very') ? '#059669' : '#D97706' }}>{job.demand}</p>
                    </div>
                    <div className="bg-surface rounded-lg p-2">
                      <p className="text-xs text-slate">Avg Salary</p>
                      <p className="text-xs font-bold text-dark mt-0.5">{job.salary}</p>
                    </div>
                  </div>
                  <div className="bg-surface rounded-lg p-2 mb-2">
                    <p className="text-xs text-slate">Certification Needed</p>
                    <p className="text-xs font-semibold text-dark mt-0.5">{job.certNeeded}</p>
                  </div>
                  {/* Upgrade tip */}
                  <div className="flex items-start gap-1.5 bg-green-50 rounded-lg p-2">
                    <TrendingUp className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-green-700 font-medium">{job.upgradeNote}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: BUDGET */}
        {step === 4 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4"><Calculator className="w-8 h-8 text-green-600" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Work Budget Overview</h1>
              <p className="text-slate">Initial costs and potential savings in {country?.name}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Initial Visa Cost', icon: Shield, val: `~${country?.name === 'Australia' ? 'AUD 315' : country?.name === 'UK' ? 'GBP 610' : 'USD ' + visaCost}`, note: 'Work visa application fee', color: '#DC2626', bg: '#FEF2F2' },
                { label: 'Relocation Cost', icon: DollarSign, val: '~NPR 1.5–2L', note: 'Air ticket + initial setup', color: '#D97706', bg: '#FFFBEB' },
                { label: 'Monthly Savings', icon: TrendingUp, val: `~${country?.name === 'Australia' ? 'AUD 2,000' : country?.name === 'Canada' ? 'CAD 1,500' : country?.name === 'UAE / Dubai' ? 'AED 3,000' : 'EUR 1,500'}/mo`, note: 'After living expenses', color: '#059669', bg: '#ECFDF5' },
              ].map(({ label, icon: Icon, val, note, color, bg }) => (
                <div key={label} className="rounded-2xl p-5 border-l-4 shadow-sm" style={{ background: bg, borderColor: color }}>
                  <Icon className="w-6 h-6 mb-2" style={{ color }} />
                  <p className="text-xs text-slate mb-1">{label}</p>
                  <p className="font-display font-bold text-dark text-xl">{val}</p>
                  <p className="text-xs text-slate mt-1">{note}</p>
                </div>
              ))}
            </div>

            {/* Salary vs Expense breakdown */}
            <div className="bg-white border border-border rounded-2xl p-6 mb-5">
              <h3 className="font-display font-bold text-dark mb-4">Monthly Financial Overview in {country?.name}</h3>
              <div className="space-y-3">
                {[
                  { label: 'Expected Monthly Salary', val: selectedJob?.salary.split('–')[0] + '/mo (min)', positive: true },
                  { label: 'Rent / Accommodation', val: country?.name === 'Australia' ? 'AUD 600–1,200/mo' : country?.name === 'Canada' ? 'CAD 700–1,400/mo' : country?.name === 'UAE / Dubai' ? 'AED 1,500–3,000/mo' : 'EUR 500–1,000/mo', positive: false },
                  { label: 'Food & Groceries', val: country?.name === 'Australia' ? 'AUD 300–500/mo' : 'CAD 350–500/mo', positive: false },
                  { label: 'Transport', val: country?.name === 'Australia' ? 'AUD 100–200/mo' : 'CAD 100–150/mo', positive: false },
                  { label: 'Estimated Monthly Savings', val: country?.name === 'Australia' ? '~AUD 1,500–3,000/mo' : country?.name === 'Canada' ? '~CAD 1,000–2,500/mo' : '~Varies', positive: true },
                ].map(({ label, val, positive }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-dark">{label}</span>
                    <span className={`text-sm font-bold ${positive ? 'text-green-600' : 'text-red-500'}`}>{positive ? '+' : '-'} {val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration to recover */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h3 className="font-display font-bold text-dark mb-2">📊 Break-even Analysis</h3>
              <p className="text-slate text-sm">Total initial investment: <strong>NPR ~2–3 Lakhs</strong></p>
              <p className="text-slate text-sm mt-1">At monthly savings of {country?.name === 'Australia' ? 'AUD 2,000 (~NPR 1.7L)' : country?.name === 'UAE / Dubai' ? 'AED 3,000 (~NPR 1.1L)' : 'CAD 1,500 (~NPR 1.2L)'}: <strong>You recover costs in 2–3 months</strong></p>
              <div className="mt-3 p-3 bg-green-100 rounded-xl">
                <p className="text-green-800 text-sm font-semibold">✅ Work abroad is financially smart — costs recover fast</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: DOCUMENTS */}
        {step === 5 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-red-600" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Work Visa Documents</h1>
              <p className="text-slate">Documents required for work visa in {country?.name}</p>
            </div>
            <div className="bg-surface rounded-2xl p-4 mb-6 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2"><span className="font-semibold text-dark">Documents Ready</span><span className="text-slate">{docProgress} / {workDocuments.length}</span></div>
                <div className="h-3 bg-border rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${(docProgress / workDocuments.length) * 100}%`, background: '#059669' }} /></div>
              </div>
              <div className="text-center bg-white rounded-xl p-3 shadow-sm">
                <p className="font-display font-bold text-dark text-2xl">{Math.round((docProgress / workDocuments.length) * 100)}%</p>
                <p className="text-slate text-xs">Ready</p>
              </div>
            </div>
            <div className="space-y-2 mb-5">
              {workDocuments.map((doc) => {
                const checked = checkedDocs[doc.id]
                return (
                  <button key={doc.id} onClick={() => setCheckedDocs({ ...checkedDocs, [doc.id]: !checked })}
                    className={`w-full flex items-start gap-3 text-left p-4 rounded-xl border-2 transition-all ${checked ? 'bg-green-50 border-green-300' : 'bg-white border-border hover:border-primary/30'}`}>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${checked ? 'bg-green-500' : 'border-2 border-border'}`}>
                      {checked && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
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
            {requiredMissing.length === 0 && docProgress > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <p className="font-semibold text-green-800">All required documents ready! 🎉</p>
              </div>
            )}
          </div>
        )}

        {/* STEP 6: LANGUAGE */}
        {step === 6 && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4"><Languages className="w-8 h-8 text-amber-600" /></div>
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Language Requirement</h1>
              <p className="text-slate">Language requirement for working in {country?.name}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <div className="bg-white border border-border rounded-2xl p-6 mb-4">
                  <h3 className="font-display font-bold text-dark mb-4">Your Language Score</h3>
                  <div className="text-center mb-4">
                    <span className="font-display font-extrabold text-dark text-5xl">{ieltsScore}</span>
                    <span className="text-slate text-lg ml-1">/ 9.0</span>
                  </div>
                  <input type="range" min="0" max="9" step="0.5" value={ieltsScore} onChange={e => setIeltsScore(Number(e.target.value))} className="w-full accent-amber-500 mb-2" />
                  <p className="text-center text-xs text-slate">IELTS / PTE equivalent score</p>
                </div>

                {/* Country requirement */}
                <div className="bg-white border border-border rounded-2xl p-5">
                  <h3 className="font-display font-bold text-dark mb-3">Work Visa Language Requirements</h3>
                  <div className="space-y-2">
                    {[
                      { country: '🇦🇺 Australia', req: 'IELTS 5.0+ (varies by job)', min: 5.0 },
                      { country: '🇨🇦 Canada', req: 'CLB 4+ / IELTS 5.0+', min: 5.0 },
                      { country: '🇬🇧 UK', req: 'IELTS 4.0+ (Skilled Worker)', min: 4.0 },
                      { country: '🇯🇵 Japan', req: 'Japanese N4 (SSW visa)', min: 0 },
                      { country: '🇩🇪 Germany', req: 'German B1/B2 or English', min: 0 },
                      { country: '🇦🇪 UAE', req: 'Basic English sufficient', min: 0 },
                    ].map(({ country: cn, req, min }) => {
                      const ok = min === 0 || ieltsScore >= min
                      return (
                        <div key={cn} className={`flex items-center justify-between p-3 rounded-xl ${ok ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-100'}`}>
                          <div><p className="text-sm font-semibold text-dark">{cn}</p><p className="text-xs text-slate">{req}</p></div>
                          {ok ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-400" />}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div>
                {/* Low language tip */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-4">
                  <h3 className="font-display font-bold text-dark mb-3">💡 Language Tips for Workers</h3>
                  <div className="space-y-3">
                    {[
                      { tip: 'Trade workers (electrician, plumber) need less English', icon: '🔧' },
                      { tip: 'Japan SSW visa requires Japanese N4 — not IELTS', icon: '🇯🇵' },
                      { tip: 'UAE construction / hospitality — basic English enough', icon: '🇦🇪' },
                      { tip: 'Germany — German courses available in Nepal (Goethe Institut)', icon: '🇩🇪' },
                      { tip: 'Australia/Canada healthcare — IELTS 7.0 required for nurses', icon: '🏥' },
                    ].map(({ tip, icon }) => (
                      <div key={tip} className="flex items-start gap-2">
                        <span className="text-base flex-shrink-0">{icon}</span>
                        <p className="text-sm text-dark">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-border rounded-2xl p-5">
                  <h3 className="font-display font-bold text-dark mb-3">🎯 Skill Upgrade Suggestion</h3>
                  {selectedJob && (
                    <div className="space-y-2">
                      <div className="bg-green-50 rounded-xl p-3">
                        <p className="text-sm font-semibold text-green-800">{selectedJob.name}</p>
                        <p className="text-xs text-green-700 mt-1">📈 {selectedJob.upgradeNote}</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-3">
                        <p className="text-xs text-blue-800">Required certification: <strong>{selectedJob.certNeeded}</strong></p>
                        <p className="text-xs text-blue-600 mt-1">Minimum IELTS: {selectedJob.ieltsMin === 0 ? 'Not required' : selectedJob.ieltsMin}</p>
                      </div>
                    </div>
                  )}
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
              <h1 className="font-display font-extrabold text-dark text-3xl mb-2">Connect with a Counsellor</h1>
              <p className="text-slate">Your work abroad plan is ready! Now get expert guidance</p>
            </div>

            {/* Journey summary */}
            <div className="bg-surface rounded-2xl p-5 mb-8 border border-border">
              <h3 className="font-display font-bold text-dark mb-4">Your Work Abroad Plan</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Work Type', val: workTypes.find(w => w.id === workType)?.label || '—' },
                  { label: 'Country', val: country ? `${country.flag} ${country.name}` : '—' },
                  { label: 'Job / Skill', val: selectedJob?.name || '—' },
                  { label: 'Salary Range', val: selectedJob?.salary || '—' },
                  { label: 'Job Demand', val: selectedJob?.demand || '—' },
                  { label: 'Docs Ready', val: `${docProgress}/${workDocuments.length}` },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-white rounded-xl p-3 shadow-sm">
                    <p className="text-xs text-slate">{label}</p>
                    <p className="text-sm font-bold text-dark mt-0.5">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="font-display font-bold text-dark text-xl mb-4">Counsellors for {country?.name || 'Work Abroad'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {(matchedCounsellors.length > 0 ? matchedCounsellors : counsellors).slice(0, 3).map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-border p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <img src={c.photo} alt={c.name} className="w-14 h-14 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      {c.verified && <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"><BadgeCheck className="w-3 h-3 text-white" /></div>}
                    </div>
                    <div>
                      <p className="font-display font-bold text-dark">{c.name}</p>
                      <p className="text-xs text-slate">{c.consultancy}</p>
                      <div className="flex items-center gap-1 mt-0.5"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-xs font-bold">{c.rating}</span></div>
                    </div>
                  </div>
                  <p className="text-xs text-slate mb-3">{c.experience}yr exp · {c.students}+ clients</p>
                  <button onClick={() => setShowConnect(true)} className="w-full bg-[#25D366] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#1ea855] transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Connect via WhatsApp
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-6 py-3 border-2 border-border rounded-xl font-semibold text-sm text-slate hover:border-green-500 hover:text-green-600 transition-all">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2 px-6 py-3 border-2 border-border rounded-xl font-semibold text-sm text-slate hover:border-primary hover:text-primary transition-all">
              <ChevronLeft className="w-4 h-4" /> Home
            </Link>
          )}
          <div className="text-center">
            <p className="text-xs text-slate">{STEPS[step - 1]?.label}</p>
            <p className="text-xs text-green-600 font-medium">{step} of {STEPS.length}</p>
          </div>
          {step < STEPS.length ? (
            <button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              Continue <ChevronRight className="w-4 h-4" />
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
              </div>
            ) : (
              <>
                <h3 className="font-display font-bold text-dark text-xl mb-2">Connect with Counsellor</h3>
                <p className="text-slate text-sm mb-6">Country: <strong>{country?.name}</strong> · Job: <strong>{selectedJob?.name || 'Work Abroad'}</strong></p>
                <div className="space-y-4 mb-5">
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Your Full Name *</label><input type="text" placeholder="Full name" value={connectForm.name} onChange={e => setConnectForm({ ...connectForm, name: e.target.value })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Phone *</label><input type="tel" placeholder="+977 98XXXXXXXX" value={connectForm.phone} onChange={e => setConnectForm({ ...connectForm, phone: e.target.value })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Your Skill / Experience</label><input type="text" placeholder="e.g. 3 years cooking experience" value={connectForm.skill} onChange={e => setConnectForm({ ...connectForm, skill: e.target.value })} className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                </div>
                <button onClick={handleConnect} disabled={!connectForm.name || !connectForm.phone} className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-40">
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
