import { type NextRequest, NextResponse } from "next/server"

// Basic validation schema
const validateContactForm = (data: any) => {
  const errors: Record<string, string> = {}

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters"
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please provide a valid email address"
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.subject = "Subject must be at least 5 characters"
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters"
  }

  return { isValid: Object.keys(errors).length === 0, errors }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate form data
    const { isValid, errors } = validateContactForm(body)

    if (!isValid) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    // Here you would typically:
    // 1. Send an email using a service like Resend, SendGrid, etc.
    // 2. Save to a database
    // 3. Trigger a webhook or notification

    // For now, we'll simulate successful submission
    console.log("Contact form submission:", body)

    return NextResponse.json(
      { success: true, message: "Thank you for reaching out. We'll get back to you soon!" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ success: false, message: "An error occurred. Please try again." }, { status: 500 })
  }
}
