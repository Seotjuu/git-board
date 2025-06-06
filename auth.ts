import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth
        },
    },
    pages: {
        signIn: "/",
    }
})