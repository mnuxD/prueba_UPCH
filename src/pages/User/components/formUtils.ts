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
  userNameIsRequired: "userNameIsRequired",
  userGenderIsRequired: "userGenderIsRequired",
  userPhoneIsRequired: "userPhoneIsRequired",
  userEmailIsRequired: "userEmailIsRequired",
  userEmailInvalid: "userEmailInvalid",
  userNatIsRequired: "userNatIsRequired",
  userPhotoIsRequired: "userPhotoIsRequired",
  userLocationIsRequired: "userLocationIsRequired",
  userAddressIsRequired: "userAddressIsRequired",
  userCountryIsRequired: "userCountryIsRequired"
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
    .min(1, { message: messages.userPhotoIsRequired }),
  nat: z
    .string({
      required_error: messages.userNatIsRequired
    })
    .min(1, { message: messages.userNatIsRequired }),
  address: z
    .string({
      required_error: messages.userAddressIsRequired
    })
    .min(1, { message: messages.userAddressIsRequired }),
  country: z
    .string({
      required_error: messages.userCountryIsRequired
    })
    .min(1, { message: messages.userCountryIsRequired }),
  lat: z.number(),
  lng: z.number()
});

export type CreateUserInput = z.infer<typeof userFormSchema>;
