import React from "react";
import { useFormContext } from "react-hook-form";
import TextInput from "../../../components/TextInput/TextInput";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import { countriesData } from "../../../constants/countries";
import { gendersData } from "../../../constants/genders";
import { useTranslation } from "react-i18next";

const UserInfo = () => {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useFormContext();
  const { t } = useTranslation();
  const natWatcher = watch("nat");
  const genderWatcher = watch("gender");

  const handleChangeCountry = (value: string) => {
    setValue("nat", value);
    trigger("nat");
  };

  const handleChangeGender = (value: string) => {
    setValue("gender", value);
    trigger("gender");
  };

  return (
    <div>
      <h3>{t("userInfo")}</h3>
      <div className="row">
        <TextInput
          className="mb-3 col-lg-6 col-md-6"
          label={t("name")}
          errors={errors}
          name="name"
          register={register}
        />
        <TextInput
          className="mb-3 col-lg-6 col-md-6"
          label={t("email")}
          errors={errors}
          name="email"
          register={register}
        />
        <TextInput
          className="mb-3 col-lg-6 col-md-6"
          label={t("phone")}
          errors={errors}
          name="phone"
          register={register}
        />

        <CustomSelect
          label={t("nationality")}
          classNameButton="bg-white text-black w-100"
          className="mb-3 col-lg-6 col-md-6"
          id="dropdownNat"
          options={countriesData.map((e) => {
            return { label: `${e.flag} ${t(e.label)}`, value: e.value };
          })}
          title={t("nationality")}
          handleChange={handleChangeCountry}
          selectedOption={natWatcher}
          error={errors && (errors.nat?.message as string)}
        />
        <CustomSelect
          label={t("gender")}
          classNameButton="bg-white text-black w-100"
          className="mb-3 col-lg-6 col-md-6"
          id="dropdownGender"
          options={gendersData.map((e) => {
            return { label: t(e.label), value: e.value };
          })}
          title={t("gender")}
          handleChange={handleChangeGender}
          selectedOption={genderWatcher}
          error={errors && (errors.gender?.message as string)}
        />
      </div>
    </div>
  );
};

export default UserInfo;
