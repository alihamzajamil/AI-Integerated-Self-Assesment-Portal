"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { TextFormSchemaType } from "@/types/common";

type option = {
  id: string;
  title: string;
};
type Props<T extends keyof TextFormSchemaType> = {
// have to find its type
  field: ControllerRenderProps<TextFormSchemaType, T>;
  options: option[];
  label: string;
  placeholder: string;
};

export default function SelectOption<T extends keyof TextFormSchemaType>({
  options,
  label,
  placeholder,
  field,
}: Props<T>) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className="my-1">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="bg-white">{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem className="bg-white" key={option.id} value={option.id}>
              {option.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
