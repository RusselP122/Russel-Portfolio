import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function triggerToast(message: string, type: 'success' | 'error' = 'success') {
  const event = new CustomEvent("show-toast", { detail: { message, type } });
  window.dispatchEvent(event);
}
