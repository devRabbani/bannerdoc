import FormDiv from "./form-div";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function CustomColorPicker({
  customColor1,
  customColor2,
  setCustomColor1,
  setCustomColor2,
}: {
  customColor1: string;
  customColor2: string;
  setCustomColor1: (color: string) => void;
  setCustomColor2: (color: string) => void;
}) {
  return (
    <FormDiv>
      <Label>Custom color</Label>
      <div className="flex gap-3 sm:gap-2">
        <Input
          value={customColor1}
          onChange={(e) => setCustomColor1(e.target.value)}
          type="color"
          className="h-11 w-11 cursor-pointer p-1"
        />
        <Input
          value={customColor2}
          onChange={(e) => setCustomColor2(e.target.value)}
          type="color"
          className="h-11 w-11 cursor-pointer p-1"
        />
      </div>
    </FormDiv>
  );
}
