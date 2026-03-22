'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-800 text-dark text-lg">
              Counsel<span className="text-primary">Nepal</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/counsellors" className="text-slate hover:text-dark text-sm font-medium transition-colors">
              Find Counsellors
            </Link>
            <div className="flex items-center gap-1 text-slate hover:text-dark text-sm font-medium cursor-pointer transition-colors">
              Destinations <ChevronDown className="w-3 h-3" />
            </div>
            <Link href="#resources" className="text-slate hover:text-dark text-sm font-medium transition-colors">
              Resources
            </Link>
            <Link href="#about" className="text-slate hover:text-dark text-sm font-medium transition-colors">
              About
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate hover:text-dark transition-colors">
              Sign in
            </Link>
            <Link
              href="/login"
              className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 pt-2 border-t border-border space-y-2">
            <Link href="/counsellors" className="block px-2 py-2 text-sm text-slate hover:text-dark">Find Counsellors</Link>
            <Link href="#resources" className="block px-2 py-2 text-sm text-slate hover:text-dark">Resources</Link>
            <Link href="/login" className="block px-2 py-2 text-sm text-slate hover:text-dark">Sign in</Link>
            <Link href="/login" className="block mx-2 text-center bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
