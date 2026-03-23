'use client'
import { analytics, promos, universities } from '../../data'
import { Users, MousePointerClick, TrendingUp, Eye, ArrowUpRight, MessageCircle, Clock, BookOpen, GraduationCap } from 'lucide-react'
import Link from 'next/link'

const statusColors: Record<string, string> = { new: 'bg-blue-100 text-blue-700', contacted: 'bg-amber-100 text-amber-700', converted: 'bg-green-100 text-green-700', closed: 'bg-slate-100 text-slate-600' }

export default function AnalyticsPage() {
  const stats = [
    { label: 'Total Visitors', value: analytics.totalVisitors.toLocaleString(), icon: Eye, change: '+12.4%', color: 'bg-primary/10 text-primary' },
    { label: 'Registered Students', value: analytics.totalLogins.toLocaleString(), icon: Users, change: '+8.1%', color: 'bg-cyan/10 text-cyan' },
    { label: 'Total Leads', value: analytics.totalLeads.toLocaleString(), icon: TrendingUp, change: '+15.3%', color: 'bg-violet-100 text-violet-600' },
    { label: 'WhatsApp Contacts', value: analytics.totalWhatsappClicks.toLocaleString(), icon: MessageCircle, change: '+18.7%', color: 'bg-green-100 text-green-600' },
    { label: 'Total Promos', value: promos.length.toLocaleString(), icon: BookOpen, change: '+5', color: 'bg-amber-100 text-amber-600' },
    { label: 'Universities Listed', value: universities.length.toLocaleString(), icon: GraduationCap, change: '', color: 'bg-rose-100 text-rose-600' },
  ]

  const funnelMax = analytics.totalVisitors
  const funnel = [
    { label: 'Visitors', value: analytics.totalVisitors, color: 'bg-primary' },
    { label: 'Logins', value: analytics.totalLogins, color: 'bg-cyan' },
    { label: 'Leads', value: analytics.totalLeads, color: 'bg-violet-500' },
    { label: 'WhatsApp', value: analytics.totalWhatsappClicks, color: 'bg-green-500' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-dark text-2xl mb-1">Analytics Dashboard</h1>
        <p className="text-slate text-sm">Platform performance overview</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        {stats.map(({ label, value, icon: Icon, change, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}><Icon className="w-5 h-5" /></div>
              {change && <span className="flex items-center gap-0.5 text-green-600 text-xs font-semibold"><ArrowUpRight className="w-3 h-3" />{change}</span>}
            </div>
            <p className="font-display font-extrabold text-dark text-2xl">{value}</p>
            <p className="text-slate text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-display font-bold text-dark mb-5">Conversion Funnel</h2>
          <div className="space-y-4">
            {funnel.map(({ label, value, color }) => {
              const pct = Math.round((value / funnelMax) * 100)
              return (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1.5"><span className="font-medium text-dark">{label}</span><span className="text-slate">{value.toLocaleString()} ({pct}%)</span></div>
                  <div className="h-2.5 bg-surface rounded-full overflow-hidden"><div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} /></div>
                </div>
              )
            })}
          </div>
          <div className="mt-5 pt-5 border-t border-border"><p className="text-xs text-slate">Overall conversion</p><p className="font-display font-bold text-dark text-2xl mt-1">{analytics.conversionRate}%</p></div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-display font-bold text-dark mb-5">Top Destinations</h2>
          <div className="space-y-3">
            {analytics.topCountries.map(({ country, leads }, i) => {
              const pct = Math.round((leads / analytics.topCountries[0].leads) * 100)
              return (
                <div key={country} className="flex items-center gap-3">
                  <span className="w-5 text-xs text-slate font-medium">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1"><span className="font-medium text-dark">{country}</span><span className="text-slate">{leads}</span></div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} /></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-display font-bold text-dark mb-5">Leads by Consultancy</h2>
          <div className="space-y-3">
            {analytics.leadsPerConsultancy.map(({ name, leads }, i) => {
              const pct = Math.round((leads / analytics.leadsPerConsultancy[0].leads) * 100)
              const colors = ['bg-primary', 'bg-cyan', 'bg-violet-500', 'bg-amber-400', 'bg-green-500']
              return (
                <div key={name} className="flex items-center gap-3">
                  <span className="w-5 text-xs text-slate">#{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1"><span className="font-medium text-dark">{name}</span><span className="text-slate">{leads}</span></div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden"><div className={`h-full ${colors[i]} rounded-full`} style={{ width: `${pct}%` }} /></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-dark">Recent Leads</h2>
          <span className="text-xs text-slate flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Live updates</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border">{['Student', 'Destination', 'Course', 'Counsellor', 'Consultancy', 'Date', 'Status'].map((h) => <th key={h} className="pb-3 text-left text-xs font-semibold text-slate uppercase tracking-wide pr-4">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-border">
              {analytics.recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-surface">
                  <td className="py-3 pr-4"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{lead.student[0]}</div><span className="text-sm font-medium text-dark">{lead.student}</span></div></td>
                  <td className="py-3 pr-4 text-sm text-slate">{lead.destination}</td>
                  <td className="py-3 pr-4 text-sm text-slate">{lead.course}</td>
                  <td className="py-3 pr-4 text-sm text-slate">{lead.counsellor}</td>
                  <td className="py-3 pr-4 text-sm text-slate">{lead.consultancy}</td>
                  <td className="py-3 pr-4 text-xs text-slate">{lead.date}</td>
                  <td className="py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[lead.status]}`}>{lead.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
