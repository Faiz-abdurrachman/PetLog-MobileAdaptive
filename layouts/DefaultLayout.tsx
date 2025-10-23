import Head from "next/head";
import { PropsWithChildren } from "react";
import { Footer } from "components/Footer";
import { Navigation } from "components/Navigation";

export const DefaultLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Head>
        <title>PetLog · Digital Paw-ssport</title>
        <meta
          name="description"
          content="Mint and manage PetLog digital passports on Cardano"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.png" />
        {/* Pixel/retro fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-gray-50">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col">
          <Navigation />
          <main className="flex-1 px-3 pb-8 sm:px-4 md:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};
