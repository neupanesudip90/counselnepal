'use client'
import { useState } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import CounsellorCard from '../../../components/CounsellorCard'
import { consultancies, counsellors, events, successStories } from '../../data'
import { Star, BadgeCheck, MapPin, Phone, Mail, Users, Calendar, Play, X, ChevronLeft, Quote } from 'lucide-react'
import Link from 'next/link'

export default function ConsultancyProfile({ params }: { params: { id: string } }) {
  const consultancy = consultancies.find((c) => c.id === Number(params.id)) || consultancies[0]
  const myCounsellors = counsellors.filter((c) => c.consultancyId === consultancy.id)
  const myEvents = events.filter((e) => e.consultancyId === consultancy.id)
  const myStories = successStories.filter((s) => s.consultancyId === consultancy.id)
  const videoStories = myStories.filter((s) => s.type === 'video')
  const textStories = myStories.filter((s) => s.type === 'text')
  const [playingVideo, setPlayingVideo] = useState<null | typeof successStories[0]>(null)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/consultancies" className="inline-flex items-center gap-1 text-slate text-sm mb-6 hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to consultancies
        </Link>

        {/* Profile header */}
        <div className="rounded-3xl overflow-hidden mb-12 border border-border">
          <div className="h-36 relative" style={{ background: `linear-gradient(135deg, ${consultancy.color}30, ${consultancy.color}10)` }}>
            <div className="absolute inset-0 dots-pattern opacity-30" />
          </div>
          <div className="bg-white px-8 pb-8 relative">
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-end -mt-10 mb-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl flex-shrink-0 border-4 border-white" style={{ background: consultancy.color }}>{consultancy.logo}</div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="font-display font-extrabold text-dark text-2xl">{consultancy.name}</h1>
                  {consultancy.verified && <span className="flex items-center gap-1 text-xs text-primary font-semibold bg-primary/8 px-2.5 py-1 rounded-full"><BadgeCheck className="w-3 h-3" /> Verified</span>}
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{consultancy.location}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{consultancy.phone}</span>
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{consultancy.email}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-5 bg-surface rounded-2xl">
              {[{ val: consultancy.rating + '★', label: `${consultancy.reviews} reviews` }, { val: consultancy.counsellors, label: 'Counsellors' }, { val: consultancy.students + '+', label: 'Students Placed' }, { val: 'Est. ' + consultancy.established, label: 'Since' }].map(({ val, label }) => (
                <div key={label} className="text-center"><p className="font-display font-bold text-dark text-xl">{val}</p><p className="text-slate text-xs">{label}</p></div>
              ))}
            </div>
            <p className="text-slate leading-relaxed mb-5">{consultancy.about}</p>
            <div className="flex flex-wrap gap-2">{consultancy.countries.map((cn) => <span key={cn} className="px-3 py-1.5 bg-primary/8 text-primary text-xs font-medium rounded-full">{cn}</span>)}</div>
          </div>
        </div>

        {/* ── COUNSELLORS SECTION ── */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">Our Team</p>
              <h2 className="font-display font-bold text-dark text-2xl">Counsellors</h2>
            </div>
            <span className="text-slate text-sm">{myCounsellors.length} counsellors</span>
          </div>
          {myCounsellors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {myCounsellors.map((c) => <CounsellorCard key={c.id} counsellor={c} />)}
            </div>
          ) : <p className="text-slate py-8 text-center">No counsellors listed yet.</p>}
        </div>

        {/* ── EVENTS SECTION ── */}
        {myEvents.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">What's On</p>
                <h2 className="font-display font-bold text-dark text-2xl">Upcoming Events</h2>
              </div>
              <span className="text-slate text-sm">{myEvents.length} events</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {myEvents.map((e) => (
                <div key={e.id} className="bg-white rounded-2xl border border-border overflow-hidden card-hover group">
                  <div className="relative h-44 overflow-hidden">
                    <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: e.color }}>{e.type}</span>
                      {e.free && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500 text-white">Free</span>}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-dark mb-2">{e.title}</h3>
                    <p className="text-slate text-sm mb-4">{e.description}</p>
                    <div className="space-y-1.5 mb-4 text-xs text-slate">
                      <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-primary" />{new Date(e.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} · {e.time}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-primary" />{e.location}</div>
                      <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-primary" />{e.registered}/{e.seats} registered</div>
                    </div>
                    <div className="w-full bg-border rounded-full h-1.5 mb-4">
                      <div className="h-1.5 rounded-full" style={{ width: `${(e.registered / e.seats) * 100}%`, background: e.color }} />
                    </div>
                    <button className="w-full text-center text-sm font-semibold text-primary border border-primary/20 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">Register Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SUCCESS STORIES — Video ── */}
        {videoStories.length > 0 && (
          <div className="mb-10">
            <div className="mb-6">
              <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-1">Real Stories</p>
              <h2 className="font-display font-bold text-dark text-2xl">Video Success Stories</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videoStories.map((s) => (
                <div key={s.id} className="group cursor-pointer" onClick={() => setPlayingVideo(s)}>
                  <div className="relative rounded-2xl overflow-hidden mb-4 h-48">
                    <img src={s.thumbnail} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-dark/50 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">{s.country}</div>
                  </div>
                  <h3 className="font-display font-semibold text-dark">{s.name}</h3>
                  <p className="text-primary text-xs mb-1">{s.university} · {s.course}</p>
                  <p className="text-slate text-sm italic mt-2 line-clamp-2">"{s.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SUCCESS STORIES — Text ── */}
        {textStories.length > 0 && (
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="font-display font-bold text-dark text-2xl">Written Testimonials</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {textStories.map((s) => (
                <div key={s.id} className="bg-surface border border-border rounded-2xl p-6 card-hover">
                  <Quote className="w-5 h-5 text-primary mb-4 opacity-50" />
                  <p className="text-slate text-sm leading-relaxed mb-5 italic">"{s.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img src={s.thumbnail} alt={s.name} className="w-10 h-10 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    <div>
                      <p className="text-dark font-semibold text-sm">{s.name}</p>
                      <p className="text-slate text-xs">{s.university}</p>
                      <p className="text-primary text-xs font-medium">{s.country} · {s.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm">
          <div className="relative bg-dark rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl">
            <button onClick={() => setPlayingVideo(null)} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><X className="w-4 h-4 text-white" /></button>
            <video src={playingVideo.video!} controls autoPlay className="w-full aspect-video" />
            <div className="p-5">
              <h3 className="font-display font-bold text-white text-lg">{playingVideo.name}</h3>
              <p className="text-cyan text-sm">{playingVideo.university} · {playingVideo.country}</p>
              <p className="text-white/50 text-sm mt-2 italic">"{playingVideo.quote}"</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
