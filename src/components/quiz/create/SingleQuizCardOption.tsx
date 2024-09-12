import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";

type Props = {
  option: string;
  value: string;
};

export default function SingleQuizCardOption({ option, value }: Props) {
  return (
    <div className="flex items-center space-x-3">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value}>{option}</Label>
    </div>
  );
}
