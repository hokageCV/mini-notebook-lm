import { authenticate } from '@/utils/auth'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { username, password } = await req.json()
  if (!authenticate(username, password)) return NextResponse.json({ success: false }, { status: 401 })

  const res = NextResponse.json({ success: true })
  res.cookies.set("basic-auth", username, { httpOnly: true })

  return res
}
