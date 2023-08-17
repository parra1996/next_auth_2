import { NextResponse } from "next/server";
import User from "@/models/users";
import bcrypt from "bcryptjs";
import { connectDB } from "@/libs/mongodb";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { password, username, email } = await request.json();

    if (password.length < 6) {
      return NextResponse.json(
        { message: "la contraseña debe ser mayor que 6 caracteres" },
        { status: 403 }
      );
    }

    const userFound = await User.findOne({ email: email });
    if (userFound)
      return NextResponse.json(
        { message: "this user already exists" },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      username,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    console.log(savedUser);

    return NextResponse.json({
      user: {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
