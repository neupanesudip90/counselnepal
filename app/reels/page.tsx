'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { successStories } from '../data'
import { X, Heart, MessageCircle, Send, ChevronUp, ChevronDown, BadgeCheck, Play, ArrowLeft, Share2 } from 'lucide-react'

const allComments: Record<number, { id: number; user: string; text: string; time: string; likes: number }[]> = {
  1: [
    { id: 1, user: 'Ram Sharma', text: 'Inspiring! Australia dream 🇦🇺 herna milyo', time: '2h', likes: 12 },
    { id: 2, user: 'Sita KC', text: 'Which consultancy use gareko bro?', time: '1h', likes: 5 },
    { id: 3, user: 'Bikash T.', text: 'Congratulations didi! Dream come true 🎉', time: '45m', likes: 8 },
    { id: 4, user: 'Priya M.', text: 'IELTS score kati thiyo tapainko?', time: '30m', likes: 3 },
    { id: 5, user: 'Anil R.', text: 'Motivation milyo bro! Thank you for sharing 🙏', time: '15m', likes: 6 },
    { id: 6, user: 'Sunil B.', text: 'Hamro gau ko pani koi australia pugyo! 😄', time: '10m', likes: 14 },
  ],
  2: [
    { id: 1, user: 'Manisha KC', text: 'Canada nai best ho study ko lagi 🇨🇦', time: '3h', likes: 9 },
    { id: 2, user: 'Hari P.', text: '$15,000 scholarship 😱 wow!', time: '2h', likes: 22 },
    { id: 3, user: 'Gita S.', text: 'Computer science ma job ramro cha Canada ma?', time: '1h', likes: 4 },
    { id: 4, user: 'Rohan T.', text: 'PR ko chance kati cha Canada ma?', time: '45m', likes: 7 },
    { id: 5, user: 'Anjali D.', text: 'EduPath consultancy reliable cha?', time: '20m', likes: 3 },
  ],
  3: [
    { id: 1, user: 'Dipak M.', text: 'Japan ma Nepali haru धेरै जान थाले! 🇯🇵', time: '4h', likes: 18 },
    { id: 2, user: 'Sunita G.', text: 'Japanese language kitna din ma sikcha?', time: '3h', likes: 6 },
    { id: 3, user: 'Narayan B.', text: 'JLPT N2 ma kati point chahiyo?', time: '2h', likes: 4 },
    { id: 4, user: 'Kamala S.', text: 'Tokyo ma living cost kati cha per month?', time: '1h', likes: 11 },
    { id: 5, user: 'Prem K.', text: 'Waseda University ma scholarship milcha?', time: '30m', likes: 8 },
  ],
}

export default function ReelsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likes, setLikes] = useState<Record<number, boolean>>({})
  const [comments, setComments] = useState(allComments)
  const [newComment, setNewComment] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>({})
  const commentsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoStories = successStories.filter(s => s.type === 'video')
  const current = videoStories[currentIndex]
  const currentComments = comments[currentIndex + 1] || []

  const goNext = () => { if (currentIndex < videoStories.length - 1) { setCurrentIndex(i => i + 1); setShowComments(false) } }
  const goPrev = () => { if (currentIndex > 0) { setCurrentIndex(i => i - 1); setShowComments(false) } }

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowUp') goPrev()
      if (e.key === 'Escape') window.history.back()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentIndex])

  const sendComment = () => {
    if (!newComment.trim()) return
    const storyId = currentIndex + 1
    setComments(prev => ({
      ...prev,
      [storyId]: [...(prev[storyId] || []), { id: Date.now(), user: 'You', text: newComment, time: 'now', likes: 0 }]
    }))
    setNewComment('')
    setTimeout(() => { commentsRef.current?.scrollTo({ top: commentsRef.current.scrollHeight, behavior: 'smooth' }) }, 100)
  }

  const toggleCommentLike = (commentId: number) => {
    setLikedComments(prev => ({ ...prev, [commentId]: !prev[commentId] }))
  }

  return (
    <div className="fixed inset-0 bg-black flex overflow-hidden" ref={containerRef}>
      {/* Back button */}
      <Link href="/" className="absolute top-4 left-4 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      {/* Reel counter */}
      <div className="absolute top-4 right-4 z-50 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-mono">
        {currentIndex + 1} / {videoStories.length}
      </div>

      {/* Main reel area */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Video/thumbnail */}
        <div className="relative w-full max-w-sm mx-auto h-full max-h-screen">
          <img src={current?.thumbnail} alt={current?.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30" />

          {/* Play icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-16 flex gap-1">
            {videoStories.map((_, i) => (
              <div key={i} className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden">
                <div className="h-full bg-white transition-all duration-300" style={{ width: i < currentIndex ? '100%' : i === currentIndex ? '60%' : '0%' }} />
              </div>
            ))}
          </div>

          {/* Country badge */}
          <div className="absolute top-10 right-4 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {current?.country}
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-6 left-4 right-16 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {current?.name[0]}
              </div>
              <div>
                <p className="text-white font-display font-bold text-base">{current?.name}</p>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full w-fit">
                  <BadgeCheck className="w-3 h-3 text-cyan-400" />
                  <span className="text-white/80 text-xs">{current?.consultancy}</span>
                </div>
              </div>
            </div>
            <p className="text-cyan-300 text-sm font-medium">{current?.university} · {current?.course}</p>
            <p className="text-white/70 text-sm mt-1 italic leading-relaxed">"{current?.quote}"</p>
          </div>

          {/* Right action buttons */}
          <div className="absolute right-3 bottom-24 flex flex-col gap-5 items-center">
            <button onClick={() => setLikes(prev => ({ ...prev, [currentIndex]: !prev[currentIndex] }))} className="flex flex-col items-center gap-1">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${likes[currentIndex] ? 'bg-red-500' : 'bg-white/20 backdrop-blur-sm'}`}>
                <Heart className={`w-5 h-5 ${likes[currentIndex] ? 'text-white fill-white' : 'text-white'}`} />
              </div>
              <span className="text-white text-xs font-medium">{likes[currentIndex] ? (120 + currentIndex * 37 + 1) : (120 + currentIndex * 37)}</span>
            </button>
            <button onClick={() => setShowComments(!showComments)} className="flex flex-col items-center gap-1">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center ${showComments ? 'bg-primary' : 'bg-white/20 backdrop-blur-sm'}`}>
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xs font-medium">{currentComments.length}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xs font-medium">Share</span>
            </button>
          </div>
        </div>

        {/* Up / Down navigation */}
        <button onClick={goPrev} disabled={currentIndex === 0} className="absolute top-1/2 left-4 -translate-y-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-20 hover:bg-white/20 transition-all">
          <ChevronUp className="w-5 h-5" />
        </button>
        <button onClick={goNext} disabled={currentIndex === videoStories.length - 1} className="absolute bottom-1/2 left-4 translate-y-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-20 hover:bg-white/20 transition-all">
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Comments panel */}
      {showComments && (
        <div className="w-full sm:w-96 bg-white flex flex-col absolute sm:relative bottom-0 left-0 right-0 sm:bottom-auto sm:left-auto sm:right-auto h-[60vh] sm:h-full rounded-t-3xl sm:rounded-none shadow-2xl">
          {/* Comments header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <p className="font-display font-bold text-dark">Comments</p>
              <p className="text-slate text-xs">{currentComments.length} comments</p>
            </div>
            <button onClick={() => setShowComments(false)} className="w-8 h-8 rounded-full bg-surface flex items-center justify-center sm:hidden">
              <X className="w-4 h-4 text-slate" />
            </button>
          </div>

          {/* Comments list */}
          <div ref={commentsRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentComments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold flex-shrink-0">
                  {c.user[0]}
                </div>
                <div className="flex-1">
                  <div className="bg-surface rounded-2xl rounded-tl-none px-4 py-2.5">
                    <p className="text-xs font-bold text-dark">{c.user}</p>
                    <p className="text-sm text-dark mt-0.5 leading-relaxed">{c.text}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 ml-2">
                    <span className="text-xs text-slate">{c.time}</span>
                    <button onClick={() => toggleCommentLike(c.id)} className={`text-xs font-medium ${likedComments[c.id] ? 'text-red-500' : 'text-slate hover:text-red-500'} transition-colors`}>
                      ❤️ {c.likes + (likedComments[c.id] ? 1 : 0)}
                    </button>
                    <button className="text-xs text-slate hover:text-dark transition-colors">Reply</button>
                  </div>
                </div>
              </div>
            ))}
            {currentComments.length === 0 && (
              <div className="text-center py-10">
                <p className="text-3xl mb-2">💬</p>
                <p className="text-slate text-sm">No comments yet. Be first!</p>
              </div>
            )}
          </div>

          {/* Comment input */}
          <div className="p-4 border-t border-border bg-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">Y</div>
              <div className="flex-1 flex items-center gap-2 bg-surface rounded-full px-4 py-2.5 border border-border focus-within:border-primary transition-colors">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendComment()}
                  className="flex-1 bg-transparent text-sm focus:outline-none text-dark placeholder-slate"
                />
                <button onClick={sendComment} disabled={!newComment.trim()} className="text-primary hover:text-blue-700 transition-colors disabled:opacity-40">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-center text-xs text-slate mt-2">Use ↑↓ arrow keys to scroll reels</p>
          </div>
        </div>
      )}
    </div>
  )
}
