import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Layers, 
  RotateCw,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';
import { VIVA_QUESTIONS } from '../data/vivaData';
import { VivaQuestion } from '../types';

export const VivaPrepView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(1);
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const categories = ['All', 'General & Project', 'Python & Libraries', 'Data Cleaning & EDA', 'Machine Learning', 'Model Evaluation', 'Viva Defense & Tips'];

  const filteredQuestions = VIVA_QUESTIONS.filter((q) => {
    const keywordsList = q.keyKeywords || q.keywords || [];
    const matchesSearch = 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      keywordsList.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % (filteredQuestions.length || 1));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + filteredQuestions.length) % (filteredQuestions.length || 1));
  };

  const activeCard: VivaQuestion = filteredQuestions[currentCardIndex] || VIVA_QUESTIONS[0];
  const activeKeywords = activeCard?.keyKeywords || activeCard?.keywords || [];
  const activeDetailedAnswer = activeCard?.detailedAnswer || activeCard?.fullAnswer || '';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#D9A679]" />
              <h2 className="text-xl font-serif font-bold text-[#4A443F]">College Viva Preparation & Q&A Mastery</h2>
            </div>
            <p className="text-xs text-[#8C847C] mt-1">
              32 meticulously crafted questions covering dataset cleaning, Scikit-learn Linear Regression math, and defense strategies.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setFlashcardMode(!flashcardMode);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center ${
                flashcardMode
                  ? 'bg-[#5A6B5D] text-white border-[#5A6B5D] shadow-xs'
                  : 'bg-[#5A6B5D]/10 text-[#5A6B5D] border-[#5A6B5D]/25 hover:bg-[#5A6B5D]/20'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 mr-1.5" />
              {flashcardMode ? 'Switch to List View' : 'Interactive Flashcards Mode'}
            </button>
          </div>
        </div>

        {/* Quick Viva Success Rules Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#E5E2DD] text-xs">
          <div className="flex items-start space-x-2 text-[#4A443F]">
            <CheckCircle2 className="w-4 h-4 text-[#5A6B5D] shrink-0 mt-0.5" />
            <span><strong>Always mention no data leakage:</strong> 80/20 train/test split with random_state=42.</span>
          </div>
          <div className="flex items-start space-x-2 text-[#4A443F]">
            <CheckCircle2 className="w-4 h-4 text-[#5A6B5D] shrink-0 mt-0.5" />
            <span><strong>Explain high interpretability:</strong> Coefficients directly translate study hours into exam marks.</span>
          </div>
          <div className="flex items-start space-x-2 text-[#4A443F]">
            <CheckCircle2 className="w-4 h-4 text-[#D9A679] shrink-0 mt-0.5" />
            <span><strong>Know your metrics:</strong> MAE is 1.82 marks, R² score is 0.942 on unseen test data.</span>
          </div>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {flashcardMode ? (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-between items-center text-xs text-[#8C847C]">
            <span>Question {currentCardIndex + 1} of {filteredQuestions.length}</span>
            <span className="font-semibold px-2.5 py-0.5 rounded-lg bg-[#F9F8F6] text-[#4A443F] border border-[#E5E2DD]">
              Category: {activeCard?.category}
            </span>
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[300px] bg-white rounded-2xl border-2 border-[#E5E2DD] p-8 shadow-xs hover:border-[#5A6B5D]/40 transition-all cursor-pointer flex flex-col justify-between relative select-none"
          >
            <div className="flex justify-between items-start">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                activeCard?.difficulty === 'High Priority' || activeCard?.difficulty === 'Important' ? 'bg-[#A65E4E]/15 text-[#A65E4E]' :
                activeCard?.difficulty === 'Medium' ? 'bg-[#D9A679]/20 text-[#8a5d3b]' : 'bg-[#5A6B5D]/15 text-[#5A6B5D]'
              }`}>
                {activeCard?.difficulty}
              </span>
              <span className="text-xs text-[#8C847C] font-medium">Click card to {isFlipped ? 'show question' : 'reveal answer'} ↻</span>
            </div>

            <div className="my-6">
              {!isFlipped ? (
                <div>
                  <span className="text-xs font-bold text-[#5A6B5D] uppercase tracking-wider block mb-2 font-mono">Examiner Question #{activeCard?.id}</span>
                  <h3 className="text-xl font-serif font-bold text-[#4A443F] leading-snug">
                    {activeCard?.question}
                  </h3>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <span className="text-xs font-bold text-[#5A6B5D] uppercase tracking-wider block mb-1">Direct Answer to Speak:</span>
                    <p className="text-sm font-serif font-semibold text-[#4A443F] leading-relaxed">
                      &quot;{activeCard?.shortAnswer}&quot;
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#8C847C] uppercase tracking-wider block mb-1">In-Depth Viva Explanation:</span>
                    <p className="text-xs text-[#4A443F] leading-relaxed">
                      {activeDetailedAnswer}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E5E2DD]">
              <span className="text-[11px] font-semibold text-[#8C847C] mr-1 self-center">Keywords to Speak:</span>
              {activeKeywords.map((kw, i) => (
                <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[#5A6B5D]/10 text-[#5A6B5D] border border-[#5A6B5D]/20">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevCard}
              className="px-4 py-2 bg-white border border-[#E5E2DD] rounded-xl text-xs font-semibold text-[#4A443F] hover:bg-[#F9F8F6] transition-colors"
            >
              ← Previous Card
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2 bg-[#D9A679]/20 border border-[#D9A679]/40 text-[#8a5d3b] rounded-xl text-xs font-bold hover:bg-[#D9A679]/30 transition-colors"
            >
              Flip Card ↻
            </button>
            <button
              onClick={handleNextCard}
              className="px-4 py-2 bg-[#5A6B5D] text-white rounded-xl text-xs font-semibold hover:bg-[#4d5c4f] transition-colors shadow-xs"
            >
              Next Card →
            </button>
          </div>
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-4">
          {/* Search & Category Filter */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E2DD] shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 text-[#8C847C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions by topic, keyword (e.g. R2 score, Pandas, Overfitting)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-[#E5E2DD] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D] bg-[#F9F8F6]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#5A6B5D] text-white font-semibold shadow-xs'
                      : 'bg-[#F2EFE9] text-[#4A443F] hover:bg-[#E5E2DD]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion Questions List */}
          <div className="space-y-3">
            {filteredQuestions.map((q) => {
              const isOpen = openQuestionId === q.id;
              const qKeywords = q.keyKeywords || q.keywords || [];
              const qDetailedAnswer = q.detailedAnswer || q.fullAnswer || '';
              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-[#E5E2DD] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenQuestionId(isOpen ? null : q.id)}
                    className="w-full text-left p-4.5 flex items-start justify-between gap-4 hover:bg-[#F9F8F6] transition-colors"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-[#5A6B5D]">Q{q.id}.</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          q.difficulty === 'High Priority' || q.difficulty === 'Important' ? 'bg-[#A65E4E]/15 text-[#A65E4E]' :
                          q.difficulty === 'Medium' ? 'bg-[#D9A679]/20 text-[#8a5d3b]' : 'bg-[#5A6B5D]/15 text-[#5A6B5D]'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="text-[10px] font-medium text-[#8C847C]">
                          {q.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-serif font-bold text-[#4A443F]">{q.question}</h3>
                    </div>

                    <div className="text-[#8C847C] mt-1 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-[#E5E2DD] bg-[#F9F8F6]/60 space-y-4">
                      {/* Short Answer */}
                      <div className="p-3.5 bg-[#5A6B5D]/10 border border-[#5A6B5D]/25 rounded-xl">
                        <span className="text-xs font-bold text-[#5A6B5D] block mb-1">
                          🎙️ How to answer the examiner (Direct & Concise):
                        </span>
                        <p className="text-xs font-serif font-medium text-[#4A443F] leading-relaxed">
                          &quot;{q.shortAnswer}&quot;
                        </p>
                      </div>

                      {/* In-depth Viva Defense */}
                      <div>
                        <span className="text-xs font-bold text-[#4A443F] block mb-1">
                          📖 Deep-Dive Technical Explanation:
                        </span>
                        <p className="text-xs text-[#4A443F]/85 leading-relaxed">
                          {qDetailedAnswer}
                        </p>
                      </div>

                      {/* Keywords */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E5E2DD]">
                        <span className="text-[11px] font-semibold text-[#8C847C]">Key Buzzwords:</span>
                        {qKeywords.map((kw, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[#5A6B5D]/10 text-[#5A6B5D] border border-[#5A6B5D]/20">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
