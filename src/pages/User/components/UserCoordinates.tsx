import React from "react";
import { useFormContext } from "react-hook-form";
import TextInput from "../../../components/TextInput/TextInput";
import MapComponent from "../../../components/MapComponent/MapComponen";
import { useTranslation } from "react-i18next";

const UserCoordinates = () => {
  const formContext = useFormContext();
  const { t } = useTranslation();
  const {
    register,
    formState: { errors }
  } = formContext;

  return (
    <div>
      <h3>{t("userLocation")}</h3>
      <div className="row">
        <TextInput
          className="mb-3 col-lg-6 col-md-6"
          label={t("address")}
          errors={errors}
          name="address"
          register={register}
        />
        <TextInput
          className="mb-3 col-lg-6 col-md-6"
          label={t("country")}
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
