export interface UserDTO {
  user_id? : number
  name: string
  organization_name: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
  user_guid: string
  login_attempts: number
  is_admin: boolean
  profile_pic: string
  api_key: string
  api_secret: string
  otp: string
  otp_expire: Date
}
