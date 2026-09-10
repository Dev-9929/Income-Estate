import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, email, phone, budget, message, source } = body

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Full name, email, and phone number are required.' },
        { status: 400 }
      )
    }

    console.log('[Inquiry Received]', {
      fullName,
      email,
      phone,
      budget: budget || 'Not Specified',
      message: message || '',
      source: source || 'Website Consultation Form',
      timestamp: new Date().toISOString(),
    })

    // Return success response to client UI toast
    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully. Our team will contact you shortly.',
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to process inquiry'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
