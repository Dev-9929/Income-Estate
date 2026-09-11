/**
 * Google reCAPTCHA v3 Helper Utility
 */

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export async function executeRecaptchaToken(action = 'submit_lead'): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    // Graceful developer fallback when site key is not configured
    return null
  }

  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null)
      return
    }

    // Load reCAPTCHA script dynamically if not present
    if (!document.getElementById('recaptcha-v3-script')) {
      const script = document.createElement('script')
      script.id = 'recaptcha-v3-script'
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }

    if (window.grecaptcha) {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, { action })
          resolve(token)
        } catch (err) {
          console.warn('reCAPTCHA execution error:', err)
          resolve(null)
        }
      })
    } else {
      resolve(null)
    }
  })
}
