import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import authConfig from "./auth.config";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

// We need to re-define the Credentials provider here because it needs database access
const providers = [
    ...authConfig.providers.filter((p) => p.id !== "credentials"),
    Credentials({
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) return null;

            const user = await prisma.user.findUnique({
                where: { email: credentials.email as string },
            });

            if (!user || !user.password) return null;

            const isPasswordCorrect = await bcrypt.compare(
                credentials.password as string,
                user.password
            );

            if (!isPasswordCorrect) return null;

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
            };
        },
    }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    ...authConfig,
    providers, // Override providers to include the database-dependent one
});
