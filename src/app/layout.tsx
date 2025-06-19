import type { Metadata } from "next";
import "./globals.css";
import { ProjectProvider } from "@/context/ProjectContext";
import { AuthProvider } from "@/context/AuthContext";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "DocCrafter - Generate Project Files in Minutes",
  description: "AI-powered project documentation generator with chapters, images, and .docx export",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <AuthProvider>
            <ProjectProvider>
              <Navbar />
              {children}
            </ProjectProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
