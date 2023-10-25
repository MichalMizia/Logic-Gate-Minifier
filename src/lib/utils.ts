import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function areStringArraysEqual(arrA: string[], arrB: string[]): boolean {
  if (arrA.length !== arrB.length) {
    return false;
  }
  return arrA.sort().join() === arrB.sort().join();
}

export function binToDec(bin: string): number {
  let sum = 0;
  for (let i = 0; i < bin.length; i++) {
    if (bin[bin.length - i - 1] == "1") {
      sum += Math.pow(2, i);
    }
  }
  return sum;
}

export function intersectArrays(arr1: number[], arr2: number[]) {
  var setA = new Set(arr1);
  var setB = new Set(arr2);
  var intersection = new Set([...setA].filter((x) => setB.has(x)));
  return Array.from(intersection).sort();
}

export const variableNamesNegated = [
  "x̄₀",
  "x̄₁",
  "x̄₂",
  "x̄₃",
  "x̄₄",
  "x̄₅",
  "x̄₆",
  "x̄₇",
  "x̄₈",
  "x̄₉",
];
export const variableNames = [
  "x₀",
  "x₁",
  "x₂",
  "x₃",
  "x₄",
  "x₅",
  "x₆",
  "x₇",
  "x₈",
  "x₉",
];
