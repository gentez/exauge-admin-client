"use server";

import { z } from "zod";
import { hashSync } from "bcrypt";
import { updateUser } from "@/lib/modules/auth";
import { UserDTO } from "@/lib/types/UserDTO";

const saltRounds = 10;

const formSchema = z.object({
  user_guid: z.string().uuid(),
  name: z.string().min(2).max(50),
  organization_name: z.string().min(2).max(100),
  email: z.string().email(),
  newPassword: z.string().optional(),
  api_key: z.string().min(10),
  api_secret: z.string().min(10),
  profile_pic: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export async function updateUserSettings(formData: FormData) {
  try {
    const values = {
      user_guid: formData.get("user_guid") as string,
      name: formData.get("name") as string,
      organization_name: formData.get("organization_name") as string,
      email: formData.get("email") as string,
      newPassword: formData.get("newPassword") as string | undefined,
      api_key: formData.get("api_key") as string,
      api_secret: formData.get("api_secret") as string,
      profile_pic: formData.get("profile_pic") as string | undefined,
    };

    if (values.newPassword) {
      values.newPassword = hashSync(values.newPassword, saltRounds);
    }

    const parsedValues = formSchema.parse(values);

    const userToUpdate: UserDTO = {
      user_id: Number(parsedValues.user_guid),
      user_guid: parsedValues.user_guid,
      name: parsedValues.name,
      organization_name: parsedValues.organization_name,
      email: parsedValues.email,
      password: parsedValues.newPassword || "",
      api_key: parsedValues.api_key,
      api_secret: parsedValues.api_secret,
      profile_pic: parsedValues.profile_pic || "", 
      created_at: new Date(),
      updated_at: new Date(),
      login_attempts: 0,
      is_admin: false,
      otp: "",
      otp_expire: new Date(),
    };

    const updatedUser = await updateUser(userToUpdate);

    return { success: true, message: "Settings updated successfully!", data: updatedUser };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, message: "Failed to update settings." };
  }
}