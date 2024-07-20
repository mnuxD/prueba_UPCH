import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { OptionType } from "../../types";
import "./styles.css";

interface Props {
  options: OptionType[];
  title: string;
  className?: string;
}

const SelectWithSearch = ({ className, options = [], title = "" }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(title);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (label: string) => {
    setSelectedOption(label);
  };

  return (
    <div className={`dropdown ${className}`}>
      <button
        className="btn btn-light dropdown-toggle text-secondary buttonDropdown"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {selectedOption}
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
          <span className="dropdown-item bg-secondary dropdownCard__title">
            {title}
          </span>
        </li>
        {filteredOptions.map((option) => (
          <li key={option.value}>
            <a
              className="dropdown-item dropdownCard__item"
              href="#"
              onClick={() => handleOptionClick(option.label)}
            >
              {option.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectWithSearch;
