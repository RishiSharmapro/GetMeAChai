import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get me A Chai - Fund your projects with chai",
  description:
    "This website is a crowdfunding platform for devlopers to fund their projects with chai.",
  icon: "/favicon-chai.png",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={metadata.icon} />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="stylesheet" href={inter.url} />
      </head>
      <body className={inter.className}>
        <SessionWrapper>
          <MainLayout>
            <div className="text-black bg-[#f0f4ff]">{children}</div>
          </MainLayout>
        </SessionWrapper>
      </body>
    </html>
  );
}
