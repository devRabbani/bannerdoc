import FormDiv from "./form-div";
import { Label } from "./ui/label";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

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
    <FormDiv className="w-3/6 sm:w-4/12">
      <Label>Custom color</Label>
      <div className="flex gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="aspect-square w-full p-0"
              style={{ backgroundColor: customColor1 }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <HexColorPicker color={customColor1} onChange={setCustomColor1} />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="aspect-square w-full p-0"
              style={{ backgroundColor: customColor2 }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <HexColorPicker color={customColor2} onChange={setCustomColor2} />
          </PopoverContent>
        </Popover>
      </div>
    </FormDiv>
  );
}
