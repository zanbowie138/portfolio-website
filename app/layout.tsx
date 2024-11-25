import React from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Alexander Bui</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-gray-950 justify-center flex">
        <div className="w-full lg:w-[1000px] lg:my-4">
          <Header />
          <div className="p-2 bg-white lg:rounded-b-md">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
