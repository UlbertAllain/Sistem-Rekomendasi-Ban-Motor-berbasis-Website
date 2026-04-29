// app/api/debug-env/route.tsx

import { NextResponse } from "next/server";

export async function GET() {
  const envs = {
    HAS_PROJECT_ID: !!process.env.FIREBASE_ADMIN_PROJECT_ID,
    PROJECT_ID_VALUE: process.env.FIREBASE_ADMIN_PROJECT_ID || "KOSONG",
    HAS_PRIVATE_KEY: !!process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    PRIVATE_KEY_LENGTH: process.env.FIREBASE_ADMIN_PRIVATE_KEY ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.length : 0,
    HAS_CLIENT_EMAIL: !!process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    CLIENT_EMAIL_VALUE: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || "KOSONG",
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: !!process.env.VERCEL,
  };

  return NextResponse.json(envs);
}