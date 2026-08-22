import React, { useState } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Layers, 
  MessageSquare, 
  Award 
} from 'lucide-react';
import { PRESENTATION_SLIDES } from '../data/presentationData';

export const PresentationView: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [copiedNotes, setCopiedNotes] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const slide = PRESENTATION_SLIDES[currentSlideIndex];

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(slide.speakerNotes);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  const handleExportAll = () => {
    const outline = PRESENTATION_SLIDES.map(s => (
      `=================================================================\nSLIDE ${s.slideNumber}: ${s.title}\n=================================================================\n\nBULLET POINTS:\n${s.bulletPoints.map(b => `  • ${b}`).join('\n')}\n\nSPEAKER SCRIPT NOTES:\n"${s.speakerNotes}"\n\nKEY TAKEAWAY:\n${s.keyTakeaway}\n\n`
    )).join('\n');

    navigator.clipboard.writeText(outline);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Presentation className="w-5 h-5 text-[#5A6B5D]" />
              <h2 className="text-xl font-serif font-bold text-[#4A443F]">12-Slide PowerPoint Presentation Deck & Script</h2>
            </div>
            <p className="text-xs text-[#8C847C] mt-1">
              Complete college project slide deck with slide content, bullet points, speaker script notes, and key takeaways.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportAll}
              className="px-4 py-2 text-xs font-semibold bg-[#5A6B5D]/10 hover:bg-[#5A6B5D]/20 text-[#5A6B5D] rounded-xl border border-[#5A6B5D]/25 transition-colors flex items-center"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 text-[#5A6B5D]" />
                  Copied All 12 Slides!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  Copy All Slides Outline
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Slide Navigation Thumbnails */}
      <div className="bg-white p-3 rounded-2xl border border-[#E5E2DD] shadow-xs overflow-x-auto no-scrollbar">
        <div className="flex space-x-2">
          {PRESENTATION_SLIDES.map((s, idx) => (
            <button
              key={s.slideNumber}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                currentSlideIndex === idx
                  ? 'bg-[#5A6B5D] text-white shadow-xs'
                  : 'bg-[#F9F8F6] text-[#4A443F] hover:bg-[#F2EFE9]'
              }`}
            >
              <span className="text-[10px] opacity-75">#{s.slideNumber}</span>
              <span className="truncate max-w-[120px]">{s.title.split('–')[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Slide Stage & Speaker Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 16:9 Presentation Slide Preview Box (7 cols) */}
        <div className="lg:col-span-7 bg-[#2C2723] text-white rounded-2xl p-8 shadow-xs border border-[#4A443F] flex flex-col justify-between min-h-[420px] relative overflow-hidden">
          {/* Slide Header */}
          <div>
            <div className="flex justify-between items-center text-xs text-[#D9A679] font-mono mb-4 pb-2 border-b border-[#4A443F]">
              <span>SMARTGRADE MINOR PROJECT</span>
              <span>SLIDE {slide.slideNumber} / 12</span>
            </div>

            <h3 className="text-2xl font-serif font-bold tracking-tight text-white mb-6">
              {slide.title}
            </h3>

            <div className="space-y-3.5">
              {slide.bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-sm text-[#E5E2DD]">
                  <div className="w-2 h-2 rounded-full bg-[#D9A679] mt-1.5 shrink-0" />
                  <p className="leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Footer */}
          <div className="pt-6 border-t border-[#4A443F] flex justify-between items-center text-xs text-[#8C847C]">
            <span>Department of CSE / IT</span>
            <span>Academic Year 2025–2026</span>
          </div>
        </div>

        {/* Right: Presenter Script & Examiner Notes (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Speaker Script Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E2DD]">
              <div className="flex items-center space-x-2 text-[#4A443F] font-bold text-xs">
                <MessageSquare className="w-4 h-4 text-[#5A6B5D]" />
                <span className="font-serif">🎙️ What to Speak during Presentation:</span>
              </div>
              <button
                onClick={handleCopyNotes}
                className="text-[11px] font-semibold text-[#5A6B5D] hover:text-[#4d5c4f] flex items-center"
              >
                {copiedNotes ? <Check className="w-3 h-3 mr-1 text-[#5A6B5D]" /> : <Copy className="w-3 h-3 mr-1" />}
                {copiedNotes ? 'Copied' : 'Copy Script'}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#5A6B5D]/10 border border-[#5A6B5D]/20 text-xs text-[#4A443F] leading-relaxed font-sans">
              &quot;{slide.speakerNotes}&quot;
            </div>
          </div>

          {/* Key Takeaway Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-[#4A443F] font-bold text-xs">
              <Award className="w-4 h-4 text-[#D9A679]" />
              <span className="font-serif">Key Examiner Takeaway:</span>
            </div>
            <p className="text-xs text-[#8C847C] leading-relaxed">
              {slide.keyTakeaway}
            </p>
          </div>

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
              disabled={currentSlideIndex === 0}
              className="px-4 py-2 bg-white border border-[#E5E2DD] rounded-xl text-xs font-semibold text-[#4A443F] hover:bg-[#F9F8F6] disabled:opacity-40 flex items-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous Slide
            </button>
            <span className="text-xs font-bold text-[#8C847C]">
              {currentSlideIndex + 1} of 12
            </span>
            <button
              onClick={() => setCurrentSlideIndex(Math.min(PRESENTATION_SLIDES.length - 1, currentSlideIndex + 1))}
              disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
              className="px-4 py-2 bg-[#5A6B5D] text-white rounded-xl text-xs font-semibold hover:bg-[#4d5c4f] disabled:opacity-40 flex items-center shadow-xs transition-colors"
            >
              Next Slide
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
