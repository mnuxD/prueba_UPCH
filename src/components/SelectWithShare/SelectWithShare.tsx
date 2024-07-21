import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { OptionType } from "../../types";
import "./styles.css";

interface Props {
  options: OptionType[];
  title: string;
  className?: string;
  handleChange: (value: string) => void;
  selectedOption: string;
}

const SelectWithSearch = ({
  className,
  options = [],
  title = "",
  handleChange,
  selectedOption
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

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
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedOptionLabel ? selectedOptionLabel : title}
      </button>
      <ul
        className="dropdown-menu dropdownCard"
        aria-labelledby="dropdownMenuButton"
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
              onClick={() => handleChange(option.value)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectWithSearch;
