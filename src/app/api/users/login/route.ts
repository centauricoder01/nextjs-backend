import { connect } from "@/db/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User Does not Exist" },
        { status: 500 }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 500 }
      );
    }

    // data that need to be send in the token

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const jwtToken = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged in Success",
      success: true,
    });

    response.cookies.set("token", jwtToken, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
