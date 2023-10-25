import { useEffect, useMemo, useState } from "react";
import FunctionInput from "./components/FunctionInput";
import {
  MintermReturnType,
  MintermType,
  QM_Minimize,
} from "./lib/QuineMcCluskey/functional";
import { useLocalStorage } from "./lib/hooks/useLocalStorage";
import SingleResultDisplay from "./components/SingleResultDisplay";
import CarnaughMap from "./components/CarnaughMap";
import { intersectArrays } from "./lib/utils";
import { generateCombinations } from "./lib/generateCombinations";
import { findAllFunctions } from "./lib/findAllFunctions";

export type QMResultType = {
  steps: MintermType[][];
  minterms: MintermReturnType[];
};

function App() {
  const [functionOnes, setFunctionOnes] = useLocalStorage<string>(
    "FUNCTION_ONES_KEY",
    ""
  );
  const inputs = useMemo(
    () =>
      (functionOnes.length ? functionOnes.split(";") : [])
        .map((str) => Number(str))
        .sort((a, b) => (a > b ? 1 : -1)),
    [functionOnes]
  );
  const [singleResult, setSingleResult] = useState<null | QMResultType>(null);
  const [multipleResult, setMultipleResult] = useState<null | QMResultType>(
    null
  );
  const [solution, setSolution] = useState<string>("");

  useEffect(() => {
    if (!singleResult) return;

    setSolution(
      singleResult.minterms
        .reduce(
          (acc: string, term, ind) =>
            (acc += term.result.concat(
              ind !== singleResult.minterms.length - 1 ? " + " : ""
            )),
          ""
        )
        .replace(/(.{2})'/g, "(~$&)")
        .replace(/'/g, "")
    );
  }, [singleResult]);

  const generateSolution = () => {
    // 1;7;12;13;14;15

    if (functionOnes.includes("#")) {
      console.log("multiple");

      const functions: string[] = functionOnes.replace(" ", "").split("#");
      const functionOutputs = functions.map((func) =>
        func.split(";").map((str) => Number(str))
      );

      console.log(
        functionOutputs,
        intersectArrays(functionOutputs[0], functionOutputs[1])
      );

      findAllFunctions(functionOutputs);
    } else {
      // single output

      const numberOfVariables = Math.ceil(
        Math.log2(inputs[inputs.length - 1] + 1)
      );
      const result = QM_Minimize(numberOfVariables, inputs);
      setSingleResult(result);

      return;
    }
  };

  console.log(singleResult);

  return (
    <main className="py-8 bg-zinc-100 text-zinc-800">
      <section className="space-y-4 container-md" id="efekty">
        <div className="relative flex flex-col items-start justify-between gap-y-2 sm:flex-row sm:items-center">
          <div className="z-[2] flex flex-col items-start gap-2 xs:flex-row xs:items-center">
            <div className="">
              <h2 className="text-h3 font-bold text-gray-800">
                Quine–McCluskey algorithm
              </h2>
              <p className="text-body text-text_readable">
                Podaj jedynki postaci sumacyjnej funkcji wejściowej i ilość
                zmiennych. Oddziel te jedynki znakiem ;
              </p>
            </div>
          </div>
        </div>
        <FunctionInput handleSubmit={generateSolution} />

        <SingleResultDisplay result={singleResult} solution={solution} />

        <CarnaughMap inputs={inputs || []} title="Y" />
      </section>
    </main>
  );
}

export default App;
