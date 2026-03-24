import { NextResponse } from "next/server"

export function GET(request: Request): NextResponse {
  return NextResponse.redirect(new URL("/icon-light-32x32.png", request.url))
}
