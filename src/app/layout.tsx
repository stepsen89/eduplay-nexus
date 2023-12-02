import Layout from "@/components/Layout";
import { AuthContextProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { UserDataContextProvider } from "@/context/UserDataContext";

const montserrat_font = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat_font.className}>
        <AuthContextProvider>
          <UserDataContextProvider>
            <Layout> {children} </Layout>
          </UserDataContextProvider>
        </AuthContextProvider>
        <span className="absolute right-9 bottom-5">
          (c) Stephanie Senoner, MSc Computing & Tech
        </span>
      </body>
    </html>
  );
}
