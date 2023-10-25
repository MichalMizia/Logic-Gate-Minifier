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
  const variableNames = ["A", "B", "C", "D", "E", "F", "G", "H"];
  return variableNames.slice(0, numberOfVariables);
}

function decimalToBinary(
  decimalNumber: number,
  numberOfVariables: number
): string {
  if (decimalNumber === 0) return "0".padStart(numberOfVariables, "0");
  return decimalNumber.toString(2).padStart(numberOfVariables, "0");
}

type MintermType = {
  bin: string;
  decString: string;
};

function reduceTerms(minterms: MintermType[]): MintermType[] {
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
            decString: minterms[i].decString.concat(minterms[j].decString),
          });
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

export function myMinimizer(
  numberOfVariables: number,
  inputMinterms: number[]
) {
  const variables = getVariableNames(numberOfVariables);
  const binMinterms: MintermType[] = inputMinterms
    .map((minterm) => ({
      bin: decimalToBinary(minterm, numberOfVariables),
      decString: minterm.toString(),
    }))
    .sort((a, b) => (a.bin > b.bin ? 1 : -1));
  const steps: MintermType[][] = [binMinterms];

  for (let i = 0; i < 100; i++) {}

  //   while (true) {
  //     break;
  //   }
}

export class QuineMcCluskeyMinimizer {
  numberOfVariables: number;
  dontCareSymbol: string;

  constructor(variableCount: number) {
    this.numberOfVariables = variableCount;
    this.dontCareSymbol = "-".repeat(variableCount);
  }

  decimalToBinary(decimalNumber: number): string {
    if (decimalNumber === 0) return "0";
    return decimalNumber.toString(2).padStart(this.numberOfVariables, "0");
  }

  isTermInList(termList: string[], term: string): boolean {
    return termList.includes(term);
  }

  reduceTerms(minterms: string[]): string[] {
    const newMinterms: string[] = [];
    const termChecked: number[] = new Array(minterms.length).fill(0);

    for (let i = 0; i < minterms.length; i++) {
      for (let j = i; j < minterms.length; j++) {
        if (isGreyCodePair(minterms[i], minterms[j])) {
          termChecked[i] = 1;
          termChecked[j] = 1;
          const complement = replaceComplements(minterms[i], minterms[j]);
          if (!this.isTermInList(newMinterms, complement)) {
            newMinterms.push(complement);
          }
        }
      }
    }

    for (let i = 0; i < minterms.length; i++) {
      if (
        termChecked[i] !== 1 &&
        !this.isTermInList(newMinterms, minterms[i])
      ) {
        newMinterms.push(minterms[i]);
      }
    }

    return newMinterms;
  }

  getBooleanExpression(term: string): string {
    const variableNames = getVariableNames(this.numberOfVariables);
    if (term === this.dontCareSymbol) {
      return "1";
    }

    let result = "";
    for (let i = 0; i < term.length; i++) {
      if (term[i] !== "-") {
        result += term[i] === "0" ? variableNames[i] + "'" : variableNames[i];
      }
    }
    return result;
  }

  areStringArraysEqual(arrA: string[], arrB: string[]): boolean {
    if (arrA.length !== arrB.length) {
      return false;
    }
    return arrA.sort().join() === arrB.sort().join();
  }
}

export function minimizeBooleanExpression(
  numberOfVariables: number,
  inputMinterms: number[]
): { minimizedExpression: string; steps: string[][] } {
  const minimizer = new QuineMcCluskeyMinimizer(numberOfVariables);
  const binaryMinterms = inputMinterms.map((decimalMinterm) =>
    padWithZeros(minimizer.decimalToBinary(decimalMinterm), numberOfVariables)
  );
  binaryMinterms.sort();

  const minTermsList = [binaryMinterms];

  do {
    const reducedMinterms = minimizer.reduceTerms(binaryMinterms);
    reducedMinterms.sort();
    minTermsList.push(reducedMinterms);

    if (
      minimizer.areStringArraysEqual(
        reducedMinterms,
        minimizer.reduceTerms(binaryMinterms)
      )
    ) {
      break;
    }
    binaryMinterms.length = 0;
    binaryMinterms.push(...reducedMinterms);
  } while (true);

  let minimizedExpression = "";
  for (let i = 0; i < binaryMinterms.length - 1; i++) {
    minimizedExpression +=
      minimizer.getBooleanExpression(binaryMinterms[i]) + "+";
  }
  minimizedExpression += minimizer.getBooleanExpression(
    binaryMinterms[binaryMinterms.length - 1]
  );

  return { minimizedExpression, steps: minTermsList };
}
