import { PaletteType } from "@/lib/types";
import FormDiv from "./form-div";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SelectColorPalette({
  value,
  setValue,
}: {
  value: PaletteType;
  setValue: (value: PaletteType) => void;
}) {
  return (
    <FormDiv className="w-full">
      <Label htmlFor="colorPalette">Color Palette:</Label>
      <Select
        value={value}
        onValueChange={(value: PaletteType) => setValue(value)}
      >
        <SelectTrigger id="colorPalette" className="w-full">
          <SelectValue placeholder="Select a color palette" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cool">Cool</SelectItem>
          <SelectItem value="warm">Warm</SelectItem>
          <SelectItem value="grayscale">Grayscale</SelectItem>
          <SelectItem value="vibrant">Vibrant</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="pastel">Pastel</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
    </FormDiv>
  );
}
