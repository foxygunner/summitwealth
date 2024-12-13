import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { inferAdditionalFields } from "better-auth/client/plugins";

import { env } from "@/env.mjs";
import { auth } from ".";

export const {
  useSession,
  signIn,
  signOut,
  signUp,
  forgetPassword,
  resetPassword,
} = createAuthClient({
  //you can pass client configuration here
  baseURL: env.NEXT_PUBLIC_APP_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});
