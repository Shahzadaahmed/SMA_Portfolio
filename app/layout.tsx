import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Haris | Senior Full Stack Software Engineer",
  description: "Portfolio of Muhammad Haris - A passionate Senior Software Engineer with 5+ years of experience in full-stack development, specializing in mobile apps, web development, and cloud solutions.",
  keywords: [
    "Muhammad Haris",
    "Software Engineer",
    "Full Stack Developer",
    "React Native",
    "Mobile App Development",
    "Web Development",
    "AWS",
    "Node.js",
    "Kotlin",
    "Portfolio"
  ],
  authors: [{ name: "Muhammad Haris", url: "https://linkedin.com/in/mharis404" }],
  creator: "Muhammad Haris",
  publisher: "Muhammad Haris",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mharis404.github.io/portfolio/",
    title: "Muhammad Haris | Senior Full Stack Software Engineer",
    description: "Portfolio showcasing expertise in mobile app development, web solutions, and cloud technologies. 5+ years of professional experience.",
    siteName: "Muhammad Haris Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Haris Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Haris | Senior Full Stack Software Engineer",
    description: "Portfolio showcasing expertise in mobile app development, web solutions, and cloud technologies.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://mharis404.github.io/portfolio/",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Haris",
              jobTitle: "Senior Full Stack Software Engineer",
              url: "https://mharis404.github.io/portfolio/",
              sameAs: [
                "https://www.linkedin.com/in/mharis404/",
                "https://github.com/mharis404",
                "https://www.instagram.com/mharis404"
              ],
              email: "mharis.ksasen@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Riyadh",
                addressCountry: "SA"
              },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Sir Syed University of Engineering and Technology"
              },
              knowsAbout: [
                "Full Stack Development",
                "Mobile App Development",
                "React Native",
                "AWS",
                "Node.js",
                "Kotlin",
                "Software Engineering"
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
};