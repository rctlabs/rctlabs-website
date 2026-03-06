import { type NextRequest, NextResponse } from "next/server"

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ success: false, error: "Please provide a valid email address" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Add email to your mailing list (Mailchimp, ConvertKit, etc.)
    // 2. Save to database
    // 3. Send confirmation email

    console.log("Newsletter signup:", email)

    return NextResponse.json({ success: true, message: "Successfully subscribed to our newsletter!" }, { status: 200 })
  } catch (error) {
    console.error("Newsletter signup error:", error)
    return NextResponse.json({ success: false, error: "An error occurred. Please try again." }, { status: 500 })
  }
}
