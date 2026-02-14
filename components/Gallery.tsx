import React from 'react';
import { GeneratedImage } from '../types';

interface GalleryProps {
  images: GeneratedImage[];
  onSelect: (image: GeneratedImage) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onSelect }) => {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <i className="fas fa-images text-4xl mb-4 opacity-30"></i>
        <p>No generated images yet.</p>
        <p className="text-sm opacity-60">Create your first thumbnail!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((img) => (
        <div 
          key={img.id} 
          onClick={() => onSelect(img)}
          className="group relative aspect-video bg-slate-800 rounded-lg overflow-hidden border border-slate-700 cursor-pointer hover:border-cyan-500 transition-all hover:shadow-cyan-500/20 hover:shadow-lg"
        >
          <img 
            src={img.url} 
            alt="Thumbnail" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
            <p className="text-xs text-white font-medium truncate">{img.prompt.subject}</p>
            <p className="text-[10px] text-slate-400">{new Date(img.timestamp).toLocaleTimeString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;