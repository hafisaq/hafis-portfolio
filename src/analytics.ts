const defaultMeasurementId = 'G-HQ7LT588GD'
const gaMeasurementId =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) ?? defaultMeasurementId

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function initializeAnalytics() {
  if (!gaMeasurementId || !import.meta.env.PROD) {
    return
  }

  if (!window.gtag) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer ?? []
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args)
    }

    window.gtag('js', new Date())
    window.gtag('config', gaMeasurementId)
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (!import.meta.env.PROD || !window.gtag) {
    return
  }

  window.gtag('event', eventName, params)
}
