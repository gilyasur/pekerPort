/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
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
}

module.exports = nextConfig 