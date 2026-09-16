import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * The API serialises ids as numbers while the auth store keeps them as strings.
 * Comparing through String() avoids a silent `1 === "1"` mismatch that would
 * hide the owner controls from the actual owner.
 */
export function sameId(
  left: string | number | null | undefined,
  right: string | number | null | undefined,
): boolean {
  if (left === null || left === undefined || left === "") return false;
  if (right === null || right === undefined || right === "") return false;
  return String(left) === String(right);
}
