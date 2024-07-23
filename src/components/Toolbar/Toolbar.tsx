import React from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import { languages } from "../../constants/languages";
import { useLanguage } from "../../hooks/use-language";
import "./styles.css";
import { useTranslation } from "react-i18next";

const Toolbar = () => {
  const { language, handleChangeLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="contentToolbar">
      <img
        onClick={() => {
          window.location.assign("/");
        }}
        src="/u-logo.png"
        alt="logo-university"
        className="logo"
      />
      <CustomSelect
        classNameButton="customSelectNavbar"
        id="dropdownLanguages"
        options={languages.map((e) => {
          return {
            label: `${e.flag} ${t(e.label)}`,
            value: e.value
          };
        })}
        handleChange={handleChangeLanguage}
        selectedOption={language}
        isSearch={false}
      />
    </div>
  );
};
export default Toolbar;
