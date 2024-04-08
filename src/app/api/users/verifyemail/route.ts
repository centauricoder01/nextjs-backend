import { connect } from "@/db/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      VerifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.VerifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email Verified successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
