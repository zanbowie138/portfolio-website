import React from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alexander Bui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-950 justify-center flex min-h-screen">
        <div className="w-full lg:h-fit lg:w-[1000px] lg:my-4 flex flex-col">
          <Header />
          <div className="bg-white lg:rounded-b-md flex flex-col grow">
            <div className="grow">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
