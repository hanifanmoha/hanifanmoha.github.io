// Sources: https://medium.com/readytowork-org/google-analytics-in-next-js-a26cc2b28db5

import React from 'react'
import Script from 'next/script'
import CONFIG from '@/utils/config'

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA_MEASUREMENT_ID}`}
      />

      <Script id='' strategy='lazyOnload'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${CONFIG.GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  )
}

export default GoogleAnalytics
