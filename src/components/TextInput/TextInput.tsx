import React from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "tel" | "url" | "date";
  register: any;
  placeholder?: string;
  className?: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  errors?: FieldErrors<FieldValues>;
}

const TextInput: React.FC<InputProps> = ({
  type = "text",
  register,
  placeholder,
  className,
  name,
  required,
  disabled,
  label,
  errors
}) => {
  const { t } = useTranslation();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return (
    <div className={className}>
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="form-control"
        required={required}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
      {errors && errors[name]?.message && (
        <label className="text-danger">
          {t(errors[name]?.message as string)}
        </label>
      )}
    </div>
  );
};

export default TextInput;
