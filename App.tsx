import React, { useState } from 'react';
import ThumbnailForm from './components/ThumbnailForm';
import GeneratedResult from './components/GeneratedResult';
import Gallery from './components/Gallery';
import { DEFAULT_PROMPT } from './constants';
import { ThumbnailPrompt, GeneratedImage, GenerationConfig, ViewMode } from './types';
import { generateImage } from './services/geminiService';

const App: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.CREATOR);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (promptData: ThumbnailPrompt, config: GenerationConfig) => {
    setIsGenerating(true);
    setError(null);
    setCurrentImage(null);

    try {
      const imageUrl = await generateImage(promptData, config);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: promptData,
        timestamp: Date.now(),
        modelUsed: config.model === 'pro' ? `Pro (${config.resolution})` : 'Flash'
      };

      setCurrentImage(newImage);
      setHistory(prev => [newImage, ...prev]);
    } catch (err: any) {
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setCurrentImage(null);
  };

  const handleGallerySelect = (image: GeneratedImage) => {
    setCurrentImage(image);
    setViewMode(ViewMode.CREATOR);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-900/50">
              <i className="fas fa-eye text-white text-sm"></i>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Visionary <span className="font-light text-slate-500">Thumbnail Architect</span>
            </h1>
          </div>
          
          <nav className="flex gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setViewMode(ViewMode.CREATOR)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === ViewMode.CREATOR 
                ? 'bg-slate-700 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Creator
            </button>
            <button
              onClick={() => setViewMode(ViewMode.GALLERY)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                viewMode === ViewMode.GALLERY 
                ? 'bg-slate-700 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Gallery <span className="bg-slate-900 px-1.5 py-0.5 rounded text-[10px]">{history.length}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        
        {error && (
          <div className="mb-6 bg-rose-900/20 border border-rose-800 text-rose-200 px-4 py-3 rounded-lg flex items-center gap-3 animate-pulse">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {viewMode === ViewMode.GALLERY ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Generation History</h2>
            <Gallery images={history} onSelect={handleGallerySelect} />
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 h-full">
            {/* Left Col: Form */}
            <div className="lg:col-span-5 xl:col-span-4">
               <ThumbnailForm 
                 initialData={DEFAULT_PROMPT} 
                 onSubmit={handleGenerate}
                 isGenerating={isGenerating}
               />
            </div>

            {/* Right Col: Result or Placeholder */}
            <div className="lg:col-span-7 xl:col-span-8">
              {currentImage ? (
                <GeneratedResult 
                  image={currentImage} 
                  onReset={handleReset} 
                />
              ) : (
                <div className="h-full min-h-[500px] bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-600 p-8">
                  {isGenerating ? (
                    <div className="text-center space-y-4">
                       <div className="relative w-24 h-24 mx-auto">
                         <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                         <div className="absolute inset-0 border-t-4 border-cyan-500 rounded-full animate-spin"></div>
                       </div>
                       <h3 className="text-xl font-medium text-slate-300">Dreaming up pixels...</h3>
                       <p className="text-sm">Gemini is rendering your vision.</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-4 max-w-md">
                      <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-magic text-3xl text-slate-600"></i>
                      </div>
                      <h3 className="text-xl font-medium text-slate-400">Ready to Create</h3>
                      <p className="text-sm">
                        Fill in the details on the left to generate professional, high-converting thumbnails powered by Gemini AI.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 mt-auto">
         <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm">
           <p>Powered by Google Gemini 2.5 Flash & 3 Pro Models</p>
         </div>
      </footer>
    </div>
  );
};

export default App;