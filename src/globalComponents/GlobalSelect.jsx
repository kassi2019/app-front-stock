import React from "react";
import Select from "react-select";

// Styles globaux personnalisés
const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "2px",
    boxShadow: "none",
    "&:hover": { borderColor: "#000" },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#000",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#e6f4ea"
      : state.isFocused
      ? "#e6f4ea"
      : "#e6f4ea",
    color: state.isSelected ? "#000" : "#000",
  }),
};

export default function GlobalSelect({
  options,
  value,
  onChange,
  placeholder,
}) {
  return (
    <Select
      styles={customStyles}
      options={options}
      value={options?.find((opt) => opt.value === value)}
      onChange={(selected) => onChange(selected.value)}
      placeholder={placeholder || "- Sélectionnez-"}
      className="w-100"
    />
  );
}
