"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import crypto from "crypto"

import { updateUserSettings } from "@/app/(main)/action"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getUserByEmail } from "@/lib/modules/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Building, Key, KeyRound, LockIcon, Mail, Upload, User } from "lucide-react"
import { Separator } from "../ui/separator"

const formSchema = z
  .object({
    user_guid: z.string().uuid({ message: "Invalid GUID format" }),
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(50, { message: "Name must be less than 50 characters" }),
    organization_name: z
      .string()
      .min(2, { message: "Organization name must be at least 2 characters" })
      .max(100, { message: "Organization name must be less than 100 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    newPassword: z
      .string()
      .optional()
      .refine((val) => !val || (val.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val)), {
        message:
          "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirmPassword: z.string().optional(),
    api_key: z.string().min(10, { message: "API key must be at least 10 characters" }),
    api_secret: z.string().min(10, { message: "API secret must be at least 10 characters" }),
    profile_pic: z
      .instanceof(File)
      .optional()
      .refine(
        (file) =>
          !file || (file.size <= 5 * 1024 * 1024 && ["image/jpeg", "image/png", "image/gif"].includes(file.type)),
        { message: "Profile picture must be a valid image (JPEG/PNG/GIF) under 5MB" }
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export default function SettingsForm() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const { data: session } = useSession()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_guid: "",
      name: "",
      organization_name: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
      api_key: "",
      api_secret: "",
      profile_pic: undefined,
    },
  })

  async function fetchData() {
    try {
      const user = await getUserByEmail()

      if (!user) {
        return
      }

      form.reset({
        user_guid: user.user_guid || "",
        name: user.name || "",
        organization_name: user.organization_name || "",
        email: user.email || "",
        newPassword: "",
        confirmPassword: "",
        api_key: user.api_key || "",
        api_secret: user.api_secret || "",
        profile_pic: undefined,
      })
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  }

  useEffect(() => {
    if (session?.user?.email) {
      fetchData()
    }
  }, [session?.user?.email])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData()
      formData.append("user_guid", values.user_guid)
      formData.append("name", values.name)
      formData.append("organization_name", values.organization_name)
      formData.append("email", values.email)
      formData.append("newPassword", values.newPassword || "") // Send newPassword (will be hashed on the backend)
      formData.append("api_key", values.api_key)
      formData.append("api_secret", values.api_secret)
      formData.append("profile_pic", "") // Override profile_pic to empty string

      const result = await updateUserSettings(formData)
      if (result.success) {
        console.log(result.message)
      } else {
        throw new Error(result.message)
      }

      console.log("Profile picture submitted as: ", "")
    } catch (error) {
      console.error("Failed to update settings:", error)
    }
  }

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | undefined) => void
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      onChange(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      onChange(undefined)
      setPreviewUrl(null)
    }
  }

  const generateApiKey = () => {
    const newApiKey = crypto.randomBytes(16).toString("hex")
    form.setValue("api_key", newApiKey, { shouldValidate: true })
  }

  const generateApiSecret = () => {
    const newApiSecret = crypto.randomBytes(32).toString("hex")
    form.setValue("api_secret", newApiSecret, { shouldValidate: true })
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="mx-auto max-w-3xl border-0 shadow-lg">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-gray-500 to-gray-600 text-white">
          {/* <CardTitle className="text-2xl font-bold">User Settings</CardTitle>
          <CardDescription className="text-gray-100">Manage your account information and preferences</CardDescription> */}
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-8 grid grid-cols-2">
              <TabsTrigger value="profile" className="text-gray-600">
                Profile Information
              </TabsTrigger>
              <TabsTrigger value="security" className="text-gray-600">
                Security & API
              </TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <TabsContent value="profile" className="space-y-6">
                  <div className="flex flex-col items-start gap-8 md:flex-row">
                    <div className="flex-shrink-0">
                      {/* <FormField
                        control={form.control}
                        name="profile_pic"
                        render={({ field: { onChange, value, ...field } }) => (
                          <FormItem className="space-y-4">
                            <div className="relative mx-auto md:mx-0">
                              <Avatar className="h-32 w-32 border-4 border-gray-100">
                                <AvatarImage src={previewUrl || "/placeholder.svg?height=128&width=128"} />
                                <AvatarFallback className="bg-gray-100 text-xl text-gray-800">
                                  <User size={40} />
                                </AvatarFallback>
                              </Avatar>
                              <div className="absolute -right-2 -bottom-2">
                                <label htmlFor="profile-upload" className="cursor-pointer">
                                  <div className="rounded-full bg-gray-600 p-2 text-white shadow-lg transition-colors hover:bg-gray-700">
                                    <Upload size={16} />
                                  </div>
                                  <Input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    className="hidden"
                                    onChange={(e) => handleImageChange(e, onChange)}
                                    {...field}
                                  />
                                </label>
                              </div>
                            </div>
                            <FormDescription className="text-muted-foreground text-center text-sm md:text-left">
                              JPEG, PNG, or GIF (max 5MB)
                            </FormDescription>
                          </FormItem>
                        )}
                      /> */}
                    </div>

                    <div className="w-full flex-1 space-y-6">
                      <FormField
                        control={form.control}
                        name="user_guid"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <KeyRound className="h-4 w-4 text-gray-600" />
                              User GUID
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                className="border-gray-100 focus-visible:ring-gray-500"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Your unique identifier</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-600" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                className="border-gray-100 focus-visible:ring-gray-500"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>Your full name</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="organization_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-gray-600" />
                                Organization
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Acme Corp"
                                  className="border-gray-100 focus-visible:ring-gray-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>Your organization name</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-600" />
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="john@example.com"
                                  className="border-gray-100 focus-visible:ring-gray-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>Your email address</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-medium">
                        <LockIcon className="h-5 w-5 text-gray-600" />
                        Password Settings
                      </h3>
                      <Separator className="mb-4" />

                      <FormItem>
                        <Button
                          type="button"
                          variant={showPasswordFields ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setShowPasswordFields(!showPasswordFields)}
                        >
                          {showPasswordFields ? "Cancel Password Change" : "Change Password"}
                        </Button>

                        {showPasswordFields && (
                          <div className="mt-4 space-y-4 rounded-lg bg-gray-50 p-4">
                            <FormField
                              control={form.control}
                              name="newPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>New Password</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="password"
                                      placeholder="********"
                                      className="border-gray-100 focus-visible:ring-gray-500"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>Minimum 8 characters</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Confirm Password</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="password"
                                      placeholder="********"
                                      className="border-gray-100 focus-visible:ring-gray-500"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>Confirm your new password</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </FormItem>
                    </div>

                    <div>
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-medium">
                        <Key className="h-5 w-5 text-gray-600" />
                        API Credentials
                      </h3>
                      <Separator className="mb-4" />

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="api_key"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>API Key</FormLabel>
                              <div className="space-y-2">
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="Your API Key"
                                      className="border-gray-100 pr-24 focus-visible:ring-gray-500"
                                      {...field}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute top-1 right-1 h-8 text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                                      onClick={generateApiKey}
                                    >
                                      Generate
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormDescription>Your API key for authentication</FormDescription>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="api_secret"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>API Secret</FormLabel>
                              <div className="space-y-2">
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="Your API Secret"
                                      className="border-gray-100 pr-24 focus-visible:ring-gray-500"
                                      {...field}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute top-1 right-1 h-8 text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                                      onClick={generateApiSecret}
                                    >
                                      Generate
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormDescription>Your API secret for secure requests</FormDescription>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <div className="border-t pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
                  >
                    Save Settings
                  </Button>
                </div>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
