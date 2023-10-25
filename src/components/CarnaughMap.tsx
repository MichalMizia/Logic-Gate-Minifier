import { generateGrayCode } from "@/lib/generateGrayCode";
import { cn, binToDec } from "@/lib/utils";

interface CarnaughMapProps {
  inputs: number[];
  title: string;
}

const CarnaughMap = ({ inputs, title }: CarnaughMapProps) => {
  if (!inputs?.length) {
    return <div className="text-red-500">No inputs</div>;
  }
  const bitNumber = Math.ceil(Math.log2(inputs[inputs.length - 1] + 1));
  const lowerLength = Math.floor(bitNumber / 2);
  const higherLength = bitNumber - lowerLength;

  const grayCode = generateGrayCode(bitNumber);

  console.log(lowerLength, bitNumber, grayCode);

  return (
    <table className="w-fit text-sm text-left text-gray-500 ">
      <thead>
        <tr
          className={cn(
            "grid w-full shadow-sm rounded-t-sm grid-flow-row text-gray-700 uppercase bg-gray-50"
          )}
          style={{
            gridTemplateColumns: `repeat(${
              Math.pow(2, higherLength) + 1
            }, minmax(0, 1fr))`,
          }}
        >
          <th className="w-16 bg-blue-300 border shadow-md border-black/30 rounded-sm !text-sm h-16 aspect-square flex items-center justify-center">
            {title}
          </th>
          {grayCode.slice(0, Math.pow(2, higherLength)).map((val) => (
            <th
              key={val.decimal}
              className="w-16 border h-16 aspect-square text-sm bg-blue-100 border-black/20 flex items-center justify-center"
            >
              {val.gray.slice(-higherLength)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody
        className={cn("grid")}
        style={{
          gridTemplateColumns: `repeat(${
            Math.pow(2, higherLength) + 1
          }, minmax(0, 1fr))`,
        }}
      >
        <tr
          style={{
            gridTemplateRows: `repeat(${
              Math.pow(2, lowerLength) + 1
            }, minmax(0, 1fr))`,
          }}
          className="bg-blue-100 !col-span-1 text-gray-700 h-full"
        >
          {grayCode.slice(0, Math.pow(2, lowerLength)).map((val) => (
            <th
              key={val.gray}
              className="w-16 border border-black/20 rounded-sm !text-sm h-16 aspect-square flex items-center justify-center"
            >
              {val.gray.slice(-lowerLength)}
            </th>
          ))}
        </tr>
        <tr
          className={cn("grid grid-flow-row")}
          style={{
            gridTemplateColumns: `repeat(${Math.pow(
              2,
              higherLength
            )}, minmax(0, 1fr))`,
            gridColumn: "2 / -1",
          }}
        >
          {Object.keys(Array(Math.floor(Math.pow(2, bitNumber))).fill("")).map(
            (_, ind) => {
              const pow = Math.pow(2, higherLength);
              const code = grayCode[Math.floor(ind / pow)].gray
                .slice(-lowerLength)
                .concat(
                  grayCode[Math.floor(ind % pow)].gray.slice(
                    lowerLength - bitNumber
                  )
                );
              return (
                <th
                  key={ind}
                  className="w-16 h-16 flex items-center justify-center border border-black/20 rounded-sm aspect-square relative font-medium text-gray-900 whitespace-nowrap "
                >
                  {inputs.includes(binToDec(code)) ? "1" : "0"}
                  {/* {code} */}
                  <div className="absolute right-[2px] font-normal text-zinc-600 bottom-[2px]">
                    {binToDec(code)}
                  </div>
                </th>
              );
            }
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default CarnaughMap;
