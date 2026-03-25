'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { successStories } from '../data'
import { X, Heart, MessageCircle, Send, ChevronUp, ChevronDown, BadgeCheck, ArrowLeft, Share2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

// Minimum vertical swipe distance to trigger change (pixels)
const SWIPE_THRESHOLD = 80

export default function ReelsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likes, setLikes] = useState<Record<number, boolean>>({})
  const [comments, setComments] = useState<Record<number, []>>(allComments)
  const [newComment, setNewComment] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>({})

  const commentsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const touchStartTime = useRef(0)
  const isScrolling = useRef(false)

  const videoStories = successStories.filter((s): s is typeof s & { type: 'video' } => s.type === 'video')
  const current = videoStories[currentIndex]
  const currentComments = comments[currentIndex + 1] || []

  // ========================================
  // ✅ Navigation functions (with infinite loop)
  // ========================================
  const goToIndex = useCallback((newIndex: number) => {
    if (isScrolling.current) return
    isScrolling.current = true

    // Handle infinite loop
    let finalIndex = newIndex
    if (finalIndex < 0) {
      finalIndex = videoStories.length - 1
    } else if (finalIndex >= videoStories.length) {
      finalIndex = 0
    }

    setTimeout(() => {
      setCurrentIndex(finalIndex)
      setShowComments(false)
      isScrolling.current = false
    }, 150) // Small delay for smooth transition feel
  }, [videoStories.length])

  const goNext = useCallback(() => {
    goToIndex(currentIndex + 1)
  }, [goToIndex, currentIndex])

  const goPrev = useCallback(() => {
    goToIndex(currentIndex - 1)
  }, [goToIndex, currentIndex])

  // ========================================
  // ✅ Keyboard navigation
  // ========================================
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (showComments) return // Disable while comments open

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        goNext()
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        goPrev()
      }
      if (e.key === 'Escape') {
        setShowComments(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev, showComments])

  // ========================================
  // ✅ Mouse wheel (desktop)
  // ========================================
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (showComments || isScrolling.current) return

      const delta = e.deltaY
      if (Math.abs(delta) > 10) { // Prevent tiny scrolls
        if (delta > 0) {
          goNext()
        } else {
          goPrev()
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [goNext, goPrev, showComments])

  // ========================================
  // ✅ Touch/swipe (mobile)
  // ========================================
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (showComments) return // Don't swipe while comments open

    touchStartY.current = e.touches[0].clientY
    touchStartTime.current = Date.now()
  }, [showComments])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (showComments) return
    // Optional: prevent horizontal scroll interference
    const xDiff = Math.abs(e.touches[0].clientX - (touchStartY.current as any))
    if (xDiff > 50) {
      // User is swiping horizontally - ignore vertical swipe
    }
  }, [showComments])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (showComments) return

    const touchEndY = e.changedTouches[0].clientY
    const deltaY = touchEndY - touchStartY.current
    const elapsed = Date.now() - touchStartTime.current

    // Detect swipe direction
    if (elapsed < 500 && Math.abs(deltaY) > SWIPE_THRESHOLD) {
      if (deltaY > 0) {
        // Swiped DOWN → Next reel
        goNext()
      } else {
        // Swiped UP → Previous reel
        goPrev()
      }
    }
  }, [goNext, goPrev, showComments])

  // ========================================
  // ✅ Comment actions
  // ========================================
  const sendComment = () => {
    if (!newComment.trim()) return
    const storyId = currentIndex + 1

    setComments(prev => ({
      ...prev,
      [storyId]: [...(prev[storyId] || []), {
        id: Date.now(),
        user: 'You',
        text: newComment,
        time: 'now',
        likes: 0
      }]
    }))
    setNewComment('')

    setTimeout(() => {
      commentsRef.current?.scrollTo({ top: commentsRef.current.scrollHeight, behavior: 'smooth' })
    }, 100)
  }

  const toggleCommentLike = (commentId: number) => {
    setLikedComments(prev => ({ ...prev, [commentId]: !prev[commentId] }))
  }

  const toggleLikeStory = () => {
    setLikes(prev => ({ ...prev, [currentIndex]: !prev[currentIndex] }))
  }

  // Scroll to bottom when comments panel opens
  useEffect(() => {
    if (showComments) {
      setTimeout(() => {
        commentsRef.current?.scrollTo({ top: commentsRef.current.scrollHeight, behavior: 'smooth' })
      }, 300)
    }
  }, [showComments, currentIndex])

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black flex flex-col overflow-hidden">
      {/* ← Back Button */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-[100] flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-black/40 backdrop-blur-md px-3 py-2 rounded-full text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back</span>
      </Link>

      {/* 🔢 Counter */}
      <div className="absolute top-4 right-4 z-[100] bg-black/40 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-mono">
        {currentIndex + 1} / {videoStories.length}
      </div>

      {/* 🔘 Progress dots (desktop only) */}
      <nav className="hidden md:flex absolute top-4 right-16 gap-1.5 z-[90]" aria-label="Reel progress">
        {videoStories.map((_, i) => (
          <motion.div
            key={i}
            className={`h-0.5 w-8 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/30'}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: i === currentIndex ? 1 : (i < currentIndex ? 1 : 0) }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </nav>

      {/* 🎬 Main Reel Container (touchable area) */}
      <div
        className="flex-1 relative overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Animated video container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative w-full max-w-sm mx-auto h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {/* 📹 Video */}
            <video
              src={current?.video}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />

            {/* 🌙 Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

            {/* 🏷️ Country tag */}
            {current?.country && (
              <div className="absolute top-10 right-4 z-[50] bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                {current.country}
              </div>
            )}

            {/* 👤 User info */}
            <div className="absolute bottom-6 left-4 right-16 z-[50] pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {current?.name?.[0]}
                </div>
                <div>
                  <p className="text-white font-display font-bold text-base">{current?.name}</p>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full">
                    <BadgeCheck className="w-3 h-3 text-cyan-400" />
                    <span className="text-white/80 text-xs">{current?.consultancy}</span>
                  </div>
                </div>
              </div>
              <p className="text-cyan-300 text-sm font-medium">
                {current?.university} · {current?.course}
              </p>
              <p className="text-white/70 text-sm mt-1 italic line-clamp-2">"{current?.quote}"</p>
            </div>

            {/* ○ Action buttons (right side) */}
            <div className="absolute right-3 bottom-24 flex flex-col gap-5 items-center z-[50]">
              {/* Like */}
              <button onClick={toggleLikeStory} className="flex flex-col items-center gap-1" aria-label="Like">
                <motion.div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    likes[currentIndex] ? 'bg-red-500' : 'bg-white/20 backdrop-blur-md'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likes[currentIndex] ? 'text-white fill-white' : 'text-white'
                    }`}
                  />
                </motion.div>
                <span className="text-white text-xs font-medium">
                  {(120 + currentIndex * 37) + (likes[currentIndex] ? 1 : 0)}
                </span>
              </button>

              {/* Comments */}
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex flex-col items-center gap-1"
                aria-label="Comments"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    showComments ? 'bg-primary' : 'bg-white/20 backdrop-blur-md'
                  }`}
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-xs font-medium">
                  {currentComments.length}
                </span>
              </button>

              {/* Share */}
              <button className="flex flex-col items-center gap-1" aria-label="Share">
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white/30 transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-xs font-medium">Share</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ↑↓ Nav hints (visible on desktop) */}
        <div className="absolute hidden md:flex left-4 top-1/2 flex-col gap-2 -translate-y-1/2 z-[60]">
          <motion.button
            onClick={goPrev}
            disabled={false} // Always enable for infinite loop
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={goNext}
            disabled={false}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </div>

        {/* 📱 Mobile swipe hint */}
        <div className="absolute md:hidden bottom-32 left-0 right-0 flex justify-center pointer-events-none z-[60]">
          <span className="text-white/30 text-xs">Swipe ↕️ to browse</span>
        </div>
      </div>

      {/* 💬 Comments Panel */}
      <AnimatePresence>
        {showComments && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-[150]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowComments(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white z-[160] rounded-t-3xl shadow-2xl max-h-[80vh]"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                <div>
                  <div className="font-bold text-gray-900">Comments</div>
                  <div className="text-xs text-gray-500">{currentComments.length} comments</div>
                </div>

                <button
                  onClick={() => setShowComments(false)}
                  className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                  aria-label="Close comments"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              </div>

              {/* Comments list */}
              <div
                ref={commentsRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(80vh-160px)] [scrollbar-width:thin]"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {currentComments.length === 0 ? (
                  <div className="py-10 text-center">
                    <div className="text-4xl mb-2">💬</div>
                    <p className="text-gray-500 text-sm">No comments yet. Be first!</p>
                  </div>
                ) : (
                  currentComments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">
                        {c.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2.5">
                          <p className="text-xs font-bold text-gray-700">{c.user}</p>
                          <p className="text-sm text-gray-900 mt-0.5 leading-relaxed">{c.text}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-1.5 ml-1">
                          <span className="text-xs text-gray-500">{c.time}</span>
                          <button
                            onClick={() => toggleCommentLike(c.id)}
                            className={`text-xs font-medium transition-colors ${
                              likedComments[c.id] ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                            }`}
                          >
                            ❤️ {c.likes + (likedComments[c.id] ? 1 : 0)}
                          </button>
                          <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    Y
                  </div>
                  <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5 border border-gray-200 focus-within:border-primary transition-colors">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendComment()}
                      className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700 placeholder-gray-500"
                    />
                    <button
                      onClick={sendComment}
                      disabled={!newComment.trim()}
                      className="w-9 h-9 rounded-full bg-blue-600 disabled:bg-blue-300 disabled:opacity-50 flex items-center justify-center transition-colors"
                      aria-label="Send comment"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}