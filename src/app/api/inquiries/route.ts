import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, email, phone, budget, message, source, honeypot, recaptchaToken } = body

    // 1. Invisible Honeypot Spam Trap Check (Bots fill this hidden field)
    if (honeypot && honeypot.trim() !== '') {
      console.warn('[Spam Attack Blocked via Honeypot]', { fullName, email, phone })
      // Return silent fake success response to trick the spam bot
      return NextResponse.json({
        success: true,
        message: 'Inquiry received successfully.',
      })
    }

    // 2. Mandatory Field Validation
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Full name, email, and phone number are required.' },
        { status: 400 }
      )
    }

    // 3. Google reCAPTCHA Verification (if secret key configured)
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    if (secretKey && recaptchaToken) {
      try {
        const verifyRes = await fetch(
          `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`,
          { method: 'POST' }
        )
        const verifyData = await verifyRes.json()
        if (!verifyData.success || (verifyData.score !== undefined && verifyData.score < 0.5)) {
          console.warn('[reCAPTCHA Verification Failed]', verifyData)
          return NextResponse.json(
            { error: 'Security verification failed. Please try again.' },
            { status: 422 }
          )
        }
      } catch (err) {
        console.warn('[reCAPTCHA Verification Notice]:', err)
      }
    }

    const inquiryPayload = {
      fullName,
      email,
      phone,
      budget: budget || 'Not Specified',
      message: message || '',
      source: source || 'Website Lead Form',
      submittedAt: new Date().toISOString(),
    }

    console.log('[Inquiry Validated & Processing]', inquiryPayload)

    // 4. Forward & Store Lead directly inside WordPress Admin via WP REST API
    const wpEndpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
    if (wpEndpoint) {
      const restBaseUrl = wpEndpoint.replace(/\/graphql\/?$/, '')
      const wpRestUrl = `${restBaseUrl}/wp-json/income-estate/v1/inquiry`

      try {
        await fetch(wpRestUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inquiryPayload),
        })
      } catch (wpErr) {
        console.warn('WordPress Lead Storage REST notice:', wpErr)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully. Our team will contact you shortly.',
    })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to process inquiry'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
