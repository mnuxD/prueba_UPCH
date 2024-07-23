import React from "react";
import { useFormContext } from "react-hook-form";
import TextInput from "../../../components/TextInput/TextInput";
import SelectWithSearch from "../../../components/SelectWithShare/SelectWithShare";
import { countriesData } from "../../../constants/countries";
import { gendersData } from "../../../constants/genders";
import MapComponent from "../../../components/MapComponent/MapComponen";

const UserCoordinates = () => {
  const formContext = useFormContext();

  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = formContext;

  return (
    <div>
      <h3>Ubicación del Usuario</h3>
      <div className="row">
        <TextInput
          className="mb-3 col-lg-6 col-md-6"
          label="Dirección"
          errors={errors}
          name="address"
          register={register}
        />
        <TextInput
          className="mb-3 col-lg-6 col-md-6"
          label="País"
          errors={errors}
          name="country"
          register={register}
        />
      </div>
      <MapComponent
        formContext={formContext}
        addressName="address"
        countryName="country"
        latName="lat"
        lngName="lng"
      />
    </div>
  );
};

export default UserCoordinates;
