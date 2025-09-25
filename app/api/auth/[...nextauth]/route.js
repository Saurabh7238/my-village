import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Database connection function
const connect = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected.");
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

// Updated User schema to use email
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);


// NextAuth configuration
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();
        const userFound = await User.findOne({ email: credentials.email });

        if (!userFound) return null;

        const isMatch = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (isMatch) {
          return {
            id: userFound._id,
            name: userFound.email,
            role: userFound.role,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };