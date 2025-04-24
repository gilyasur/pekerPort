/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    // Only unoptimize images when building for drag-and-drop deployment
    unoptimized: process.env.EXPORT_FOR_NETLIFY === 'true',
  },
  // Only set output to 'export' when building for drag-and-drop deployment
  ...(process.env.EXPORT_FOR_NETLIFY === 'true' ? {
    output: 'export',
    trailingSlash: true,
  } : {
    // Only use headers when not exporting
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: `default-src 'self' 'unsafe-inline' 'unsafe-eval' *.vimeo.com *.youtube.com *.imdb.com; connect-src 'self' *.emailjs.com api.emailjs.com; font-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vimeo.com; style-src 'self' 'unsafe-inline';`
            }
          ]
        }
      ]
    }
  })
}

module.exports = nextConfig 