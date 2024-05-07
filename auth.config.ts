import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import google from "next-auth/providers/google"
 
export default { providers: [google] } satisfies NextAuthConfig