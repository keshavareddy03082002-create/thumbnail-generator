import { ThumbnailPrompt } from './types';

export const DEFAULT_PROMPT: ThumbnailPrompt = {
  aspect_ratio: "16:9",
  style: "Cinematic realism, high contrast, inspirational, professional photography",
  subject: "A young, focused Indian student in casual clothes looking into a large mirror. The reflection vividly shows them as a proud Indian Police Service (IPS) or IAS officer in a crisp uniform.",
  lighting: "Warm, motivating sunrise lighting streaming through a side window, highlighting determination on the face.",
  background: "Slightly blurred study room with a bookshelf containing Indian Polity and history books. A subtle, soft-focus Indian flag or India Gate in the deep background.",
  composition: "Rule of thirds. Subject on the right side, leaving clear, dark negative space on the left side for bold, high-contrast text overlays.",
  negative_prompt: "cartoon, 3d render, blurry, deformed eyes, bad anatomy, cluttered, distracting background, low resolution"
};

export const STYLE_PRESETS = [
  "Cinematic realism, high contrast",
  "Hyper-realistic, 8k resolution",
  "Minimalist vector art, flat design",
  "Cyberpunk, neon lights, futuristic",
  "Oil painting, textured, classic",
  "3D Render, Pixar style, cute",
  "Anime style, vibrant colors"
];

export const ASPECT_RATIOS = [
  { value: '16:9', label: 'YouTube Thumbnail (16:9)' },
  { value: '9:16', label: 'Shorts/Reels (9:16)' },
  { value: '1:1', label: 'Instagram Square (1:1)' },
  { value: '4:3', label: 'Standard (4:3)' }
];