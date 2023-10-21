// import type { NextAuthOptions } from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
// import CredentialsProvider  from 'next-auth/providers/credentials'


// export const options: NextAuthOptions = {
//     // https://next-auth.js.org/configuration/providers
//     providers: [

//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID as string,
//             clientSecret: process.env.GOOGLE_SECRET as string,
//         }), 
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 username: { label: "Username", type: "text", placeholder: "jsmith" },
//                 password: {  label: "Password", type: "password" }
//             },
//             async authorize(credentials) {
//                 const user = { id: '1', name: 'sarkar.arup@gmail.com', email: '', image: '', password: 'a93psa9ka9' };
//                 if(credentials?.username === user.name && credentials?.password === user.password) {
//                     console.log('authorize', user)
//                     return user;
//                 }
//                 return null;
//             }
//         }),

//     ],

//     // https://next-auth.js.org/configuration/callbacks
//     callbacks: {
//         async signIn({ user, account, profile, email, credentials }) {
//             console.log('callbacks signIn', user, account, profile)
//             return true
//         },
//         async redirect({ url, baseUrl }) {
//             console.log('callbacks redirect', url, baseUrl)
//             return baseUrl
//         },
//         async session({ session, user, token }) {
//             console.log('callbacks session', session, user, token)
//             return session
//         },
//         async jwt({ token, user, account, profile }) {
//             console.log('callbacks jwt', token, user, account, profile)
//             return token
//         },
//     },


//     events: {
//         async signIn(message) { 
//             console.log('events signIn', message)
//          },
//         async signOut(message) { 
//             console.log('events signOut', message)
//         },
//         async createUser(message) { /* user created */ },
//         async linkAccount(message) { /* account linked to a user */ },
//         async session(message) { 
//             console.log('events session', message)
//          },

//       },

//       logger: {
//         error(code, metadata) {
//             console.error(code, metadata)
//           },
//           warn(code) {
//             console.warn(code)
//           },
//           debug(code, metadata) {
//             console.debug(code, metadata)
//           }
//       },

// }
        


