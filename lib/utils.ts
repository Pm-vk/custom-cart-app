import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to construct full image URL from Strapi
export function getStrapiImageUrl(url: any): string {
  // Handle different data types
  if (!url) return "/placeholder.svg";
  
  // If url is an object, try to extract the URL
  if (typeof url === 'object') {
    if (url.url) url = url.url;
    else if (url.src) url = url.src;
    else return "/placeholder.svg";
  }
  
  // Convert to string if it's not already
  const urlString = String(url);
  
  if (urlString.startsWith('http')) return urlString;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${urlString}`;
}
