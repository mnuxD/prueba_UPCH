import React, { ChangeEvent } from "react";
import "./styles.css";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface Props {
  className?: string;
  name: string;
  formContext: UseFormReturn<FieldValues, any, undefined>;
}

const ImageInput = ({ className, name, formContext }: Props) => {
  const {
    setValue,
    watch,
    trigger,
    formState: { errors }
  } = formContext;
  const image = watch(name);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setValue(name, event.target.result);
          trigger(name);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className={`inputContainer ${className}`}>
      <h4 className="form-label">Sube la foto</h4>
      <input type="file" id="formFile" onChange={handleImageChange} />
      <div
        className="image-upload-wrapper"
        onClick={() => document.getElementById("formFile")?.click()}
      >
        {image ? (
          <img src={image as string} alt="Uploaded" />
        ) : (
          <i className="bi bi-person-bounding-box personImage"></i>
        )}
      </div>
      {errors && errors[name]?.message && (
        <label className="text-danger">{errors[name]?.message as string}</label>
      )}
    </div>
  );
};

export default ImageInput;
