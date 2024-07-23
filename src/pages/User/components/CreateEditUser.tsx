import React, { useState } from "react";
import { UserType } from "../../../redux/apis/userApi/types";
import FormNav, { formParts } from "./formNav";
import UserInfo from "./UserInfo";
import UserMedia from "./UserMedia";
import UserCoordinates from "./UserCoordinates";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserInput, defaultValues, userFormSchema } from "./formUtils";
import { useCreateUser, useUpdateUser } from "../../../redux/hooks/userHooks";
import ModalAlert from "../../../components/ModalAlert/ModalAlert";
import { useModal } from "../../../hooks/use-modal";
import "./styles.css";

interface Props {
  data?: UserType;
}

const CreateEditUser = ({ data }: Props) => {
  const [isLoading, setLoading] = useState(false);

  const isCreate = !data;

  const StepsComponents = {
    [formParts.info]: <UserInfo />,
    [formParts.media]: <UserMedia />,
    [formParts.coordinates]: <UserCoordinates />
  };

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultValues(data)
  });

  const { updateUser } = useUpdateUser();
  const { createUser } = useCreateUser();
  const { openModal: openModalSuccess } = useModal("successCreateEdit");
  const { openModal: openModalError } = useModal("errorCreateEdit");

  const onSubmit: SubmitHandler<CreateUserInput> = async (data) => {
    setLoading(true);

    try {
      if (isCreate) {
        await createUser(data);
        methods.reset();
      } else await updateUser(data);
      openModalSuccess();
    } catch (error) {
      openModalError();
    }
    setLoading(false);
  };

  return (
    <div
      data-bs-spy="scroll"
      data-bs-target="#navbar-example2"
      data-bs-root-margin="0px 0px -40%"
      data-bs-smooth-scroll="true"
      className="scrollspy-example"
    >
      <ModalAlert id="successCreateEdit" type="success" />
      <ModalAlert id="errorCreateEdit" type="error" />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data, event) => {
            event?.preventDefault();
            onSubmit(data);
          })}
        >
          <FormNav isLoading={isLoading} isCreate={isCreate} />
          <div className="bg-body-tertiary p-3 mb-3 rounded-4">
            {Object.entries(StepsComponents).map(([key, component]) => (
              <div key={key}>
                <div id={key} style={{ height: 50 }} />
                {component}
              </div>
            ))}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateEditUser;
