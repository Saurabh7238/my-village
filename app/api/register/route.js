import { NextResponse } from "next/server";
import dbConnect from "@/lib/db"; // Import the correct connection function
import User from "@/models/User"; // Import the User model
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  await dbConnect();
  
  const { email, password } = await request.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse(JSON.stringify({ message: "Email is already in use" }), {
      status: 409,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse(JSON.stringify({ message: "User registered successfully" }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Failed to register user" }), {
      status: 500,
    });
  }
};