import { Blend, Shuffle, Square } from "lucide-react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FillModeType } from "@/lib/types";
import FormDiv from "./form-div";
import IconRadioGroup from "./icon-radio-group";

const fillOptions = [
  { value: "auto", icon: Shuffle, label: "Left" },
  { value: "flat", icon: Square, label: "Center" },
  { value: "gradient", icon: Blend, label: "Right" },
] as const;

type ColorModeRadioProps = {
  fillMode: FillModeType;
  setFillMode: (colorMode: FillModeType) => void;
};

export function ColorModeRadio({ fillMode, setFillMode }: ColorModeRadioProps) {
  return (
    <IconRadioGroup
      label="Color Mode"
      options={fillOptions}
      value={fillMode}
      setValue={setFillMode}
    />
  );
}
