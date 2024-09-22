import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import FormDiv from "./form-div";
import { AlignType } from "@/lib/types";

export default function AlignItemsRadio({
  align,
  setAlign,
}: {
  align: AlignType;
  setAlign: (align: AlignType) => void;
}) {
  return (
    <FormDiv>
      <Label>Text Alignment:</Label>
      <RadioGroup
        value={align}
        onValueChange={(value: AlignType) => setAlign(value)}
        className="flex mt-2"
      >
        <Label
          htmlFor="left"
          className="flex flex-col justify-center items-center bg-popover rounded-md w-16 h-14 gap-1 hover:bg-accent cursor-pointer hover:text-accent-foreground [&:has([data-state=checked])]:border-primary border-muted [&:has([data-state=checked])]:text-primary border-2"
        >
          <AlignLeft className="h-5 w-5" />
          <span className="text-[0.7rem]">Left</span>
          <RadioGroupItem value="left" id="left" className="sr-only" />
        </Label>
        <Label
          htmlFor="center"
          className="flex flex-col justify-center items-center bg-popover rounded-md w-16 h-14 gap-1 hover:bg-accent cursor-pointer hover:text-accent-foreground [&:has([data-state=checked])]:border-primary border-muted [&:has([data-state=checked])]:text-primary border-2"
        >
          <AlignCenter className="h-5 w-5" />
          <span className="text-[0.7rem]">Center</span>
          <RadioGroupItem value="center" id="center" className="sr-only" />
        </Label>
        <Label
          htmlFor="right"
          className="flex flex-col justify-center items-center bg-popover rounded-md w-16 h-14 gap-1 hover:bg-accent cursor-pointer hover:text-accent-foreground [&:has([data-state=checked])]:border-primary border-muted [&:has([data-state=checked])]:text-primary border-2"
        >
          <AlignRight className="h-5 w-5" />
          <span className="text-[0.7rem]">Right</span>
          <RadioGroupItem value="right" id="right" className="sr-only" />
        </Label>
      </RadioGroup>
    </FormDiv>
  );
}
