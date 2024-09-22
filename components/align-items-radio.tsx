import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { AlignType } from "@/lib/types";
import IconRadioGroup from "./icon-radio-group";

const alignOptions = [
  { value: "left", icon: AlignLeft },
  { value: "center", icon: AlignCenter },
  { value: "right", icon: AlignRight },
] as const;

type AlignItemsRadioProps = {
  align: AlignType;
  setAlign: (align: AlignType) => void;
};

export default function AlignItemsRadio({
  align,
  setAlign,
}: AlignItemsRadioProps) {
  return (
    <IconRadioGroup
      label="Text Alignment"
      options={alignOptions}
      value={align}
      setValue={setAlign}
    />
  );
}
