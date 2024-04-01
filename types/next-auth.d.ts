import { type DefaultSession } from 'next-auth';
import { Role } from './user';



declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string;
            uid: string,
            role?: Role;
            username?: string;
        } & DefaultSession['user'];
    }
}