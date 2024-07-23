import React from "react";
import { useFormContext } from "react-hook-form";
import TextInput from "../../../components/TextInput/TextInput";
import SelectWithSearch from "../../../components/SelectWithShare/SelectWithShare";
import { countriesData } from "../../../constants/countries";
import { gendersData } from "../../../constants/genders";

const UserInfo = () => {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useFormContext();

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
      <h3>Información del Usuario</h3>
      <div className="row">
        <TextInput
          className="mb-3 col-lg-6 col-md-6"
          label="Nombre"
          errors={errors}
          name="name"
          register={register}
        />
        <TextInput
          className="mb-3 col-lg-6 col-md-6"
          label="Email"
          errors={errors}
          name="email"
          register={register}
        />
        <TextInput
          className="mb-3 col-lg-6 col-md-6"
          label="Teléfono"
          errors={errors}
          name="phone"
          register={register}
        />

        <SelectWithSearch
          label="Nacionalidad"
          classNameButton="bg-white text-black w-100"
          className="mb-3 col-lg-6 col-md-6"
          id="dropdownNat"
          options={countriesData}
          title="Nacionalidad"
          handleChange={handleChangeCountry}
          selectedOption={natWatcher}
          error={errors && (errors.nat?.message as string)}
        />
        <SelectWithSearch
          label="Género"
          classNameButton="bg-white text-black w-100"
          className="mb-3 col-lg-6 col-md-6"
          id="dropdownGender"
          options={gendersData}
          title="Género"
          handleChange={handleChangeGender}
          selectedOption={genderWatcher}
          error={errors && (errors.gender?.message as string)}
        />
      </div>
    </div>
  );
};

export default UserInfo;
