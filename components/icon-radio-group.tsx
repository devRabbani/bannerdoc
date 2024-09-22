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
      <RadioGroup
        value={value}
        onValueChange={setValue}
        className="mt-2 flex gap-2 md:gap-3"
      >
        {options.map(({ value, icon: Icon }) => (
          <Label
            key={value}
            htmlFor={value}
            className="flex h-12 w-[3.2rem] cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground sm:h-14 sm:w-16 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:text-primary"
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-[0.5rem] capitalize sm:text-[0.7rem]">
              {value}
            </span>
            <RadioGroupItem value={value} id={value} className="sr-only" />
          </Label>
        ))}
      </RadioGroup>
    </FormDiv>
  );
}
