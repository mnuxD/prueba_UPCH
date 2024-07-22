import React from "react";
import { UserType } from "../../../redux/apis/userApi/types";

interface Props {
  slug?: string;
  data?: UserType;
}

const CreateEditUser = ({ slug, data }: Props) => {
  return <div>HOLAAA</div>;
};

export default CreateEditUser;
