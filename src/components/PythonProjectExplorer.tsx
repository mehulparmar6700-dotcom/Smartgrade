import React, { useState } from 'react';
import { 
  Code2, 
  Download, 
  Copy, 
  Check, 
  Folder, 
  FileCode, 
  FileSpreadsheet, 
  Terminal, 
  Sparkles,
  FileText,
  Layers,
  Database
} from 'lucide-react';
import JSZip from 'jszip';
import { ALL_PYTHON_FILES } from '../data/pythonCodeFiles';
import { ALL_MERN_FILES } from '../data/mernCodeFiles';

export const PythonProjectExplorer: React.FC = () => {
  const [projectType, setProjectType] = useState<'python' | 'mern'>('python');
  const [selectedPath, setSelectedPath] = useState('app.py');
  const [copied, setCopied] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);

  const activeFileList = projectType === 'python' ? ALL_PYTHON_FILES : ALL_MERN_FILES;
  const currentFile = activeFileList.find(f => f.path === selectedPath) || activeFileList[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingleFile = () => {
    const blob = new Blob([currentFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllZip = async () => {
    try {
      setDownloadingZip(true);
      const zip = new JSZip();
      
      if (projectType === 'python') {
        ALL_PYTHON_FILES.forEach(file => {
          zip.file(file.path, file.content);
        });
        const csvFile = ALL_PYTHON_FILES.find(f => f.filename === 'student_performance.csv');
        if (csvFile) {
          zip.folder('data')?.file('student_performance.csv', csvFile.content);
        }
      } else {
        ALL_MERN_FILES.forEach(file => {
          zip.file(file.path, file.content);
        });
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = projectType === 'python' 
        ? 'SmartGrade_Student_Performance_Python_Project.zip' 
        : 'SmartGrade_MERN_Backend_MongoDB_Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingZip(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-[#5A6B5D]" />
              <h2 className="text-xl font-serif font-bold text-[#4A443F]">
                Source Code & Multi-Stack Repository Explorer
              </h2>
            </div>
            <p className="text-xs text-[#8C847C] mt-1">
              Explore both the <strong>Python / Streamlit ML Core</strong> and the <strong>MERN Stack Node.js / MongoDB Backend</strong>.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadAllZip}
              disabled={downloadingZip}
              className="inline-flex items-center px-4 py-2.5 bg-[#5A6B5D] hover:bg-[#4d5c4f] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              {downloadingZip ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-1.5" />
                  Packaging ZIP...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-1.5" />
                  Download {projectType === 'python' ? 'Python ML' : 'MERN Backend'} (.ZIP)
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stack Switcher Tabs */}
        <div className="mt-4 pt-4 border-t border-[#E5E2DD] flex space-x-2">
          <button
            onClick={() => { setProjectType('python'); setSelectedPath('app.py'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
              projectType === 'python'
                ? 'bg-[#5A6B5D] text-white shadow-xs'
                : 'bg-[#F9F8F6] text-[#8C847C] hover:text-[#4A443F] border border-[#E5E2DD]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Python & Streamlit ML (7 Files)</span>
          </button>

          <button
            onClick={() => { setProjectType('mern'); setSelectedPath('server.js'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
              projectType === 'mern'
                ? 'bg-[#5A6B5D] text-white shadow-xs'
                : 'bg-[#F9F8F6] text-[#8C847C] hover:text-[#4A443F] border border-[#E5E2DD]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>MERN Stack: Node.js, Express & MongoDB (6 Files)</span>
          </button>
        </div>
      </div>

      {/* Terminal Execution Quick Guide */}
      <div className="bg-[#4A443F] text-[#F9F8F6] rounded-2xl p-5 border border-[#4A443F] shadow-xs">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#D9A679] mb-3">
          <Terminal className="w-4 h-4 text-[#D9A679]" />
          <span>
            {projectType === 'python' 
              ? 'Quick Python Terminal Run Commands (On your Laptop):' 
              : 'Quick Node.js / Express & MongoDB Run Commands:'}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-xs">
          {projectType === 'python' ? (
            <>
              <div className="bg-[#3A3530] p-3 rounded-xl border border-[#554E48]">
                <span className="text-[#8C847C] text-[10px] block mb-1">1. Navigate to Project</span>
                <code className="text-[#D9A679]">cd Student_Performance</code>
              </div>
              <div className="bg-[#3A3530] p-3 rounded-xl border border-[#554E48]">
                <span className="text-[#8C847C] text-[10px] block mb-1">2. Install Dependencies</span>
                <code className="text-[#F9F8F6]">pip install -r requirements.txt</code>
              </div>
              <div className="bg-[#3A3530] p-3 rounded-xl border border-[#554E48]">
                <span className="text-[#8C847C] text-[10px] block mb-1">3. Launch Streamlit UI</span>
                <code className="text-[#D9A679]">streamlit run app.py</code>
              </div>
            </>
          ) : (
            <>
              <div className="bg-[#3A3530] p-3 rounded-xl border border-[#554E48]">
                <span className="text-[#8C847C] text-[10px] block mb-1">1. Install Node Packages</span>
                <code className="text-[#D9A679]">npm install</code>
              </div>
              <div className="bg-[#3A3530] p-3 rounded-xl border border-[#554E48]">
                <span className="text-[#8C847C] text-[10px] block mb-1">2. Start Local MongoDB</span>
                <code className="text-[#F9F8F6]">mongod --dbpath ./data</code>
              </div>
              <div className="bg-[#3A3530] p-3 rounded-xl border border-[#554E48]">
                <span className="text-[#8C847C] text-[10px] block mb-1">3. Run Express Server</span>
                <code className="text-[#D9A679]">node server.js</code>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Code Browser Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left File Tree (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E5E2DD] shadow-xs overflow-hidden">
          <div className="p-3.5 bg-[#F9F8F6] border-b border-[#E5E2DD]">
            <h3 className="text-xs font-serif font-bold text-[#4A443F] uppercase tracking-wider">
              {projectType === 'python' ? 'Python Project Directory' : 'MERN Backend Directory'}
            </h3>
          </div>

          <div className="p-2 space-y-1">
            {activeFileList.map((file) => {
              const isSelected = selectedPath === file.path;
              const isCsv = file.filename.endsWith('.csv');
              const isTxt = file.filename.endsWith('.txt') || file.filename.endsWith('.md') || file.filename.endsWith('.json');
              
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedPath(file.path)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-[#5A6B5D]/10 text-[#5A6B5D] font-bold border border-[#5A6B5D]/30'
                      : 'text-[#4A443F] hover:bg-[#F9F8F6]'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    {isCsv ? (
                      <FileSpreadsheet className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#5A6B5D]' : 'text-[#D9A679]'}`} />
                    ) : isTxt ? (
                      <FileText className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#5A6B5D]' : 'text-[#8C847C]'}`} />
                    ) : (
                      <FileCode className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#5A6B5D]' : 'text-[#5A6B5D]'}`} />
                    )}
                    <span className="truncate">{file.path}</span>
                  </div>
                  <span className="text-[10px] text-[#8C847C] font-sans ml-2 shrink-0">{file.language}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-[#F9F8F6] border-t border-[#E5E2DD] text-[11px] text-[#8C847C]">
            💡 Click on any file to inspect code or download as standalone module.
          </div>
        </div>

        {/* Right Code Display (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E5E2DD] shadow-xs overflow-hidden">
          <div className="p-3.5 bg-[#4A443F] text-[#F9F8F6] border-b border-[#4A443F] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileCode className="w-4 h-4 text-[#D9A679]" />
              <span className="text-xs font-mono font-bold text-white">{currentFile.path}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 bg-[#3A3530] hover:bg-[#2C2723] text-[#F9F8F6] rounded-lg text-xs font-semibold transition-colors flex items-center border border-[#554E48]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-[#5A6B5D]" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1" />
                    Copy
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadSingleFile}
                className="px-2.5 py-1 bg-[#5A6B5D] hover:bg-[#4d5c4f] text-white rounded-lg text-xs font-semibold transition-colors flex items-center"
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                Download
              </button>
            </div>
          </div>

          <div className="bg-[#2C2723] p-4 overflow-x-auto max-h-[600px] font-mono text-xs text-[#E5E2DD] leading-relaxed">
            <pre>{currentFile.content}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
