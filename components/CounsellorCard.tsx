'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Star, MessageCircle, Globe, BadgeCheck } from 'lucide-react'

interface CounsellorCardProps {
  counsellor: {
    id: number
    name: string
    photo: string
    consultancy: string
    countries: string[]
    experience: number
    languages: string[]
    rating: number
    reviews: number
    students: number
    verified: boolean
  }
}

export default function CounsellorCard({ counsellor }: CounsellorCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="bg-white rounded-2xl border border-border p-5 card-hover group">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="relative flex-shrink-0">
          {!imgError ? (
            <img
              src={counsellor.photo}
              alt={counsellor.name}
              className="w-14 h-14 rounded-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {counsellor.name[0]}
            </div>
          )}
          {counsellor.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <BadgeCheck className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-dark text-sm truncate">{counsellor.name}</h3>
          <p className="text-xs text-slate truncate">{counsellor.consultancy}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-dark">{counsellor.rating}</span>
            <span className="text-xs text-slate">({counsellor.reviews})</span>
          </div>
        </div>
      </div>

      {/* Countries */}
      <div className="flex flex-wrap gap-1 mb-3">
        {counsellor.countries.map((c) => (
          <span key={c} className="px-2 py-0.5 bg-primary/8 text-primary text-xs rounded-full font-medium">
            {c}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-slate mb-4 py-3 border-y border-border">
        <span>{counsellor.experience}y exp</span>
        <span>{counsellor.students}+ students</span>
        <span className="flex items-center gap-1">
          <Globe className="w-3 h-3" />
          {counsellor.languages.length} langs
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/counsellors/${counsellor.id}`}
          className="flex-1 text-center text-xs font-semibold text-primary border border-primary/20 py-2 rounded-lg hover:bg-primary/5 transition-colors"
        >
          View Profile
        </Link>
        <Link
          href={`/counsellors/${counsellor.id}`}
          className="flex-1 text-center text-xs font-semibold text-white bg-[#25D366] py-2 rounded-lg hover:bg-[#1ea855] transition-colors flex items-center justify-center gap-1"
        >
          <MessageCircle className="w-3 h-3" />
          WhatsApp
        </Link>
      </div>
    </div>
  )
}
