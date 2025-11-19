import type { MiddlewareHandler } from "astro";

// Cache durations in seconds
const CACHE_DURATIONS = {
  images: 31536000, // 1 year
  fonts: 31536000, // 1 year
  css: 31536000, // 1 year
  js: 31536000, // 1 year
  html: 3600, // 1 hour
  default: 86400, // 1 day
};

function getCacheDuration(pathname: string): number {
  const ext = pathname.split(".").pop()?.toLowerCase();
  
  if (!ext) return CACHE_DURATIONS.default;
  
  // Images
  if (["jpg", "jpeg", "png", "gif", "webp", "svg", "ico", "avif"].includes(ext)) {
    return CACHE_DURATIONS.images;
  }
  
  // Fonts
  if (["woff", "woff2", "ttf", "otf", "eot"].includes(ext)) {
    return CACHE_DURATIONS.fonts;
  }
  
  // CSS
  if (ext === "css") {
    return CACHE_DURATIONS.css;
  }
  
  // JavaScript
  if (["js", "mjs"].includes(ext)) {
    return CACHE_DURATIONS.js;
  }
  
  // HTML
  if (ext === "html" || !ext) {
    return CACHE_DURATIONS.html;
  }
  
  return CACHE_DURATIONS.default;
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  
  // Only add headers for successful responses
  if (response.status >= 200 && response.status < 300) {
    const pathname = new URL(context.request.url).pathname;
    const cacheDuration = getCacheDuration(pathname);
    const expiresDate = new Date(Date.now() + cacheDuration * 1000);
    
    // Set Expires header
    response.headers.set("Expires", expiresDate.toUTCString());
    
    // Also set Cache-Control for better browser support
    if (cacheDuration >= 31536000) {
      // Long-term cache (1 year) - immutable assets
      response.headers.set("Cache-Control", `public, max-age=${cacheDuration}, immutable`);
    } else {
      // Shorter cache - revalidatable
      response.headers.set("Cache-Control", `public, max-age=${cacheDuration}`);
    }
  }
  
  return response;
};

