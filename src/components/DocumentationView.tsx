import React, { useState } from 'react';
import { 
  BookOpen, 
  Copy, 
  Check, 
  Printer, 
  FileText, 
  Layers, 
  Sparkles,
  Award,
  ShieldCheck,
  Code
} from 'lucide-react';
import { DOCUMENTATION_SECTIONS } from '../data/documentationData';

export const DocumentationView: React.FC = () => {
  const [selectedSectionId, setSelectedSectionId] = useState('E');
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedSection, setCopiedSection] = useState(false);

  const currentSection = DOCUMENTATION_SECTIONS.find(s => s.id === selectedSectionId) || DOCUMENTATION_SECTIONS[0];

  const handleCopySection = () => {
    navigator.clipboard.writeText(`SECTION ${currentSection.id}: ${currentSection.title}\n\n${currentSection.content}`);
    setCopiedSection(true);
    setTimeout(() => setCopiedSection(false), 2000);
  };

  const handleCopyFullReport = () => {
    const fullReport = DOCUMENTATION_SECTIONS.map(s => (
      `=========================================================================\nSECTION ${s.id}: ${s.title}\n=========================================================================\n\n${s.content}\n\n`
    )).join('\n');

    navigator.clipboard.writeText(fullReport);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-[#5A6B5D]" />
              <h2 className="text-xl font-serif font-bold text-[#4A443F]">Comprehensive College Project Report (Sections A–AB)</h2>
            </div>
            <p className="text-xs text-[#8C847C] mt-1">
              Formatted according to standard University Minor Project guidelines (IEEE / AICTE standard structure).
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-[#F9F8F6] hover:bg-[#F2EFE9] text-[#4A443F] rounded-xl text-xs font-semibold border border-[#E5E2DD] transition-colors flex items-center"
            >
              <Printer className="w-4 h-4 mr-1.5 text-[#8C847C]" />
              Print / Save PDF
            </button>
            <button
              onClick={handleCopyFullReport}
              className="px-4 py-2 bg-[#5A6B5D] hover:bg-[#4d5c4f] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4 mr-1.5" />
                  Copied Entire Report!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1.5" />
                  Copy Full Report for Word
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Navigation Index on Left (4 cols), Formatted Section Content on Right (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Table of Contents Menu (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E5E2DD] shadow-xs overflow-hidden max-h-[720px] flex flex-col">
          <div className="p-3.5 bg-[#F9F8F6] border-b border-[#E5E2DD] flex justify-between items-center">
            <h3 className="text-xs font-serif font-bold text-[#4A443F] uppercase tracking-wider">Report Sections (A–AB)</h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-[#5A6B5D]/15 text-[#5A6B5D]">
              28 Chapters
            </span>
          </div>

          <div className="overflow-y-auto p-2 space-y-1 flex-1">
            {DOCUMENTATION_SECTIONS.map((sec) => {
              const isSelected = selectedSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#5A6B5D]/10 text-[#5A6B5D] font-bold border border-[#5A6B5D]/30'
                      : 'text-[#4A443F] hover:bg-[#F9F8F6]'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <span className={`font-mono text-[11px] font-bold ${isSelected ? 'text-[#5A6B5D]' : 'text-[#8C847C]'}`}>
                      [{sec.id}]
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Section Content Reader (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E5E2DD] shadow-xs overflow-hidden">
          <div className="p-4 bg-[#F9F8F6] border-b border-[#E5E2DD] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#5A6B5D] text-white font-mono text-xs font-bold">
                Section {currentSection.id}
              </span>
              <h3 className="text-sm font-serif font-bold text-[#4A443F]">{currentSection.title}</h3>
            </div>

            <button
              onClick={handleCopySection}
              className="text-xs font-semibold text-[#5A6B5D] hover:text-[#4d5c4f] flex items-center px-2.5 py-1 rounded-lg hover:bg-[#5A6B5D]/10 transition-colors"
            >
              {copiedSection ? <Check className="w-3.5 h-3.5 mr-1 text-[#5A6B5D]" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              {copiedSection ? 'Copied' : 'Copy Chapter'}
            </button>
          </div>

          <div className="p-6 sm:p-8 font-serif text-[#4A443F] text-sm leading-relaxed whitespace-pre-wrap max-h-[650px] overflow-y-auto">
            {currentSection.content}
          </div>
        </div>
      </div>
    </div>
  );
};
