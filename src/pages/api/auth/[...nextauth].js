import { authController, dbCheckController } from "controllers";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "internalCreds",
      name: "Credentials Authentication",
      credentials: {
        username: { label: "User", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      type: "credentials",
      async authorize(credentials, req) {
        try {
          const user = await authController.authUser(
            credentials.username,
            credentials.password
          );
          console.log(user);
          if (user) {
           await dbCheckController.dbCheckOrCreate(user.id);
            return user;
          }
          return null;
        } catch (error) {
          return false;
        }
      },
    }),
  ],
  //   pages: {
  //     signIn: "/auth/signin",
  //   },
  jwt: {
    encryption: true,
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    },
  },
  debug: true,
});
