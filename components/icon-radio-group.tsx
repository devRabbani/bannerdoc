import { LucideIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import FormDiv from "./form-div";

type RadioOption<T extends string> = {
  value: T;
  icon: LucideIcon;
};

type IconRadioGroupProps<T extends string> = {
  label: string;
  options: readonly RadioOption<T>[];
  value: T;
  setValue: (value: T) => void;
};

export default function IconRadioGroup<T extends string>({
  label,
  options,
  value,
  setValue,
}: IconRadioGroupProps<T>) {
  return (
    <FormDiv>
      <Label>{label}:</Label>
      <RadioGroup value={value} onValueChange={setValue} className="flex gap-3">
        {options.map(({ value, icon: Icon }) => (
          <Label
            key={value}
            htmlFor={value}
            className="flex h-14 w-16 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:text-primary"
          >
            <Icon className="h-4 w-4" />
            <span className="text-[0.7rem] capitalize">{value}</span>
            <RadioGroupItem value={value} id={value} className="sr-only" />
          </Label>
        ))}
      </RadioGroup>
    </FormDiv>
  );
}
