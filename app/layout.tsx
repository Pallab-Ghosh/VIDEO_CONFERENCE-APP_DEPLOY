import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import "react-datepicker/dist/react-datepicker.css";
// ideally, Stream Video theme should be imported before your own styles
// as this would make it easier for you to override certain video-theme rules




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video Calling App",
  icons :{
    icon :'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      layout:{
        logoImageUrl : '/public/icons/yoom.svg',
        socialButtonsVariant :'iconButton'
      },
        variables:{
       colorText :'black',
       colorTextSecondary:'white',
       colorPrimary:'#2F3037',
       colorInputBackground :'#252a41',
       colorInputText :'#fff'
      } 
      }}>
    <html lang="en">
      <body className={`${inter.className} bg-dark-1`}> 
      {children} 
      <Toaster/>
      </body>
    </html>
 
    </ClerkProvider>
  );
}
