import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    // extract userId from token
    const userId = await getDataFromToken(request);

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User data retrieved successfully",
      success: true,
      user,
    });

  } catch (error: unknown) {

    const msg =
      error instanceof Error ? error.message : "Server error";

  
    if (msg.includes("jwt expired")) {
      return NextResponse.json(
        { error: "Session expired" },
        { status: 401 }
      );
    }

    
    if (msg.includes("jwt malformed")) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
