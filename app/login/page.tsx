'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Globe, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [showPass, setShowPass] = useState(false)

  const features = [
    'Access detailed counsellor profiles',
    'Connect with verified experts',
    'Track your counselling history',
    'Get personalized recommendations',
  ]

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        {/* Bg decoration */}
        <div className="absolute inset-0 geo-bg" />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-cyan/10 blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="dots-pattern absolute inset-0 opacity-20" />

        <div className="relative">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-xl">
              Counsel<span className="text-cyan">Nepal</span>
            </span>
          </Link>
        </div>

        <div className="relative">
          <h2 className="font-display font-extrabold text-white text-4xl leading-tight mb-6">
            Your International
            <br />
            <span className="text-cyan">Education Journey</span>
            <br />
            Starts Here
          </h2>
          <p className="text-white/60 text-base mb-8 leading-relaxed">
            Join thousands of Nepali students who found their perfect study abroad counsellor through CounselNepal.
          </p>
          <div className="space-y-3">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-cyan" />
                </div>
                <span className="text-white/80 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-9 h-9 rounded-full border-2 border-dark bg-primary/30 flex items-center justify-center text-white text-xs font-bold">
                {['R', 'S', 'A', 'M'][i - 1]}
              </div>
            ))}
          </div>
          <p className="text-white/60 text-sm">1,000+ students joined this year</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-dark text-lg">
                Counsel<span className="text-primary">Nepal</span>
              </span>
            </Link>
          </div>

          <h1 className="font-display font-extrabold text-dark text-2xl mb-1">
            {tab === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-slate text-sm mb-7">
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
              className="text-primary font-semibold hover:underline"
            >
              {tab === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          {/* Tabs */}
          <div className="flex bg-surface rounded-xl p-1 mb-6">
            {(['login', 'register'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                  tab === t ? 'bg-white text-dark shadow-sm' : 'text-slate'
                }`}
              >
                {t === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-3 border border-border py-3 rounded-xl text-sm font-semibold text-dark hover:bg-surface transition-colors mb-5">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-slate text-xs">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Login form */}
          {tab === 'login' ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-dark uppercase tracking-wide">Password</label>
                  <button className="text-xs text-primary hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-10 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Link
                href="/counsellors"
                className="block w-full bg-primary text-white text-center font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Register form */
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">First Name</label>
                  <input type="text" placeholder="Ram" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Last Name</label>
                  <input type="text" placeholder="Sharma" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Email</label>
                <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Phone</label>
                <input type="tel" placeholder="+977 98XXXXXXXX" className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-xs font-semibold text-dark uppercase tracking-wide mb-1.5 block">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    className="w-full px-4 py-3 pr-10 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate">
                By signing up you agree to our{' '}
                <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
              <Link
                href="/counsellors"
                className="block w-full bg-primary text-white text-center font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
