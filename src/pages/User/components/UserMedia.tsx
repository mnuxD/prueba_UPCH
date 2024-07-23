import React from "react";
import { useFormContext } from "react-hook-form";
import ImageInput from "../../../components/ImageInput/ImageInput";
import { useTranslation } from "react-i18next";

const UserMedia = () => {
  const formContext = useFormContext();
  const { t } = useTranslation();
  return (
    <div>
      <h3>{t("userPhoto")}</h3>
      <ImageInput name="photo" formContext={formContext} />
    </div>
  );
};

export default UserMedia;
