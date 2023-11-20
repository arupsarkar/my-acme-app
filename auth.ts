import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";
import { getServerSession } from "next-auth";

import vercelPostgresAdapter from "@/app/utils/db/vercelPostgresAdapter";

import Google from "next-auth/providers/google";
import Instagram from "next-auth/providers/instagram";
import Twitter from "next-auth/providers/twitter";
import { createPool } from "@vercel/postgres";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole?: "admin";
  }
}

//create a @vercel/postgres pool
const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

//add the vercelPostgresAdapter to the config object
export const adapter = vercelPostgresAdapter();


export const config = {
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    adapter,
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,      
    }),
    Instagram({
      clientId: process.env.INSTAGRAM_ID,
      clientSecret: process.env.INSTAGRAM_SECRET,
    }),
    Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("process env instagram Id ", process.env.INSTAGRAM_ID);
      console.log("process env instagram secret ", process.env.INSTAGRAM_SECRET);
      console.log("callbacks signIn user ", user);
      console.log("callbacks signIn account ", account);
      console.log("callbacks signIn access token --->  ", account?.access_token);
      console.log("callbacks signIn profile ", profile);
      console.log("callbacks signIn email ", email);
      console.log("callbacks signIn credentials ", credentials);
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("callbacks redirect", url, baseUrl);
      return baseUrl;
    },
    async session({ session, user, token }) {
      console.log("callbacks session", session);
      console.log("callbacks session user", user);
      console.log("callbacks session token ", token);
      return session;
    },
    async jwt({ token, user, account, profile }) {
      console.log("callbacks jwt", token, user, account, profile);
      token.userRole = "admin"
      return token;
    },
  },
  events: {
    async signIn(message) {
      console.log("events signIn", message);
      console.log("events signIn user", message.user.name);
      console.log("events signIn token", message.account?.access_token);
    },
    async signOut(message) {
      console.log("events signOut", message);
    },
    async createUser(message) {
      /* user created */
      console.log("createUser", message);
    },
    async linkAccount(message) {
      /* account linked to a user */
      console.log("linkAccount", message);
    },
    async session(message) {
      console.log("events session", message);
    },
  },

  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
} satisfies NextAuthConfig;

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}

declare global {
    namespace NodeJS {
      export interface ProcessEnv {
        NEXTAUTH_SECRET: string
        GOOGLE_ID: string
        GOOGLE_SECRET: string
        INSTAGRAM_ID: string
        INSTAGRAM_SECRET: string
        TWITTER_ID: string
        TWITTER_SECRET: string
      }
    }
}