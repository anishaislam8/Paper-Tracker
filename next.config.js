/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true, // Enables the experimental app directory feature.
      serverComponentsExternalPackages: ["mongoose"], // Allows the use of the mongoose package in server components.
    },
    images: {
      domains: ['lh3.googleusercontent.com'], //Specifies allowed external domains for optimized images. In this case, images from lh3.googleusercontent.com are allowed.
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true, // This function customizes the Webpack configuration.
      }
      return config
    }
  }
  
  module.exports = nextConfig