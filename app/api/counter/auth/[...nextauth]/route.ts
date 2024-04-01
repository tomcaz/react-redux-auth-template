import { UserNotActivated, UserNotVerified } from "@/lib/constants"
import { auth } from "@/lib/firebase"
import { getUserByIdRepo } from "@/repo/user"
import { Role, User } from "@/types/user"
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Email Address", type: "text", placeholder: "yourname@gmail.com" },
                password: { label: "Password", type: "password" },

            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                let user;
                try {
                    console.log(credentials)
                    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, credentials!.username, credentials!.password)
                    if (!userCredential.user.emailVerified)
                        throw new Error(UserNotVerified)
                    else {
                        const user: User = await getUserByIdRepo(credentials?.username);
                        if (!user.activated)
                            throw new Error(UserNotActivated)

                    }
                    user = {
                        id: userCredential.user.uid,
                        uid: userCredential.user.uid,
                        name: userCredential.user.displayName,
                        email: credentials?.username,
                        role: Role.Seller
                    };// userCredential.user

                } catch (error) {
                    console.error(error)
                    throw error
                }

                // If no error and we have user data, return it
                if (user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    pages: {
        signIn: 'signIn'
    }, callbacks: {
        async session({ session, token }) {
            const user: User = await getUserByIdRepo(token.email!);
            session.user.uid = user.id;
            session.user.email = user.emailAddress;
            session.user.role = Role[user.role as keyof typeof Role];
            session.user.name = user.fullname;
            return session;
        },
    }
})

export { handler as GET, handler as POST }