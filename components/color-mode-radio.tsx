import { Blend, Shuffle, Square } from "lucide-react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FillModeType } from "@/lib/types";
import FormDiv from "./form-div";

export function ColorModeRadio({
  fillMode,
  setFillMode,
}: {
  fillMode: FillModeType;
  setFillMode: (fillMode: FillModeType) => void;
}) {
  return (
    <FormDiv>
      <Label>Color Mode:</Label>
      <RadioGroup
        value={fillMode}
        onValueChange={(value: FillModeType) => setFillMode(value)}
        className="flex mt-2"
      >
        <Label
          htmlFor="auto"
          className="flex flex-col justify-center items-center bg-popover rounded-md w-16 h-14 gap-1 hover:bg-accent cursor-pointer hover:text-accent-foreground [&:has([data-state=checked])]:border-primary border-muted [&:has([data-state=checked])]:text-primary border-2"
        >
          <Shuffle className="h-5 w-5" />
          <span className="text-[0.7rem]">Auto</span>
          <RadioGroupItem value="auto" id="auto" className="sr-only" />
        </Label>
        <Label
          htmlFor="flat"
          className="flex flex-col justify-center items-center bg-popover rounded-md w-16 h-14 gap-1 hover:bg-accent cursor-pointer hover:text-accent-foreground [&:has([data-state=checked])]:border-primary border-muted [&:has([data-state=checked])]:text-primary border-2"
        >
          <Square className="h-5 w-5" />
          <span className="text-[0.7rem]">Flat</span>
          <RadioGroupItem value="flat" id="flat" className="sr-only" />
        </Label>
        <Label
          htmlFor="gradient"
          className="flex flex-col justify-center items-center bg-popover rounded-md w-16 h-14 gap-1 hover:bg-accent cursor-pointer hover:text-accent-foreground [&:has([data-state=checked])]:border-primary border-muted [&:has([data-state=checked])]:text-primary border-2"
        >
          <Blend className="h-5 w-5" />
          <span className="text-[0.7rem]">Gradient</span>
          <RadioGroupItem value="gradient" id="gradient" className="sr-only" />
        </Label>
      </RadioGroup>
    </FormDiv>
  );
}
