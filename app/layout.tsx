import type { Metadata } from "next";
import "./globals.css";
import { personalInfo, userName } from "@/data/portfolio-data";

export const metadata: Metadata = {
  title: `${userName?.wellFormedUserName} | Senior Full Stack Software Engineer`,
  description: `Portfolio of ${userName?.wellFormedUserName} - A passionate Senior Software Engineer with 5+ years of experience in full-stack development, specializing in mobile apps, web development, and cloud solutions.`,
  keywords: [
    userName?.wellFormedUserName,
    "Software Engineer",
    "Full Stack Developer",
    "React Native",
    "Mobile App Development",
    "Web Development",
    "Node JS",
    "Database"
  ],
  authors: [{ name: userName?.wellFormedUserName, url: personalInfo?.social?.linkedin }],
  creator: userName?.wellFormedUserName,
  publisher: userName?.wellFormedUserName,
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
    url: personalInfo?.social?.github,
    title: `${userName?.wellFormedUserName} | Senior Full Stack Software Engineer`,
    description: "Portfolio showcasing expertise in mobile app development, web solutions, and cloud technologies. 5+ years of professional experience.",
    siteName: `${userName?.wellFormedUserName} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${userName?.wellFormedUserName} Portfolio`
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Muhammad Haris | Senior Full Stack Software Engineer",
  //   description: "Portfolio showcasing expertise in mobile app development, web solutions, and cloud technologies.",
  //   images: ["/og-image.png"],
  // },
  alternates: {
    canonical: personalInfo?.social?.github,
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
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: userName?.wellFormedUserName,
              jobTitle: "Senior Full Stack Software Engineer",
              url: personalInfo?.social?.github,
              sameAs: [
                personalInfo?.social?.linkedin,
                personalInfo?.social?.github,
                personalInfo?.social?.facebook
              ],
              email: personalInfo?.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Karachi",
                addressCountry: "PK"
              },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Hamdard University of Engineering and Technology"
              },
              knowsAbout: [
                userName?.wellFormedUserName,
                "Software Engineer",
                "Full Stack Developer",
                "React Native",
                "Mobile App Development",
                "Web Development",
                "Node JS",
                "Database"
              ],
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