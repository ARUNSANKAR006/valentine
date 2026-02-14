import { useState, useEffect } from 'react';
import { Heart, Sparkles, Star, Play, Lock, Unlock, Gift, Music, Camera, Crown, Flower2, ChevronLeft, ChevronRight, X, ArrowDown, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// ============================================
// BEAUTIFUL CSS BUTTERFLIES
// ============================================

const Butterfly = ({ style, variant = 0 }: { style?: React.CSSProperties; variant?: number }) => {
  const colors = [
    ['#ffb6c1', '#ff69b4', '#ff1493'],  // Rose pink
    ['#e8b4f8', '#d175de', '#b44bc9'],  // Lavender
    ['#ffc8dd', '#ffafcc', '#ff85a1'],  // Soft blush
    ['#c7ceea', '#b5b9ff', '#9fa8da'],  // Periwinkle
    ['#f8c8dc', '#f4a0c0', '#e87ea1'],  // Candy pink
  ];
  const [c1, c2, c3] = colors[variant % colors.length];

  return (
    <div className="butterfly-css" style={style}>
      <div className="butterfly-body">
        <div className="butterfly-wing wing-left" style={{ background: `linear-gradient(135deg, ${c1}, ${c2}, ${c3})` }}>
          <div className="wing-spot" style={{ background: `radial-gradient(circle, rgba(255,255,255,0.8), ${c1})` }} />
          <div className="wing-spot wing-spot-sm" style={{ background: `radial-gradient(circle, rgba(255,255,255,0.6), ${c2})` }} />
        </div>
        <div className="butterfly-wing wing-right" style={{ background: `linear-gradient(225deg, ${c1}, ${c2}, ${c3})` }}>
          <div className="wing-spot" style={{ background: `radial-gradient(circle, rgba(255,255,255,0.8), ${c1})` }} />
          <div className="wing-spot wing-spot-sm" style={{ background: `radial-gradient(circle, rgba(255,255,255,0.6), ${c2})` }} />
        </div>
        <div className="butterfly-wing wing-bottom-left" style={{ background: `linear-gradient(135deg, ${c2}, ${c3})` }} />
        <div className="butterfly-wing wing-bottom-right" style={{ background: `linear-gradient(225deg, ${c2}, ${c3})` }} />
        <div className="butterfly-antenna antenna-left" />
        <div className="butterfly-antenna antenna-right" />
      </div>
    </div>
  );
};

const FloatingButterflies = () => {
  const butterflies = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    variant: i % 5,
    top: `${5 + (i * 10) % 85}%`,
    delay: `${i * 2.5}s`,
    duration: `${16 + (i % 4) * 3}s`,
    size: 0.6 + (i % 3) * 0.2,
  }));

  return (
    <>
      {butterflies.map((b) => (
        <Butterfly
          key={b.id}
          variant={b.variant}
          style={{
            position: 'fixed',
            top: b.top,
            left: '-60px',
            zIndex: 15,
            transform: `scale(${b.size})`,
            animation: `butterfly-fly-${(b.id % 4) + 1} ${b.duration} linear infinite`,
            animationDelay: b.delay,
            pointerEvents: 'none' as const,
          }}
        />
      ))}
    </>
  );
};

// ============================================
// FLOATING HEARTS & PARTICLES
// ============================================

const FloatingElements = () => {
  const [elements, setElements] = useState<{ id: number; left: number; delay: number; size: number; duration: number; type: 'heart' | 'star' | 'flower' }[]>([]);

  useEffect(() => {
    const types: ('heart' | 'star' | 'flower')[] = ['heart', 'star', 'flower'];
    const newElements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      size: 10 + Math.random() * 18,
      duration: 10 + Math.random() * 10,
      type: types[Math.floor(Math.random() * types.length)],
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {elements.map((el: { id: number; left: number; delay: number; size: number; duration: number; type: 'heart' | 'star' | 'flower' }) => (
        <div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.left}%`,
            bottom: '-40px',
            animation: `float-up ${el.duration}s linear infinite`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.type === 'heart' && (
            <Heart className="text-pink-300 opacity-20" size={el.size} fill="currentColor" />
          )}
          {el.type === 'star' && (
            <Sparkles className="text-yellow-300 opacity-25" size={el.size} />
          )}
          {el.type === 'flower' && (
            <Flower2 className="text-purple-300 opacity-20" size={el.size} />
          )}
        </div>
      ))}
    </div>
  );
};

// ============================================
// FALLING PETALS
// ============================================

const FallingPetals = () => {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 8,
    size: 14 + Math.random() * 12,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
};

// ============================================
// CONFETTI
// ============================================

const Confetti = () => {
  const pieces = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    color: ['#ff69b4', '#ff1493', '#e8b4f8', '#ffd700', '#ff6b6b', '#a855f7', '#f472b6', '#fb923c'][i % 8],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[200]">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// PHOTO DATA
// ============================================

const allPhotos = [
  'IMG-20260113-WA0035(1).jpg',
  'IMG-20260113-WA0043.jpg',
  'IMG-20260113-WA0048.jpg',
  'IMG-20260115-WA0039.jpg',
  'IMG_20250212_174825536_HDR.jpg',
  'IMG_20250213_160829102_HDR.jpg',
  'IMG_20250217_073439.jpg',
  'IMG_20250220_072703592_HDR_AE.jpg',
  'IMG_20250226_073059293_HDR.jpg',
  'IMG_20250422_072913733_HDR_AE.jpg',
  'IMG_20250422_072927086_HDR_AE.jpg',
  'IMG_20250422_073023039_HDR_AE.jpg',
  'IMG_20250527_143636244_AE.jpg',
  'IMG_20250904_150344760_HDR_PORTRAIT.jpg',
  'IMG_20250904_150440471_HDR_PORTRAIT.jpg',
  'IMG_20250915_161042195_HDR_AE.jpg',
  'IMG_20250915_161048738_AE.jpg',
  'IMG_20251113_162306379_HDR.jpg',
  'IMG_20251113_162348392_HDR.jpg',
  'IMG_20251113_162358652_HDR.jpg',
  'IMG_20251125_135932103_HDR.jpg',
  'IMG_20260113_073735774_HDR.jpg',
  'IMG_20260113_073810724_HDR.jpg',
  'IMG_20260113_074151314_HDR.jpg',
  'IMG_20260213_164647882_HDR_AE.jpg',
  'IMG_20260213_164649082_HDR_AE.jpg',
  'Snapchat-1005553619.jpg',
  'Snapchat-1238891215.jpg',
  'Snapchat-1319926734.jpg',
  'Snapchat-1507849509.jpg',
  'Snapchat-1581277327.jpg',
  'Snapchat-161401182.jpg',
  'Snapchat-1624463548.jpg',
  'Snapchat-1891107228.jpg',
  'Snapchat-1972442095.jpg',
  'Snapchat-2012385941.jpg',
  'Snapchat-2033539576.jpg',
  'Snapchat-205758127.jpg',
  'Snapchat-21093212.jpg',
  'Snapchat-345246950.jpg',
  'Snapchat-430417181.jpg',
  'Snapchat-44462175.jpg',
  'Snapchat-601584622.jpg',
  'Snapchat-765409706.jpg',
  'Snapchat-865975275.jpg',
  'Snapchat-880018731.jpg',
  'Snapchat-908974913.jpg',
  'Snapchat-939060452.jpg',
  'Snapchat-995049085.jpg',
  'phoneImageCapture1755927588734.jpg',
  'phoneImageCapture1755927630025.jpg',
];

const loveQuotes = [
  "Every love story is beautiful, but ours is my favorite.",
  "In you, I have found the one whom my soul loves.",
  "You are my today and all of my tomorrows.",
  "I saw that you were perfect, and so I loved you.",
  "Together is a wonderful place to be.",
  "You make my heart smile.",
  "I fell in love the way you fall asleep — slowly, then all at once.",
  "You're the closest to heaven that I'll ever be.",
  "My heart is, and always will be, yours.",
  "I choose you. And I'll choose you over and over.",
  "You are my sun, my moon, and all my stars.",
  "Love is not finding someone to live with. It's finding someone you can't live without.",
];

// ============================================
// QUIZ DATA
// ============================================

const quizQuestions = [
  {
    question: 'When did we first meet?',
    options: ['At a coffee shop', 'Through friends', 'At College', 'Online'],
    correct: 2,
  },
  {
    question: 'What is my favorite thing about you?',
    options: ['Your smile', 'Your Eyes', 'the way you Breathing', 'Everything about you'],
    correct: 3,
  },
  {
    question: 'What is our special date?',
    options: ['First meeting', 'First date', 'Anniversary', 'All of the above'],
    correct: 3,
  },
  {
    question: 'What would I choose - a million dollars or you?',
    options: ['A million dollars', 'Definitely YOU', 'Can I have both?', 'Tough choice'],
    correct: 1,
  },
  {
    question: 'How much do I love you?',
    options: ['A little', 'A lot', 'To the moon and back', 'More than words can say'],
    correct: 3,
  },
];

// ============================================
// PHOTO LIGHTBOX
// ============================================

const PhotoLightbox = ({ photos, initialIndex, onClose }: { photos: string[]; initialIndex: number; onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIndex((p: number) => (p + 1) % photos.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((p: number) => (p - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [photos.length, onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>
          <X size={24} />
        </button>
        <button
          className="lightbox-nav lightbox-prev"
          onClick={() => setCurrentIndex((p: number) => (p - 1 + photos.length) % photos.length)}
        >
          <ChevronLeft size={32} />
        </button>
        <div className="lightbox-image-container">
          <img
            src={`/photos/${photos[currentIndex]}`}
            alt={`Our memory ${currentIndex + 1}`}
            className="lightbox-image"
          />
          <div className="lightbox-caption">
            <Heart size={14} fill="currentColor" className="inline mr-1" />
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
        <button
          className="lightbox-nav lightbox-next"
          onClick={() => setCurrentIndex((p: number) => (p + 1) % photos.length)}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [unlockedSurprise, setUnlockedSurprise] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [valentineAccepted, setValentineAccepted] = useState(false);
  const [wishText, setWishText] = useState('');
  const [wishSent, setWishSent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const displayPhotos = showAllPhotos ? allPhotos : allPhotos.slice(0, 12);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 200);
  }, []);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(optionIndex);
    setShowResult(true);

    if (optionIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        if (score + (optionIndex === quizQuestions[currentQuestion].correct ? 1 : 0) >= 3) {
          setUnlockedSurprise(true);
        }
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setQuizCompleted(false);
  };

  const scrollToSection = (section: 'home' | 'quiz' | 'gallery' | 'surprise') => {

    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen romantic-gradient relative overflow-x-hidden">
      {/* Floating CSS Butterflies */}
      <FloatingButterflies />

      {/* Floating Elements */}
      <FloatingElements />

      {/* Falling Petals */}
      <FallingPetals />



      {/* ============================================ */}
      {/* HERO SECTION — Cinematic Entrance */}
      {/* ============================================ */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
        {/* Glowing orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        <div className={`text-center max-w-4xl mx-auto hero-entrance ${heroVisible ? 'hero-visible' : ''}`}>
          {/* Animated heart cluster */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="hero-heart-glow" />
              <Heart
                className="text-pink-500 heart-beat relative z-10"
                size={120}
                fill="currentColor"
              />
              <Sparkles
                className="absolute -top-4 -right-4 text-yellow-400 sparkle z-20"
                size={28}
              />
              <Sparkles
                className="absolute -bottom-3 -left-5 text-purple-400 sparkle z-20"
                size={22}
                style={{ animationDelay: '1s' }}
              />
              <Heart
                className="absolute -top-2 -left-8 text-pink-300 twinkle z-20"
                size={20}
                fill="currentColor"
              />
              <Heart
                className="absolute -bottom-4 right-[-30px] text-rose-300 twinkle z-20"
                size={16}
                fill="currentColor"
                style={{ animationDelay: '1.5s' }}
              />
            </div>
          </div>

          <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-bold mb-4 gradient-text" style={{ fontFamily: 'Great Vibes, cursive' }}>
            Happy Valentine's Day
          </h1>
          <h2 className="hero-subtitle text-4xl md:text-5xl lg:text-6xl font-semibold text-pink-600 mb-12" style={{ fontFamily: 'Great Vibes, cursive' }}>
            My Beautiful Love
          </h2>

          <div className="glass-card rounded-3xl p-8 max-w-2xl mx-auto mb-12 hero-card">
            <p className="text-lg md:text-xl text-pink-700 leading-relaxed italic">
              "You are the reason I believe in love. Every moment with you is a precious gift,
              and I am eternally grateful to have you in my life. This is my love letter to you,
              written from the depths of my heart."
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              onClick={() => scrollToSection('gallery')}
              className="btn-romantic bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-10 py-7 rounded-full text-lg shadow-xl pulse-glow"
            >
              <Camera className="mr-2" size={22} />
              Our Memories
            </Button>
            <Button
              onClick={() => scrollToSection('quiz')}
              variant="outline"
              className="btn-romantic border-2 border-pink-500 text-pink-600 hover:bg-pink-50 px-10 py-7 rounded-full text-lg font-medium"
            >
              <Star className="mr-2" size={22} />
              Play Love Quiz
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator">
            <ArrowDown className="text-pink-400 animate-bounce" size={28} />
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto"></div>

      {/* ============================================ */}
      {/* PHOTO BOOTH — Real Photos Gallery */}
      {/* ============================================ */}
      <section id="gallery" className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="section-icon-wrap">
                <Camera className="text-white" size={32} />
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-4" style={{ fontFamily: 'Great Vibes, cursive' }}>
              Our Love Story
            </h2>
            <p className="text-pink-600 text-xl max-w-lg mx-auto">
              Every picture holds a thousand memories of us together
            </p>
          </div>

          {/* Photo Masonry Grid */}
          <div className="photo-booth-grid">
            {displayPhotos.map((photo, index) => (
              <div
                key={photo}
                className="photo-booth-item"
                onClick={() => setLightboxIndex(index)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="photo-polaroid">
                  <img
                    src={`/photos/${photo}`}
                    alt={`Our memory ${index + 1}`}
                    className="photo-booth-img"
                    loading="lazy"
                  />
                  <div className="photo-overlay">
                    <Heart className="text-white" size={28} fill="currentColor" />
                  </div>
                  <div className="photo-caption">
                    <p className="text-sm italic" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      {loveQuotes[index % loveQuotes.length]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show more / less button */}
          {allPhotos.length > 12 && (
            <div className="text-center mt-10">
              <Button
                onClick={() => setShowAllPhotos(!showAllPhotos)}
                className="btn-romantic bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white px-8 py-5 rounded-full text-lg shadow-lg"
              >
                <Camera className="mr-2" size={20} />
                {showAllPhotos ? `Show Less` : `View All ${allPhotos.length} Photos`}
              </Button>
            </div>
          )}

          {/* Bottom quote */}
          <div className="mt-16 text-center">
            <div className="inline-block glass-card rounded-3xl p-10 max-w-2xl shadow-xl">
              <Music className="mx-auto text-pink-500 mb-4" size={48} />
              <p className="text-2xl text-pink-700 italic" style={{ fontFamily: 'Dancing Script, cursive' }}>
                "I wish I could turn back the clock. I'd find you sooner and love you longer."
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto"></div>

      {/* ============================================ */}
      {/* QUIZ SECTION */}
      {/* ============================================ */}
      <section id="quiz" className="min-h-screen py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="section-icon-wrap">
                <Star className="text-white" size={32} fill="currentColor" />
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-4" style={{ fontFamily: 'Great Vibes, cursive' }}>
              The Love Quiz
            </h2>
            <p className="text-pink-700 text-xl">
              Test how well you know our love story! Get 3+ correct to unlock a special surprise!
            </p>
          </div>

          {!quizStarted ? (
            <Card className="glass-card border-0 p-10 text-center shadow-2xl">
              <CardContent>
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center shadow-lg">
                    <Crown className="text-white" size={48} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-pink-700 mb-4" style={{ fontFamily: 'Great Vibes, cursive' }}>
                  Ready to Play?
                </h3>
                <p className="text-pink-600 text-lg mb-8">
                  Answer 5 questions about us. If you get at least 3 right,
                  you'll unlock a special surprise video!
                </p>
                <Button
                  onClick={handleStartQuiz}
                  className="btn-romantic bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-12 py-7 rounded-full text-xl shadow-xl pulse-glow"
                >
                  <Play className="mr-3" size={24} />
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ) : quizCompleted ? (
            <Card className="glass-card border-0 p-10 text-center shadow-2xl">
              <CardContent>
                {score >= 3 ? (
                  <>
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg animate-bounce">
                        <Unlock className="text-white" size={48} />
                      </div>
                    </div>
                    <h3 className="text-4xl font-bold text-green-600 mb-4" style={{ fontFamily: 'Great Vibes, cursive' }}>
                      Congratulations! 🎉
                    </h3>
                    <p className="text-pink-700 text-xl mb-4">
                      You got {score} out of {quizQuestions.length} correct!
                    </p>
                    <p className="text-pink-600 text-lg mb-8">
                      You've unlocked the special surprise! Go to the Surprise section to see it!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button
                        onClick={() => scrollToSection('surprise')}
                        className="btn-romantic bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-10 py-5 rounded-full text-lg shadow-lg"
                      >
                        <Gift className="mr-2" size={22} />
                        View Surprise
                      </Button>
                      <Button
                        onClick={resetQuiz}
                        variant="outline"
                        className="border-2 border-pink-500 text-pink-600 px-8 py-5 rounded-full text-lg"
                      >
                        Play Again
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 flex items-center justify-center shadow-lg">
                        <Lock className="text-white" size={48} />
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-pink-600 mb-4" style={{ fontFamily: 'Great Vibes, cursive' }}>
                      Good Try! 💕
                    </h3>
                    <p className="text-pink-700 text-xl mb-4">
                      You got {score} out of {quizQuestions.length} correct.
                    </p>
                    <p className="text-pink-600 text-lg mb-8">
                      You need at least 3 correct answers to unlock the surprise. Try again!
                    </p>
                    <Button
                      onClick={resetQuiz}
                      className="btn-romantic bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-10 py-5 rounded-full text-lg shadow-lg"
                    >
                      <Play className="mr-2" size={22} />
                      Try Again
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card border-0 p-8 md:p-10 shadow-2xl">
              <CardContent>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-pink-600 font-medium">
                      Question {currentQuestion + 1} of {quizQuestions.length}
                    </span>
                    <span className="text-pink-600 font-medium">
                      Score: {score}
                    </span>
                  </div>
                  <Progress
                    value={((currentQuestion + 1) / quizQuestions.length) * 100}
                    className="h-3 bg-pink-100"
                  />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-pink-700 mb-10" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-4">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={selectedOption !== null}
                      className={`quiz-option w-full p-5 rounded-2xl border-2 text-left transition-all text-lg ${selectedOption === null
                        ? 'border-pink-200 bg-white/60 hover:border-pink-400 hover:bg-white/80'
                        : selectedOption === index
                          ? index === quizQuestions[currentQuestion].correct
                            ? 'correct text-white border-green-400'
                            : 'wrong text-white border-red-400'
                          : index === quizQuestions[currentQuestion].correct && showResult
                            ? 'correct text-white border-green-400'
                            : 'border-pink-100 bg-white/40 opacity-50'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {showResult && index === quizQuestions[currentQuestion].correct && (
                          <Heart className="text-white" size={24} fill="currentColor" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto"></div>

      {/* ============================================ */}
      {/* SURPRISE SECTION */}
      {/* ============================================ */}
      <section id="surprise" className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="flex justify-center mb-4">
              <div className="section-icon-wrap">
                <Gift className="text-white" size={32} />
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-4" style={{ fontFamily: 'Great Vibes, cursive' }}>
              Your Special Surprise
            </h2>
            <p className="text-pink-700 text-xl">
              Complete the quiz to unlock your surprise!
            </p>
          </div>

          <Card className="glass-card border-0 p-10 md:p-14 shadow-2xl">
            <CardContent>
              {!unlockedSurprise ? (
                <div className="py-12">
                  <div className="relative inline-block mb-8">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center shadow-xl">
                      <Lock className="text-pink-500" size={56} />
                    </div>
                    <Heart
                      className="absolute -bottom-2 -right-2 text-pink-500"
                      size={32}
                      fill="currentColor"
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-pink-600 mb-4" style={{ fontFamily: 'Great Vibes, cursive' }}>
                    Surprise Locked 🔒
                  </h3>
                  <p className="text-pink-600 text-lg mb-8 max-w-md mx-auto">
                    Complete the Love Quiz and get at least 3 answers correct
                    to unlock your special surprise video!
                  </p>
                  <Button
                    onClick={() => scrollToSection('quiz')}
                    className="btn-romantic bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-10 py-5 rounded-full text-lg shadow-lg"
                  >
                    <Play className="mr-2" size={22} />
                    Go to Quiz
                  </Button>
                </div>
              ) : (
                <div className="py-8">
                  <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl animate-bounce">
                      <Unlock className="text-white" size={56} />
                    </div>
                  </div>
                  <h3 className="text-4xl font-bold text-green-600 mb-4" style={{ fontFamily: 'Great Vibes, cursive' }}>
                    Surprise Unlocked! 🎉
                  </h3>
                  <p className="text-pink-700 text-xl mb-8">
                    You did it! Now send me your wishes from the heart!
                  </p>

                  {/* Wish Card */}
                  <div className="wish-card max-w-xl mx-auto">
                    <div className="wish-card-inner rounded-3xl p-8 md:p-10">
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
                          <Send className="text-white" size={36} />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-pink-600 mb-2" style={{ fontFamily: 'Great Vibes, cursive' }}>
                        Write Your Heart Out 💌
                      </h3>
                      <p className="text-pink-400 mb-6">Your wishes will be heard by the universe itself</p>

                      {!wishSent ? (
                        <>
                          <textarea
                            value={wishText}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setWishText(e.target.value)}
                            placeholder="Write your wishes here, my love..."
                            className="wish-textarea w-full h-40 rounded-2xl p-4 border-2 border-pink-200 bg-white/80 focus:border-pink-400 focus:outline-none resize-none text-pink-700"
                            style={{ fontFamily: 'Dancing Script, cursive', fontSize: '1.1rem' }}
                          />
                          <Button
                            onClick={async () => {
                              if (wishText.trim()) {
                                try {
                                  await fetch('https://api.web3forms.com/submit', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      access_key: '968173be-9194-465b-8549-60216fb383bb',
                                      subject: "💕 Valentine's Wish 💕",
                                      message: wishText,
                                      from_name: "Your Valentine 💌",
                                    }),
                                  });
                                } catch (_) { /* silent */ }
                                setWishSent(true);
                              }
                            }}
                            disabled={!wishText.trim()}
                            className="btn-romantic mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-10 py-5 rounded-full text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Sparkles className="mr-2" size={20} />
                            Send to the Stars ✨
                          </Button>
                        </>
                      ) : (
                        <div className="text-center py-6">
                          <div className="text-6xl mb-4">🌟</div>
                          <p className="text-pink-600 text-xl" style={{ fontFamily: 'Dancing Script, cursive' }}>
                            Your wish has been sent to Your Loving Person ! ✨
                          </p>
                          <p className="text-pink-400 text-sm mt-2">The universe heard your heart today 💫</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-10 glass-card rounded-2xl p-6 max-w-xl mx-auto">
                    <p className="text-pink-700 text-lg italic" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      "Every word you write is a treasure I'll hold forever.
                      You mean the world to me!"
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Love Message */}
          <div className="mt-14 glass-card rounded-3xl p-10 shadow-xl">
            <Heart className="mx-auto text-pink-500 mb-6" size={56} fill="currentColor" />
            <p className="text-2xl text-pink-700 italic leading-relaxed mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
              "I may not be able to buy you expensive gifts, but I can give you
              something priceless - my heart, my love, and this little corner of
              the internet that I built just for you. You are my everything."
            </p>
            <p className="text-pink-500 text-xl font-semibold" style={{ fontFamily: 'Great Vibes, cursive' }}>
              Forever Yours ❤️
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <Heart className="text-pink-500 heart-beat" size={28} fill="currentColor" />
          <span className="text-pink-600 text-lg" style={{ fontFamily: 'Dancing Script, cursive' }}>Made with endless love, just for you</span>
          <Heart className="text-pink-500 heart-beat" size={28} fill="currentColor" />
        </div>
        <p className="text-pink-400" style={{ fontFamily: 'Great Vibes, cursive', fontSize: '1.5rem' }}>
          Happy Valentine's Day, My Love 💕
        </p>
      </footer>

      {/* ============================================ */}
      {/* VALENTINE PROPOSAL SECTION */}
      {/* ============================================ */}
      <section className="valentine-proposal min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background particles */}
        <div className="proposal-particles">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="proposal-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {showConfetti && <Confetti />}

        <div className="text-center relative z-10">
          {!valentineAccepted ? (
            <>
              <div className="proposal-heart mb-8">
                <Heart size={100} fill="currentColor" className="text-red-500 glow-effect" />
              </div>
              <h2
                className="proposal-text text-5xl md:text-7xl lg:text-8xl font-bold mb-12"
                style={{ fontFamily: 'Great Vibes, cursive' }}
              >
                Will you be my Valentine?
              </h2>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <Button
                  onClick={() => {
                    setValentineAccepted(true);
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 5000);
                  }}
                  className="proposal-yes-btn bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-16 py-8 rounded-full text-2xl shadow-2xl pulse-glow"
                >
                  <Heart className="mr-3" size={28} fill="currentColor" />
                  YES!
                </Button>
                <button
                  className="proposal-no-btn"
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const btn = e.currentTarget;
                    const xOffset = (Math.random() - 0.5) * 500;
                    const yOffset = (Math.random() - 0.5) * 300;
                    btn.style.transition = 'transform 0.2s ease';
                    btn.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                  }}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const btn = e.currentTarget;
                    const xOffset = (Math.random() - 0.5) * 500;
                    const yOffset = (Math.random() - 0.5) * 300;
                    btn.style.transition = 'transform 0.2s ease';
                    btn.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                  }}
                >
                  No
                </button>
              </div>
            </>
          ) : (
            <div className="proposal-accepted">
              <div className="text-8xl mb-8 animate-bounce">💕</div>
              <h2
                className="text-5xl md:text-7xl font-bold text-pink-400 mb-6"
                style={{ fontFamily: 'Great Vibes, cursive' }}
              >
                Yaaay! 🎉
              </h2>
              <p className="text-2xl text-pink-300 mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
                I knew you'd say yes!
              </p>
              <p className="text-xl text-gray-400">
                You just made me the happiest person alive! ❤️
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Photo Lightbox */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={showAllPhotos ? allPhotos : allPhotos.slice(0, 12)}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

export default App;