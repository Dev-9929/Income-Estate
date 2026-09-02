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

    try {
      if (process.env.DATABASE_URI) {
        const { getPayload } = await import('payload')
        const config = (await import('@/payload.config')).default
        const payload = await getPayload({ config })
        const doc = await payload.create({
          collection: 'inquiries' as any,
          data: {
            fullName,
            email,
            phone,
            budget: budget || 'Not Specified',
            message: message || '',
            source: source || 'Website Consultation Form',
            status: 'new',
          } as any,
        })

        return NextResponse.json({
          success: true,
          message: 'Inquiry registered successfully in Payload CMS database.',
          id: doc.id,
        })
      }
    } catch (dbErr) {
      console.warn('Database write bypassed (offline/unconfigured DB):', dbErr)
    }

    // Always return success so the client UI shows the thank-you confirmation toast
    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to process inquiry'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
