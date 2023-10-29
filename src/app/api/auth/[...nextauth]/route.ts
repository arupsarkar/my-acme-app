import NextAuth from "next-auth/next";
// import { options } from "./options";
import { config } from "../../../../../auth";

const handler = NextAuth(config)
//need to handle callbacks here

export { handler as GET, handler as POST}

