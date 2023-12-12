import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateFakePosterSRC(seed: string, width: number, height: number) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export function generateFakeAvatarSRC(seed: string, size: number) {
  return `https://i.pravatar.cc/${size}?u=${seed}`;
}

export function capitalize(str: string) {
  return str.split(" ").map(val => (val.charAt(0).toUpperCase() + val.slice(1,))).join(" ");
}