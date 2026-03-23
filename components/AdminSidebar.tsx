'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, Users, BarChart3, Settings, Globe, LogOut, ChevronRight, BookOpen, GraduationCap } from 'lucide-react'

const navItems = [
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Consultancies', href: '/admin/consultancies', icon: Building2 },
  { label: 'Counsellors', href: '/admin/counsellors', icon: Users },
  { label: 'Promos / Guides', href: '/admin/promos', icon: BookOpen },
  { label: 'Universities', href: '/admin/universities', icon: GraduationCap },
  { label: 'Settings', href: '#', icon: Settings },
]

export default function AdminSidebar() {
  const path = usePathname()
  return (
    <aside className="w-60 bg-dark min-h-screen flex flex-col fixed left-0 top-0 z-40">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"><Globe className="w-4 h-4 text-white" /></div>
          <span className="font-display font-bold text-white text-base">Counsel<span className="text-cyan">Nepal</span></span>
        </div>
        <div className="mt-3 px-2 py-1 bg-primary/20 rounded-md inline-flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-cyan rounded-full" />
          <span className="text-cyan text-xs font-medium">Super Admin</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = path === href
          return (
            <Link key={label} href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-primary text-white' : 'text-slate hover:bg-white/5 hover:text-white'}`}>
              <Icon className="w-4 h-4" />{label}
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">A</div>
          <div><p className="text-white text-xs font-semibold">Admin User</p><p className="text-slate text-xs">Super Admin</p></div>
        </div>
        <button className="flex items-center gap-2 text-slate hover:text-white text-xs transition-colors w-full"><LogOut className="w-3.5 h-3.5" /> Sign out</button>
      </div>
    </aside>
  )
}
