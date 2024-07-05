"use server";

import { signIn, signOut } from "../../auth";
import { revalidatePath } from "next/cache";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData) {
  try {
    const response = await signIn("credentials", {
      username: formData.username,
      password: formData.password,
      redirect: false,
    });
    revalidatePath("/");
    return response;
  } catch (err) {
    throw err;
  }
}
