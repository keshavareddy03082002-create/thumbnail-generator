import React, { useState } from 'react';
import { ThumbnailPrompt, GenerationConfig } from '../types';
import { STYLE_PRESETS, ASPECT_RATIOS } from '../constants';

interface ThumbnailFormProps {
  initialData: ThumbnailPrompt;
  onSubmit: (data: ThumbnailPrompt, config: GenerationConfig) => void;
  isGenerating: boolean;
}

const ThumbnailForm: React.FC<ThumbnailFormProps> = ({ initialData, onSubmit, isGenerating }) => {
  const [formData, setFormData] = useState<ThumbnailPrompt>(initialData);
  const [resolution, setResolution] = useState<GenerationConfig['resolution']>('1K');
  const [useProModel, setUseProModel] = useState<boolean>(false);

  const handleChange = (field: keyof ThumbnailPrompt, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, {
      resolution: useProModel ? resolution : '1K',
      model: useProModel ? 'pro' : 'flash'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <i className="fas fa-sliders-h text-cyan-400"></i> Configuration
        </h2>
        
        <div className="flex items-center gap-3 bg-slate-900 p-2 rounded-lg border border-slate-700">
          <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
            <input 
              type="checkbox" 
              checked={useProModel} 
              onChange={(e) => setUseProModel(e.target.checked)}
              className="w-4 h-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 bg-slate-700"
            />
            <span className={useProModel ? "text-cyan-400 font-medium" : ""}>High Quality (Pro)</span>
          </label>
          
          {useProModel && (
            <select 
              value={resolution}
              onChange={(e) => setResolution(e.target.value as GenerationConfig['resolution'])}
              className="bg-slate-800 border-none text-xs text-white rounded px-2 py-1 focus:ring-1 focus:ring-cyan-500"
            >
              <option value="1K">1K</option>
              <option value="2K">2K</option>
              <option value="4K">4K</option>
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-400 mb-1">Subject</label>
          <textarea
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all h-24 resize-none"
            placeholder="Describe the main subject..."
            required
          />
        </div>

        {/* Style */}
        <div className="relative group">
          <label className="block text-sm font-medium text-slate-400 mb-1">Style</label>
          <input
            type="text"
            value={formData.style}
            onChange={(e) => handleChange('style', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            list="style-suggestions"
          />
          <datalist id="style-suggestions">
            {STYLE_PRESETS.map((style, idx) => <option key={idx} value={style} />)}
          </datalist>
        </div>

        {/* Aspect Ratio */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Aspect Ratio</label>
          <select
            value={formData.aspect_ratio}
            onChange={(e) => handleChange('aspect_ratio', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none"
          >
            {ASPECT_RATIOS.map((ratio) => (
              <option key={ratio.value} value={ratio.value}>{ratio.label}</option>
            ))}
          </select>
        </div>

        {/* Lighting */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Lighting</label>
          <input
            type="text"
            value={formData.lighting}
            onChange={(e) => handleChange('lighting', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            placeholder="e.g. Cinematic, Soft, Neon..."
          />
        </div>

        {/* Composition */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Composition</label>
          <input
            type="text"
            value={formData.composition}
            onChange={(e) => handleChange('composition', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            placeholder="e.g. Rule of thirds, Centered..."
          />
        </div>

        {/* Background */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-400 mb-1">Background</label>
          <input
            type="text"
            value={formData.background}
            onChange={(e) => handleChange('background', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            placeholder="Describe the environment..."
          />
        </div>

        {/* Negative Prompt */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-rose-400 mb-1">Negative Prompt (What to avoid)</label>
          <input
            type="text"
            value={formData.negative_prompt}
            onChange={(e) => handleChange('negative_prompt', e.target.value)}
            className="w-full bg-slate-900 border border-rose-900/50 rounded-lg px-4 py-2 text-rose-100 placeholder-rose-800/50 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
            placeholder="e.g. blurry, distorted, bad anatomy"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-700">
        <button
          type="submit"
          disabled={isGenerating}
          className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center gap-3
            ${isGenerating 
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-900/20'
            }`}
        >
          {isGenerating ? (
            <>
              <i className="fas fa-circle-notch fa-spin"></i> Generating Masterpiece...
            </>
          ) : (
            <>
              <i className="fas fa-magic"></i> Generate Thumbnail
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ThumbnailForm;