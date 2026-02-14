import React from 'react';
import { GeneratedImage } from '../types';

interface GeneratedResultProps {
  image: GeneratedImage;
  onReset: () => void;
}

const GeneratedResult: React.FC<GeneratedResultProps> = ({ image, onReset }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `thumbnail-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <i className="fas fa-image text-cyan-400"></i> Result
        </h2>
        <span className="text-xs font-mono text-slate-500 px-2 py-1 bg-slate-900 rounded border border-slate-700">
          Model: {image.modelUsed}
        </span>
      </div>

      <div className="flex-grow flex items-center justify-center bg-slate-900 rounded-lg border border-slate-700 p-2 overflow-hidden relative group">
        <img 
          src={image.url} 
          alt="Generated Thumbnail" 
          className="max-w-full max-h-[500px] object-contain rounded shadow-lg"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button 
            onClick={handleDownload}
            className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold hover:bg-cyan-50 transition-colors transform hover:scale-105"
          >
            <i className="fas fa-download mr-2"></i> Download
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleDownload}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-colors border border-slate-600"
        >
          <i className="fas fa-download mr-2"></i> Save Image
        </button>
        <button
          onClick={onReset}
          className="px-6 bg-slate-900 hover:bg-slate-950 text-slate-300 py-3 rounded-lg font-medium transition-colors border border-slate-700"
        >
          New
        </button>
      </div>
      
      {/* Prompt Summary */}
      <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Prompt Summary</p>
        <p className="text-sm text-slate-300 italic line-clamp-3">
          "{image.prompt.subject} - {image.prompt.style}"
        </p>
      </div>
    </div>
  );
};

export default GeneratedResult;