'use server'

import { UserDTO } from "@/lib/types/UserDTO";
import { prisma } from "lib/clients/prisma"
import { headers } from 'next/headers';
import { auth } from "@/app/(auth)/auth";

export async function getUser(email: string): Promise<Array<UserDTO>> {
  try {
    const users = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    return users ? [users] : [];
  } catch (error) {
    console.error("Failed to get user from database")
    throw error
  }
}

export async function CreateUser(user: UserDTO): Promise<UserDTO> {
  try {
    const users = await prisma.user.create({
      data: {
        ...user
      }
    })
    return users;
  } catch (error) {
    console.error("Failed to create user from database")
    throw error
  }
}

async function getUserByApiKey(apiKey: string): Promise<Array<UserDTO>> {
  try {
    const users = await prisma.user.findFirst({
      where: {
        api_key: apiKey,
      },
    })
    return users ? [users] : [];
  } catch (error) {
    console.error("Failed to get user from database")
    throw error
  }
}


export async function authenticateClient() {
  const requestHeader = await headers();
  const apiKey = requestHeader.get('X-API-Key');
  const apiSecret = requestHeader.get('X-API-Secret');
  if (!apiKey || !apiSecret) {
    return {
      success: false,
      message: 'Missing API credentials',
      status: 401,
    }
  }
  const user = await getUserByApiKey(apiKey);
  if (!user || user.length === 0) {
    return {
      success: false,
      message: 'Invalid API credentials',
      status: 401,
    }
  }
  const userData = user[0];
  if (userData && userData.api_secret !== apiSecret) {
    return {
      success: false,
      message: 'Invalid API credentials',
      status: 401,
    }
  }
  return {
    success: true,
    data: userData,
    status: 200,
  }
}

export async function getUserByEmail() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User is not authenticated or email is missing.");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return user;
}

export async function updateUser(user: UserDTO): Promise<UserDTO> {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        name: user.name,
        organization_name: user.organization_name,
        email: user.email,
        password: user.password,
        api_key: user.api_key,
        api_secret: user.api_secret,
        profile_pic: user.profile_pic,
        updated_at: new Date(),
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("Failed to update user in database:", error);
    throw error;
  }
}