import { useState } from "react";
import { OptionType } from "../../types";
import { useDropdown } from "../../hooks/use-dropdown";
import { useTranslation } from "react-i18next";
import "./styles.css";

interface Props {
  id: string;
  options: OptionType[];
  title?: string;
  className?: string;
  classNameButton?: string;
  handleChange: (value: string) => void;
  selectedOption: string;
  label?: string;
  error?: string;
  isSearch?: boolean;
}

const CustomSelect = ({
  id,
  className,
  classNameButton,
  options = [],
  title = "",
  handleChange,
  selectedOption,
  label,
  error,
  isSearch = true
}: Props) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const { isOpen, toggleDropdown, closeDropdown } = useDropdown(id);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOptionLabel =
    options.find((e) => e.value === selectedOption)?.label || "";

  return (
    <div className={`dropdown ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <button
        className={`btn btn-light dropdown-toggle text-secondary buttonDropdown ${classNameButton}`}
        type="button"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation(); // Prevent event propagation
          toggleDropdown();
        }}
        style={{ display: "flex" }}
      >
        {selectedOptionLabel
          ? selectedOptionLabel
          : title
          ? title
          : t("selectOption")}
      </button>
      {error && <label className="text-danger">{t(error)}</label>}
      {isOpen && (
        <ul
          className="dropdown-menu show dropdownCard"
          aria-labelledby={id}
          onClick={(e) => e.stopPropagation()}
        >
          {isSearch && (
            <li className="p-2">
              <input
                type="text"
                className="form-control"
                placeholder={`${t("search")}...`}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </li>
          )}

          {title && (
            <li>
              <span className="dropdown-item bg-secondary dropdownCard__title text-white">
                {title}
              </span>
            </li>
          )}
          {filteredOptions.map((option) => (
            <li key={option.value}>
              <button
                className={`dropdown-item ${
                  selectedOption === option.value
                    ? "dropdownCard__item--active"
                    : "dropdownCard__item"
                }`}
                onClick={() => {
                  handleChange(option.value);
                  closeDropdown();
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
