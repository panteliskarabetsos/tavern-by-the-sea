/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Server Actions default to a 1MB body, which a résumé PDF blows straight
      // through. The action itself caps the file at 4MB; this leaves headroom
      // for the multipart envelope and the rest of the form.
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
