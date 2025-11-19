// Dynamically import all project images using Vite's import.meta.glob
// This automatically discovers all images in the assets/projects directory
const imageModules = import.meta.glob<{ default: any }>(
  "../assets/projects/**/*.{png,jpg,jpeg,gif,webp}",
  { eager: true }
);

// Transform the glob results into a map with normalized paths
// Keys are normalized to match the format used in MDX files (@/assets/projects/...)
export const imageMap: Record<string, any> = {};

for (const [path, module] of Object.entries(imageModules)) {
  // Normalize the path to match MDX format
  // The path from glob will be like "../assets/projects/..." 
  // We need to convert it to "@/assets/projects/..."
  const normalizedPath = path.replace(/^\.\.\/assets\//, "@/assets/");
  
  imageMap[normalizedPath] = module.default;
}

// Helper function to get image from path (for Astro Image component)
export function getImage(path: string): any {
  return imageMap[path] || path;
}

// Helper function to get image URL from path (for React components)
export function getImageUrl(path: string): string {
  const image = imageMap[path];
  if (image && typeof image === 'object' && 'src' in image) {
    return image.src;
  }
  return path;
}

