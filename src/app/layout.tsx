import type {Metadata} from "next";

import "./globals.css";

import Link from "next/link";

import {getCategories, getProducts} from "@/services";
import ListOfCategories from "@/components/ListOfCategories";

export const metadata: Metadata = {
  title: "Migrado Libre",
  description: "La tienda de Don Miguel, libre de amarillos",
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const products = await getProducts();
  const categories = await getCategories(products);

  return (
    <html lang="en">
      <body className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
        <header className="text-xl font-bold leading-[3rem]">
          <Link href="/">Migrado Libre</Link>
        </header>
        <div className="grid grid-cols-[300px,1fr] gap-10 p-10">
          <aside>
            <ListOfCategories categories={categories} />
          </aside>

          <main className="py-8">{children}</main>
        </div>

        <footer className="text-center leading-[3rem] opacity-70">
          © {new Date().getFullYear()} Don Miguel
        </footer>
      </body>
    </html>
  );
}
