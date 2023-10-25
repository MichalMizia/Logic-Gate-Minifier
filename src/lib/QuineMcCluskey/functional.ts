import { areStringArraysEqual, variableNames } from "../utils";

function replaceComplements(termA: string, termB: string): string {
  let result = "";
  for (let i = 0; i < termA.length; i++) {
    result += termA[i] !== termB[i] ? "-" : termA[i];
  }
  return result;
}

// returns true if a pair is in grey code, a.k.a differs in 1 bit
function isGreyCodePair(termA: string, termB: string): boolean {
  let differingBitsCount = 0;
  for (let i = 0; i < termA.length; i++) {
    if (termA[i] !== termB[i]) {
      differingBitsCount++;
    }
  }
  return differingBitsCount === 1;
}

//   append zeros in front of a binary number that is not long enough
function padWithZeros(binaryString: string, numberOfVariables: number): string {
  const zeroPadding = numberOfVariables - binaryString.length;
  return "0".repeat(zeroPadding) + binaryString;
}

// when the numberOfVars is first inputed this is used to get the used variables
function getVariableNames(numberOfVariables: number): string[] {
  // x̄

  return variableNames.slice(0, numberOfVariables);
}

export function decimalToBinary(
  decimalNumber: number,
  numberOfVariables: number
): string {
  if (decimalNumber === 0) return "0".padStart(numberOfVariables, "0");
  return decimalNumber.toString(2).padStart(numberOfVariables, "0");
}

export type MintermType = {
  bin: string;
  implicant: string;
};
export type MintermReturnType = {
  result: string;
  implicant: string;
};

function reduceTerms(
  minterms: MintermType[],
  stepsAccumulator?: MintermType[][]
): MintermType[] {
  const newMinterms: MintermType[] = [];
  const termChecked: number[] = new Array(minterms.length).fill(0);

  for (let i = 0; i < minterms.length; i++) {
    for (let j = i; j < minterms.length; j++) {
      if (isGreyCodePair(minterms[i].bin, minterms[j].bin)) {
        termChecked[i] = 1;
        termChecked[j] = 1;
        const complement = replaceComplements(minterms[i].bin, minterms[j].bin);
        if (!newMinterms.find((el) => el.bin === complement)) {
          newMinterms.push({
            bin: complement,
            implicant: `${minterms[i].implicant};${minterms[j].implicant}`,
          });
          //  to display each step to the user, here we store separately numbers with different number of - signs
          if (stepsAccumulator) {
            const stepIndex = (complement.match(/-/g) || []).length;
            if (!stepsAccumulator[stepIndex]) stepsAccumulator[stepIndex] = [];
            stepsAccumulator[stepIndex].push({
              bin: complement,
              implicant: `${minterms[i].implicant};${minterms[j].implicant}`,
            });
          }
        }
      }
    }
  }

  for (let i = 0; i < minterms.length; i++) {
    if (termChecked[i] !== 1 && !newMinterms.includes(minterms[i])) {
      newMinterms.push(minterms[i]);
    }
  }

  return newMinterms;
}

export function QM_Minimize(
  numberOfVariables: number,
  inputMinterms: number[]
): { steps: MintermType[][]; minterms: MintermReturnType[] } {
  const variables = getVariableNames(numberOfVariables);
  const binMinterms: MintermType[] = inputMinterms
    .map((minterm) => ({
      bin: decimalToBinary(minterm, numberOfVariables),
      implicant: minterm.toString(),
    }))
    .sort((a, b) => (a.bin > b.bin ? 1 : -1));
  let steps: MintermType[][] = [[...binMinterms]];

  //   safety limit is 100
  let i = 0;
  do {
    i++;

    const reducedMinterms = reduceTerms(binMinterms, steps);

    binMinterms.length = 0;
    binMinterms.push(...reducedMinterms);

    if (
      areStringArraysEqual(
        reducedMinterms.map((term) => term.bin),
        reduceTerms(binMinterms).map((term) => term.bin)
      )
    ) {
      break;
    }
    binMinterms.length = 0;
    binMinterms.push(...reducedMinterms);
  } while (true && i < 100);

  const minterms = minimizeExpression(binMinterms, variables);

  return { steps, minterms };
}

function minimizeExpression(
  minterms: MintermType[],
  variables: string[]
): MintermReturnType[] {
  let minimizedExpression: MintermReturnType[] = [];
  for (let i = 0; i < minterms.length; i++) {
    minimizedExpression.push({
      result: getBooleanExpression(minterms[i].bin),
      implicant: minterms[i].implicant,
    });
  }

  return minimizedExpression;

  function getBooleanExpression(term: string): string {
    if (term === "-".repeat(variables.length)) {
      return "1";
    }

    /*''
    11-- should return
    AB
    10-0 should return
    AB'D'
    ''*/
    let logicalValue = "";
    for (let i = 0; i < term.length - 1; i++) {
      if (term[i] !== "-") {
        logicalValue +=
          term[i] === "0" ? variables[i].concat("'") : variables[i];
      }
    }

    return logicalValue;
  }
}
