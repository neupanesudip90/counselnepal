import Link from 'next/link'
import { Globe, Mail, Phone, MapPin } from 'lucide-react'
import { countries } from '../app/data'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Country selector strip */}
      <div className="border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-slate text-sm font-medium mb-6 uppercase tracking-widest">
            Explore by Destination
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {countries.map((c) => (
              <Link
                key={c.code}
                href={`/counsellors?country=${c.name}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-primary hover:bg-primary/10 transition-all text-sm text-slate hover:text-white"
              >
                <span className="text-lg">{c.flag}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                Counsel<span className="text-cyan">Nepal</span>
              </span>
            </div>
            <p className="text-slate text-sm leading-relaxed">
              Nepal's trusted platform for connecting students with verified study abroad counsellors.
            </p>
            <div className="flex gap-3 mt-4">
              {['f', 'in', 'tw'].map((s) => (
                <div key={s} className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center cursor-pointer transition-colors">
                  <span className="text-xs text-slate">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Platform</h4>
            <ul className="space-y-2">
              {['Find Counsellors', 'Browse Consultancies', 'Destinations', 'Resources', 'Reviews'].map((l) => (
                <li key={l}>
                  <Link href="#" className="text-slate hover:text-white text-sm transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Top Destinations</h4>
            <ul className="space-y-2">
              {countries.slice(0, 5).map((c) => (
                <li key={c.code}>
                  <Link href="#" className="text-slate hover:text-white text-sm transition-colors flex items-center gap-2">
                    <span>{c.flag}</span> {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                Thamel, Kathmandu, Nepal
              </li>
              <li className="flex items-center gap-2 text-slate text-sm">
                <Phone className="w-4 h-4 text-primary" />
                +977 1 4XXXXXX
              </li>
              <li className="flex items-center gap-2 text-slate text-sm">
                <Mail className="w-4 h-4 text-primary" />
                hello@counselnepal.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-slate text-xs">© 2025 CounselNepal. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-slate hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-slate hover:text-white text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
