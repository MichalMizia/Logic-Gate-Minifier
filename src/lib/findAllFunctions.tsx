import { generateCombinations } from "./generateCombinations";

export function findAllFunctions(startFunctions: number[][]) {
  // max index is startFunctions.length - all combined
  if (startFunctions.length === 1) return startFunctions;
  let combinations: number[][] = [];
  for (let index = 2; index < startFunctions.length + 1; index++) {
    combinations = [
      ...combinations,
      ...generateCombinations<number[]>(startFunctions, index),
    ];
  }

  console.log(
    combinations.filter((subarr) => {
      console.log(subarr.toString());
      return subarr.toString() != "0";
    })
  );
}
