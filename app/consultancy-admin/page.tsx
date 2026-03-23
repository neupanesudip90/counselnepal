'use client'
import { useState } from 'react'
import { consultancies, counsellors, events, successStories, analytics, promos, promoTopics } from '../data'
import { Users, Star, Calendar, Play, TrendingUp, MessageCircle, Edit2, Plus, X, ArrowUpRight, BadgeCheck, Eye, BookOpen, Trash2, ToggleRight } from 'lucide-react'
import Link from 'next/link'

const MY_ID = 1
const statusColors: Record<string, string> = { new: 'bg-blue-100 text-blue-700', contacted: 'bg-amber-100 text-amber-700', converted: 'bg-green-100 text-green-700', closed: 'bg-slate-100 text-slate-600' }

export default function ConsultancyAdminPage() {
  const consultancy = consultancies.find((c) => c.id === MY_ID)!
  const myCounsellors = counsellors.filter((c) => c.consultancyId === MY_ID)
  const myEvents = events.filter((e) => e.consultancyId === MY_ID)
  const myStories = successStories.filter((s) => s.consultancyId === MY_ID)
  const myLeads = analytics.recentLeads.filter((l) => l.consultancy === 'Global Reach')
  const myPromos = promos.filter((p) => p.consultancyId === MY_ID)
  const [activeTab, setActiveTab] = useState<'overview' | 'counsellors' | 'events' | 'stories' | 'promos' | 'leads'>('overview')
  const [showModal, setShowModal] = useState<string | null>(null)

  const stats = [
    { label: 'Total Leads', value: 487, icon: TrendingUp, change: '+12%', color: 'bg-primary/10 text-primary' },
    { label: 'WhatsApp Contacts', value: 312, icon: MessageCircle, change: '+8%', color: 'bg-green-100 text-green-600' },
    { label: 'My Promos', value: myPromos.length, icon: BookOpen, change: '', color: 'bg-amber-100 text-amber-600' },
    { label: 'Upcoming Events', value: myEvents.length, icon: Calendar, change: '', color: 'bg-violet-100 text-violet-600' },
  ]

  const tabs = [['overview', 'Overview'], ['counsellors', `Counsellors (${myCounsellors.length})`], ['events', `Events (${myEvents.length})`], ['stories', `Stories (${myStories.length})`], ['promos', `Promos (${myPromos.length})`], ['leads', 'My Leads']] as const

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ background: consultancy.color }}>{consultancy.logo}</div>
          <div><p className="font-display font-bold text-dark text-sm">{consultancy.name}</p><p className="text-slate text-xs">Consultancy Dashboard</p></div>
        </div>
        <div className="flex items-center gap-3">
          {consultancy.verified && <span className="flex items-center gap-1 text-xs text-primary font-semibold bg-primary/8 px-2.5 py-1 rounded-full"><BadgeCheck className="w-3 h-3" /> Verified</span>}
          <Link href={`/consultancies/${MY_ID}`} className="text-sm text-slate hover:text-dark flex items-center gap-1"><Eye className="w-4 h-4" /> View Public Profile</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white p-1 rounded-xl mb-8 w-fit border border-border overflow-x-auto">
          {tabs.map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-primary text-white' : 'text-slate hover:text-dark'}`}>{label}</button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map(({ label, value, icon: Icon, change, color }) => (
                <div key={label} className="bg-white rounded-2xl border border-border p-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
                  <p className="font-display font-bold text-dark text-2xl">{value}</p>
                  <p className="text-slate text-xs">{label}</p>
                  {change && <p className="text-green-600 text-xs font-medium flex items-center gap-0.5 mt-1"><ArrowUpRight className="w-3 h-3" />{change}</p>}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4"><h2 className="font-display font-bold text-dark text-lg">Consultancy Profile</h2><button className="flex items-center gap-1 text-sm text-primary"><Edit2 className="w-3.5 h-3.5" /> Edit</button></div>
                <div className="space-y-2 text-sm">
                  {[['Name', consultancy.name], ['Location', consultancy.location], ['Phone', consultancy.phone], ['Email', consultancy.email]].map(([k, v]) => (
                    <div key={k} className="flex gap-3 py-1.5 border-b border-border last:border-0"><span className="text-slate w-20 flex-shrink-0">{k}</span><span className="text-dark font-medium">{v}</span></div>
                  ))}
                </div>
              </div>
              {/* Recent leads */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4"><h2 className="font-display font-bold text-dark text-lg">Recent Leads</h2><button onClick={() => setActiveTab('leads')} className="text-sm text-primary hover:underline">View all</button></div>
                <div className="space-y-3">
                  {myLeads.slice(0, 4).map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{lead.student[0]}</div>
                        <div><p className="text-sm font-medium text-dark">{lead.student}</p><p className="text-xs text-slate">{lead.destination} · {lead.course}</p></div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${statusColors[lead.status]}`}>{lead.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COUNSELLORS */}
        {activeTab === 'counsellors' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-dark text-xl">My Counsellors</h2>
              <button onClick={() => setShowModal('counsellor')} className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Counsellor</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {myCounsellors.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-border p-5 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={c.photo} alt={c.name} className="w-12 h-12 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      <div><p className="font-display font-semibold text-dark text-sm">{c.name}</p><p className="text-xs text-slate">{c.experience}y exp</p><div className="flex items-center gap-1 mt-0.5"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-xs">{c.rating}</span></div></div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-primary/10 text-slate hover:text-primary opacity-0 group-hover:opacity-100"><Edit2 className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">{c.countries.map((cn) => <span key={cn} className="px-2 py-0.5 bg-primary/8 text-primary text-xs rounded-full">{cn}</span>)}</div>
                  <div className="flex items-center justify-between text-xs text-slate pt-3 border-t border-border">
                    <span>{c.students}+ students</span>
                    <span className="flex items-center gap-1 text-[#25D366]"><MessageCircle className="w-3 h-3" /> {c.whatsapp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS */}
        {activeTab === 'events' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-dark text-xl">My Events</h2>
              <button onClick={() => setShowModal('event')} className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Event</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {myEvents.map((e) => (
                <div key={e.id} className="bg-white rounded-2xl border border-border overflow-hidden group">
                  <div className="relative h-40 overflow-hidden">
                    <img src={e.image} alt={e.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: e.color }}>{e.type}</span>
                      {e.free && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500 text-white">Free</span>}
                    </div>
                    <button className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100"><Edit2 className="w-3.5 h-3.5 text-slate" /></button>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-dark mb-2">{e.title}</h3>
                    <div className="flex items-center justify-between text-xs mb-2"><span className="text-slate">{e.registered}/{e.seats} registered</span><span className="font-medium text-dark">{Math.round((e.registered / e.seats) * 100)}% full</span></div>
                    <div className="w-full bg-border rounded-full h-1.5"><div className="h-1.5 rounded-full" style={{ width: `${(e.registered / e.seats) * 100}%`, background: e.color }} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STORIES */}
        {activeTab === 'stories' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-dark text-xl">Success Stories</h2>
              <button onClick={() => setShowModal('story')} className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Story</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {myStories.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-border overflow-hidden group">
                  <div className="relative h-44 overflow-hidden">
                    <img src={s.thumbnail} alt={s.name} className="w-full h-full object-cover" />
                    {s.type === 'video' && <div className="absolute inset-0 bg-dark/40 flex items-center justify-center"><Play className="w-8 h-8 text-white fill-white" /></div>}
                    <div className="absolute top-3 left-3 bg-white/90 text-dark text-xs font-semibold px-2 py-0.5 rounded-full">{s.type === 'video' ? '🎬 Video' : '📝 Text'}</div>
                    <button className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100"><Edit2 className="w-3.5 h-3.5 text-slate" /></button>
                  </div>
                  <div className="p-4"><h3 className="font-display font-semibold text-dark text-sm">{s.name}</h3><p className="text-primary text-xs">{s.university} · {s.country}</p><p className="text-slate text-xs mt-1 italic line-clamp-2">"{s.quote}"</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROMOS */}
        {activeTab === 'promos' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div><h2 className="font-display font-bold text-dark text-xl">My Promos / Guides</h2><p className="text-slate text-sm mt-1">Published guides go live immediately and are visible to all students</p></div>
              <button onClick={() => setShowModal('promo')} className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700"><Plus className="w-4 h-4" /> Write Promo</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myPromos.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl border border-border overflow-hidden group">
                  <div className="relative h-40 overflow-hidden">
                    <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3"><span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: consultancy.color }}>{p.topicLabel}</span></div>
                    <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100">
                      <button className="p-1.5 bg-white/90 rounded-lg"><Edit2 className="w-3.5 h-3.5 text-slate" /></button>
                      <button className="p-1.5 bg-white/90 rounded-lg"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-dark text-sm mb-1 line-clamp-2">{p.title}</h3>
                    <p className="text-slate text-xs mb-3 line-clamp-2">{p.summary}</p>
                    <div className="flex items-center justify-between text-xs text-slate pt-3 border-t border-border">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{p.views} views</span>
                      <span className="flex items-center gap-1 text-green-600 font-medium"><ToggleRight className="w-4 h-4" /> Live</span>
                      <Link href={`/resources/${p.id}`} className="text-primary font-medium hover:underline">View →</Link>
                    </div>
                  </div>
                </div>
              ))}
              {myPromos.length === 0 && (
                <div className="col-span-3 text-center py-16 border-2 border-dashed border-border rounded-2xl">
                  <BookOpen className="w-10 h-10 text-slate mx-auto mb-3" />
                  <p className="font-display font-bold text-dark">No promos yet</p>
                  <p className="text-slate text-sm mt-1">Write your first guide to attract students</p>
                  <button onClick={() => setShowModal('promo')} className="mt-4 bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700">Write Promo</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LEADS */}
        {activeTab === 'leads' && (
          <div>
            <div className="flex items-center justify-between mb-6"><h2 className="font-display font-bold text-dark text-xl">My Leads</h2><span className="text-slate text-sm">{myLeads.length} total</span></div>
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <table className="w-full">
                <thead><tr className="border-b border-border bg-surface">{['Student', 'Destination', 'Course', 'Counsellor', 'Date', 'Status'].map((h) => <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate uppercase tracking-wide">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-border">
                  {myLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-surface">
                      <td className="px-5 py-4"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{lead.student[0]}</div><span className="text-sm font-medium text-dark">{lead.student}</span></div></td>
                      <td className="px-5 py-4 text-sm text-slate">{lead.destination}</td>
                      <td className="px-5 py-4 text-sm text-slate">{lead.course}</td>
                      <td className="px-5 py-4 text-sm text-slate">{lead.counsellor}</td>
                      <td className="px-5 py-4 text-xs text-slate">{lead.date}</td>
                      <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[lead.status]}`}>{lead.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={() => setShowModal(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center"><X className="w-4 h-4 text-slate" /></button>
            <h2 className="font-display font-bold text-dark text-xl mb-6">
              {showModal === 'counsellor' ? 'Add Counsellor' : showModal === 'event' ? 'Add Event' : showModal === 'story' ? 'Add Success Story' : 'Write Promo Guide'}
            </h2>
            <div className="space-y-4">
              {showModal === 'promo' && (
                <>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Topic *</label>
                    <select className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary bg-white">
                      <option value="">Select topic</option>
                      {promoTopics.map((t) => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
                    </select>
                  </div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Title *</label><input type="text" placeholder="e.g. Australia मा IELTS बिना जान सकिन्छ?" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Summary (shown in card) *</label><textarea rows={2} placeholder="Brief summary students will see before reading..." className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary resize-none" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Full Content *</label><textarea rows={8} placeholder="Write your guide here. You can use ## for headings, - for bullet points..." className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary resize-none font-mono" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Thumbnail Image URL</label><input type="url" placeholder="https://..." className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div className="bg-primary/8 rounded-xl p-3"><p className="text-primary text-xs font-medium">✓ Your promo will go live immediately after publishing</p><p className="text-slate text-xs mt-1">Platform admin can remove if it violates guidelines</p></div>
                </>
              )}
              {showModal === 'counsellor' && (
                <>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Full Name *</label><input type="text" placeholder="e.g. Priya Sharma" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">WhatsApp Number *</label><input type="tel" placeholder="9779XXXXXXXXX" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Experience (years)</label><input type="number" placeholder="e.g. 5" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Bio</label><textarea rows={3} placeholder="Brief description..." className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary resize-none" /></div>
                </>
              )}
              {showModal === 'event' && (
                <>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Event Title *</label><input type="text" placeholder="e.g. Australia University Fair" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Date *</label><input type="date" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                    <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Time</label><input type="text" placeholder="10AM - 4PM" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  </div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Location *</label><input type="text" placeholder="e.g. Hotel Annapurna, Kathmandu" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Description</label><textarea rows={3} placeholder="Event details..." className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary resize-none" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Total Seats</label><input type="number" placeholder="e.g. 100" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                </>
              )}
              {showModal === 'story' && (
                <>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Story Type</label>
                    <div className="flex gap-3"><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="type" value="video" defaultChecked /> <span className="text-sm">🎬 Video Story</span></label><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="type" value="text" /> <span className="text-sm">📝 Text Testimonial</span></label></div>
                  </div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Student Name *</label><input type="text" placeholder="e.g. Aarav KC" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">University *</label><input type="text" placeholder="University name" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                    <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Country</label><input type="text" placeholder="e.g. Australia" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  </div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Video URL (if video)</label><input type="url" placeholder="https://..." className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Quote / Testimonial *</label><textarea rows={3} placeholder="Student's experience in their own words..." className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary resize-none" /></div>
                </>
              )}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(null)} className="flex-1 border border-border text-slate py-3 rounded-xl text-sm font-semibold hover:bg-surface">Cancel</button>
                <button onClick={() => setShowModal(null)} className="flex-1 bg-primary text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-700">{showModal === 'promo' ? 'Publish Now' : 'Save'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
