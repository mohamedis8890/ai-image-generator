import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import "../styles/globals.css";
import ClientProvider from "@/components/ClientProvider";

export const metadata = {
  title: "AI Image Generator",
  description:
    "Harness the power of ChatGPT and DALL﹒E, Create revolutionarry AI images.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Header />
          <PromptInput />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
