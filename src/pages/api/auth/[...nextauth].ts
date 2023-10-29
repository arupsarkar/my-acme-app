import NextAuth from "next-auth/next";

export const authOptions = {
    providers: [],
    session: {},
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}: any) {
            if (account?.accessToken) {
                console.log("account.accessToken", account.accessToken)
                token.accessToken = account.accessToken;
            }
            return token;
        },
        async session({session, token}: any) {
            console.log("session.session", JSON.stringify(session))
            console.log("session.token", token)
            session.accessToken = token.accessToken;
            return session;
        },
    },
}

export default NextAuth(authOptions);