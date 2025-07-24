"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type Props = {
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { value: string; label: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};

export const Select = ({
  value,
  onChange,
  onCreate,
  options = [],
  disabled,
  placeholder,
}: Props) => {
  const onSelect = (option: SingleValue<{ value: string; label: string }>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value) || null;
  }, [value, options]);

  return (
    <CreatableSelect
      className="text-sm h-10"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#e2e8f0",
          },
        }),
      }}
      isDisabled={disabled}
      onChange={onSelect}
      onCreateOption={onCreate}
      options={options}
      placeholder={placeholder}
      value={formattedValue}
    />
  );
};
