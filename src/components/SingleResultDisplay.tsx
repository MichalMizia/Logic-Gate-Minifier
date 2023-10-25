import { QMResultType } from "@/App";

interface ResultDisplayProps {
  result: QMResultType | null;
  solution: string;
}

const ResultDisplay = ({ result, solution }: ResultDisplayProps) => {
  if (!result) return null;

  return (
    <>
      <div className="relative flex flex-col items-start justify-between gap-y-2 sm:flex-row sm:items-center">
        <div className="z-[2] flex flex-col items-start gap-2 xs:flex-row xs:items-center">
          <div className="">
            <h2 className="text-h5 font-semibold text-gray-800">Solution</h2>
            <p>o = {solution}</p>
          </div>
        </div>
      </div>
      <ul className="w-full gap-4 flex flex-wrap items-start justify-start">
        {result.steps.map((step, ind) => (
          <li
            key={ind}
            className="relative w-fit pb-4 overflow-x-auto shadow-md shadow-black/20 sm:rounded-lg"
          >
            <table className="w-fit text-sm text-left text-gray-500 ">
              <caption className="p-4 text-lg font-semibold text-left text-gray-900 bg-white">
                Step {ind}
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-2">
                    Implicant
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Binary
                  </th>
                  <th scope="col" className="px-6 py-2"></th>
                </tr>
              </thead>
              <tbody className="">
                {step.map((val) => (
                  <tr
                    key={val.bin}
                    className="bg-white border-b dark:bg-gray-800"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {val.implicant}
                    </th>
                    <td className="px-6 py-2">{val.bin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ResultDisplay;
