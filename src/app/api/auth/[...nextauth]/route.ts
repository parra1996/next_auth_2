import { connectDB } from "@/libs/mongodb";
import User from "@/models/users";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        await connectDB();

        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password"); // el select es para agregar el campo password ya que le dijimos que no lo envie desde backend
        if (!userFound) throw new Error("Invalid credentials");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );
        if (!passwordMatch) throw new Error("passwords don`t match");

        // const user = {
        //   id: "1",
        //   username: "tete",
        //   email: "tete@gmail.com",
        // };

        console.log(userFound);
        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any; // crear interface
      return session;
    },
  },
  // pages es una propiedad que al hacer signin como enn este caso
  // redirige a otra pagina, login en este caso
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
