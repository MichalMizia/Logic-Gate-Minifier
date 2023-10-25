import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface FunctionInputProps {
  handleSubmit: () => void;
}

const FunctionInput = ({ handleSubmit }: FunctionInputProps) => {
  const [outputs, setOutputs] = useLocalStorage<boolean>("OUTPUTS_KEY", false);
  const [functionOnes, setFunctionOnes] = useLocalStorage<string>(
    "FUNCTION_ONES_KEY",
    ""
  );

  return (
    <Card className="max-w-[500px] w-full">
      <Tabs
        value={!outputs ? "single" : "multi"}
        onValueChange={(e) => {
          if (e === "multi") {
            setOutputs(true);
          } else setOutputs(false);
        }}
      >
        <CardContent className="pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex gap-x-2 items-stretch justify-start">
                <TabsList className="h-full self-stretch">
                  <TabsTrigger className="h-full self-stretch" value="single">
                    Single Output
                  </TabsTrigger>
                  <TabsTrigger className="h-full self-stretch" value="multi">
                    Multi Output
                  </TabsTrigger>
                </TabsList>
                <div className="w-full">
                  <Button className="w-full">Minimalizuj</Button>
                </div>
              </div>
              <div className=" gap-x-2 items-stretch justify-start">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Jedynki funkcji</Label>
                  <Input
                    value={functionOnes}
                    onChange={(e) => setFunctionOnes(e.target.value)}
                    id="function-ones"
                    name="function-ones"
                    key="function-ones"
                    autoComplete="off"
                    placeholder="Oddzielone znakiem ;"
                  />
                </div>
              </div>
              <div className="">
                {/* <div className="flex flex-col space-y-1.5 col-span-3">
                  <Label htmlFor="name">Outputy funkcji</Label>
                  <Input
                    value={outputs || ""}
                    onChange={(e) => setOutputs(e.target.value)}
                    id="function-outs"
                    name="function-outs"
                    key="function-outs"
                    autoComplete="off"
                    placeholder="Oddzielone znakiem ;"
                  />
                </div> */}
              </div>
            </div>
          </form>
          <TabsContent value="multi">
            <p className="text-sm">
              W jedynkach funkcji rozdziel kolejne outputy znakiem # (możesz dać
              dowolną ilość spacji)
            </p>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default FunctionInput;
