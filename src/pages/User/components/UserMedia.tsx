import React from "react";
import { useFormContext } from "react-hook-form";
import ImageInput from "../../../components/ImageInput/ImageInput";

const UserMedia = () => {
  const formContext = useFormContext();

  return (
    <div>
      <h3>Foto del Usuario</h3>
      <ImageInput name="photo" formContext={formContext} />
    </div>
  );
};

export default UserMedia;
