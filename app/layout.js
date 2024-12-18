import Nav from "@/components/Nav";
import AuthProvider from "@/context/authProvider";
import { dbConnect } from "@/service/mongo";
import { dancingScript, lato, manrope, nunito } from "./fonts/font";
import "./globals.css";

export const metadata = {
  title: "MovieDB",
  description: "Generated by create next app",
};

export default async function RootLayout ( { children } )
{
  await dbConnect();
  
  return (
    <html
      lang="en"
      className={ `${manrope.className} ${nunito.className} ${dancingScript.className} ${lato.className}` }
    >
      <AuthProvider>
        <body className="antialiased bg-black text-white">
          <Nav />
          { children }
        </body>
      </AuthProvider>
    </html>
  );
}