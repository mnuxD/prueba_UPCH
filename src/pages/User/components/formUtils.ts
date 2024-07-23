import { z } from "zod";
import { UserType } from "../../../redux/apis/userApi/types";

export function defaultValues(user?: UserType) {
  return {
    name: user?.name ?? "",
    photo: user?.photo ?? "",
    gender: user?.gender ?? "",
    address: user?.address ?? "",
    phone: user?.phone ?? "",
    email: user?.email ?? "",
    country: user?.country ?? "",
    nat: user?.nat ?? "",
    lat: user?.lat ?? 0,
    lng: user?.lng ?? 0
  };
}

const messages = {
  userNameIsRequired: "Debe ingresar el nombre",
  userGenderIsRequired: "Debe ingresar el género",
  userPhoneIsRequired: "Debe ingresar el teléfono",
  userEmailIsRequired: "Debe ingresar el email",
  userEmailInvalid: "El email no es válido",
  userNatIsRequired: "Debe ingresar la nacionalidad",
  userPhotoIsRequired: "Debe ingresar una foto",
  userLocationIsRequired: "Debe ingresar una ubicación"
};

export const userFormSchema = z.object({
  name: z
    .string({ required_error: messages.userNameIsRequired })
    .min(1, { message: messages.userNameIsRequired }),
  gender: z
    .string({
      required_error: messages.userGenderIsRequired
    })
    .min(1, { message: messages.userGenderIsRequired }),
  phone: z
    .string({
      required_error: messages.userPhoneIsRequired
    })
    .min(1, { message: messages.userPhoneIsRequired }),
  email: z
    .string({
      required_error: messages.userEmailIsRequired
    })
    .min(1, { message: messages.userEmailIsRequired })
    .email({ message: messages.userEmailInvalid }),
  photo: z
    .string({
      required_error: messages.userPhotoIsRequired
    })
    .min(1, { message: messages.userPhoneIsRequired }),
  nat: z
    .string({
      required_error: messages.userNatIsRequired
    })
    .min(1, { message: messages.userNatIsRequired }),
  address: z
    .string({
      required_error: messages.userLocationIsRequired
    })
    .min(1, { message: messages.userLocationIsRequired }),
  country: z
    .string({
      required_error: messages.userLocationIsRequired
    })
    .min(1, { message: messages.userLocationIsRequired }),
  lat: z.number(),
  lng: z.number()
});

export type CreateUserInput = z.infer<typeof userFormSchema>;
