import { useEffect, useRef, useState } from "react";
import { OptionType } from "../../types";
import "./styles.css";
import { useDropdown } from "../../hooks/use-dropdown";

interface Props {
  id: string;
  options: OptionType[];
  title: string;
  className?: string;
  handleChange: (value: string) => void;
  selectedOption: string;
}

const SelectWithSearch = ({
  id,
  className,
  options = [],
  title = "",
  handleChange,
  selectedOption
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { isOpen, toggleDropdown, closeDropdown } = useDropdown(id);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOptionLabel =
    options.find((e) => e.value === selectedOption)?.label || "";

  return (
    <div className={`dropdown ${className}`}>
      <button
        className="btn btn-light dropdown-toggle text-secondary buttonDropdown"
        type="button"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation(); // Prevenir la propagación del evento
          toggleDropdown();
        }}
      >
        {selectedOptionLabel ? selectedOptionLabel : title}
      </button>
      {isOpen && (
        <ul
          className="dropdown-menu show dropdownCard"
          aria-labelledby={id}
          onClick={(e) => e.stopPropagation()}
        >
          <li className="p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </li>
          <li>
            <span className="dropdown-item bg-secondary dropdownCard__title text-white">
              {title}
            </span>
          </li>
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

export default SelectWithSearch;
