import FormDiv from "./form-div";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

export default function SettingSliders({
  patternIntensity,
  fontSize,
  setPatternIntensity,
  setFontSize,
}: {
  patternIntensity: number;
  fontSize: number;
  setPatternIntensity: (value: number) => void;
  setFontSize: (value: number) => void;
}) {
  return (
    <>
      <FormDiv>
        <Label>Pattern Intensity:</Label>
        <Slider
          value={[patternIntensity]}
          onValueChange={(value) => setPatternIntensity(value[0])}
          min={0}
          max={0.5}
          step={0.01}
          className="cursor-pointer"
        />
      </FormDiv>
      <FormDiv>
        <Label htmlFor="fontSize">Font Size:</Label>
        <Slider
          id="fontSize"
          value={[fontSize]}
          onValueChange={(value) => setFontSize(value[0])}
          min={24}
          max={72}
          step={1}
          className="cursor-pointer"
        />
        <div className="text-sm text-gray-500 mt-1">{fontSize}px</div>
      </FormDiv>
    </>
  );
}
