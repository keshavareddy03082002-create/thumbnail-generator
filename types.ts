export interface ThumbnailPrompt {
  subject: string;
  style: string;
  lighting: string;
  background: string;
  composition: string;
  negative_prompt: string;
  aspect_ratio: '16:9' | '9:16' | '1:1' | '4:3' | '3:4';
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: ThumbnailPrompt;
  timestamp: number;
  modelUsed: string;
}

export interface GenerationConfig {
  resolution: '1K' | '2K' | '4K';
  model: 'flash' | 'pro';
}

export enum ViewMode {
  CREATOR = 'CREATOR',
  GALLERY = 'GALLERY'
}