import { decimalToBinary } from "./QuineMcCluskey/functional";
import { binToDec } from "./utils";

function graytoBinary(gray: string) {
  let binary = "";

  // MSB of binary code is same
  // as gray code
  binary += gray[0];

  // Compute remaining bits
  for (let i = 1; i < gray.length; i++) {
    // If current bit is 0, concatenate
    // previous bit
    if (gray[i] == "0") binary += binary[i - 1];
    // Else, concatenate invert of
    // previous bit
    else binary += binary[i - 1] == "0" ? "1" : "0";
  }
  return binary;
}

export function generateGrayCode(bitNumber: number) {
  // start with one-bit pattern
  let returnArr: string[] = ["0", "1"];

  // Every iteration of this loop generates 2*i codes from previously generated i codes.
  for (let i: number = 2; i < Math.pow(bitNumber, 2); i *= 2) {
    // Enter the previously generated codes again in returnArr[] in reverse
    // order. Nor returnArr[] has double number of codes.
    for (let j: number = i - 1; j >= 0; j--) returnArr.push(returnArr[j]);

    // append 0 to the first half
    for (let j: number = 0; j < i; j++) {
      returnArr[j] = "0" + returnArr[j];
    }

    // append 1 to the second half
    for (let j: number = i; j < 2 * i; j++) {
      returnArr[j] = "1" + returnArr[j];
    }
  }

  return returnArr.map((val) => ({
    decimal: binToDec(val),
    gray: val,
  }));
}
