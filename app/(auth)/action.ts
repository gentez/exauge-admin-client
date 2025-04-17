"use server"
import { CreateUser, getUser } from "@/lib/modules/auth"
import { UserDTO } from "@/lib/types/UserDTO"
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts"
import { signIn } from "./auth"
import crypto from "crypto"
import { v4 } from "uuid"
export async function RegisterAction(
  Name: string,
  OrganizationName: string,
  Email: string,
  Password: string
): Promise<any> {
  try {
    const salt = genSaltSync(10)
    const user: UserDTO = {
      name: Name,
      organization_name: OrganizationName,
      email: Email,
      password: Password,
      created_at: new Date(),
      updated_at: new Date(),
      user_guid: v4(),
      login_attempts: 5,
      is_admin: false,
      profile_pic: "",
      api_key: "",
      api_secret: "",
      otp: "1234",
      otp_expire: new Date(),
    }
    // Check if user already exists
    const existingUser = await getUser(Email)
    if (existingUser && existingUser.length > 0) {
      return { success: false, message: "User already exists" }
    }
    // hashed password
    user.password = hashSync(user.password, salt)
    const apiKey = crypto.randomBytes(16).toString("hex")
    const apiSecret = crypto.randomBytes(32).toString("hex")
    // Create user
    const response = await CreateUser({
      ...user,
      api_key: apiKey,
      api_secret: apiSecret,
    })
    if (response) {
      return { success: true, message: "User created successfully" }
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return { success: false, message: "Error creating user" }
  }
}

export async function LoginAction(Email: string, Password: string): Promise<any> {
  try {
    const user = await getUser(Email)
    if (!user || user.length === 0 || !user[0]) {
      return { success: false, message: "User not found" }
    }
    if (!compareSync(Password, user[0].password)) {
      return { success: false, message: "Invalid password" }
    }
    await signIn("credentials", {
      email: Email,
      password: Password,
      redirect: false,
    })
    return { success: true, message: "Login successful" }
  } catch (error) {
    console.error("Error logging in:", error)
    return { success: false, message: "Error logging in" }
  }
}
